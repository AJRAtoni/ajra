---
title: Código para aplicar el “Modo Oscuro” en tu web
description: Últimamente está muy de moda lo del “Modo Oscuro”.
image: https://cdn-images-1.medium.com/max/800/1*_RELeXxYOZR4gCDGDbydHA.jpeg
slug: codigo-para-aplicar-el-modo-oscuro-en-tu-web
date: 2020-02-28T14:54:33.013Z
---

Últimamente está muy de moda lo del “Modo Oscuro”.  
La mayoría de los dispositivos ya vienen con la opción a nivel de OS de configurar el “modo oscuro” para que las aplicaciones adapten sus colores dependiendo de cómo lo tengamos configurado.

**¿Pero qué pasa con las páginas web?**  
Bien, pues hoy os traigo un sencillo código CSS mediante el cual podremos hacer que los colores de nuestra web se adapten al “modo oscuro” dependiendo de la configuración del dispositivo de cada usuario.

Lo que tendremos que usar es la función *prefers-color-scheme*.  
La cual nos permitirá detectar si un usuario tiene activado o no el modo oscuro.

#### PREFERS-COLOR-SCHEME

El prefers-color-scheme tiene tres opciones:

- prefers-color-scheme: no-preference
- prefers-color-scheme: light
- prefers-color-scheme: dark

Vamos a ver un ejemplo:

```css
@media (prefers-color-scheme: dark) {
  .body.dark-scheme {
    height: 100%;
    background: black;
    color: white;
  }
}
Con este código le estaremos diciendo al navegador que si el dispositivo tiene el “modo oscuro” (dark), modifique el color de fondo a negro y el texto a blanco.

Os animo a probar y experimentar con el código prefers-color-scheme.

Por si lo necesitáis os dejo un código de ejemplo en mis CodePen’s.

<iframe src="https://codepen.io/AJRA_TONI/embed/preview/ExYKrZd?height=600&slug-hash=ExYKrZd&default-tabs=css,result&host=https://codepen.io" width="700" height="525" frameborder="0" scrolling="no"></iframe>
Y recordad, si necesita ayuda para implementar el modo oscuro en vuestras webs podéis contactar conmigo y os ayudaré en todo lo posible.