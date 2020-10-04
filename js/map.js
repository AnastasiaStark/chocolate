let myMap;
const init = () => {
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 15
    });


    let coords = [
            [55.858977, 37.454208],
            [55.791067, 37.606399],
            [55.744718, 37.634729]
        ],
        myCollection = new ymaps.GeoObjectCollection({}, {
            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: 'https://cdn1.savepice.ru/uploads/2020/10/4/7f0c66b36eceba566d8edf21f8b58d8a-full.png',
            // iconImageHref: './img/sprite.svg#map',
            iconImageSize: [46, 57],
            iconImageOffset: [-35, -52]
        });

    for (let i = 0; i < coords.length; i++) {
        myCollection.add(new ymaps.Placemark(coords[i]));
    }

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');

};
ymaps.ready(init);