
const getAllTeddies = () => {
  // selectionner l'element où afficher les teddies sur index
  const teddiesContainer = document.querySelector(".teddies-container");
  if (teddiesContainer){
    // recuperer puis afficher les teddies sur index
    fetch("http://localhost:3000/api/teddies")
      .then(data => data.json())
      .then(teddiesList => {
        teddiesList.forEach(teddy => {
          teddiesContainer.insertAdjacentHTML("afterbegin", `
          <a href="pages/show.html">
          <div class="card mb-3 teddy-card" data-id=${teddy._id} style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${teddy.imageUrl}" class="img-fluid rounded-start" alt="ours">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${teddy.name}</h5>
                  <p class="card-text">${teddy.description}</p>
                  <p class="card-text"><small class="text-muted">Couleurs disponibles : ${teddy.colors.join(', ')}</small></p>
                  <p class="card-text">Prix : ${teddy.price}€</p>
                </div>
              </div>
            </div>
          </div>
          </a>  `)
        })
        const teddiesCards = document.querySelectorAll('.teddy-card');
        teddiesCards.forEach(teddyCard => {
            teddyCard.addEventListener('click', event => {
                let teddyId = event.currentTarget.dataset.id;
                getId(teddyId);
            })
        })
      })
  }
}
getAllTeddies();





