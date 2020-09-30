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
    slider.goToPrevSlide();
})

$('.composition-slider__arrow_direction_next').click(e => {
    e.preventDefault();
    slider.goToNextSlide();
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