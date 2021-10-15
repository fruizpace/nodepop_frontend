// este código inicializará new.html

import HeaderController from './controllers/HeaderController.js'
import ProductFormController from "./controllers/ProductFormController.js"
import MessageController from "./controllers/MessageController.js"
import DataServices from "./services/DataServices.js"
import LoaderController from './controllers/LoaderController.js'
import PubSub from "./services/PubSub.js"

window.addEventListener('DOMContentLoaded', function () {

    if (DataServices.isAuthenticated() === false) { // no token, no autorizado --> no le doy acceso a crear producto
        window.location.href = '/login.html?next=/new.html' // lo mando a hacer login y luego a "new.html"
    }

    //1. controlador del Header
    const header = document.querySelector('.header')
    new HeaderController(header)

    //2. seleccionamos el elemento formulario
    const form = document.querySelector('form')

    //3. Crear una instancia del controlador del formulario
    new ProductFormController(form)

    //4. Instanciar controlador de mensajes
    const messages = document.querySelector('.my-message');
    new MessageController(messages)

    //5. controlador del loader
    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)
    PubSub.publish(PubSub.events.HIDE_LOADING) // orden: ocultar el loader!
})
