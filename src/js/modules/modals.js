function closeModal(modalSelector) {
    const overlay = document.querySelector(modalSelector);
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector) {
    const overlay = document.querySelector(modalSelector);
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function modal(triggerSelector, modalSelector) {
    // Modal window logic
    const modalTriggers = document.querySelectorAll(triggerSelector);
    const overlay = document.querySelector(modalSelector);

    // Open modal when button is clicked
    modalTriggers.forEach(function(btn) {
        btn.addEventListener('click', () => {
            openModal(modalSelector);
        });
    });

    // Close modal on click outside of the modal content or on the close button
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay || e.target.hasAttribute('data-close')) {
            closeModal(modalSelector);
        }
    }); 

    // Close modal when the Escape key is pressed
    document.addEventListener('keydown', function(e){
        if (e.code === "Escape" && overlay.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
}


// Function to fill and display the modal window with form data
function fillAndShowModal(modalSelector) {
    // Retrieve values from input fields on the main form
    const userName = document.querySelector('.callback__input-name').value;
    const userPhone = document.querySelector('.callback__input-number').value;
    const modal = document.querySelector(modalSelector);

    // Check if modal elements exist before assigning values
    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    // Set retrieved values in the modal's input fields
    modal.querySelector('#name').value = userName;
    modal.querySelector('#phone').value = userPhone;

    openModal(modalSelector);
}


// Function to initialize the event handler for the trigger button of the modal
function initModalTrigger(triggerSelector, modalSelector) {
    const button = document.querySelector(triggerSelector);
    if (!button) {
        console.error("Trigger button not found");
        return;
    }

    // Add click event listener to the button to show the modal
    button.addEventListener('click', () => {
        fillAndShowModal(modalSelector);
    });
}

// Exporting modal functionalities
export { modal, openModal, closeModal, initModalTrigger };


