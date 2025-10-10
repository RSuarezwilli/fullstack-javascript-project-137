// src/app.js
import onChange from 'on-change';
import i18nInstance from './init.js'; // Importamos nuestra instancia configurada
import render from './view.js';
import axios from 'axios';
import _ from 'lodash';

const addProxy = (url) => {
  const proxyUrl = new URL('https://allorigins.hexlet.app/get');
  proxyUrl.searchParams.set('disableCache', 'true');
  proxyUrl.searchParams.set('url', url);
  return proxyUrl.toString();
};

const app = () => {
  const state = { /* ... tu estado ... */ };
  const elements = { /* ... tus elementos ... */ };
 const i18nInstance = /* ... tu instancia de i18next ... */
  // Renderizar los textos estáticos una sola vez al inicio
  elements.title.textContent = i18nInstance.t('title');
  elements.lead.textContent = i18nInstance.t('lead');
  elements.addButton.textContent = i18nInstance.t('addButton');
  elements.input.setAttribute('placeholder', i18nInstance.t('placeholder'));
  elements.example.textContent = i18nInstance.t('example');

  const watchedState = onChange(state, (path, value) => {
    // Pasamos la instancia de i18next a la función de renderizado
    render(state, elements, i18nInstance);
  });

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
};



    

// Iniciar la aplicación