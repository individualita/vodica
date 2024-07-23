function calc() {

    const result = document.querySelector('.calculator__result-value');

    let sex, weight, height, ratio;



    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.2;
        localStorage.setItem('ratio', 1.2);
    }


    //"Function to check localStorage upon site refresh."
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element) => {
            element.classList.remove(activeClass);
            
            //If the ID matches the localStorage item 'gender', add the active class to the element.
            if (element.getAttribute('id') === localStorage.getItem('sex')) {
                element.classList.add(activeClass);
            }

            if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeClass);
            }
        })
    }

    //functions init
    initLocalSettings('#gender button', 'active');
    initLocalSettings('#activity button', 'active');


    
    function calcTotal() {
        //The total amount should only be calculated when all data is filled in.
        if (!sex ||!weight ||!height || !ratio) { 
            result.textContent = '_____';
            return;
        }

        let waterIntake;


        if (sex === 'female') {
            waterIntake = (weight * 35) + (height * 1); // Base water intake for women
        } else { // For men
            waterIntake = (weight * 40) + (height * 1); // Base water intake for men
        }
    
        waterIntake *= ratio; // Adjust for activity level
        
        result.textContent = Math.round(waterIntake) + ' ml'; // Display the result in ml
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {

        const elements = document.querySelectorAll(`${parentSelector}  button`); //find all buttons inside parent selector 
        
        elements.forEach((element) => {
            element.addEventListener('click', (e) => {

                if (e.target.getAttribute('data-ratio')) { 
                    ratio = +e.target.getAttribute('data-ratio'); 
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex',e.target.getAttribute('id'));
                }
        
            
                //remove active classes
                elements.forEach((elem) => {
                    elem.classList.remove(activeClass);
                });
                //add active class. 
                e.target.classList.add(activeClass);
        
                calcTotal();
            });
        });

    }


    getStaticInformation('#gender', 'active'); 
    getStaticInformation('#activity', 'active'); 


    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g))  { // of not a number
                input.style.border = '1px solid red';
            } else {
                input.style.border = '1px solid var(--main-color)';
            }

            switch(input.getAttribute('id')) {
                case 'height': 
                    height = +input.value;
                    break;
                case 'weight': 
                    weight = +input.value;
                    break;
            }
            //call the function every time data changes
            calcTotal(); 

        });

        
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
//
}

export default calc;