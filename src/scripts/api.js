window.API = {

    onFormSubmit: function(params, callbackSuccess, callbackFailed){
        console.groupCollapsed('onLogin');
        console.log(params);
        console.groupEnd();

        setTimeout( function() {
            var serverResponseSuccess = true;

            if (serverResponseSuccess) {
                callbackSuccess();
            } else {
                callbackFailed();
            }
        }, 500)
    }

}