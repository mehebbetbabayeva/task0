document.addEventListener('DOMContentLoaded', function () {
    const productNameInput = document.getElementById('productName')
    const productPriceInput = document.getElementById('productPrice')
    const addProductBtn = document.getElementById('productBtn')
    const totalCount = document.getElementById('totalCount')
    const totalPrice = document.getElementById('totalPrice')

    let products = JSON.parse(localStorage.getItem('products')) || []
    const productList = document.createElement('ul')
    document.querySelector('.ul-container').appendChild(productList)

    function renderProducts() {
        productList.innerHTML = ''
        let count = 0;
        let price = 0;
        products.forEach((product, index) => {
            const li = document.createElement('li')
            li.innerHTML = `${product.name} (${product.price} AZN ) <button class="deleteBtn" data-index="${index}">SİL</button>`
            productList.appendChild(li)
            count++
            price += parseFloat(product.price)
        })
        totalCount.textContent = count
        totalPrice.textContent = price.toFixed(2)
        if (products.length > 0) {
            productList.classList.add('productList')
        } else {
            productList.classList.remove('productList')
        }
    }
    addProductBtn.addEventListener('click', function () {
        const name = productNameInput.value.trim()
        const price = parseFloat(productPriceInput.value.trim())
        if (name && !isNaN(price) && price > 0) {
            products.push({ name, price })
            localStorage.setItem('products', JSON.stringify(products))
            renderProducts()
            productNameInput.value = ''
            productPriceInput.value = ''
        } else {
            alert('melumatlar bos ola bilmez ve ya qiymet 0-dan boyuk olmalidir')
        }
    })

    productList.addEventListener('click', function (e) {
        if (e.target.classList.contains('deleteBtn')) {
            const index = e.target.getAttribute('data-index')
            products.splice(index, 1)
            localStorage.setItem('products', JSON.stringify(products))
            renderProducts()
        }
    })

    renderProducts()
})
