import PubSub from "../services/PubSub.js"
import DataServices from "../services/DataServices.js"

export default class ProductFormController{

    constructor(element) {
        this. element = element // formulario HTML
        this.attachEventListener()
    }

    attachEventListener() {
        this.element.addEventListener('submit', async (event) => {
            event.preventDefault() // desactivamos comportamiento por defecto del formulario HTML
            PubSub.publish(PubSub.events.SHOW_LOADING) // muestra el loader!

            if (this.element.checkValidity()) {
                const data = new FormData(this.element) // obtener formulario con datos
                const name = data.get('name')
                const type = data.get('type')
                const photo = 'no_image.png' //data.get('photo')
                const price = Number(data.get('price'))
                const tags = data.getAll('tags')

                try {
                    console.log(name, type, photo, price, tags)
                    // conectar con el servidor y pasarle los datos:
                    const result = await DataServices.createProduct(name, type, photo, price, tags);
                    // mostrar que se ha creado el producto con éxito
                    PubSub.publish(PubSub.events.SHOW_SUCCESS, 'Product was successfully added!')
                } catch (error) {
                    PubSub.publish(PubSub.events.SHOW_ERROR, error) // publica error, de haberlo.
                } finally {
                    PubSub.publish(PubSub.events.HIDE_LOADING) // ocultamos el loader!
                }
            } else {
                PubSub.publish(PubSub.events.HIDE_LOADING) // ocultamos el loader!
                PubSub.publish(PubSub.events.SHOW_ERROR, 'Missing required data. Please check the fields and try again.')
            }
        })
    }
}