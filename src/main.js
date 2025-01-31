import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { findMyFetch } from './js/pixabay-api.js';

const input = document.querySelector('#text');
const list = document.querySelector('.list'); 
const btn = document.querySelector('.search');
const loader = document.querySelector('.loader');

loader.style.display = 'none';

let val = '';

input.addEventListener('input', ev =>{
    val = ev.target.value;
    if(val.trim() === ''){
        input.value = '';
    }
});

btn.addEventListener('click', ev => {
    ev.preventDefault();
    if(val.length === 0 || val.trim() === ''){
        list.innerHTML = '';
        return iziToast.error({
            message: "Sorry, there are no images matching your search query. Please try again!",
            timeout: 5000, 
            position: 'topRight',
        })
    } else{
        list.innerHTML = '';
        findMyFetch(val);
    }
})
