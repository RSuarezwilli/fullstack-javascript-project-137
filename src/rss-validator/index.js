// src/app.js
import onChange from 'on-change';
import i18nInstance from './init.js'; // Importamos nuestra instancia configurada
import render from './view.js';

const app = () => {
  const state = { /* ... tu estado ... */ };
  const elements = { /* ... tus elementos ... */ };

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
      })
      .catch((err) => {
        // El mensaje de err.message ahora es la CLAVE, no el texto
        watchedState.form.error = err.message; 
        watchedState.form.processState = 'failed';
      });
  });
};

// Iniciar la aplicación
app();