$(document).ready(function(){
    menu("Ingreso");

    // Cargar el contenido HTML de un archivo externo
    $('#contenido').load('./Modulos/Principal.html', function() {
        console.log("cargo la funcion")
            $('.filters_menu li').click(function () {
            console.log("Le dio click")
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
    });
});

// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

function menu(modulo) {
    var usuarioMenu = document.getElementById("usuarioMenu");
    getMenu(modulo, function(elemento) {
        if (elemento) {
            usuarioMenu.innerHTML = elemento;
        } else {
            console.error('No se pudo cargar el elemento.');
        }
    });
}

function getMenu(modulo, callback) {
    console.log(modulo);
    var url = './Modulos/' + modulo + '.html';
    $.ajax({
        url: url,
        dataType: 'html',
        success: function(data) {
            callback(data);
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar el archivo modulo.html:', error);
        }
    });
}