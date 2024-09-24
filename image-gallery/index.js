const img__container = document.querySelector('.image__container');
const inputForm = document.querySelector(".form-control");
const searchButton = document.querySelector(".search__button");


async function getPhotos(param) {
    fetch(`https://api.unsplash.com/search/photos?query=${param}&per_page=18&orientation=landscape&client_id=dbXTMWsnem3eDUnb3j7Kva8_XcWwF7NCZYWt06_6bKk`)
        .then((res) => res.json())
        .then((data) => {
            img__container.innerHTML = '';
            data.results.map(e => {
                const element = createImgElement(e.urls.small);
                img__container.appendChild(element);
            })
        })
}

function createImgElement(link) {
    const img__element = document.createElement('img');
    img__element.classList.add('img__element');
    img__element.style.background = `url(${link})`;
    return img__element;
}


getPhotos('Canada')


searchButton.addEventListener('click', () => {

    if(inputForm.value === ''){
        getPhotos('Canada')
    }else{
        getPhotos(inputForm.value);
    }
    
})

inputForm.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        if(inputForm.value === ''){
            getPhotos('Canada')
        }else{
            getPhotos(inputForm.value);
        }
    }

})