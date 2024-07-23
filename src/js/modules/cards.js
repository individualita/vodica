import { getResource } from "../services/services";

export function cards() {
    
    class MenuCard {
        constructor (src, alt, type, seller, price, parentSelector,...classes) {
            this.src = src;
            this.alt = alt;
            this.type = type;
            this.seller = seller;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }
        
        render() {
            const newElement = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = 'order__card';
                newElement.classList.add(this.classes);
            } else {
                this.classes.forEach(className => newElement.classList.add(className));
            }
            
            newElement.innerHTML = `
                <img class="order__card-image" src="${this.src}" alt="${this.alt}" >
                <div class="order__card-content">
                    <div class="order__card-descr">
                        <div class="order__card-top">${this.seller}</div>
                        <div class="order__card-type">${this.type}</div>
                        <div class="order__card-price">from:<span>${this.price}$</span></div>
                    </div>

                    <div class="order__card-buttons">
                        <div class="order__quantity">
                            <button id="minus" class="order__quantity-button" type="button" aria-label="deduct quantity">-</button>
                            <span class="order__quantity-number">1</span>
                            <button id="plus" class="order__quantity-button" type="button" aria-label="add quantity">+</button>
                        </div>

                        <button class="order__card-button" type="button">Buy now</button>
                    </div>
                </div>
            `

            
            this.parent.append(newElement);
        }


    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({src, alt, type, seller, price}) => {
                new MenuCard(src, alt, type, seller, price, '.order__cards').render();
            });
        });




    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));


};