// cuando se usará loader? aquí indicamos que evento disprará el loader y cuando se esconderá

import { loaderView } from "../views.js"
import PubSub from "../services/PubSub.js"

export default class LoaderController {

    constructor(element) {
        this.element = element
        this.element.innerHTML = loaderView()  // obtenemos la estructura html del loader

        // subscribir a los eventos y qué hacer al oirlos:
        PubSub.subscribe(PubSub.events.HIDE_LOADING, () => {
            this.hideLoader()
        })

        PubSub.subscribe(PubSub.events.SHOW_LOADING, () => {
            this.showLoader()
        })
    }

    hideLoader() {
        this.element.style.display = "none" // CSS
    }

    showLoader() {
        this.element.style.display = "initial" // CSS
    }
}