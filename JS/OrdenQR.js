
// Obtener la URL actual
var url = new URL(window.location.href);

// Obtener los parámetros de la URL
var params = new URLSearchParams(url.search);

// Obtener el valor de la variable "variable"
var variableValor = params.get('mesa');

console.log(variableValor); // Esto imprimirá "ejemplo" en la consola

Promise.all([obtenerProductos()])
    .then(valores => {
        productos = valores[0];
        cargarProductos(productos);
        $('.pantalla-carga').fadeOut();

        $('.filters_menu li').click(function () {
            $('.filters_menu li').removeClass('active');
            $(this).addClass('active');

            var data = $(this).attr('data-filter');
            $grid.isotope({
                filter: data
            })
        });

        var $grid = $(".grid").isotope({
            itemSelector: ".all",
            percentPosition: false,
            masonry: {
                columnWidth: ".all"
            }
        })
    })
    .catch(error => {
        console.error("Ocurrió un error:", error);
    });
    
async function obtenerProductos() {
    try {
        
        const response = await $.ajax({
            url: './PHP/Menu.php',
            type: 'GET',
            contentType: 'application/json'
        });

        return response;
        
    } catch (error) {

        console.error('Error en la solicitud:', error);
        throw error;
    }
}
function cargarProductos(noesmenu) {
    
    try {
        var menu = document.getElementById("menuDiv");
        var div = document.createElement("div");
        div.classList.add("row", "p-b-1");
        
    for (let i = 0; i < noesmenu.length; i++) {
            var divFiltro = document.createElement("div");
            divFiltro.classList.add(noesmenu[i].Tipo, "col-6", "all", "mb-1");

            var divCard = document.createElement("div");
            divCard.classList.add("p-1", "card", "bg-dark", "rounded");
            divCard.style.minHeight = "50vh";
            divCard.style.maxWidth = "30vh";

            var img = document.createElement("img");
            img.classList.add("rounded-bottom", "bg-white", "mh-100", "img-fluid");
            img.src = "Imagenes/" + noesmenu[i].Nombre + ".png";
            img.style.height = "30vh";
            img.style.widths = "30vh";
            divCard.appendChild(img);

            var divCardBody = document.createElement("div");
            divCardBody.classList.add("card-body", "position-relative");

            var hNombre = document.createElement("h5");
            hNombre.classList.add("card-title", "text-white");
            hNombre.textContent = noesmenu[i].Nombre;
            divCardBody.appendChild(hNombre);

            var hPrecio = document.createElement("h6");
            hPrecio.classList.add("card-subtitle", "text-white");
            hPrecio.textContent = "$" + noesmenu[i].Precio;
            divCardBody.appendChild(hPrecio);

            var btnCart = document.createElement("buttom");
            btnCart.classList.add("btn", "btn-warning", "position-absolute", "bottom-0", "end-0");
            btnCart.id = noesmenu[i].ProductoId;
            btnCart.setAttribute("data-bs-toggle", "modal");
            btnCart.setAttribute("data-bs-target", "#moproducto");
            btnCart.onclick = function () {
                idToModal(this);

            };

            var iCart = document.createElement("i");
            iCart.classList.add("bi", "bi-cart-fill");
            btnCart.appendChild(iCart);

            divCardBody.appendChild(btnCart);

            divCard.appendChild(divCardBody);

            divFiltro.appendChild(divCard);
            div.appendChild(divFiltro);
        }
        menu.appendChild(div);

    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
}