# Evaluador de Contraseña

Esta es una aplicación web desarrollada en React para evaluar la fortaleza de contraseñas. La aplicación permite ingresar una contraseña, mostrarla u ocultarla, copiarla al portapapeles y generar contraseñas aleatorias. Además, evalúa la fortaleza de la contraseña según varios criterios y muestra una clasificación.

## Funcionalidades

- **Ingreso de Contraseña**: Permite ingresar una contraseña en un campo de texto.
- **Mostrar/Ocultar Contraseña**: Botón para alternar la visibilidad de la contraseña ingresada.
- **Copiar al Portapapeles**: Botón para copiar la contraseña al portapapeles.
- **Generar Contraseña Aleatoria**: Botón para generar una contraseña aleatoria de al menos 8 caracteres.
- **Evaluación de Fortaleza**: Muestra la fortaleza de la contraseña con las clasificaciones "Poco segura", "Segura" o "Muy segura".

## Criterios de Fortaleza

- **Muy segura**: Contraseña que contiene mayúsculas, minúsculas y números con una longitud mayor a 6 caracteres.
- **Segura**: 
  - Contraseña con más de 10 caracteres.
  - Contraseña formada por letras minúsculas, mayúsculas y números.
  - Contraseña con mezcla de letras minúsculas y mayúsculas con longitud mayor a 6.
- **Poco segura**: Para contraseñas que no cumplen con ninguno de los criterios anteriores.

## Instalación y Uso

Para ejecutar esta aplicación localmente, sigue estos pasos:

1. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/AgustinRuizDiaz/Trabajos-pr-cticos-DDS2024

2. **Instalar las dependencias**
    Puedes hacerlo con "npm install"

3. **Inicia el servidor local**
    Con "npm start"

La aplicación se abrirá en tu navegador en http://localhost:3000.
