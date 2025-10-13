// src/app.js
import onChange from 'on-change';
import i18next from 'i18next'; // <<< ASEGÚRATE DE IMPORTAR i18next
import render from './view.js';
import axios from 'axios';
import _ from 'lodash';
import * as yup from 'yup';
import parseRss from './parser.js';
import resources from './locales/index.js'; // <<< ASEGÚRATE DE IMPORTAR TUS TEXTOS

const addProxy = (url) => {
  const proxyUrl = new URL('https://allorigins.hexlet.app/get');
  proxyUrl.searchParams.set('disableCache', 'true');
  proxyUrl.searchParams.set('url', url);
  return proxyUrl.toString();
};
const updateFeeds = (state, watchedState) => {
  const promises = state.feeds.map((feed) =>
    axios.get(addProxy(feed.url))
      .then((response) => {
        const { posts } = parseRss(response.data.contents);
        const existingPostLinks = state.posts
          .filter((p) => p.feedId === feed.id)
          .map((p) => p.link);

        const newPosts = posts.filter((post) => !existingPostLinks.includes(post.link));

        if (newPosts.length > 0) {
          const postsWithIds = newPosts.map((post) => ({
            ...post,
            id: _.uniqueId('post-'),
            feedId: feed.id,
          }));
          watchedState.posts.unshift(...postsWithIds);
        }
      })
      .catch((err) => {
        console.error(`Update failed for ${feed.url}:`, err);
      })
  );

  // Cuando todas las promesas terminen, espera 5 segundos y repite
  Promise.all(promises)
    .finally(() => {
      setTimeout(() => updateFeeds(state, watchedState), 5000);
    });
};
const validate = (url, state) => {
  const existingFeeds = state.feeds.map((feed) => feed.url);
  const schema = yup.string()
    .required()
    .url()
    .notOneOf(existingFeeds);
    
  return schema.validate(url);
};

const app = () => {
    
//   const state = { /* ... tu estado ... */ };
//   const elements = { /* ... tus elementos ... */ };
//  const i18nInstance = /* ... tu instancia de i18next ... */
//   // Renderizar los textos estáticos una sola vez al inicio
//   elements.title.textContent = i18nInstance.t('title');
//   elements.lead.textContent = i18nInstance.t('lead');
//   elements.addButton.textContent = i18nInstance.t('addButton');
//   elements.input.setAttribute('placeholder', i18nInstance.t('placeholder'));
//   elements.example.textContent = i18nInstance.t('example');

    const state = {
    form: {
      processState: 'filling',
      error: null,
    },
    loadingProcess: {
      status: 'idle',
      error: null,
    },
    feeds: [],
    posts: [],
  };
 const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'), // Asegúrate que tu input tenga este id
    feedback: document.querySelector('.feedback'),
    addButton: document.querySelector('button[type="submit"]'),
    postsContainer: document.querySelector('.posts'),
    feedsContainer: document.querySelector('.feeds'),
  };
  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: 'es', // Cambia esto al idioma que prefieras
    debug: false,
    resources,
  }).then(() => {
     yup.setLocale({
      string: {
        url: 'errors.invalidUrl',
      },
      mixed: {
        required: 'errors.required',
        notOneOf: 'errors.rssExists',
      },
    });
    
  const watchedState = onChange(state, (path, value) => {
    // Pasamos la instancia de i18next a la función de renderizado
    render(state, elements, i18nInstance);
     
  
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();

    validate(url, state)
      .then(() => {
        // ... lógica de éxito ...
        watchedState.form.processState = 'finished';
        return axios.get(addProxy(url)); // Petición de red
      })
      .then((response) => {
        const parsedData = parseRss(response.data.contents); // Parsing
        const { feed, posts } = parsedData;

        // Añadir datos al estado con IDs únicos
        const feedId = _.uniqueId('feed-');
        watchedState.feeds.unshift({ ...feed, id: feedId, url });

        const postsWithIds = posts.map((post) => ({
          ...post,
          id: _.uniqueId('post-'),
          feedId,
        }));
        watchedState.posts.unshift(...postsWithIds);
        
        // Actualizar estados de éxito
        watchedState.loadingProcess.status = 'finished';
        watchedState.form.processState = 'finished';
      })
      .catch((err) => {
        // Gestión centralizada de errores
        if (err.isAxiosError) {
          watchedState.loadingProcess.error = 'errors.network';
        } else if (err.isParseError) {
          watchedState.loadingProcess.error = 'errors.invalidRss';
        } else {
          // Errores de validación de Yup
          watchedState.form.error = err.message;
        }
        
        watchedState.loadingProcess.status = 'failed';
        watchedState.form.processState = 'failed';
      });
  });
});
 updateFeeds(state, watchedState);
  });
};

// <<< ESTA PARTE FUE AGREGADA
// Aquí se ejecuta toda la aplicación
app();
// Iniciar la aplicación