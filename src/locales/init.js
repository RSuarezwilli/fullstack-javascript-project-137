// src/init.js
import i18next from 'i18next';
import es from './locales/es.js'; // Importamos nuestras traducciones

const i18nInstance = i18next.createInstance();

i18nInstance.init({
  lng: 'es', // Idioma por defecto
  debug: true, // Útil para depurar en la consola
  resources: {
    es, // Pasamos los recursos de traducción
  },
});

export default i18nInstance;