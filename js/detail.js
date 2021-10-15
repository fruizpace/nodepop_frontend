// este código inicializará el detail.html
import MessageController from './controllers/MessageController.js'
import ProductDetailController from './controllers/ProductDetailController.js'
import LoaderController from './controllers/LoaderController.js'
import HeaderController from './controllers/HeaderController.js'


window.addEventListener('DOMContentLoaded', function () {
    //1. controlador del Header
    const header = document.querySelector('.header')
    new HeaderController(header)

    //2. controlador de mensajes
    const messages = document.querySelector('.my-message')
    new MessageController(messages)

    //3. controlador del loader
    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)

    //4. obtengo el id del producto de la url 
    const id = new URLSearchParams(window.location.search).get('id')

    //5. controlador del detalle del producto
    const productDiv = document.querySelector('.product') // classe del div en detail.html
    new ProductDetailController(productDiv, id)
})