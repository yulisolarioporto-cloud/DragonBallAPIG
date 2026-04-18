var resultado = document.getElementById("resultado");
var detalle = document.getElementById("detalle");

document.getElementById("mostrar").onclick = function () {

  var raza = document.getElementById("raza").value;

  fetch("https://dragonball-api.com/api/characters")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {

      var personajes = data.items;

      var tabla = "<table>";
      tabla += "<tr>";
      tabla += "<th>ID</th>";
      tabla += "<th>Nombre</th>";
      tabla += "<th>Ki</th>";
      tabla += "<th>Género</th>";
      tabla += "<th>Imagen</th>";
      tabla += "<th>Detalles</th>";
      tabla += "</tr>";

      for (var i = 0; i < personajes.length; i++) {

        if (personajes[i].race == raza) {

          tabla += "<tr>";
          tabla += "<td>" + personajes[i].id + "</td>";
          tabla += "<td>" + personajes[i].name + "</td>";
          tabla += "<td>" + personajes[i].ki + "</td>";
          tabla += "<td>" + personajes[i].gender + "</td>";

          tabla += "<td>";
          tabla += "<button onclick=\"verImagen('" + personajes[i].image + "')\">🔍</button>";
          tabla += "</td>";

          tabla += "<td>";
          tabla += "<button onclick='verDetalle(" + i + ")'>Ver</button>";
          tabla += "</td>";

          tabla += "</tr>";
        }
      }

      tabla += "</table>";

      resultado.innerHTML = tabla;

      window.lista = personajes;
    });
};


function verImagen(url) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("imgModal").src = url;
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}


function verDetalle(index) {

  var p = window.lista[index];

  var texto = "<h2>" + p.name + "</h2>";
  texto += "<p>Raza: " + p.race + "</p>";
  texto += "<p>Ki: " + p.ki + "</p>";
  texto += "<p>Max Ki: " + p.maxKi + "</p>";
  texto += "<p>Género: " + p.gender + "</p>";
  texto += "<p>Afiliación: " + p.affiliation + "</p>";

  texto += "<img src='" + p.image + "' width='200'>";

  texto += "<h3>Transformaciones</h3>";

  if (p.transformations && p.transformations.length > 0) {

    texto += "<ul>";

    for (var j = 0; j < p.transformations.length; j++) {
      texto += "<li>" + p.transformations[j].name + "</li>";
    }

    texto += "</ul>";

  } else {
    texto += "<p>No tiene transformaciones</p>";
  }

  detalle.innerHTML = texto;
}