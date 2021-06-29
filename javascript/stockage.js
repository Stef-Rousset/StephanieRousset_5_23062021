function getId(id){
  var idElement = localStorage.getItem("idElement");
  if (idElement != null){
    localStorage.idElement = id;
  } else {
    localStorage.setItem("idElement", id);
  }
}
