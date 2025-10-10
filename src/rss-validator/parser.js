// src/parser.js
export default (xmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'application/xml');

  // Comprobación de error de parsing
  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    const error = new Error(parseError.textContent);
    error.isParseError = true; // Añadimos una bandera para identificar el error
    throw error;
  }

  // Extracción de datos del feed
  const feedTitle = doc.querySelector('channel > title').textContent;
  const feedDescription = doc.querySelector('channel > description').textContent;
  const feed = { title: feedTitle, description: feedDescription };

  // Extracción de los posts
  const postItems = doc.querySelectorAll('item');
  const posts = Array.from(postItems).map((item) => {
    const postTitle = item.querySelector('title').textContent;
    const postLink = item.querySelector('link').textContent;
    return { title: postTitle, link: postLink };
  });

  return { feed, posts };
};