// variable pour le calcul du prix du panier
const total = [];
// fonction pour montrer le panier
const showBasket = (basket) => {
    //recuperer l'endroit ou afficher les teddies du panier
    const basketProducts = document.querySelector('.basket-products');
    // iterer sur les elements du panier pour les afficher
    for ( let key in basket) {
        //recuperer la quantité du teddy
        let quantity = `${basket[key]}`;
        // requete au serveur pour recuperer les infos de chq teddy du panier
        fetch(`http://localhost:3000/api/teddies/${key}`)
        .then(response => response.json())
        .then(teddy => {
            // ajouter le prix dans l'array total
            total.push(parseInt(`${teddy.price * quantity}`, 10));
            // afficher le teddy du panier
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
window.addEventListener('DOMContentLoaded', function(){
    showBasket(JSON.parse(localStorage.getItem('basket')));
    numberOfItemsInNavbar();
})
//calculer le prix du panier
function priceCalculator(){
  //recuperer l'element ou inserer le prix
  const totalPrice = document.querySelector('.total-price');
  //inserer le prix calculé
  totalPrice.textContent = total.reduce((a, b) => a + b,0);
}
setTimeout(priceCalculator, 100);
// enlever un article du panier
document.addEventListener('click', function(event){
  if (event.target && event.target.dataset.idBasket != null) {
      removeFromBasket(event.target.dataset.idBasket);
      window.location.reload();
  }
})
function validateData(){
  const first = document.getElementById('firstName');
  const last = document.getElementById('lastName');
  const address = document.getElementById('address');
  const city = document.getElementById('city');
  const email = document.getElementById('email');
  if (!first.validity.valid){
    // afficher un message d'explication si la donnée est invalide
    alert("Prénom: 3 caractères minimum, lettres et tirets autorisés, sans accent, sans espace au début ou à la fin");
    //mettre le focus sur le champ
    first.focus();
    return false;
  }
  if (!last.validity.valid){
    alert("Nom: 3 caractères minimum, lettres et tirets autorisés, sans accent, sans espace au début ou à la fin");
    last.focus();
    return false;
  }
  if (!address.validity.valid){
    alert("Adresse: 3 caractères minimum, chiffres, lettres et tirets autorisés, sans accent, sans accent, sans espace au début ou à la fin");
    address.focus();
    return false;
  }
  if (!city.validity.valid){
    alert("Ville: 3 caractères minimum, lettres et tirets autorisés, sans accent, sans espace au début ou à la fin");
    city.focus();
    return false;
  }
  if (!email.validity.valid){
    alert("Email: chiffres, lettres, tirets et underscores autorisés, avec @ et . ");
    email.focus();
    return false;
  }
  return true;
}
// soumettre le formulaire
function submitForm(){
    //recuperer les ids des teddies
    let basket = JSON.parse(localStorage.getItem('basket'));
    let productsId = Object.keys(basket);
    //envoi de la requete au serveur si la donnee du form est valide
    if (validateData()){
        fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: {  'Accept': 'application/json',
                        'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                      { contact: { firstName: document.getElementById('firstName').value,
                                   lastName: document.getElementById('lastName').value,
                                   address: document.getElementById('address').value,
                                   city: document.getElementById('city').value,
                                   email: document.getElementById('email').value,
                                  },
                        products:  productsId,
                      }
                  )
        })
        .then(response => response.json())
        .then(data => {
            // mettre les infos dans le sessionStorage pr les recuperer dans la page order.html
            sessionStorage.setItem('firstName', data.contact.firstName);
            sessionStorage.setItem('lastName', data.contact.lastName);
            sessionStorage.setItem('orderId', data.orderId);
            sessionStorage.setItem('email', data.contact.email);
        })
        .catch(function(error){
          alert(error);
        });
        // stocker le prix total pour le recuperer sur la page order
        sessionStorage.setItem('price', total.reduce((a, b) => a + b,0));
        //rediriger vers la page de confirmation de la commande avec un delai
        // pour ne pas interrompre le fetch (pour firefox)
        setTimeout(function(){
          window.location.href = "order.html";
        }, 100);
    }
}

