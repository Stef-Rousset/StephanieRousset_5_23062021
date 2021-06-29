// selectionner l'element où afficher les teddies sur index
const teddiesContainer = document.querySelector(".teddies-container");

// recuperer puis afficher les teddies sur index
const getAllTeddies = () => {
  fetch("http://localhost:3000/api/teddies")
    .then(data => data.json())
    .then(teddiesList => {
      teddiesList.forEach(teddy => {
        teddiesContainer.insertAdjacentHTML("afterbegin", `
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${teddy.imageUrl}" class="img-fluid rounded-start" alt="ours">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${teddy.name}</h5>
                <p class="card-text">${teddy.description}</p>
                <p class="card-text"><small class="text-muted">Prix : ${teddy.price}€</small></p>
              </div>
            </div>
          </div>
        </div>  `)
      })
    })
}
getAllTeddies();
