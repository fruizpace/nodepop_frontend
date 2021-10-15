import DataServices from "../services/DataServices.js"
import PubSub from "../services/PubSub.js"
import { productDetailView } from "../views.js"

export default class ProductDetailController {

    constructor(element, productID) {
        this.element = element // div HTML
        this.loadProduct(productID) // modulo que obtiene los datos del producto
    }

    async loadProduct(productID) {
        PubSub.publish(PubSub.events.SHOW_LOADING) // muestra el loader!
        //conseguir datos del producto:
        try { 
            const product = await DataServices.getProductDetail(productID) // pido al servidor los detalles del producto
            this.element.innerHTML = productDetailView(product) // pintar detalles
            // si token autenticado añadimos manejador de eventos al boton delete
            this.addDeleteButtonEventListener(product)
        } catch (error) {
            PubSub.publish(PubSub.events.SHOW_ERROR, error)
        } finally {
            PubSub.publish(PubSub.events.HIDE_LOADING) // oculta el loader!
        }
    }

    addDeleteButtonEventListener(product) {
        // seleccionamos el botón
        const button = this.element.querySelector('button')
        // si existe el botón (solo existe si el usuario es quien creó el producto) views.js
        if (button) {
            button.addEventListener('click', async () => {
                const answer = confirm('Are you sure you want to permanently remove this product?')
                if (answer === true) {
                    PubSub.publish(PubSub.events.SHOW_LOADING) // muestra el loader!
                    button.setAttribute('disabled', 'disabled') // desactivamos el botón después de hacer click
                    try {
                        await DataServices.deleteProduct(product.id) // ejecuta la funcion borrar del dataservice pasandole el id 
                        PubSub.publish(PubSub.events.SHOW_SUCCESS, 'Product deleted successfully.')
                        setTimeout( function() {
                            window.location.href = '/?message=product-deleted' 
                        }, 2000)
                        //window.location.href = '/?message=product-deleted' // enviamos un mensaje al index.html
                        
                    } catch(error) {
                        PubSub.publish(PubSub.events.SHOW_ERROR, error)
                        button.removeAttribute('disabled') // volvemos a activar el botón
                    } finally {
                        PubSub.publish(PubSub.events.HIDE_LOADING) // oculta loader!
                    }
                }
            })
        }
    }
}