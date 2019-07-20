import initPopups from './parts/popups';
import initSliders from './parts/sliders';
import initForm from './parts/form';

$(document).ready(() => {
    initSliders();
    initPopups();
    initForm();
});