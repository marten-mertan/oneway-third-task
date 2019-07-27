function lazyLoad(){
    $('.js-lazy').lazy({
        effect: 'fadeIn',
        afterLoad: function (element) {
            console.log('загружено: ' + element[0].src);
        }
    });
}

export default lazyLoad;