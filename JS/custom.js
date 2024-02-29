$(document).ready(function () {
    setTimeout(function() {
        $('.pantalla-carga').fadeOut();
      }, 2000);
    menu("Ingreso");

    // Cargar el contenido HTML de un archivo externo
    modulo("Principal");
    
});

function modulo(modulo) {
    $('#contenido').load('./Modulos/' + modulo + '.html', function () {
        if (modulo == "Menu") {
            var carrusel = document.getElementsByClassName("slider_section");
            $(carrusel).addClass("d-none");
        } else if (modulo == "Principal") {
            var carrusel = document.getElementsByClassName("slider_section");
            $(carrusel).removeClass("d-none");
        }
    });
}

// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

function menu(modulo) {
    $('#usuarioMenu').load('./Modulos/' + modulo + '.html', function () {
    });
}

function ingreso() {
    $.ajax({
        url: 'archivo_destino.php',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            clave1: 'valor1',
            clave2: 'valor2'
        }),
        success: function (response) {
            console.log('Respuesta del servidor:', response);
        },
        error: function (xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

function selectPaymentMethod(method) {
    var paymentForm = document.getElementById("paymentForm");

    if (method === 'paypal') {
        paymentForm.innerHTML = `
        <br>   
        <p>Por favor, inicie sesión en su cuenta de PayPal para completar el pago.</p>
        <form id="paypalForm">
          <div class="form-group">
            <label for="paypalUsername">Nombre de usuario:</label>
            <input type="text" class="form-control" id="paypalUsername" placeholder="Ingrese su nombre de usuario de PayPal">
          </div>
          <br>
          <div class="form-group">
            <label for="paypalPassword">Contraseña:</label>
            <input type="password" class="form-control" id="paypalPassword" placeholder="Ingrese su contraseña de PayPal">
          </div>
        </form>`;
    } else if (method === 'credit_card') {
        paymentForm.innerHTML = `
        <br>   
        <p>Por favor, ingrese los detalles de su tarjeta de crédito para completar el pago.</p>
        <form id="creditCardForm">
          <div class="form-group">
            <label for="cardNumber">Número de Tarjeta:</label>
            <input type="text" class="form-control" id="cardNumber" placeholder="Ingrese el número de su tarjeta de crédito">
          </div>
          <br>
          <div class="form-group">
            <label for="expiryDate">Fecha de Expiración:</label>
            <input type="text" class="form-control" id="expiryDate" placeholder="MM/YY">
          </div>
          <br>
          <div class="form-group">
            <label for="cvv">CVV:</label>
            <input type="text" class="form-control" id="cvv" placeholder="Ingrese el CVV">
          </div>
        </form>`;
    }
}