
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
   return  $(".review__item") .filter((ndx, item) => {
        return $(item) .attr("data-linked") === alias;
    });
};
        $(".interactive-avatar__link").click(e => {
            e.preventDefault();

            const $this = $(e.currentTarget);
            const curItem = $this.closest(".review__switch-item");
            const target = $this.attr("data-open");
            const itemToShow = findBlockByAlias(target);
            itemToShow.addClass("active").siblings().removeClass("active");
            curItem.addClass("active") .siblings().removeClass("active");
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
        const itemContainer =container.find(".team__item");

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


