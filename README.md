# Práctica de FrontEnd con JavaScript #
Este frontend contiene las siguientes páginas:

- Página de listado de anuncios: index.html
- Página de detalle de un anuncio: detail.html
- Página para crear un anuncio: new.html
- Página de login: login.html
- Página de registro: signup.html

## Instrucciones
1. Clona este repositorio (Nodepop)
2. En una carpeta fuera de Nodepop descarga el código del backend desde https://github.com/kasappeal/sparrest.js
3. En el terminal de Visual Code inicia el backend (leer más abajo) desde la carpeta sparrest.js-main.
4. Usa los datos de ejemplo guardados en el archivo `db.json` para empezar a jugar con esta aplicación.
5. Accede a la página principal: `http://localhost:PORT/index.html` en el puerto (PORT) que tengas disponible. Ejemplo: 3000.

Una vez dentro de Nodepop puedes crear un usuario en la opción LOGIN (o acceder a tu cuenta si ya estás registrado). Como usuario regsitrado tendrás disponible las opciones: New Ad (crear un anuncio) y Delete (borrar un anuncio si eres usuari@ propietari@ de dicho producto). Haz click en cada producto para ver detalles.

Para crear un anuncio es obligatorio indicar nombre del produto, tipo (Compra o Venta)  y precio. También puedes marcar hasta cuatro etiquetas (opcional). 

### Backend
Para iniciar por primera vez el backend sparrest.js (basado en json-server) usa los comandos en el terminal:
- Instala las dependencias: `npm i`
- Arranca el servidor: `npm start`

## Limitaciones:
1. **Por ahora no se pueden subir imágenes del producto**. Por defecto, aunque cargues una imagen, la foto del nuevo producto será: "No image available".
2. La búsqueda de productos no es funcional.

