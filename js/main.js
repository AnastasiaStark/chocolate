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

const findBlockByAlias = (alias) => {
    return $(".review__item").filter((ndx, item) => {
        return $(item).attr("data-linked") === alias;
    });
};
$(".interactive-avatar__link").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const curItem = $this.closest(".review__switch-item");
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAlias(target);
    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("active").siblings().removeClass("active");
});

//Пеключатель свитч//

const openItem = item => {
    const container = item.closest(".team__item");
    const contentBlock = container.find(".text__content");
    const textBlock = contentBlock.find(".team__position");
    const reHeight = textBlock.height();

    container.addClass("active");
    contentBlock.height(reHeight);
}

const closeEveryItem = container => {
    const items = container.find('.text__content');
    const itemContainer = container.find(".team__item");

    itemContainer.removeClass("active");
    items.height(0);
}

$(".team__title").on('click', (e) => {
    const $this = $(e.currentTarget);
    const container = $this.closest('.team');
    const elemContainer = $this.closest(".team__item");

    if (elemContainer.hasClass("active")) {
        closeEveryItem(container);
        //close
    } else {
        closeEveryItem(container);
        openItem($this);
    }
});

//выпадающие отзывы в блоке команды//


const slider = $('.composition__list').bxSlider({
    pager: false,
    controls: false
});

$('.composition-slider__arrow_direction_prev').click(e => {
    e.preventDefault();
    slider.goToNextSlide();
})

$('.composition-slider__arrow_direction_next').click(e => {
    e.preventDefault();
    slider.goToPrevSlide();
})

//карусель в композишион//

const validateFields = (form, fieldsArray) => {

    fieldsArray.forEach((field) => {
        field.removeClass("input-error");
        if (field.val().trim() === "") {
            field.addClass("input-error");
        }
    });

    const errorFields = form.find(".input-error");
    return errorFields.length === 0;
}

$('.form').submit(e => {
    e.preventDefault()

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $("#modal");
    const content = modal.find("modal__content")

    modal.removeClass("error-modal");

    const isValid = validateFields(form, [name, phone, comment, to]);


    if (isValid) {
        $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val()
            },
            success: data => {
                content.text(data.message)
                $.fancybox.open({
                    src: "#modal",
                    type: "inline"
                })
            },
            error: data => {
                const message = data.responseJSON.message;
                content.text(message)
                modal.addClass("error-modal");
                $.fancybox.open({
                    src: "#modal",
                    type: "inline"
                })
            }
        });
    }

    $(".button__close").click(e => {
        e.preventDefault();
        $.fancybox.close();
    })
});

//отправка в форме//

let video;
let durationControl;
let soundControl;
let intervalId;
const MAX_SOUND_VALUE = 10;

$().ready(function () {

    video = document.getElementById("player");
    video.addEventListener('click', playStop);


    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length; i++) {
        playButtons[i].addEventListener('click', playStop);
    }

    let micControl = document.getElementById("mic");
    micControl.addEventListener('click', soundOf)

    durationControl = document.getElementById("durationLevel");
    durationControl.addEventListener('mousedown', stopInterval);
    durationControl.addEventListener('mouseup', setVideoDuration);

    durationControl.min = 0;
    durationControl.value = 0;

    soundControl = document.getElementById("micLevel");
    soundControl.addEventListener('mouseup', changeSoundVolume);

    soundControl.min = 0;
    soundControl.max = MAX_SOUND_VALUE;


    video.addEventListener('ended', function () {
        document.querySelector(".video__player-img").classList.toggle("video__player-img--hidden");
        video.currentTime = 0;
    }, false);

});


function playStop() {

    document.querySelector(".video__player-img").classList.toggle("video__player-img--hidden");
    durationControl.max = video.duration;

    if (video.paused) {

        video.play();
        intervalId = setInterval(updateDuration, 1000 / 66);

    } else {
        stopInterval()
    }
}

function stopInterval() {
    video.pause();
    clearInterval(intervalId);
}

function setVideoDuration() {

    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration, 1000 / 66)

    if (video.paused) {
        video.play();
        document.querySelector(".video__player-img").classList.add("video__player-img--hidden");
    }
}

function updateDuration() {
    durationControl.value = video.currentTime;
    console.log(video.currentTime);
}

function soundOf() {

    if (video.volume === 0) {
        video.volume = soundLevel;
        soundControl.value = soundLevel * MAX_SOUND_VALUE;
    } else {
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }
}

function changeSoundVolume() {
    video.volume = soundControl.value / MAX_SOUND_VALUE;
    console.log(video.volume)
}

//видео You-Tube//

const VerticalAcco3 = () => {
    const links = document.querySelectorAll(".product-menu__link");
    const body = document.querySelector('body');

    const calculateWidth = () => {
        const windowWidth = window.innerWidth;
        const MAX__WIDTH = 550;
        const linksWidth = links [0].offsetWidth;

        const reqWidth = windowWidth - (linksWidth * links.length);
        return reqWidth > MAX__WIDTH ? MAX__WIDTH : reqWidth;
    }


    function closeItem(activeElement) {
        const activeText = activeElement.querySelector(".product-content");
        activeText.style.width = "0px";
        activeElement.classList.remove("active");
    }


    links.forEach(function (elem) {
        elem.addEventListener("click", function (e) {
            e.preventDefault();
            const link = e.target.closest(".product-menu__link")
            const active = document.querySelector(".product-menu__item.active");
            if (active) {
                closeItem(active);
            }

            if (!active || active.querySelector(".product-menu__link") !== link) {
                const current = link.closest(".product-menu__item");
                current.classList.add("active");
                const currentText = current.querySelector(".product-content");
                if (body.offsetWidth > 415) {
                    currentText.style.width = calculateWidth + 'px';
                } else {
                    currentText.style.width = "100%";
                }
            }
        });
    });

    document.addEventListener("click", e => {
        e.preventDefault();
        let activePerson = document.querySelector(".product-menu__item.active");
        const target = e.target;
        console.log(target);
        if (!target.closest(".product-menu") && activePerson) {
            closeItem(activePerson);
        }
        if (target.closest(".close-btn")) {
            closeItem(activePerson)
        }
    });
};

VerticalAcco3();

// const section = $("section");
// const display = $(".wrapper");
//
// const performTransition = sectionEq => {
//     const position = sectionEq * -100;
//
//     display.css ({
//         transform:  `translateY(${position}%)`
//     });
// }
//
// $(window).on("wheel", e => {
//     const deltaY = e.originalEvent.deltaY;
//     if (deltaY > 0) {
//         performTransition(2);
//     }
//     if (deltaY < 0) {
//
//     }
// });


// let myMap;
// const init = () => {
//     myMap = new ymaps.Map("map", {
//         center: [55.76, 37.64],
//         zoom: 15
//     });
//
//
// let coords = [
//         [55.858977, 37.454208],
//         [55.791067, 37.606399],
//         [55.744718, 37.634729]
//     ],
//     myCollection = new ymaps.GeoObjectCollection({}, {
//         draggable: false,
//         iconLayout: 'default#image',
//         iconImageHref: 'img/icon__map.svg',
//         // iconImageHref: './img/sprite.svg#map',
//         iconImageSize: [46, 57],
//         iconImageOffset: [-35, -52]
//     });
//
// for (let i = 0; i < coords.length; i++) {
//     myCollection.add(new ymaps.Placemark(coords[i]));
// }
//
// myMap.geoObjects.add(myCollection);
//
// myMap.behaviors.disable('scrollZoom');
//
// };
// ymaps.ready(init);