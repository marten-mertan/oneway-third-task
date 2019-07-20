function initForm(){

    $('.js-form').on('submit', e => {
        e.preventDefault();
        
        const $form = $(e.target);

        const params = {
            formData: $form.serializeArray(),
        };
        
        const callbackSuccess = () => {
            console.log('Данные успешно отправлены!')
            $('#theForm')[0].style.display = "none";
            $('.form-send')[0].style.display = "block";
        };

        const callbackError = errors => {
            console.log('Что-то пошло не так!');
        };

        window.API.onFormSubmit(params, callbackSuccess, callbackError);
    })
}

export default initForm;