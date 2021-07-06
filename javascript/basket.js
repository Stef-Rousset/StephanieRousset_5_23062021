const showBasket = (basket) => {
  const basketDiv = document.querySelector('.basket');
  basket.forEach(id => {
      fetch(`http://localhost:3000/api/teddies/${id}`)
        .then(data => data.json())
        .then(teddy => {
          basketDiv.insertAdjacentHTML('afterbegin',
            `<div class="basket-card">
              <img src="${teddy.imageUrl}" />
              <div class="basket-card-infos">
                <h2>${teddy.name}</h2>
                <p>${teddy.price}</p>
                <p><i class="far fa-trash-alt"></i></p>
              </div>
            </div> `)
  })
})
}
window.addEventListener('DOMContentLoaded', showBasket(JSON.parse(localStorage.getItem('basket'))));
