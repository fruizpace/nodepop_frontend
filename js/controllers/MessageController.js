import { errorView, successView, warningView } from "../views.js"
import PubSub from "../services/PubSub.js"


export default class MessageController {

    constructor(element) {
        this.element = element // div class="my-message"
        // Suscribimos los eventos y le decimos que hacer en cada caso: Este controlador será sensible a estos tres eventos
        PubSub.subscribe(PubSub.events.SHOW_ERROR, (error) => {
            this.showError(error)
        })
        PubSub.subscribe(PubSub.events.SHOW_SUCCESS, (message) => {
            this.showSuccess(message)
        })
        PubSub.subscribe(PubSub.events.SHOW_WARNING, (message) => {
            this.showWarning(message)
        })
    }

    attachCloseMessageEventListener() { // al hacer click en boton de cancelar, se oculta el mensaje
        const button = this.element.querySelector('button')
        button.addEventListener('click', () => {
            this.hideError()
        })
    }

    showError(message) {
        this.element.innerHTML = errorView(message)
        this.attachCloseMessageEventListener()
    }

    hideError() { // cierra cualquier mensaje del PubSub, sea error o no
        this.element.innerHTML = ''
    }

    showSuccess(message) {
        this.element.innerHTML = successView(message)
        this.attachCloseMessageEventListener()
    }

    showWarning(message) {
        this.element.innerHTML = warningView(message)
        this.attachCloseMessageEventListener()
    }
}


