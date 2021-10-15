// este código inicializará el signup.html

import HeaderController from './controllers/HeaderController.js'
import SignupController from "./controllers/SignupController.js"
import MessageController from "./controllers/MessageController.js"
import LoaderController from "./controllers/LoaderController.js"
import PubSub from "./services/PubSub.js"

window.addEventListener('DOMContentLoaded', function () {
    //1. controlador del Header
    const header = document.querySelector('.header')
    new HeaderController(header)

    //2. controlador de mensajes
    const messages = document.querySelector('.my-message')
    new MessageController(messages)

    //3. seleccionamos el elemento del formulario
    const form = document.querySelector('form')

    //4. instanciar el controlador del formulario
    new SignupController(form)

    //5. controlador del loader
    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)
    PubSub.publish(PubSub.events.HIDE_LOADING) // orden: ocultar el loader!
})