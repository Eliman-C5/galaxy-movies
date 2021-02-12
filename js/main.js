const $body = document.querySelector("body");
const $btnToggle = $body.querySelector(".toggle-btn");
const $galaxyTitle = document.querySelector(".galaxy");
const $popular = document.querySelector(".popular");

// Variables del sidebar
const $sidebar = $body.querySelector(".sidebar"),
$options = $sidebar.querySelector(".options"),
$home = document.getElementById("home"),
$content = $options.querySelector(".content"),
$userContent = $content.querySelector(".username"),
$username = document.getElementById("profile"),
$date = document.querySelector(".date"),
$icons = $content.querySelectorAll(".icons"),
$search = document.getElementById("search");

// Variables de la ventana modal
const $logIn = document.querySelector(".usuario"),
$modal = document.querySelector(".modal"),
$userRegister = $modal.querySelector(".log-in"),
$close = document.querySelector(".close");

// Variable del Dark-mode
const $btnDarkMode = document.getElementById("checkbox");

// Variables del Slider
const $slider = document.getElementById("slider");
const $pictures = document.querySelector(".pictures");

//Variable del Navbar
const $navbar = document.querySelector(".navbar ul");

// Variable de las imágenes
const $retratos = $body.querySelector(".retratos");

// Variable de rutas a peliculas IMDB
const top250IMDB = ["0111161","0068646", "0468569", "0071562", "0050083", "0167260", "0110912", "0108052", "1375666", "0137523", "0120737", "0109830", "0060196", "0167261", "0133093", "0099685", "0080684", "0073486", "6751668", "0816692", "0317248", "0245429", "0120815", "0120689", "0118799", "0114369", "0102926", "0076759", "0056058", "0047478", "0038650", "8503618", "7286456", "2582802", "1675434", "0482571", "0407887", "0253474", "0172495", "0120586", "0114814", "0110413", "0110357", "0103064", "0095765", "0095327", "0088763", "0064116", "0054215", "0034583", "0027977", "0021749", "8267604", "5311514", "5074352", "4633694", "4154796", "4154756", "2380307", "1853728", "1345836", "1187043", "0986264", "0910970", "0405094", "0364569", "0209144", "0119698", "0087843", "0082971", "0081505", "0078788", "0078748", "0066763", "0057565", "0057012", "0051201", "0050825", "0047396", "0043014", "0032553", "8579674", "8108198", "2106476", "1832382", "1255953", "0476735", "0361748", "0338013", "0211915", "0208092", "0180093", "0169547", "0119217", "0118849", "0114709", "0112573", "0105236", "0093058", "0091251", "0090605", "0086879", "0086250", "0086190", "0082096", "0070735", "0066921", "0062622", "0059578", "0056172", "0053604", "0053125", "0052357", "0045152", "0044741", "0040522", "0036775", "0033467", "0022100", "0017136", "0012349", "6966692", "5027774", "4729430", "4430212", "2991224", "1954470", "1305806", "1291584", "1330884", "1049413", "0993846", "0469494", "0457430", "0435761", "0434409", "0405508", "0372784", "0363163", "0347149", "0268978", "0120735", "0119488", "0116231", "0113277", "0112641", "0105695", "0097576", "0097223", "0096283", "0095016", "0089881", "0081398", "0079944", "0077711", "0075314", "0071853", "0057115", "0056592", "0055630", "0055031", "0053291", "0050986", "0050976", "0046912", "0046438", "0042876", "0042192", "0040897", "0035446", "0015864", "0015324", "8613070", "5323662", "4857264", "4016934", "3315342", "3170832", "3011894", "2948372", "2278388", "2267998", "2119532", "2096673", "2024544", "1979320", "1950186", "1895587", "1392214", "1392190", "1205489", "1201607", "1028532", "0978762", "0892769", "0758758", "0477348", "0405159", "0395169", "0381681", "0353969", "0266697", "0266543", "0264464", "0245712", "0198781", "0169858", "0167404", "0120382", "0118715", "0118694", "0117951", "0116282", "0113247", "0112471", "0107290", "0107207", "0097165", "0092005", "0091763", "0087884", "0087544", "0084787", "0083658", "0080678", "0079470", "0077416", "0075148", "0074958", "0072684", "0071315", "0061512", "0060827", "0060107", "0058946", "0053198", "0052618", "0050212", "0048021", "0047296", "0046268", "0041959", "0032976", "0031679", "0031381", "0025316", "0019254", "0017925", "1454029", "0093779"];

////////////////////////////// Funciones ///////////////////////////////

// Cambia el nombre del usuario en el sidebar al hacer log in.
function changeUsername() {
  if ($logIn.textContent !== "Log in") {
    $username.textContent = $logIn.textContent;
  } else {
    $username.textContent = "Username";
  }
}

//Alterar Popular
function changePopular() {
  if ($popular.classList.contains("special")) {
    $popular.textContent = "Popular on GalaxyMovies";
    $popular.classList.add("normal");
    $popular.classList.remove("special");

    $retratos.innerHTML = "";

    getPictures();
  }
}

//Traemos la información y las fotos para los retratos
function getPictures() {

    if ($popular.classList.contains("normal")) {

      // Inicializa o actualiza dos data atributos en el elemento HTML para llevar el control de las películas que se suben y poder subir diferentes películas a medida que se haga scroll
      let startHTML = Number(document.documentElement.getAttribute("data-start"));
      let endHTML = Number(document.documentElement.getAttribute("data-end"));

      if (!document.documentElement.hasAttribute("data-start")) {
        document.documentElement.setAttribute("data-start", 0);
        document.documentElement.setAttribute("data-end", 6);
      } else {
        startHTML = Number(startHTML) + 6;
        endHTML = Number(endHTML) + 6;
        document.documentElement.setAttribute("data-start", startHTML);
        document.documentElement.setAttribute("data-end", endHTML);
      }

      let start = startHTML || 0;
      let end = endHTML || 6;

      //Recorre la constante en la que tenemos los índices de las películas. Al llevar la cuenta en los data atributos del HTML podemos saber que peliculas debemos cargar.
      for (let i = start; i < end; i++) {

        fetch(`http://www.omdbapi.com/?i=tt${top250IMDB[i]}&apikey=7a179cad`)
        .then(response => response.ok? response.json() : Promise.reject())
        .then(json => {
          $retratos.innerHTML += 
          `<div class="retrato">
            <img class="img" src="${json.Poster}" alt=" There´s no picture avaible / ${json.imdbID}" />
            <p class="retrato-informacion">
              <span class="pelicula-titulo">${json.Title}</span>
            ${json.Plot}
            </p>
          </div>`
        })
        .catch(error => {

          let message = error.statusText || "Lo sentimos! ocurrió un error. Revisa tu conexión a internet";

          $retratos.innerHTML += 
            `<div class="retrato">
              <img src="media/error-no-es-fracaso.jpg" alt="pelicula del top de las 250 mejores de IMDB" />
              <p class="retrato-informacion">
                <span class="pelicula-titulo">${error.status}</span>
                ${message}
              </p>
            </div>`
          });
        }
    }

  
}

//Traemos las fotos del slider
function getSlider() {

  for (let i = 0; i < 8; i++) {

  let randomMovie = Math.round(Math.random() * top250IMDB.length);
    
  fetch(`http://www.omdbapi.com/?i=tt${top250IMDB[randomMovie]}&apikey=7a179cad`)
  .then(response => response.ok ? response.json() : Promise.reject())
  .then(json => {

    $pictures.innerHTML += `
          <div class="picture">
            <img src="${json.Poster}" alt="There´s no picture avaible">
          </div>`
  })
  .catch(error => {
    $pictures.innerHTML += `
          <div class="picture">
            <img src="media/error-no-es-fracasar.jpg" alt="${error.status}">
          </div>`;
  });
    
  }

}

/////////////////////// Al cargar el documento //////////////////////

// Verifica si en el local storage existe una preferencia del usuario por el modo oscuro y también verifica si el usuario está regitrado
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme")) {
    document.documentElement.setAttribute("data-theme", "dark");
    $btnDarkMode.checked = true;
  }
  $logIn.textContent = JSON.parse(localStorage.getItem("data")) || "Log in";
  
  getSlider();
  changeUsername();
  getPictures();
});

///////////////////////////// Al hacer scroll /////////////////////////

window.addEventListener("scroll", () => {

  if ($popular.classList.contains("normal")) {
    const {scrollTop, clientHeight, scrollHeight} = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
     getPictures();
    }
  }

})

//////////////////////////// Encabezado ///////////////////////////////

const shadow = (e) => {
  const {offsetWidth: width, offsetHeight: height} = $galaxyTitle;
  let {offsetX: x, offsetY: y} = e;
  const value = 25;

  x = x + e.target.offsetLeft;
  y = y + e.target.offsetTop;

  const xAxis = Math.round((x / width * value) - (value / 2));
  const yAxis = Math.round((y / height * value) - (value / 2));

  $galaxyTitle.style.textShadow = `
  ${xAxis}px ${yAxis}px 4px #717585`;
};

$galaxyTitle.addEventListener("mousemove", shadow);

$galaxyTitle.addEventListener("click", changePopular);

////////////////////////////// Navbar /////////////////////////////////

$navbar.addEventListener("animationend", e => {

  if (e.animationName === "navbarLeft") {
    $navbar.style.animationName = "navbarRight";
  }

  if (e.animationName === "navbarRight") {
    $navbar.style.animationName = "navbarLeft";
  }
});

////////////////////////////// Slider /////////////////////////////////

$pictures.addEventListener("animationend", e => {
  if (e.animationName === "pictures") {
    $pictures.style.animationName = "back";
  }

  if (e.animationName === "back") {
    $pictures.style.animationName = "pictures";
  }
});

//////////////////////////// Sidebar /////////////////////////////////


// Traer el sidebar desde donde está.
function showSidebar() {
  $date.innerHTML = `<h3 class="current-date">${new Date().toDateString()}</h3>`;

  $body.classList.add("body-active");
  $sidebar.classList.add("sidebar-active");
  $content.style.transform = "translateX(0%)";
  $userContent.style.justifyContent = "center";
  $icons.forEach(icon => {
    icon.style.justifyContent = "space-around";
  });
}

// Llevar de regreso al home y ocultar el sidebar.
function showHome(e) {
  e.preventDefault();
  $body.classList.remove("body-active");
  $sidebar.classList.remove("sidebar-active");
  $content.style.transform = "translateX(-60%)";
  $userContent.style.justifyContent = "flex-end";
  $icons.forEach(icon => {
    icon.style.justifyContent = "flex-end";
  });

  const currentDate = document.querySelector(".current-date");
  $date.removeChild(currentDate);
}

$btnToggle.addEventListener("click", showSidebar);
$home.addEventListener("click", showHome);
$username.addEventListener("click", e => {
  e.preventDefault();
});

// Busca información de películas
$search.addEventListener("keypress", e => {

  if (e.key === "Enter") {

    let target = e.target.value.toLowerCase();

    $popular.textContent = `Este es el resultado de tu búsqueda: "${target}"`;
    $popular.classList.remove("normal");
    $popular.classList.add("special");

    if (document.documentElement.hasAttribute("data-start")) {
      document.documentElement.removeAttribute("data-start");
      document.documentElement.removeAttribute("data-end");
    }

    showHome(e);

    fetch(`http://www.omdbapi.com/?s=${target}&apikey=7a179cad`)
    .then(response => response.ok? response.json() : Promise.reject())
    .then(json => {

      if (json.Response === "False") {
        $retratos.innerHTML = `<p class="change-color">Error. ${json.Error}</p>`;
      }

      if (json.Response === "True") {
        console.log(json);

        $retratos.innerHTML = "";

        json.Search.forEach(movie => {
          $retratos.innerHTML += `<div class="retrato">
            <img class="img" src="${movie.Poster}" alt=" There´s no picture avaible / ${movie.imdbID}"/>
            <p class="retrato-informacion">
            <span class="pelicula-titulo">${movie.Title} (${movie.Year})</span>
            </p>
          </div>`
        });

      }

    })
    .catch(error => {
      let message = error.statusText || "Ocurrió un error";
      $retratos.innerHTML = `<p class="change-color">Error ${error.status}: ${message}</p>`;
    });

    $search.value = "";
  }
})

//////////////////////// Modal y LocalStorage ///////////////////////

const userAdd = `
<form class="user-add">
  <input type="text" name="register" id="register" placeholder="Username">
  <input type="password" name="password" id="password" placeholder="Password">
  <button class="add" data-button="add">Add</button>
</form>`;

const userRemoveOrNot = `
<div class="user-remove">
  <p>You already have an account with us. Do you want to update or remove it?</p>
  <button class="update" data-button="update">Update</button>
  <button class="remove" data-button="remove">Remove</button>
</div>
`;

// Muestra el modal y su respectiva opción (Añadir o Remover)
function showModal() {
  $body.classList.add("body-active");
  $modal.style.display = "flex";

  if ($logIn.textContext !== "Log in") {

    if ($userRegister.querySelector(".user-add")) {
      const add = $userRegister.querySelector(".user-add");
      $userRegister.removeChild(add);
    }

    if ($userRegister.querySelector(".user-remove")) {
      return ;
    }

    $userRegister.insertAdjacentHTML("beforeend", userRemoveOrNot);
  } 
  
  if ($logIn.textContent === "Log in") {

    if ($userRegister.querySelector(".user-remove")) {
      const remove = $userRegister.querySelector(".user-remove");
      $userRegister.removeChild(remove);
    }

    if ($userRegister.querySelector(".user-add")) {
      return ;
    }

    $userRegister.insertAdjacentHTML("beforeend", userAdd);
  }
}

$logIn.addEventListener("click", showModal);

$userRegister.addEventListener("click", e => {

  if (e.target.dataset.button === "add" && document.getElementById("register").value !== "") {
      const data = document.getElementById("register").value;
      localStorage.setItem("data", JSON.stringify(data));
      $logIn.textContent = data;
      $modal.style.display = "none";
  }

  if (e.target.dataset.button === "add" && document.getElementById("register").value === "") {
    alert("Debes introducir tu nombre de usuario");
  }

  if (e.target.dataset.button === "update") {
    const remove = $userRegister.querySelector(".user-remove");
    $userRegister.removeChild(remove);
    $userRegister.insertAdjacentHTML("beforeend", userAdd);
  }

  if (e.target.dataset.button === "remove") {
    localStorage.removeItem("data");
    $logIn.textContent = "Log in";
    const remove = $userRegister.querySelector(".user-remove");
    $userRegister.removeChild(remove);
    $userRegister.insertAdjacentHTML("beforeend", userAdd);
  }

  changeUsername();
  
  e.preventDefault();
});

$close.addEventListener("click", () => {
  $body.classList.remove("body-active");
  $modal.style.display = "none";
})

////////////////////////// Dark Mode ///////////////////////////////

// Función que cambia tema de color del documento HTML (Agrega el modo claro o el modo oscuro).
const switchTheme = (e) => {

  if (e.target.checked) {
    setTimeout(() => {
      document.documentElement.setAttribute("data-theme", "dark");
    }, 200);
    localStorage.setItem("theme", "dark");
  } else {
    setTimeout(() => {
      document.documentElement.removeAttribute("data-theme");
    }, 200);
    localStorage.removeItem("theme");
  }
}

$btnDarkMode.addEventListener("change", switchTheme);