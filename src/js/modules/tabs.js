function tabs() {
    const tabs = document.querySelectorAll('.selection__control');
    const tabsContent = document.querySelectorAll('.selection__content');
    const tabsParent = document.querySelector('.selection__controls');

    tabsParent.addEventListener('click', (event) => {

        if (event.target.classList.contains('selection__control')) {

            //remove tabs active classes
            tabs.forEach((tab) => {
                tab.classList.remove('active');
            });

            //hide all content
            tabsContent.forEach((content) => {
                content.classList.remove('active');
                content.style.display = 'none'; // Скрываем все контенты
            });

            const tabId = event.target.getAttribute('data-tab'); //#mineral, #carbonated, #drinking
            const targetContent = document.querySelector(tabId);

            event.target.classList.add('active'); //add active class for tab element 
            targetContent.style.display = 'block'; // show content before adding the class

            // A slight delay for the transition to activate
            setTimeout(() => {
                targetContent.classList.add('active');
            }, 10); 
            
        }
    });
}

export default tabs