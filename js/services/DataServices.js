// responsable de los datos

export default {

    // metodo que se conectará al servidor (url), dará una orden (method) y enviará datos (body)
    request: async function (method, url, body) {
        const requestConfig = {
            method: method,
            headers: {
                'content-type': 'application/json' // usa json con el servidor para comunicarte
            },
            body: JSON.stringify(body) // datos como usuario y password que ha introducido el usuario
        }

        // para crear un anuncio el usuario debe estar autenticado. Si hay token lo está.
        if (this.isAuthenticated()) {
            const token = localStorage.getItem('AUTH_TOKEN')
            requestConfig.headers['Authorization'] = `Bearer ${token}`
        }

        const response = await fetch(url, requestConfig) // maneja la conexión al servidor
        try {
            const data = await response.json();
            if (response.ok) {
                return data; // el backend envía los datos registrados del usuario en el Sparret servidor.
            } else {
                throw new Error(data.message); // por ejemplo que el registro no ha ido bien
            }
        } catch (error) {
            throw (error); // ej: no ha habido respuesta del servidor
        }
    },

    delete: async function (url, body = {}) { // body vacío
        return await this.request('DELETE', url, body)
    },

    post: async function (url, body) { // body contiene datos como user o passsword
        return await this.request('POST', url, body)
    },

    isAuthenticated: function () { // ¿hay token almacenado en el navegador?
        return localStorage.getItem('AUTH_TOKEN') !== null
    },

    parseProduct: function (product) { // metodo que obtiene la info que tendrá el producto
        product.name = product.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        product.type = product.type
        product.price = product.price
        product.photo = product.photo//.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        product.id = product.id
        product.tags = product.tags
        product.canBeDeleted = product.userId === this.getAuthUserId() // true --> el usuario registrado es el dueño del producto.
        //product.visitorname = this.getAuthUserName() // nombre del usuario registrado que está visitando la web (obtenido del token!)
        return product
    },

    getProducts: async function () {
        const url = 'http://localhost:8000/api/products?_expand=user'
        const response = await fetch(url)

        if (response.ok) { // si el servidor responde bien...
            const products = await response.json() // promesa: te daré los datos en json
            return products.map(product => this.parseProduct(product)) // uso el modulo parse para mostrar datos de cada producto
        } else {
            throw new Error('There was a problem connecting to the server. Please try again.')
        }
    },

    registerUser: async function (username, password) {
        const url = 'http://localhost:8000/auth/register' // url que indica el readme de Sparret
        return await this.post(url, { username, password })
    },

    login: async function (username, password) {
        const url = 'http://localhost:8000/auth/login'
        const data = await this.post(url, { username, password }) // guardamos la respuesta para acceder al token del usuario, enviado por el backend
        const token = data.accessToken // token almacenado
        localStorage.setItem('AUTH_TOKEN', token) // lo metemos en el navegador permanentemente
    },

    createProduct: async function(name, type, photo, price, tags=[]) {
        const url ='http://localhost:8000/api/products'
        return await this.post(url, {name, type, photo, price, tags})
    },

    getProductDetail: async function(productID){
        const url = `http://localhost:8000/api/products/${productID}?_expand=user` // conectar con servidor
        const response = await fetch(url) 

        if (response.ok) { // si el servidor responde
            const product = await response.json() // promesa: te daré los datos en json
            return this.parseProduct(product) // evito que código mlicioso se pinte en la página
        } else {
            if (response.status === 404) {
                return null //devuelve un product = null. En views.js --> "no existe el producto"
            } else {
                throw new Error('Something went wrong. Please try again later.') // error al cargar el producto
            }
        }
    },

    deleteProduct: async function(productID) {
        // identificamos el producto del usuario
        const url = `http://localhost:8000/api/products/${productID}`
        return await this.delete(url)
    },

    getAuthUserId: function() { // funcion para obtener el userID del token:
        const token = localStorage.getItem('AUTH_TOKEN') // token almacenado en el navegador
        if (token === null) { // no siempre habrá un token guardado en el navegador... 
            return null
        }
        const b64Part = token.split('.')
        if (b64Part.length !== 3) { // nos aseguramos que sean 3 partes, si no entonces o es falso o no nos interesa
            return null
        }
        const b64data = b64Part[1] // obtenemos la parte del token que contiene info del usuario
        // y ahora intentamos que lo descifre (como depende de otros, puede fallar así que mejor usar try/catch)
        try {
            const userJSON = atob(b64data) // desciframos usando decodificador gratuito de https://www.base64decode.org/www.base64
            const user = JSON.parse(userJSON) // el resultado lo pasamos a JSON
            return user.userId // user.userId resultado: el id del usuario guardado en el token
        } catch(error) {
            console.error('Error while decoding JWT Token', error)
            return null
        }
    },

    getAuthUserName: function() { // TODO: unir getAuthUserId y getAuthUserName
        const token = localStorage.getItem('AUTH_TOKEN') 
        if (token === null) { 
            return null
        }
        const b64Part = token.split('.')
        if (b64Part.length !== 3) { 
            return null
        }
        const b64data = b64Part[1] 
        
        try {
            const userJSON = atob(b64data) // desciframos usando decodificador gratuito de https://www.base64decode.org/www.base64
            const user = JSON.parse(userJSON) // el resultado lo pasamos a JSON
            return user.username 
        } catch(error) {
            console.error('Error while decoding JWT Token', error)
            return null
        }
    }
}