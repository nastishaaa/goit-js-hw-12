const list = document.querySelector('.list');

export function renderImages(images) {
    return images.map(imgTemplate).join('');

}

export function imgTemplate(img) {
    return `
    <li class='elem-list'>
        <div class="gallery">
            <a href="${img.largeImageURL}">
                <img src="${img.webformatURL}" alt="${img.tags}" title="${img.tags}" class='image'/>
            </a>
            <div class="image-info">
                <p><strong>Likes:</strong> ${img.likes}</p>
                <p><strong>Views:</strong> ${img.views}</p>
                <p><strong>Comments:</strong> ${img.comments}</p>
                <p><strong>Downloads:</strong> ${img.downloads}</p>
            </div>
        </div>
        </li>`;
}