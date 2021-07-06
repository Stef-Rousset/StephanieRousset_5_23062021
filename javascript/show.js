const getOneTeddy = (id) => {
  // selectionner les elements où afficher les infos du teddy sur show
  const teddyShow = document.querySelector(".teddy-show");
  const teddyShowImg = document.querySelector(".teddy-img");
  const teddyShowTitle = document.querySelector(".teddy-text__title");
  const teddyShowText = document.querySelector(".teddy-text__text");
  const teddyShowPrice = document.querySelector(".teddy-text__price");
  const teddyShowColor = document.getElementById('select-color');

  if (teddyShow){
    // recuperer puis afficher les infos du teddy sur show
      fetch(`http://localhost:3000/api/teddies/${id}`)
        .then(data => data.json())
        .then(teddy => {
            teddyShowImg.setAttribute('src', `${teddy.imageUrl}`);
            teddyShowTitle.innerText = `${teddy.name}`;
            teddyShowText.innerText = `${teddy.description}`;
            teddy.colors.forEach(color => {
              teddyShowColor.insertAdjacentHTML("afterbegin", `<option value=${color}>${color}</option>`);
            });
            teddyShowPrice.innerText = `Prix : ${teddy.price}€`;
        })
  }
}
window.addEventListener('DOMContentLoaded', getOneTeddy(localStorage.getItem('idElement')));


const addToBasketButton = document.querySelector('.add-to-basket');
const teddyId = localStorage.getItem('idElement');
addToBasketButton.addEventListener('click', function(){
  addTeddyToBasket(teddyId);
});






