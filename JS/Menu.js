$('.pantalla-carga').fadeIn();

Promise.all([cargarProductos()])
                .then(valores => {
                    var menu = document.getElementById("menuDiv");
                    var divMenu = valores[0];
                    menu.appendChild(divMenu);
                    $('.pantalla-carga').fadeOut();
                })
                .catch(error => {
                    console.error("Ocurrió un error:", error);
                });


async function cargarProductos() {
    try {
        const response = await $.ajax({
            url: './PHP/Menu.php',
            type: 'GET',
            contentType: 'application/json'
        });

        // Crear el div
        var div = document.createElement("div");
        div.classList.add("row", "grid", "p-b-1");

        // Llenar el div con contenido basado en la respuesta
        for (let i = 0; i < response.length; i++) {
            var divFiltro = document.createElement("div");
            divFiltro.classList.add(response[i].Tipo, "col-sm-6", "col-lg-4", "all");

            var divCard = document.createElement("div");
            divCard.classList.add("p-1", "card", "bg-dark", "rounded");

            var img = document.createElement("img");
            img.classList.add("rounded-bottom", "bg-white", "mh-100");
            img.src = "Imagenes/" + response[i].Nombre + ".png";
            divCard.appendChild(img);

            var divCardBody = document.createElement("div");
            divCardBody.classList.add("card-body", "position-relative");

            var hNombre = document.createElement("h5");
            hNombre.className = "card-title";
            hNombre.textContent = response[i].Nombre;
            divCardBody.appendChild(hNombre);

            var pDescripcion = document.createElement("p");
            pDescripcion.className = "card-text";
            pDescripcion.textContent = response[i].Descripcion;
            divCardBody.appendChild(pDescripcion);

            var hPrecio = document.createElement("h6");
            hPrecio.className = "card-subtitle";
            hPrecio.textContent = "$"+ response[i].Precio;
            divCardBody.appendChild(hPrecio);

            var btnCart = document.createElement("buttom");
            btnCart.classList.add("btn", "btn-warning", "position-absolute", "bottom-0", "end-0");

            var iCart = document.createElement("i");
            iCart.classList.add("bi", "bi-cart-fill");
            btnCart.appendChild(iCart);

            divCardBody.appendChild(btnCart);

            divCard.appendChild(divCardBody);

            divFiltro.appendChild(divCard);
            div.appendChild(divFiltro);
        }
        return div;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
}