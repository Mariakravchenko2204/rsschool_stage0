//burger menu
const navigation = document.querySelector('.navigation_menu');
const pop_up = document.querySelector('.pop_up')
let pop_up_visible = false;
const body = document.querySelector('body');
const html = document.documentElement;

const burger = document.querySelector('.burger');
const nav_item = document.querySelectorAll('.nav-item');
const screen_element = document.querySelector('body');

const toogleMenu = () => {
    navigation.classList.toggle('show');
    burger.classList.toggle('burger_menu');
    pop_up.classList.toggle('hidden_pop_up');
    body.classList.toggle('scroll_disable')
    html.classList.toggle('scroll_disable')


    for (item of nav_item) {
        item.classList.toggle('nav-item-menu')
    }
}


screen_element.addEventListener('click', (event) => {



    if (pop_up_visible) {
        console.log(event)
        if (!(event.target.classList.contains('navigation_menu') ||
             event.target.classList.contains('nav-list')) ) {
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