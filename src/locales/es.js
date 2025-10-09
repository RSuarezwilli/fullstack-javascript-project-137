// src/locales/es.js
export default {
  translation: {
    // Textos de la interfaz
    title: 'Agregador RSS',
    lead: '¡Comienza a leer RSS hoy! Es fácil, es hermoso.',
    placeholder: 'enlace RSS',
    addButton: 'Agregar',
    example: 'Ejemplo: https://es.hexlet.io/lessons.rss',

    // Mensajes de éxito y proceso
    rssSuccess: '¡RSS cargado exitosamente!',
    loading: 'Cargando...',

    // Errores
    errors: {
      invalidUrl: 'El enlace debe ser una URL válida',
      rssExists: 'El RSS ya existe',
      required: 'El campo no debe estar vacío',
      network: 'Error de red, intente más tarde',
      invalidRss: 'El recurso no contiene un RSS válido',
    },
  },
};