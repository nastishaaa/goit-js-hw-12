import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { findMyFetch } from './js/pixabay-api.js';
import { renderImages } from './js/render-function.js';

const input = document.querySelector('#text');
const list = document.querySelector('.list'); 
const btn = document.querySelector('.search');
const loader = document.querySelector('.loader');
const btnMore = document.querySelector('.btn-more');

btnMore.style.display = 'none';

loader.style.display = 'none';
let page = 1;
let limit = 15;

let val = '';

input.addEventListener('input', ev =>{
    val = ev.target.value;
    if(val.trim() === ''){
        input.value = '';
    }
});

btn.addEventListener('click', ev => {
    ev.preventDefault();
    page = 1;
    if(!val || val.trim() === ''){
        list.innerHTML = '';
        return iziToast.error({
            message: "Sorry, there are no images matching your search query. Please try again!",
            timeout: 5000, 
            position: 'topRight',
        })
    } else{
        list.innerHTML = '';
        findMyFetch(val, page, limit);
    }
    
});

const lightbox = new SimpleLightbox('.list a', { 
    captions: true, 
    captionsData: 'alt', 
    captionDelay: 250, 
    animationSlide: true, 
});

btnMore.addEventListener('click', async () => {
    page += 1; 
    try {
        loader.style.display = '';
        const response = await findMyFetch(val, page, limit, true);
        loader.style.display = 'none'; 

        const markup = renderImages(response.hits);
        list.insertAdjacentHTML('beforeend', markup);
        lightbox.refresh();
        
        const firstCard = document.querySelector('.list li'); 
        if (firstCard) {
            const cardHeight = firstCard.getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth'
            });
        }

        const totalPages = Math.ceil(response.totalHits / limit);
        if (page >= totalPages) {
            btnMore.style.display = 'none'; 
            iziToast.info({
                position: "topRight",
                message: "You've reached the end of the results",
            });
        } else {
            btnMore.style.display = ''; 
        }
        
    } catch (error) {
        btnMore.style.display = 'none';
        console.log(error);
    }
});