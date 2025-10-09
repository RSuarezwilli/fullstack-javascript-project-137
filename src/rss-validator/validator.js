import * as yup from 'yup';

// src/app.js
const validate = (url, state) => {
  const existingFeeds = state.feeds.map((feed) => feed.url);
  const schema = yup.string()
    .required() // Ya no necesita mensaje, usará setLocale
    .url()      // Ya no necesita mensaje, usará setLocale
    .notOneOf(existingFeeds, 'errors.rssExists'); // Pasamos la clave directamente

  return schema.validate(url);
};