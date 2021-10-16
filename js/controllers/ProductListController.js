import { productView } from '../views.js'
import DataServices from '../services/DataServices.js'
import PubSub from '../services/PubSub.js'

export default class ProductListController {

    constructor(element) {
        this.element = element //element class=product-list

        //TODO: arreglar la función para buscar y modificar la lista de productos renderizada
        /*
        this.searchBox = document.getElementById('mySearch') // element search box
        this.addSearchBoxEventListener(this.searchBox)
        */
    }

    async renderProducts() {
        PubSub.publish(PubSub.events.SHOW_LOADING) // orden: muestra el loader!
        try {
            // 1) obtengo los datos
            const products = await DataServices.getProducts() //console.log(products)
            // si no hay productos mostrar:
            if (products.length === 0) {
                PubSub.publish(PubSub.events.SHOW_WARNING, 'Empty list. No products to show.') //console.log('No hay productos en la bbdd')
            } else {
                // 2) pinto cada producto en un "li" elemento
                for (const product of products) {
                    const productElement = document.createElement('li')
                    productElement.innerHTML = productView(product)
                    this.element.appendChild(productElement)
                }
            }
        } catch (error) {
            console.log(error)
            PubSub.publish(PubSub.events.SHOW_ERROR, error)
        } finally {
            PubSub.publish(PubSub.events.HIDE_LOADING) // orden: ocultar el loader!
        }
    }
/*
    addSearchBoxEventListener(box) {
        box.addEventListener('keyup', () => {
            const search = box.value.toUpperCase()
            console.log(search)
        })
    }
    */
}