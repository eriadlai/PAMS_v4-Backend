# PAMS_v4-Backend

Repositorio para almacenar y controlar las versiones de desarrollo del backend del sistema PAMS_v4

# INSTALACION BASE

->>. npm init
->>. npm i express
->>. npm i dotenv
->>. npm i mongodb
->>. npm i cors
->>. Ingresar en package.json, dentro de la seccion scripts, la siguiente linea:
"start": "nodemon -L src/server.js"

# CONSTRUCCION DEL AMBIENTE

->>. Crear carpeta src
->>. Crear archivo server.js dentro de la carpeta src
->>. Crear archivo database.js dentro de la carpeta src

->>. Crear carpeta controller
En esta carpeta se encontraran todos los archivos .js referentes a funciones y acciones CRUD para con la base de datos

->>. Crear carpeta routes
En esta carpeta se encontraran todos los archivos .js que estableceran los tipos de endpoints (GET,PUT,POST,DELTE)
junto con el nombre de la ruta establecida y la accion que realizara al mandar a llamar dicho endpoint

->>. Crear carpeta helpers
En esta carpeta se encontraran archivos adicionales que sean necesarios para emplear logica de apoyo, como la generacion
de documentos, lectura de datos, manejo de tokens, etc.

->>> Crear archivo .env donde se especificaran todas las variables de entorno, esta informacion es de alta delicadeza
por lo que se tiene que incluir en el .gitignore, donde cada vez que se desee ejecutar el proyecto, se necesitaran especificar
de nuevo estas variables.
