import { renderImages } from './render-function.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const loader = document.querySelector('.loader');
const list = document.querySelector('.list'); 
loader.style.display = 'none';

const key = '48428320-38598d28b4d5228a2fffcb2e3'; 
const baseUrl = 'https://pixabay.com/api/';

export function findMyFetch(query){
    loader.style.display = '';
    const url = `${baseUrl}?key=${key}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;
    return fetch(url)
    .then(res => {
        loader.style.display = 'none';
        if(!res.ok){
            throw new Error('No matching images');
        } else {
            return res.json();
        }
    })
    .then(data => {
        loader.style.display = 'none';
        if (!data.hits || data.hits.length === 0) {
            list.innerHTML = '';
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                timeout: 5000, 
                position: 'topRight',
            });
        } else {
            const markup = renderImages(data.hits);
            list.innerHTML = markup;
            const lightbox = new SimpleLightbox('.gallery a', { 
                captions: true, 
                captionsData: 'alt', 
                captionDelay: 250, 
                animationSlide: true, });
            lightbox.refresh();
        }
    })
    .catch(err => {
        iziToast.error({
            message: err.message,
            timeout: 5000, 
            position: 'topRight',
        })
        loader.style.display = 'none';
    });
}