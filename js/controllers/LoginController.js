import DataServices from "../services/DataServices.js"
import PubSub from "../services/PubSub.js"

export default class LoginController {

    constructor(element) {
        this.element = element // formulario HTML
        this.attachEventListener() // manejador del evento "submit"
    }

    attachEventListener(){
        this.element.addEventListener('submit', async(event) => {
            event.preventDefault() // desactivar comportamiento por defecto del formulario

            if (this.element.checkValidity()) { // this.element = formulario HTML
                // hacemos el login
                const data = new FormData(this.element) // obtenemos el formulario con los datos
                const username = data.get('username') // valor del input username 
                const password = data.get('password') // valor del input password
                // y ahora voy a ver si el url tienen un parametro "next" que indica que el usuario despues de hacer login irá a otra página:
                const url = new URLSearchParams(window.location.search)
                const next = url.get('next') || '/'

                try {
                    PubSub.publish(PubSub.events.SHOW_LOADING) // orden: muestra el loader!
                    const result = await DataServices.login(username, password)
                    location.href = next // despues del login redirigimos al usuario al home
                    //console.log('Usuario dentro!')
                    PubSub.publish(PubSub.events.SHOW_SUCCESS, `Welcome ${username}!`)
                } catch(error) {
                    PubSub.publish(PubSub.events.SHOW_ERROR, error)
                } finally {
                    PubSub.publish(PubSub.events.HIDE_LOADING) // orden: ocultar el loader!
                }
            } else {
                PubSub.publish(PubSub.events.SHOW_ERROR, 'Please complete the required fields.')
            }
        })
    }
}