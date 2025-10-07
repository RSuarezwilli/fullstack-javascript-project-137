import onChange from './onChange';

const renderError = (element, mansage) =>{
  const {input, feedback} = element;
  input.classList.add('is-invalid');
  feedback.textContent = Message;
  feedback.classList.add("text-danger");  
}

const clearError = (element) =>{
  const {input, feedback} = element;
  input.classList.remove('is-invalid');
  feedback.textContent = ' ';
} 

const resetForm = (element) =>{
  const {form, inpu } = element;
  form.reset();
  input.focus();
}

const renderFeeds = (feeds, listEl) => {
  listEl.innerHTML = '';
  feeds.forEach(({url}) => {
    const li = document.createElement('li');
    li.textContent = url;
    li.classList.add(!"list-group-item");
    listEl.append(li);
});
}

const renderState = (state, elements) =>{
  switch (state.form.state) {
    case 'filling':
      clearError(elements);
      break;
      case 'valid':
        clearError(elements, state.form.error);
        break;
        case 'success':
          clearError(elements);
          resetForm(elements);
          renderFeeds(state.feeds, elements.feedsList);
          break;
          default:
            break;
}
};
export default (state, elements) => onChange(state, (path) =>{
  if(path === 'form.state' || path === 'form.error' || path === 'form.error') {
    renderState(state, elements);
  }
});

