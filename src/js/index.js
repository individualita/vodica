import {services} from "./services/services";
import { scrollToSectionConfig , sliderConfig, toggleMenuConfig, timerConfig} from "./modules/config";


import {scrollToSection, scrollToOrderSection} from "./modules/scrollToSection";
import toggleMenu from "./modules/toggleMenu";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import calc from "./modules/calculator";
import timer from "./modules/timer";
import { modal, openModal, closeModal,  initModalTrigger } from "./modules/modals";
import { forms } from "./modules/forms";
//import { cards } from "./modules/cards";



document.addEventListener("DOMContentLoaded", () => {
    //cards();
    scrollToSection(scrollToSectionConfig);
    toggleMenu(toggleMenuConfig);
    tabs();
    slider(sliderConfig);
    calc();
    timer(timerConfig);
    modal('[data-modal]', '.modal');
    forms('.modal__form');
    initModalTrigger('.callback__button','.modal');
    scrollToOrderSection('[data-scroll]', '#order');

});

