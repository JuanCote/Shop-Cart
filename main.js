const cartWrapper = document.querySelector('#cartWrapper')

window.addEventListener('click', function (e) {
    let counter;

    if (e.target.dataset.action === 'plus' || e.target.dataset.action === 'minus') {
        const panelWrapper = e.target.closest('#panel-wrapper')
        counter = panelWrapper.querySelector('[data-counter]')
    }

    if (e.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText
    }
    if (e.target.dataset.action === 'minus') {

        if (parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText
        } else if (e.target.closest('#cartWrapper') && parseInt(counter.innerText) === 1) {
            e.target.closest('#cartItem').remove()
            toggleCartStatus()
            calcCartPrice()
        }
    }

    if (e.target.hasAttribute('data-action') && e.target.closest('#cartWrapper')) {
        calcCartPrice()
    }

    if (e.target.hasAttribute('data-cart')) {
        const card = e.target.closest('#card')
        
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('#img').getAttribute('src'),
            title: card.querySelector('#title').innerText,
            counter: card.querySelector('[data-counter]').innerText,
            price: card.querySelector('[data-price]').innerText
        }
        
        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`)
        
        if (itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]')
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter)
        } else {
            const cartItemHTML = `<div id="cartItem" data-id="${productInfo.id}">
            <img class="h-36 mt-8" src="${productInfo.imgSrc}">
            <div class="ml-4">${productInfo.title}</div>
            <div class="flex items-center ml-4 mt-4">
            <div id="panel-wrapper" class=" bg-[#d2ccc9] w-1/3 flex items-center justify-between rounded-lg">
            <button data-action="minus" class="flex-grow text-lg">-</button>
            <div data-counter class="flex-grow text-center">${productInfo.counter}</div>
            <button data-action="plus" class="flex-grow text-lg rounded-r-lg">+</button>
            </div>
            <div data-price class="ml-4 flex">${productInfo.price}</div>
            </div>`;

            cartWrapper.insertAdjacentHTML("beforeend", cartItemHTML)

            toggleCartStatus()
        }
        calcCartPrice()
    }

    function toggleCartStatus() {
        const cartWrapper = document.querySelector('#cartWrapper')
        const cartEmpty = document.querySelector('[data-cart-empty]')

        if (cartWrapper.children.length > 0) {
            cartEmpty.classList.add('hidden')
        } else {
            cartEmpty.classList.remove('hidden')
        }
    }

    function calcCartPrice() {
        const cartItems = document.querySelectorAll('#cartItem')
        let totalPrice = 0
        
        cartItems.forEach(function (item) {
            const amount = parseInt(item.querySelector('[data-counter]').innerText)
            const price = parseInt(item.querySelector('[data-price]').innerText)
            totalPrice += amount * price
        })
        document.querySelector('#totalCartPrice').innerText = totalPrice
    }

})