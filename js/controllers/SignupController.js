import DataServices from "../services/DataServices.js"
import PubSub from "../services/PubSub.js"

export default class SignupController {

    constructor(element) {
        this.element = element // formulario HTML
        this.attachEventListener() // metodo que añade manejador de evento
    }

    checkIfPasswordsAreEqual() {
        // guardo las contraseñas metidas en inputs del form
        const inputsPassword = this.element.querySelectorAll('input[type="password"]')

        let password = []
        for (const input of inputsPassword) {
            if (password.includes(input.value) === false) {
                password.push(input.value)
            }
        }
        if (password.length == 1) { // correcto (significa que todas son la misma)
            for(const input of inputsPassword) {
                input.setCustomValidity('') // envia un msj vacío
            }
        } else {
            for(const input of inputsPassword) {
                input.setCustomValidity('Password and Confirm Password do not match. Please try again.') // envia un msj de error cuando el input es 'submited'
            }
        }
        
    }

    attachEventListener() {
        // A) establecer la validacion general del formulario (que los campos estén llenos)
        this.element.addEventListener('submit', async function(event){ // function**
            // A1. comportamiento por defecto deL form html desactivado:
            event.preventDefault()
            
            // A2. comprobamos si los diferentes campos del formulario se pueden validar:
            if (this.checkValidity()) { // this = formulario (si usaramos arrow function habria que poner this.element)
                //console.log('Formulario validado')
                const url = new URLSearchParams(window.location.search)
                const next = url.get('next') || '/login.html'
                try {
                    PubSub.publish(PubSub.events.SHOW_LOADING) // orden: muestra el loader!
                    const data = new FormData(this) // obtenemos el formulario con los datos
                    const username = data.get('username') // valor del input[name='username']
                    const password = data.get('password') // valor del input[name='password']
                    const result = await DataServices.registerUser(username, password) // método (DataServices!) para registrar nuevo usuario 
                    location.href = next // despues del registro redirigimos al usuario al login
                    //console.log(result)

                    PubSub.publish(PubSub.events.SHOW_SUCCESS, 'Your account has been successfully created.')
                } catch (error) {
                    PubSub.publish(PubSub.events.SHOW_ERROR, error) // publico error
                } finally {
                    PubSub.publish(PubSub.events.HIDE_LOADING) // orden: ocultar el loader!
                }
            } else {
                let errorMessage = ''
                for (const element of this.elements) { // this.elements son los componentes del form: los inputs del form en html
                    if (element.validity.valid === false) {
                        errorMessage += `Error in ${element.name}: ${element.validationMessage}.`
                    }
                }
                PubSub.publish(PubSub.events.SHOW_ERROR, errorMessage)
            } 
        })

        // B) establecer validacion personalizada de los input de tipo password
        this.element.querySelectorAll('input[type="password"]').forEach(input => {
            input.addEventListener('input', () => {
                this.checkIfPasswordsAreEqual()
            })
        })

        // C) activar el boton Registrar cuando el formulario esté validado:
        this.element.querySelectorAll('input').forEach(inputElement => {
            // para cada input del formulario
            inputElement.addEventListener('input', () => {
                // cada vez que el usuario escriba en cada input se comprobará esta validación:
                if (this.element.checkValidity()) {
                    // si el formulario esta ok
                    this.element.querySelector('button').removeAttribute('disabled') // botón activado
                    this.element.querySelector('p').innerText = ''
                } else {
                    this.element.querySelector('button').setAttribute('disabled', true) // boton desactivado
                }
            })
        })
    }
}