const img__container = document.querySelector('.image__container');

async function getPhotos (param) {
    fetch(`https://api.unsplash.com/search/photos?query=${param}&per_page=18&orientation=landscape&client_id=dbXTMWsnem3eDUnb3j7Kva8_XcWwF7NCZYWt06_6bKk`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        data.results.map(e => {
            console.log(e.urls.small)
            const element = createImgElement(e.urls.small);
            img__container.appendChild(element);
        })
    })  
}

function createImgElement (link) {
    const img__element = document.createElement('img');
  
    img__element.classList.add('img__element');
   
    img__element.style.background = `url(${link})`;
    console.log(img__element);
    return img__element;
}


getPhotos('spring')