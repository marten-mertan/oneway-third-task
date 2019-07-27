function initSliderMain(){
    $('.js-slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        prevArrow: '<img class="arrows prev-arrow" src="assets/img/arr-left.svg" alt="arrow-left"></img>',
        nextArrow: '<img class="arrows next-arrow" src="assets/img/arr-right.svg" alt="arrow-right"></img>',
        asNavFor: '.js-slider-nav'
    });
    $('.js-slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.js-slider-for',
        centerMode: true,
        focusOnSelect: true,
        arrows: false,
        vertical: true,
        verticalSwiping: true
    });
}

function initSliderPopular(){
    $('.js-slider-popular').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        centerMode: true,
        variableWidth: true,
        arrows: true,
        prevArrow: '<img class="arrows prev-arrow" src="assets/img/arr-left.svg" alt="arrow-left"></img>',
        nextArrow: '<img class="arrows next-arrow" src="assets/img/arr-right.svg" alt="arrow-right"></img>',
      });
}

export default function initSliders() {
    initSliderMain();
    initSliderPopular();
}