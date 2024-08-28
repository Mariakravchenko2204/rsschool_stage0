
// const petsObj = JSON.parse(pets)
// const popup = document.querySelector('.pop_up_our_friends');
// const card = document.querySelectorAll('.card');

// const createPopUpCard = (index) => {
//     const card = document.createElement("div");
//     card.classList.add('popUpCard');

//     const pet = petsObj[index];

//     card.innerHTML = `<div class="pop_up_card">
//                <img class="pop_up_img" src="${pet.img}" alt="Jennifer">
//                <div class="pop_up_content">
//                 <h3 class="pop_up_pet_name">${pet.name}</h3>
//                 <h4 class="pop_up_pet_type">${pet.type} - ${pet.breed}</h4>
//                 <h5 class="pop_up_description">${pet.description}</h5>
//                 <ul class="characteristics">
//                     <li><h5 class="list-item"><b>Age: </b>${pet.age}</h5></li>
//                     <li><h5 class="list-item"><b>Inoculations:</b> ${pet.inoculations.join(',')}</h5></li>
//                     <li><h5 class="list-item"><b>Diseases:</b> ${pet.diseases.join(',')}</h5></li>
//                     <li><h5 class="list-item"><b>Parasites:</b> ${pet.parasites.join(',')}</h5></li>
//                 </ul>
//                </div>
//               <img class="modal_close" src="../../assets/images/Vector.png" alt="modal_button">
//             </div>
//             `;


            
//     console.log(card)
//             popup.append(card)

   
    
// }





// // popup.classList.toggle('hidden_pop_up')
// console.log(card)
// Array.prototype.forEach.call(card, (item) => {
//     item.addEventListener('click', () => {
//         const key = item.getAttribute('key');
//         console.log(key)
//         createPopUpCard(key);
//         popup.classList.toggle('hidden_pop_up')
//     })
// })