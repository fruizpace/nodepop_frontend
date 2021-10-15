import { headerView } from "../views.js"
import DataServices from '../services/DataServices.js'

export default class HeaderController {

    constructor(element) {
        this.element = element // header HTML element
        this.visitorname = DataServices.getAuthUserName() // obtengo el nombre del usuario registrado y que está viendo la web
        this.element.innerHTML = headerView(this.visitorname)  // cargamos la estructura html del header
        this.tokenExists = DataServices.isAuthenticated() // ¿hay token almacenado?
        //console.log(this.tokenExists)

        if (this.tokenExists === true) { // si está autorizado...
            this.showLinks()
        }
    }

    showLinks() {
        document.getElementById("new-link").style.display = 'initial' // muestra el link "New Ad"
        document.getElementById("login-link").style.display = 'none' // oculta el link "Login/Registered"
        document.getElementById("profile-link").style.display = 'initial' // muestra el link para ir al profile dle
    }
}