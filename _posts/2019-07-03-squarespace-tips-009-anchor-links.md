---
title: SQUARESPACE TIPS #009 — Anchor Links
description: Seguimos con los Squarespace Tips, en esta ocasión os quiero contar que es y como crear un anchor link en Squarespace.
image: https://cdn-images-1.medium.com/max/800/0*Rc2AymnfUtw3PPvv
slug: squarespace-tips-009-anchor-links
date: 2019-07-03T20:31:59.000Z
---


Seguimos con los Squarespace Tips, en esta ocasión os quiero contar que es y como crear un anchor link en Squarespace.

### QUE ES UN ANCHOR LINK

Un anchor link (enlace de anclaje) es un enlace especial que te lleva a un lugar especifico dentro de una pagina.
Normalmente un enlace común te envía a una pagina diferente, con un anchor link puedes enviar al usuario más arriba o más abajo dentro de la misma pagina.

### COMO CREAR UN ANCHOR LINK EN SQUARESPACE EN SOLO 5 PASOS

### 1 — CREAR EL LINK

Creamos un enlace en el que los usuarios puedan hacer click.
Este tip funciona en cualquier tipo de enlace, pero para el ejemplo vamos a usar el enlace de texto (que suele ser el mas común).
Dentro de un Bloque de texto, seleccionamos el texto y hacemos click en el icono de Enlace en la barra de herramientas.

![Imagen del paso 1](https://cdn-images-1.medium.com/max/800/0*xvETgK8grMeDzrWD)

### 2 — CREAR UN ID ÚNICO

En la ventana de enlace seleccionamos Externa y ahi ingresamos un hashtag (#) seguido de un texto.
Ese texto que introducimos sera nuestra ID única.
Tenemos que asegurarnos que la opción de “Abrir en nueva ventana” no este marcada, para que los usuarios permanezcan en la misma pagina.

La ID única que hemos usado en el ejemplo es anchor-link-example

El texto puede ser lo que quieras, pero no puede incluir espacios, lo mejor es separar las palabras con un guion y ten cuidado porque los anchor links distinguen entre mayusculas y minúsculas.

![Imagen del paso 2](https://cdn-images-1.medium.com/max/800/0*1jq1qSt8qkjuYOnp)

### 3 — AÑADIR LA URL

Antes del hashtag, tenemos que añadir un par de cosas:

1. La URL de tu sitio
2. El nombre de la página a la que te estás vinculando (incluso si es la misma página)
3. Una marca de barra adicional (/)

El aspecto final tiene que ser similar a este:

[https://examplesite.com/pagina/#unique-id](https://examplesite.com/pagina/#unique-id)

![Imagen del paso 3](https://cdn-images-1.medium.com/max/800/0*wXGG5j8UscJTSZUN)

### 4 — ENLAZAR EL ID ÚNICO A UNA SECCIÓN DE NUESTRA PÁGINA

Ahora debemos abrir el editor de contenido y añadimos un bloque de código en el lugar al que queremos que lleve el enlace que estamos creando.

En el bloque de contenido que hemos creado debemos borrar el código original (“¡Hola, mundo!”) y copiamos el ID único que hemos creado antes, debería quedar algo asi:

id=”anchor-link
