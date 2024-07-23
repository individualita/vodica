
function toggleMenu ({btnOpenSelector, menuSelector, closeBtnSelector, activeBtnOpenClass, activeMenuClass}) {
    const navBtn = document.querySelector(btnOpenSelector);
    const navMenu = document.querySelector(menuSelector);
    const closeBtn = document.querySelector(closeBtnSelector);

    if (!navBtn || !navMenu || !closeBtn) {
        console.error("Button or menu element not found");
        return;
    }


    function openMenu() {
        if (!navBtn.classList.contains(activeBtnOpenClass)) {
            navBtn.classList.add(activeBtnOpenClass);
            navMenu.classList.add(activeMenuClass);
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMenu() {
        navBtn.classList.remove(activeBtnOpenClass);
        navMenu.classList.remove(activeMenuClass);
        document.body.style.overflow = '';
    }
    
    function handleDocumentClick(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnNavBtn = navBtn.contains(event.target);
        
        if(!isClickInsideMenu && !isClickOnNavBtn) {
            closeMenu();
        }
    }

    //listeners
    navBtn.addEventListener('click', () => {
        if (navMenu.classList.contains(activeMenuClass)) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    //close btn
    closeBtn.addEventListener('click', closeMenu);

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}

export default toggleMenu