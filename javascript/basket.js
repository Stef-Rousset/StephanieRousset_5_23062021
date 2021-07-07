// variable pour le prix du panier
const total = [];
const totalPrice = document.querySelector('.total-price');
// fonction pour montrer le panier
const showBasket = (basket) => {
    const basketProducts = document.querySelector('.basket-products');

    basket.forEach(id => {
        fetch(`http://localhost:3000/api/teddies/${id}`)
          .then(data => data.json())
          .then(teddy => {
            total.push(parseInt(`${teddy.price}`, 10));
            basketProducts.insertAdjacentHTML('beforeend',
              `<div class="basket-card" data-id="${teddy._id}">
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
    // calcul du prix du panier
    totalPrice.innerText = total.reduce((a, b) => a + b,0);
    // enlever un article du panier
    const trashes = document.querySelectorAll('.fa-trash-alt');
    trashes.forEach((trash, index) => {
        trash.addEventListener('click', function(event){
            removeFromBasket(index);
            window.location.reload();
        })
    })
    // récupérer l'id des produits du panier
    const basketCards = document.querySelectorAll('.basket-card');
    let productsId = [];
    basketCards.forEach(basketCard => {
        productsId.push(basketCard.dataset.id);
    })
    // soumettre le formulaire
    const form = document.querySelector('#order-form');
    form.addEventListener('submit', function(event){
        fetch("http://localhost:3000/order", {
            method: "POST",
            headers: {  'Accept': 'application/json',
                        'Content-Type': 'application/json'
            },
            body: JSON.stringify({contact: { firstName: document.getElementById('firstName'),
                                             lastName: document.getElementById('lastName'),
                                             address: document.getElementById('address'),
                                             city: document.getElementById('city'),
                                             email: document.getElementById('email')
                                            },
                                  products: productsId
                                })

        })
        .then(data => data.json())
        .then(response => {})

    })
})





