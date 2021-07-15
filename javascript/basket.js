// variable pour le prix du panier
const total = [];
// fonction pour montrer le panier
const showBasket = (basket) => {
    const basketProducts = document.querySelector('.basket-products');
    if (basketProducts) {
        for ( let key in basket) {
            let quantity = `${basket[key]}`;
            fetch(`http://localhost:3000/api/teddies/${key}`)
            .then(data => data.json())
            .then(teddy => {
              total.push(parseInt(`${teddy.price * quantity}`, 10));
              basketProducts.insertAdjacentHTML('beforeend',
                `<div class="basket-card">
                  <img src="${teddy.imageUrl}" />
                  <div class="basket-card-infos">
                    <h2>${teddy.name} (x ${quantity})</h2>
                    <p><span class="teddy-price"> Prix unitaire: ${teddy.price}</span>€</p>
                    <p><i class="far fa-trash-alt" data-id-basket="${teddy._id}"></i></p>
                  </div>
                </div> `)
            })
        }
    }
}
window.addEventListener('DOMContentLoaded', function(){
    showBasket(JSON.parse(localStorage.getItem('basket')));
    numberOfItemsInNavbar();
    // récupérer l'id des produits du panier et enlever un article du panier
    let productsId = [];
    document.addEventListener('click', function(event){
      if (event.target && event.target.dataset.idBasket != null) {
        console.log(event.target);
            productsId.push(event.target.dataset.idBasket);
            removeFromBasket(event.target.dataset.idBasket);
            window.location.reload();
      }
    })
    // valider la donnée
    const firstInput = document.getElementById('firstName');
    const lastInput = document.getElementById('lastName');
    const addressInput = document.getElementById('address');
    const cityInput = document.getElementById('city');
    const errorDiv = document.querySelector('.error');
    let valid = true;
    function checkData(input, message){
        input.addEventListener("input", function () {
            if (input.validity.valid) {
              // réinitialisation
              errorDiv.innerHTML = "";
              valid ===  true;
            } else {
              errorDiv.innerHTML = message;
            }
        })
    }
    if (checkData(firstInput,"Seuls les lettres et tirets sont autorisés dans ce champ, sans espace au début ou à la fin (minimum 3 caractères)") == false ){
        valid === false;
    }
    if (checkData(lastInput,"Seuls les lettres et tirets sont autorisés dans ce champ, sans espace au début ou à la fin (minimum 3 caractères)") == false ){
        valid === false;
    }
    if (checkData(addressInput,"Seuls les chiffres, lettres et tirets sont autorisés dans ce champ, sans espace au début ou à la fin (minimum 3 caractères)") == false ){
        valid === false;
    }
    if (checkData(cityInput,"Seules les lettres sont autorisées dans ce champ, sans espace au début ou à la fin (minimum 3 caractères)") == false ){
        valid === false;
    }
    // soumettre le formulaire
    function handleForm(){
        const form = document.querySelector('#order-form');
        form.addEventListener('submit', function(event){
            if (valid === true) {
                fetch("http://localhost:3000/api/teddies/order", {
                    method: "POST",
                    headers: {  'Accept': 'application/json',
                                'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({contact: { firstName: document.getElementById('firstName').value,
                                                     lastName: document.getElementById('lastName').value,
                                                     address: document.getElementById('address').value,
                                                     city: document.getElementById('city').value,
                                                     email: document.getElementById('email').value,
                                                    },
                                          products:  productsId,
                                        })

                })
                .then(response => response.json())
                .then(data => {
                    // mettre les infos dans le sessionStorage pr les recup dans la page order.html
                    sessionStorage.setItem('firstName', data.contact.firstName);
                    sessionStorage.setItem('lastName', data.contact.lastName);
                    sessionStorage.setItem('orderId', data.orderId);
                    sessionStorage.setItem('email', data.contact.email);
                })
                .catch(function(error){
                  alert(error);
                });
                // stocker le prix total pour le recup sur la page order
                sessionStorage.setItem('price', total.reduce((a, b) => a + b,0));
            }
        })
    }
    handleForm();
})
// calculer le prix du panier
window.addEventListener('load', function(){
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerText = total.reduce((a, b) => a + b,0);
});
