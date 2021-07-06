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
    return [];
  }
}

// ajouter un element au panier
// function addTeddyToBasket(teddy, quantity){
//   const basket = newBasket();
//   if(basket[teddy] === null){
//     basket.push(JSON.parse(teddy));
//     teddy.quantity = quantity;
//   } else {
//     teddy.quantity += quantity;
//   }
//   saveBasket(basket);
// }
function addTeddyToBasket(teddy){
  const basket = newBasket();
    basket.push(teddy);
    saveBasket(basket);
}
// sauvegarder le panier
function saveBasket(basket){
  localStorage.setItem('basket', JSON.stringify(basket));
}

// enlever un element du panier
function removeFromBasket(teddy,basket){
  if(basket[teddy] && teddy.quantity > 1){
    teddy.quantity -= 1;
  } else {
    basket.pop(teddy);
  }
  saveBasket(basket);
}
