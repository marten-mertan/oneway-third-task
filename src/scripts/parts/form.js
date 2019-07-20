function initForm(){
    $('#theForm').submit(function() {
        $('#theForm')[0].style.display = "none";
        $('.form-send')[0].style.display = "block";
        return false;
      });
}

export default initForm;