console.log("Layout of main page 1280px: 14\n");
console.log("Layout of main page 768px: 14\n");
console.log("Layout of main page 320px: 14\n");
console.log("Layout of pets page 1280px: 14\n");
console.log("Layout of pets page 768px: 14\n");
console.log("Layout of pets page 320px: 14\n");
console.log("No horizontal scroll: 20\n");
console.log("Responsive layout: 8\n");
console.log("Burger menu is visible for screen width less than 768px: 4\n");
console.log("Html is valid: 8\n")

const navigation = document.querySelector('.navigation_menu');
const pop_up = document.querySelector('.pop_up')
let pop_up_visible = false;

const burger = document.querySelector('.burger');
const nav_item = document.querySelectorAll('.nav-item');
const screen_element = document.querySelector('body');

const toogleMenu = () => {
    navigation.classList.toggle('show');
    burger.classList.toggle('burger_menu');
    pop_up.classList.toggle('hidden_pop_up')

    for (item of nav_item){
        item.classList.toggle('nav-item-menu')
    }
}


screen_element.addEventListener('click', (event) => {

    console.log(event)
        
    if (pop_up_visible){
        if(!event.target.classList.contains('navigation_menu')){
            toogleMenu();
            pop_up_visible = false;
        }
    }else{
        if(event.target.classList.contains('burger__line') || event.target.classList.contains('burger')){
            toogleMenu();
           
            pop_up_visible = true;
        }
    }
})



