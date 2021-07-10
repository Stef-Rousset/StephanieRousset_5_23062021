// récuperer les données de commande à afficher
document.querySelector('.first-name').innerText = sessionStorage.getItem('firstName')[0].toUpperCase() + sessionStorage.getItem('firstName').slice(1);
document.querySelector('.last-name').innerText = sessionStorage.getItem('lastName')[0].toUpperCase() + sessionStorage.getItem('lastName').slice(1);
document.querySelector('.order-number').innerText = sessionStorage.getItem('orderId');
document.querySelector('.order-email').innerText = sessionStorage.getItem('email');
document.querySelector('.order-price').innerText = sessionStorage.getItem('price') + "€";
