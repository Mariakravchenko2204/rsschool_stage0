const obj = JSON.parse(pets)
let cardArray = [];
let page = 1;

const cards_container = document.querySelector('.cards_container');
const nextButton = document.querySelector('#next');
const current = document.querySelector('#current');
const firstButton = document.querySelector('#first');
const last = document.querySelector('#last');
const prevButton = document.querySelector('#previous')


const width = document.body.clientWidth;
let cardNumber = 0;

if (width > 1280) {
    cardNumber = 8;
} else if (width < 1280 && width > 768) {
    cardNumber = 6;
} else {
    cardNumber = 3;
}


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

const generateCardArray = () => {
    let index = Math.floor(Math.random() * 8);
    let indexInArray = index;

    for (let i = 0; i < 6; i++) {
        let eightCardsArray = []
        for (let i = 0; i < 8; i++) {

            if (indexInArray > 7) {
                indexInArray = 0
            }

            const card = createCard(indexInArray);
            eightCardsArray.push(card)
            indexInArray++

        }
        cardArray = [...cardArray, ...eightCardsArray]

        if (index > 6) {
            index = 0;
        } else {
            index++;
        }

        indexInArray = index;


    }
}

const makeNextAndLastActive = () => {
    nextButton.classList.remove('inactive')
    nextButton.classList.add('active');
    last.classList.remove('inactive')
    last.classList.add('active');
}

const makeNextAndLastDisabled = () => {
    nextButton.classList.remove('active');
    nextButton.classList.add('inactive');
    last.classList.remove('active');
    last.classList.add('inactive');
}

const makeFirstAndPreviousActive = () => {
    firstButton.classList.remove('inactive')
    firstButton.classList.add('active');
    prevButton.classList.remove('inactive')
    prevButton.classList.add('active');
}

const makeFirstAndPreviousDisabled = () => {
    firstButton.classList.remove('active');
    firstButton.classList.add('inactive');
    prevButton.classList.remove('active');
    prevButton.classList.add('inactive');
}


const renderPageCards = () => {

    cards_container.innerHTML = '';
    const firstCard = cardNumber * page - cardNumber;
    const lastCard = firstCard + cardNumber;

    for (let i = firstCard; i < lastCard; i++) {

        cards_container.appendChild(cardArray[i])

    }
}


generateCardArray();


let totalPages = cardArray.length / cardNumber;
renderPageCards(page)

window.addEventListener('resize', (event) => {
    const width = document.body.clientWidth;

    if (width > 1280) {

        if (cardNumber === 6) {
            cardNumber = 8;
            totalPages = cardArray.length / cardNumber;

            if (page > totalPages || page === totalPages) {
                page = totalPages;
                current.innerHTML = page;
                makeNextAndLastDisabled()

            }
            renderPageCards()
        }
    } else if (width < 1080 && width > 768) {

        if (cardNumber === 3) {
            cardNumber = 6;
            totalPages = cardArray.length / cardNumber;
            if (page > totalPages || page === totalPages) {
                page = totalPages;
                current.innerHTML = page;
                makeNextAndLastDisabled()
            }

        }

        renderPageCards()
    }
    else if (cardNumber === 8) {
        cardNumber = 6;
        totalPages = cardArray.length / cardNumber;

        if (page < totalPages) {
            makeNextAndLastActive()
        }

        renderPageCards()


    } else if (width < 760) {
        cardNumber = 3;
        totalPages = cardArray.length / cardNumber;
        if (page < totalPages) {
            makeNextAndLastActive()

        }
        renderPageCards()
    }


})

nextButton.addEventListener('click', () => {
    page++;
    current.innerHTML = page;

    makeFirstAndPreviousActive()

    renderPageCards()

    if (page === totalPages) {
        makeNextAndLastDisabled()
    }
})


last.addEventListener('click', () => {
    page = totalPages;
    current.innerHTML = page;
    renderPageCards()
    makeNextAndLastDisabled();
    makeFirstAndPreviousActive()
})

firstButton.addEventListener('click', () => {
    page = 1;
    current.innerHTML = page;
    renderPageCards()
    makeNextAndLastActive();
    makeFirstAndPreviousDisabled()
})

prevButton.addEventListener('click', () => {
    page--;
    current.innerHTML = page;
    renderPageCards()

    if (page === 1) {
        makeNextAndLastActive();
        makeFirstAndPreviousDisabled()
    }

})
//popup

const popup = document.querySelector('.pop_up_our_friends');
let modal_close;

const createPopUpCard = (index) => {
    popup.innerHTML = '';
    const card = document.createElement("div");
    card.classList.add('popUpCard');

    const pet = obj[index];

    card.innerHTML = `<div class="pop_up_card">
               <img class="pop_up_img" src="${pet.img}" alt="Jennifer">
               <div class="pop_up_content">
                <h3 class="pop_up_pet_name">${pet.name}</h3>
                <h4 class="pop_up_pet_type">${pet.type} - ${pet.breed}</h4>
                <h5 class="pop_up_description">${pet.description}</h5>
                <ul class="characteristics">
                    <li class="item"><h5 class="list-item"><b class="bold">Age:</b>${pet.age}</h5></li>
                    <li class="item"><h5 class="list-item"><b class="bold">Inoculations:</b> ${pet.inoculations.join(', ')}</h5></li>
                    <li class="item"><h5 class="list-item"><b class="bold">Diseases:</b> ${pet.diseases.join(', ')}</h5></li>
                    <li class="item"><h5 class="list-item"><b class="bold">Parasites:</b> ${pet.parasites.join(', ')}</h5></li>
                </ul>
               </div>
              <img class="modal_close" src="../../assets/images/Vector.png" alt="modal_button">
            </div>
            `;
    popup.append(card);



}

const cardContainer = document.querySelectorAll('.card')


Array.prototype.forEach.call(cardContainer, (item) => {


    item.addEventListener('click', (event) => {

        const key = item.getAttribute('key');
        createPopUpCard(key);
        popup.classList.add('hidden_pop_up')
        body.classList.add('scroll_disable')

    })
})

window.addEventListener('resize', () => {


    Array.prototype.forEach.call(cardContainer, (item) => {

        item.addEventListener('click', (event) => {

            const key = item.getAttribute('key');
            createPopUpCard(key);
            popup.classList.add('hidden_pop_up')
            body.classList.add('scroll_disable')

        })
    })

})

popup.addEventListener('click', (event) => {


    if (!(event.target.classList.contains('pop_up_pet_name')
        || event.target.classList.contains('pop_up_pet_type')
        || event.target.classList.contains('pop_up_description')
        || event.target.classList.contains('list-item')
        || event.target.classList.contains('characteristics')
        || event.target.classList.contains('bold')
        || event.target.classList.contains('pop_up_img')
        || event.target.classList.contains('pop_up_card')
        || event.target.classList.contains('pop_up_content')
        || event.target.classList.contains('item')
    )) {

        popup.classList.toggle('hidden_pop_up');

        body.classList.remove('scroll_disable')
    }
})