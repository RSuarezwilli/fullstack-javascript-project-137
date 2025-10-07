import { buildSchema }   from "./validator";
import  initView  from "./view.js";
import '../style.css';

const state = {
    feeds: [],
    form: {
        state: 'filling', // filling, valid, invalid, sending, success, error
        error: null,
    },
};

const elements = {
    form: document.querySelector('.rss-form'),
    input : document.querySelector('#url-input'),
    feedback: document.querySelector('feedback'),
    feedList : document.querySelector('.feed-list'),
};

const watchedState = initView(state, elements);

elements.form.addEventListener('submit', (e) =>{
    e.preventDefault();
    watchedState.form.state = 'sending';

    const formData = new FormData(e.target);
    const url = formData.get('url').trim();
    const existingUrls = watchedState.feeds.map((feed) => feed.url);

    const schema = buildSchema(existingUrls); 

    schema.validate(url)
    .then(() =>{
        state.feeds.push({url});
        watchedState.form.state = 'success';
    })

    .catch((err) =>{
        watchedState.form.state = error.message;
        watchedState.form.state = 'invalid';
    });

});



