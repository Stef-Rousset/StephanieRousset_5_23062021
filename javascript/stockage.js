// recuperer l'id de la carte cliquée
function getId(id){
  var idElement = localStorage.getItem("idElement");
  if (idElement != null){
    localStorage.idElement = id;
  } else {
    localStorage.setItem("idElement", id);
  }
}

// créer un nouveau panier
function newBasket(){
  const basket = localStorage.getItem('basket');
  if (basket != null){
    return JSON.parse(basket);
  } else {
    return {};
  }
}

// ajouter un element au panier
function addTeddyToBasket(id, quantity){
  const basket = newBasket();
  if (basket[id] === undefined){
      basket[id] = quantity;
  } else {
      basket[id] += quantity;
  }
  saveBasket(basket);
}

// sauvegarder le panier
function saveBasket(basket){
  localStorage.setItem('basket', JSON.stringify(basket));
}

// enlever un element du panier
function removeFromBasket(id){
  let basket = JSON.parse(localStorage.getItem('basket')); //recup basket et le transfo en objet js
  delete basket[id];
  saveBasket(basket);
}

//afficher le nb d'items du panier ds la navbar
function numberOfItemsInNavbar(){
  let basketItemsNumber = document.querySelector('.basket-items__number');
  let basket = JSON.parse(localStorage.getItem('basket'));
  if (!basket){
    basketItemsNumber.innerHTML = 0;
  } else if (basket != null){
      basketItemsNumber.innerHTML = Object.keys(basket).length;
  }

}

