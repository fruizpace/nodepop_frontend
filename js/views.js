

export function productView(product) {
    if (product.photo === "") {
        product.photo = "no_image.png"
    }

    let property = ''
    if (product.canBeDeleted) {
        property = '<h4 class="property-p"> This product is yours </h4>'
    }

    return `<div class = "product-container">
        <a href="/detail.html?id=${product.id}">
        ${property}
        <div class="product-img-container">
        <img id="product-photo" src="js/services/images/${product.photo}" alt="product-photo">
        </div>
        <div class="product-text-container">
        <strong class="price"> ${product.price}€ </strong>
        <p class="name">${product.name}</p>
        <p class="type"> ${product.type} </p>
        </div>
        </a>
    </div>`
}

// funcion que genera estructura html para el mensaje de error
export function errorView(message) {
    return `<div class='error'> 
        ${message}
        <button>x</button>
    </div>`
}

// funcion que genera estructura html para el mensaje de éxito
export function successView(message) {
    return `<div class='success'> 
    ${message}
    <button>x</button>
</div>`
}

// funcion que genera estructura html del loader
export function loaderView() {
    return '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
}

// funcion que genera estructura html para el mensaje de WARNING
export function warningView(message) {
    return `<div class='warning'> 
    ${message}
    <button>x</button>
</div>`
}

// funcion que genera estructura html para el HEADER
export function headerView(visitorname) {
    return `<nav class="nav">
        <a href="index.html" class="logo nav-link"> Nodepop </a>
        <ul class="nav-menu">
            <li class="nav-menu-item"> <input type="text" id="mySearch" placeholder="Search in Nodepop..."></li>
            <li class="nav-menu-item"> <a href="login.html" class="login nav-link" id="login-link"> Login </a> </li>
            <li class="nav-menu-item"> <a href="new.html" class="login nav-link" id="new-link"> New Ad </a> </li>
            <li class="nav-menu-item" id="li-visitorname"> <a href="#" class="login nav-link" id="profile-link"> Hello ${visitorname}! </a> </li>
        </ul>
    </nav>`
}

// funcion que genere estructura html del detalle del producto
export function productDetailView(product) {
    if (product === null) {
        return '<h1> The product does not exist.</h1>'
    }
    
    let button = ''
    if (product.canBeDeleted) {
        button = '<button class="delete" id="delete-btn"> Delete </button>'
    }

    if (product.photo === "") {
        product.photo = "no_image.png"
    }
    
    return `<div class="product-img-container">
            <img src="js/services/images/${product.photo}" alt="product-photo">
        </div>
        <br>
        <div class="product-detail-text-container">
        <p class="price"> Price: ${product.price}€ </p>
        <p class="name"> Description: ${product.name}</p>
        <p class="type"> What's it for?: ${product.type} </p>
        <p class="tags"> Tags: ${product.tags} </p>
        </div>
        <br>
        ${button}`
}