const getOneTeddy = (id) => {
    // selectionner les elements où afficher les infos du teddy sur show
    const teddyShow = document.querySelector(".teddy-show");
    const teddyShowImg = document.querySelector(".teddy-img");
    const teddyShowTitle = document.querySelector(".teddy-text__title");
    const teddyShowText = document.querySelector(".teddy-text__text");
    const teddyShowPrice = document.querySelector(".teddy-text__price");
    const teddyShowColor = document.getElementById('select-color');
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
const handleAddToBasketButton = () => {
    const addToBasketButton = document.querySelector('.add-to-basket');
    const teddyQuantity = document.querySelector('#select-quantity');
    const teddyId = localStorage.getItem('idElement');
    // au clic, ajouter l'element au panier
    addToBasketButton.addEventListener('click', function(){
        addTeddyToBasket(teddyId, parseInt(teddyQuantity.value, 10));
    });
}

window.addEventListener('DOMContentLoaded', function(){
    getOneTeddy(localStorage.getItem('idElement'));
    numberOfItemsInNavbar();
    handleAddToBasketButton();
});






