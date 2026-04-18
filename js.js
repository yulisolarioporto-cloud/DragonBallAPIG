var resultado = document.getElementById("resultado");
var detalle = document.getElementById("detalle");

window.onload = function () {

  fetch("https://dragonball-api.com/api/characters?limit=100")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      document.getElementById("chars").innerHTML = "Characters: " + data.meta.totalItems;
    });

  fetch("https://dragonball-api.com/api/transformations?limit=100")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      document.getElementById("trans").innerHTML = "Transformations: " + data.meta.totalItems;
    });

  fetch("https://dragonball-api.com/api/planets?limit=100")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      document.getElementById("planets").innerHTML = "Planets: " + data.meta.totalItems;
    });

};


document.getElementById("mostrar").onclick = function () {

  var raza = document.getElementById("raza").value;

  fetch("https://dragonball-api.com/api/characters?limit=100")
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

function mostrarTransformacion(index) {

  var p = window.lista[index];

  var combo = document.getElementById("comboTrans");
  var pos = combo.value;

  var t = p.transformations[pos];

  var info = "<h4>" + t.name + "</h4>";
  info += "<p>Ki: " + t.ki + "</p>";

  if (t.image) {
    info += "<img src='" + t.image + "' width='150'>";
  }

  document.getElementById("infoTrans").innerHTML = info;
}


function verDetalle(index) {

  var p = window.lista[index];

  var texto = "<h2>" + p.name + "</h2>";
  texto += "<p>Raza: " + p.race + "</p>";
  texto += "<img src='" + p.image + "' width='200'>";

  texto += "<h3>Transformaciones</h3>";

  if (p.transformations && p.transformations.length > 0) {

    texto += "<select id='comboTrans'>";

    for (var i = 0; i < p.transformations.length; i++) {
      texto += "<option value='" + i + "'>" + p.transformations[i].name + "</option>";
    }

    texto += "</select>";

    texto += "<button onclick='mostrarTransformacion(" + index + ")'>VER</button>";

    texto += "<div id='infoTrans'></div>";

  } else {
    texto += "<p>No tiene transformaciones</p>";
  }

  detalle.innerHTML = texto;
}