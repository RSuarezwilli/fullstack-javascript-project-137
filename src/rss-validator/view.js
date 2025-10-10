// src/view.js

// const render = (state, elements, i18nInstance) => {
//   const {
//     input,
//     feedback,
//     submitButton,
//   } = elements;

//   // Renderizar textos estáticos (solo si es necesario, mejor hacerlo una vez)
//   // (Ver el paso siguiente)

//   // Renderizar feedback (errores o éxito)
//   // Aquí está la magia: usamos la clave del estado para obtener el texto
//   if (state.form.error) {
//     feedback.textContent = i18nInstance.t(state.form.error);
//     feedback.classList.remove('text-success');
//     feedback.classList.add('text-danger');
//     input.classList.add('is-invalid');
//   } else if (state.form.processState === 'finished') {
//     feedback.textContent = i18nInstance.t('rssSuccess');
//     feedback.classList.remove('text-danger');
//     feedback.classList.add('text-success');
//     input.classList.remove('is-invalid');
//     input.value = '';
//     input.focus();
//   } else {
//     feedback.textContent = '';
//     input.classList.remove('is-invalid');
//   }

//   // Lógica para deshabilitar formulario
//   // ...
// };

// export default render;

// src/view.js

const createCard = (title) => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = title;
  cardBody.append(cardTitle);
  card.append(cardBody);
  return card;
};

const renderFeeds = (feeds, container, i18nInstance) => {
  container.innerHTML = ''; // Limpiar antes de renderizar
  const card = createCard(i18nInstance.t('feedsTitle')); // Asumiendo que tienes 'feedsTitle' en tus locales
  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');

  feeds.forEach((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = feed.title;
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = feed.description;
    li.append(h3, p);
    list.prepend(li);
  });

  card.append(list);
  container.append(card);
};

const renderPosts = (posts, container, i18nInstance) => {
  // Implementación similar a renderFeeds para los posts
  // ... crea la tarjeta y la lista ...
  posts.forEach((post) => {
    const li = document.createElement('li');
    // ... crea el enlace <a> con post.title y post.link ...
    // ... añade botones de "Ver" si quieres ...
    list.append(li);
  });
  // ...
};

// La función principal de renderizado
const render = (state, elements, i18nInstance) => {
  const { feedback, feedsContainer, postsContainer } = elements;

  // ... tu código de renderizado del formulario ...

  // Renderizar errores de carga
  if (state.loadingProcess.status === 'failed') {
    feedback.textContent = i18nInstance.t(state.loadingProcess.error);
    feedback.classList.add('text-danger');
  }

  // Renderizar listas
  renderFeeds(state.feeds, feedsContainer, i18nInstance);
  renderPosts(state.posts, postsContainer, i18nInstance);
};

export default render;