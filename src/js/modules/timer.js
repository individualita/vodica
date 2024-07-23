function timer({id, deadline}) {
    
        function getTimeRemaining (endtime) { 
    
            const t = Date.parse(endtime) - Date.parse(new Date()); //Deadline minus current time equals result in milliseconds
    
            //conver the difference into days, hours, minutes, seconds. 
            const days = Math.floor(t / (1000 * 60 * 60 * 24));
            
            const hours = Math.floor((t / (1000 * 60 * 60) % 24)); 
    
            
            const minutes = Math.floor((t / 1000 / 60)% 60); 
            const seconds = Math.floor((t / 1000) % 60);
    
            //return obj
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }
    
        function setClock(selector, endtime) {
    
            const timer = document.querySelector(selector);
            const days = timer.querySelector('#days');
            const hours = timer.querySelector('#hours');
            const minutes = timer.querySelector('#minutes');
            const seconds = timer.querySelector('#seconds');
    
            //call function every second 
            const timeInterval = setInterval(updateClock, 1000);
            updateClock();
    
            function getZero(num) {
                if (num >=0 && num < 10) { 
                    return `0${num}`;
                } else {
                    return num;
                }
            };
    
            function updateClock() {
                const t = getTimeRemaining(endtime); //object
    
                //set values for website
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
    
                //if total time <= 0 stop interval
                if(t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
    
        }
    
    setClock(id, deadline);
    
}

export default timer