import {closeModal, openModal} from './modals';
import {postData} from '../services/services';

export function forms(formSelector) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: './../../img/form/spinner.svg',
        sucess: 'Thank you, we will call you soon',
        failure: 'Oops... something went wrong'
    };

    forms.forEach(item => {
        bindPostData(item);
    });



    // Working with JSON
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Creating a status message for the form 
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading; //spinner
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            

            // Collecting all form data in JavaScript and sending it to the server
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            

            // Sending a fetch request
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.sucess);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    
    }

    function showThanksModal(message) {
        const prevModalWindow = document.querySelector('.modal__window');
    
        prevModalWindow.classList.add('hide'); // Hiding the content
        openModal('.modal'); // Opening the modal window
    
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__window');
    
        // Creating modal content container
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal__content');
    
        // Creating and setting up the close button
        const closeButton = document.createElement('div');
        closeButton.classList.add('modal__close');
        closeButton.setAttribute('data-close', '');
        closeButton.textContent = '×';
    
        // Creating and setting the title
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('modal__title');
        titleDiv.textContent = message;
    
        // Appending all elements
        modalContent.appendChild(closeButton);
        modalContent.appendChild(titleDiv);
        thanksModal.appendChild(modalContent);
    
        document.querySelector('.modal').appendChild(thanksModal); // Pushing the element to the page
    
        setTimeout(() => {
            thanksModal.remove();
            prevModalWindow.classList.remove('hide');
            closeModal('.modal');
        }, 4000); // Removing the thank-you modal after 4 seconds and restoring the previous content
    }
    
}