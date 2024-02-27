cargarProductos();
function cargarProductos() {
    $.ajax({
        url: '../PHP/Menu.php',
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            console.log('Respuesta del servidor:', response);
        },
        error: function (xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}