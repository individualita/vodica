function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);

    //buttons
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);


    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const dots = [];


    let width = window.getComputedStyle(slidesWrapper).width; //578px
    let slideIndex = 1;
    let offset = 0;



    //create indicators/dots
    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-dots');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 60px;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    //place the dots inside the slider block
    slider.append(indicators); 


    //Set data attributes for the dots based on the number of slides
    for (let i = 0; i < slides.length; i++) { 

        const dot = document.createElement('li');

        dot.setAttribute('data-slide-to', i+ 1); // set attribute
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if(i == 0) {
            dot.style.opacity = 1; // first dot is active 
        }
        
        indicators.append(dot);
        dots.push(dot);
    }


    //display total number of slides based on slides length.
    if (slides.length < 10) {  
        total.textContent = `0${slides.length}`;   
    } else {
        total.textContent = slides.length;
    }


    //hide overflow
    slidesWrapper.style.overflow = 'hidden'; 

    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesField.style.width = 100 * slides.length + '%'; 

 
    //set width for every slide element  
    slides.forEach((slide) => {
        slide.style.width = width; //578 px
        slide.classList.add('slide'); 
    });

    function updateSlideClasses() {
        slides.forEach(slide => slide.classList.remove('show'));
        slides[slideIndex - 1].classList.add('show');
    }


    //next click
    next.addEventListener('click', () => {

        if(offset == +width.replace(/\D/g, '')* (slides.length -1)) { 
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, ''); // deliting 'px' and changing a string to a number
        };

        slidesField.style.transform = `translateX(-${offset}px)`; //translate to offset px. 

        //add slideindex
        if(slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }


        //display current slide number 
        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        //set 50% opacity for dots
        dots.forEach((dot) => {
            dot.style.opacity ='.5';
        });
        //set 100% opacity for current dot
        dots[slideIndex -1].style.opacity = '1';

        updateSlideClasses();

    });

    prev.addEventListener('click', () => {

        if(offset == 0) {  
            
            offset = +width.replace(/\D/g, '') * (slides.length -1); 
        } else {
            offset -= +width.replace(/\D/g, ''); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;


        //reduce index. 
        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }


        
        dots.forEach((dot) => {
            dot.style.opacity ='.5';
        });
        
        dots[slideIndex -1].style.opacity = '1';

        updateSlideClasses();

    });


    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {

            const slideTo = e.target.getAttribute('data-slide-to'); //1, 2, 3... 

            slideIndex = slideTo; //index = target

            offset = +width.replace(/\D/g, '') * (slideTo - 1); ////width * 1,2,3 ...

            slidesField.style.transform = `translateX(-${offset}px)`; 

            //changing current number
            if(slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

             
            dots.forEach((dot) => {
                dot.style.opacity ='.5';
            });
            
            dots[slideIndex -1].style.opacity = '1';
            
            updateSlideClasses();

        });
    });

    updateSlideClasses();

}

export default slider;