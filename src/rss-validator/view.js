// src/view.js

const render = (state, elements, i18nInstance) => {
  const {
    input,
    feedback,
    submitButton,
  } = elements;

  // Renderizar textos estáticos (solo si es necesario, mejor hacerlo una vez)
  // (Ver el paso siguiente)

  // Renderizar feedback (errores o éxito)
  // Aquí está la magia: usamos la clave del estado para obtener el texto
  if (state.form.error) {
    feedback.textContent = i18nInstance.t(state.form.error);
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    input.classList.add('is-invalid');
  } else if (state.form.processState === 'finished') {
    feedback.textContent = i18nInstance.t('rssSuccess');
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    input.classList.remove('is-invalid');
    input.value = '';
    input.focus();
  } else {
    feedback.textContent = '';
    input.classList.remove('is-invalid');
  }

  // Lógica para deshabilitar formulario
  // ...
};

export default render;