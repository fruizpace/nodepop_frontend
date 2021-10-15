// este código inicializará el index.html

import MessageController from './controllers/MessageController.js'
import ProductListController from './controllers/ProductListController.js'
import LoaderController from './controllers/LoaderController.js'
import HeaderController from './controllers/HeaderController.js'

window.addEventListener('DOMContentLoaded', function() {
    // 1) controlador del Header
    const header = document.querySelector('.header')
    new HeaderController(header)
    
    // 2) controlador de mensajes:
    const messages = document.querySelector('.my-message')
    new MessageController(messages)

    // 3) seleccionamos donde aparecerá el loader
    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)

    // 4) controlador de lista de productos:
    const productListDiv = document.querySelector('.product-list') // coger el elemento del DOM (HTML) donde cargar los productos
    const productListController = new ProductListController(productListDiv) // instanciar controlador pasándole el elemento DOM
    productListController.renderProducts() // pinta los productos
})