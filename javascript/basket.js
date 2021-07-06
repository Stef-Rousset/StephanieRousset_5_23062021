const total = [];
const totalPrice = document.querySelector('.total-price');

const showBasket = (basket) => {
  const basketProducts = document.querySelector('.basket-products');

  basket.forEach(id => {
      fetch(`http://localhost:3000/api/teddies/${id}`)
        .then(data => data.json())
        .then(teddy => {
          total.push(parseInt(`${teddy.price}`, 10));
          basketProducts.insertAdjacentHTML('beforeend',
            `<div class="basket-card">
              <img src="${teddy.imageUrl}" />
              <div class="basket-card-infos">
                <h2>${teddy.name}</h2>
                <p><span class="teddy-price">${teddy.price}</span>€</p>
                <p><i class="far fa-trash-alt"></i></p>
              </div>
            </div> `)
  })
})
}
window.addEventListener('DOMContentLoaded', showBasket(JSON.parse(localStorage.getItem('basket'))));

window.addEventListener('load', function(event){
    totalPrice.innerText = total.reduce((a, b) => a + b,0);
    const trashes = document.querySelectorAll('.fa-trash-alt');
    trashes.forEach((trash, index) => {
        trash.addEventListener('click', function(event){
            removeFromBasket(index);
        })
    })
})




