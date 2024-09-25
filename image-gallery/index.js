const img__container = document.querySelector('.image__container');
const inputForm = document.querySelector(".form-control");
const searchButton = document.querySelector(".search__button");
const deleteButton = document.querySelector(".remove__text");
const nextButton = document.querySelector(".next");
const current = document.querySelector(".current");
const prevButton = document.querySelector(".prev");
let page = 1;
let query = 'Canada';
let maxPages = 5;



async function getPhotos() {
    fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=18&orientation=landscape&client_id=dbXTMWsnem3eDUnb3j7Kva8_XcWwF7NCZYWt06_6bKk`)
        .then((res) => res.json())
        .then((data) => {
            totalPages = data.total_pages;
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
        query = inputForm.value;
        page = 1;
        current.innerHTML = page;
        getPhotos();
    }
    
})

inputForm.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        if(inputForm.value === ''){
            getPhotos('Canada')
        }else{
            query = inputForm.value;
            page = 1;
            current.innerHTML = page;
            getPhotos();
        }
    }

});

deleteButton.addEventListener('click', (event) => {
    console.log(inputForm.value);
    inputForm.value = '';
})

nextButton.addEventListener('click', () => {
    page++;
    current.innerHTML = page;
    getPhotos();
    prevButton.classList.remove('inactive');
    if(page === maxPages){
        nextButton.classList.add('inactive')
    }
})

prevButton.addEventListener('click', () => {
    page--;
    current.innerHTML = page;
    getPhotos();
    nextButton.classList.remove('inactive')
    if(page === 1){
        prevButton.classList.add('inactive');
    }
})