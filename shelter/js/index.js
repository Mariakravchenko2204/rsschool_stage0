//burger menu
const navigation = document.querySelector('.navigation_menu');
const pop_up = document.querySelector('.pop_up')
let pop_up_visible = false;
const body = document.querySelector('body');

const burger = document.querySelector('.burger');
const nav_item = document.querySelectorAll('.nav-item');
const screen_element = document.querySelector('body');

const toogleMenu = () => {
    navigation.classList.toggle('show');
    burger.classList.toggle('burger_menu');
    pop_up.classList.toggle('hidden_pop_up');
    body.classList.toggle('scroll_disable')


    for (item of nav_item) {
        item.classList.toggle('nav-item-menu')
    }
}


screen_element.addEventListener('click', (event) => {



    if (pop_up_visible) {
        if (!event.target.classList.contains('navigation_menu')) {
            toogleMenu();
            pop_up_visible = false;
        }
    } else {
        if (event.target.classList.contains('burger__line') || event.target.classList.contains('burger')) {
            toogleMenu();

            pop_up_visible = true;
        }
    }
})

//slider


// initial load 
const obj = JSON.parse(pets)
const slider = document.querySelector('.slider');
const btnRight = document.querySelector('.arrow-right');
const btnLeft = document.querySelector('.arrow-left')

let activeCards = [];
let sideCards = [];
let prevCards = [];
let lastClick = '';
let initialCardCreation = true;

let activeIndexArray = [];
let sideIndexArray = [];
let prevIndexArray = [];

const width = document.body.clientWidth;
console.log(width)
let cardNumber = 0;

if (width > 1280) {
    cardNumber = 3;
} else if (width < 1280 && width > 760) {
    cardNumber = 2;
} else {
    cardNumber = 1;
}

//methods
const createCard = (index) => {
   
    const card = document.createElement("div");
    card.classList.add('card');
    card.setAttribute('key', index)

    const img = document.createElement('img');
    const pet = obj[index];
    img.src = pet.img;
    img.alt = pet.name;

    const name = document.createElement('p');
    name.classList.add('pet_name');
    name.innerHTML = pet.name;

    const button = document.createElement('button');
    button.classList.add('button_secondary');
    button.innerHTML = 'Learn more';
    button.onclick = function () { console.log(`${pet.name} button is clicked`) }

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(button);
    return card;

}


const generateActiveArray = () => {

    while (activeIndexArray.length < cardNumber) {
        let index = Math.floor(Math.random() * 8);
        if (activeIndexArray.indexOf(index) === -1) activeIndexArray.push(index)
    }

    console.log("Index array", activeIndexArray);

    activeIndexArray.map(e => {
        const card = createCard(e);
        activeCards.push(card);
        slider.appendChild(card)
    })
}

const generateSideArray = () => {

    sideCards = []
    sideIndexArray = []
    for (let i = 0; i < cardNumber; i++) {
        let card = '';
        while (true) {
            let index = Math.floor(Math.random() * 8);
            if (activeIndexArray.indexOf(index) === -1 && sideIndexArray.indexOf(index) === -1) {
                sideIndexArray.push(index)
                card = createCard(index);
                break;
            }
        }
        sideCards.push(card);

    }

}

const addOneCardToActiveArray = () => {


    let card = '';
    while (true) {
        let index = Math.floor(Math.random() * 8);
        if (activeIndexArray.indexOf(index) === -1) {
            activeIndexArray.push(index)
            card = createCard(index);
            break;
        }
    }
    activeCards.push(card);
    return card;
}

const addOneCardToSideArray = () => {

    let card = '';
    while (true) {
        let index = Math.floor(Math.random() * 8);
        if (activeIndexArray.indexOf(index) === -1 && sideIndexArray.indexOf(index) === -1) {
            sideIndexArray.push(index)
            card = createCard(index);
            break;
        }
    }
    sideCards.push(card);
}

const switchActiveAndPrevArrays = () => {

    const copyOfActiveIndexArray = activeIndexArray;
    const copyOfActiveCards = activeCards;

    activeCards = prevCards;
    activeIndexArray = prevIndexArray;

    prevIndexArray = copyOfActiveIndexArray;
    prevCards = copyOfActiveCards;

    
}

const copyActiveToPrevArray = () => {

    prevCards = activeCards;
    prevIndexArray = activeIndexArray;


}
const copySideToActiveArray = () => {
    activeCards = sideCards;
    activeIndexArray = sideIndexArray

}

//change the number of cards if resize

window.addEventListener('resize', (event) => {
    const width = document.body.clientWidth;

    if (width > 1280) {

        if (cardNumber === 2) {
            let card = addOneCardToActiveArray();
            addOneCardToSideArray();
            slider.appendChild(card);
            cardNumber = 3;
    
        }

    } else if (width < 1080 && width > 760) {

        if (cardNumber === 3) {
            activeIndexArray.pop();
            console.log("slider last child", slider.lastElementChild)
            activeCards.pop();
            slider.removeChild(slider.lastElementChild)
            sideIndexArray.pop();
            sideCards.pop()
            cardNumber = 2;

        } else if (cardNumber === 1) {
            let card = addOneCardToActiveArray();
            addOneCardToSideArray();
            slider.appendChild(card);
            cardNumber = 2; 

        }
        
    } else if (width < 760) {
        if (cardNumber === 2) {
            activeIndexArray.pop();
        
            activeCards.pop();
            slider.removeChild(slider.lastElementChild)

            sideIndexArray.pop();
            sideCards.pop()

            cardNumber = 1;
        }

    }

})


//cards setup
generateActiveArray();
generateSideArray();


btnLeft.addEventListener('click', () => {

    if (lastClick === 'right') {

        for (let i = cardNumber - 1; i>= 0; i--){
            slider.appendChild(prevCards[i])     
        }

        switchActiveAndPrevArrays();

    } else {
        sideCards.map(e => slider.appendChild(e))
        copyActiveToPrevArray()
        copySideToActiveArray()
    }
    slider.classList.add('transition-left')
})

btnRight.addEventListener('click', () => {
    if (lastClick === 'left') {

        for (let i = cardNumber - 1; i>= 0; i--){
            slider.insertBefore(prevCards[i], slider.firstElementChild)
        }
    
        switchActiveAndPrevArrays();
    }else{
        sideCards.map(card => {
            slider.insertBefore(card, slider.firstElementChild);
        })
        copyActiveToPrevArray();
        copySideToActiveArray();

    }
  
    slider.classList.add('transition-right')

})

slider.addEventListener('animationend', (event) => {

    if (event.animationName === 'move-left') {
        slider.classList.remove('transition-left')

        for (let i = 0; i < cardNumber; i++) {
            let child = slider.firstElementChild;
            slider.removeChild(child)
        }
        lastClick = 'left';  
    }

    if (event.animationName === 'move-right') {
        slider.classList.remove('transition-right')    

        for (let i = 0; i < cardNumber; i++) {
            let child = slider.lastElementChild;
            slider.removeChild(child)
        }

        lastClick = 'right';
      
    }

    generateSideArray();
})

