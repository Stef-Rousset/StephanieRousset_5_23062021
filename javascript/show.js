
//recuperer l'id du teddy cliqué via les params de l'url
// let params = (new URL(document.location)).searchParams;
// let teddyId = params.get('id');

const getOneTeddy = (id) => {
  // selectionner l'element où afficher le teddy sur show
  const teddyContainer = document.querySelector(".teddy-container");
  if (teddyContainer){
    // recuperer puis afficher le teddy sur show
      fetch(`http://localhost:3000/api/teddies/${id}`)
        .then(data => data.json())
        .then(teddy => {
            teddyContainer.insertAdjacentHTML("afterbegin", `
            <div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${teddy.imageUrl}" class="img-fluid rounded-start" alt="ours">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${teddy.name}</h5>
                    <p class="card-text">${teddy.description}</p>
                    <label for="select-color"> Choisissez une couleur</label>
                    <select name="color" id="select-color">
                      <option value="${teddy.colors[0]}">${teddy.colors[0]}</option>
                      <option value="${teddy.colors[1]}">${teddy.colors[1]}</option>
                      <option value="${teddy.colors[2]}">${teddy.colors[2]}</option>
                      <option value="${teddy.colors[3]}">${teddy.colors[3]}</option>
                    </select>
                    <p class="card-text">Prix : ${teddy.price}€</p>
                  </div>
                </div>
              </div>
            </div> `)
        })
  }
}
getOneTeddy(localStorage.getItem('idElement'));
