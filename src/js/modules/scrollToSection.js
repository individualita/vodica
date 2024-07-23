function scrollToSection({linksSelector, openMenuBtn, menuSelector, activeBtnClass, activeMenuClass}) {

    const links = document.querySelectorAll(linksSelector);
    const menu = document.querySelector(menuSelector);
    const menuBtn = document.querySelector(openMenuBtn);

    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            let id = e.target.getAttribute('href');
            if (!id.startsWith('#')) {
                id = '#' + id;
            };

        
            const section = document.querySelector(id).offsetTop;
            window.scrollTo({top: section, behavior: 'smooth'});

            menuBtn.classList.remove(activeBtnClass);
            menu.classList.remove(activeMenuClass)
            document.body.style.overflow = '';
        
        });
    });

}

function scrollToOrderSection(triggerSelector, orderSection) {
    const button = document.querySelector(triggerSelector);
    const section = document.querySelector(orderSection).offsetTop;

    button.addEventListener('click', () => {
        window.scrollTo({top: section, behavior: 'smooth'});
    })
};




export {scrollToSection, scrollToOrderSection} ;