---
title: 'Google Dorking'
description: 'Busquedas avanzadas en google para encontrar fugas de información o contenido oculto.'
pubDate: 'May 27 2024'
heroImage: '/images/hacking/google-dorking.webp'
---

## Google dorking - cheat sheet

Hoja de trucos para realizar búsquedas más efectivas en google mediante filtros. Puedes concatenar estos filtros para tener una búsqueda muy precisa.

Si no sabes qué es "google dorking" aquí te va una explicación breve: Google dorking o Google hacking, es una técnica de consultas avanzadas en el motor de búsqueda de Google para descubrir información sensible o restringida que normalmente no debería estar disponible públicamente, como archivos confidenciales, contraseñas y otro tipo de datos expuestos en sitios web y servidores.

Puedes utilizar [Advanced search - google](https://www.google.com/advanced_search), que es la página oficial de búsquedas avanzadas de google.

| Filtro   | Descripción                                                                                              | Sintaxis                            |
| -------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Site     | Busca en un sitio / web en específico.                                                                   | término site:website.com            |
| InURL    | Busca una cadena que se encuentre dentro de la URL.                                                      | inurl:"/path/archive.php"           |
| InTitle  | Busca un título de página que contenga una cadena.                                                       | intitle:"index of"                  |
| Link<br> | Busca si la página tiene enlaces a otra.                                                                 | link:"otrapagina.com"               |
| FileType | Busca que la página solicitada sea un tipo de archivo en específico.                                     | filetype:pdf                        |
| Wildcard | Es un comodín que significa "cualquier cosa" (como el de linux).                                         | how to \* path hijacking            |
| Quotes   | Fuerza la coincidencia de la búsqueda.                                                                   | "local file inclusion"              |
| Or       | Busca dos o más términos.                                                                                | SSRF OR Server side request forgery |
| Minus    | Excluye los términos que pongamos de los resultados.                                                     | -php                                |
| Intext   | Asegura que el fragmento de texto esté contenido en la página o documento.                               | intext:"half life"                  |
| Caché    | Podrá ver versiones antiguas de un sitio web o acceder a archivos que han sido eliminados recientemente. | cache:"twiter.com/s4vitar"          |
