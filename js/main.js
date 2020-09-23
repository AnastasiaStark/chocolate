
    var list = document.querySelector('#menu_dropdown'),
    close = document.querySelector('#adaptive__menu-close'),
    adaptive = document.querySelector('#adaptive-menu');
    list.addEventListener('click', function () {
    adaptive.style.display = 'flex';
});
    close.addEventListener('click', function () {
    adaptive.style.display = 'none';
});

//Выпадающий список//