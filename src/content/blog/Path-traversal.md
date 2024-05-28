---
title: 'Path traversal'
description: 'Vulnerabilidad de salto de directorios para recorrer entre rutas y listar contenido.'
pubDate: 'May 27 2024'
---

## Path Traversal

_Path traversal_ (salto de directorios) o _Directory Traversal_ es una vulnerabilidad en la cual podermos recorrer directiorios del sistema para visualizar u obtener archivos de nuestro interés.

Las oportunidades que tenemos para explotar esta vulnerabilidad es cuando un parámetro tiene el valor de un archivo, en este caso sería un HPP (Http Parameter Polution), y así poder enumerar los archivos existentes en el servidor.

## Basic Path Traversal

Cuando se hace uso de un parámetro que necesita un archivo como imágenes o cualquier tipo de contenido que se necesite mostrar y cuya información esté contenida en un archivo, podemos extraer información de estos archivos mediante el paso del parámetro. Podemos cambiar la entrada de este parámetro para recorrer los directorios y visualizar el contenido de los archivos o explotar otras vulnerabilidades como **Comand injection** u otro tipo de ataques.

Imaginemos que tenemos una web con la siguiente URL:

```bash
https://insecure-web.com/
```

Esta página puede ser un blog, servicio de correos, etc. El punto crítico aquí es que el contenido de ciertas imágenes es dinámico y embeben su `src` de manéra dinámica con URLs relativas que tienen la siguiente estructura:

```html
<img src="resources/images?filename=doll.jpg" >
<img src="resources/images?filename=lady-maria.jpg" >
<img src="resources/images?filename=gherman.jpg" >
...
```

En este caso vemos que tras bambalinas se usa la misma ruta y lo que cambia es el valor del parámetro. Nuestra intención --inicialmente-- para ver si nuestro ataque es posible es cambiar la url a la que accedemos con el valor del `src` que contienen las imágenes y cambiar el valor de este caso `filename` a `/etc/passwd`.

> <span style="display: flex; align-items: center;color: var(--blue); margin-bottom: 0rem;"><span style="font-family: 'Material'; font-size: 1.25rem; margin-right: .5rem">edit_note</span> **Nota** </span>
> La ruta `resources/images` no es necesariamente una ruta que se nos presente de manera normal en la web, solo que nos damos cuenta de esto porque se embebe en las imágenes y segundo, **la ruta no es necesariamente accesible por nosotros así que ojo**.

```bash
https://insecure-web.com/resources/images?filename=/etc/passwd
```

En este punto pueden pasar dos cosas, que la web nos muestre el archivo ya que acepta rutas absolutas o que trabaje desde una ruta relativa y no se nos muestre nada o al revés, entonces lo que podemos hacer en este segundo caso es recorrer o mejor dicho ascender en los directorios con los dos puntos consecutivos `../` de la siguiente forma:

```bash
https://insecure-web.com/resources/images?filename=../../../../../../../../../etc/passwd
```

La cantidad de puntos extra no importa, por ejemplo supongamos que con la ruta relativa el servidor está trabajando con `/var/www/resources/images`, entonces solo serían necesarios **cuatro ascenciones de directorio** `../`, pero realmente no podemos estár seguros así que ponemos más para asegurarnos de que ascienda hasta el directorio raíz del sistema y recien entre a los archivos que queremos que nos muestre, el exceso de ascenciones no tiene efectos negativos así que es mejor hacer esto para asegurarnos del recorrido.

En un caso inverso, la página tiene protección contra recorrido de directorios `../` pero que se les haya olvidado una protección contra rutas absolutas.

> <span style="display: flex; align-items: center;color: var(--red); margin-bottom: .75rem;"><span style="font-family: 'Material'; font-size: 1.25rem; margin-right: .5rem">priority_high</span> **Importante** </span>
> Puede que en la página no se muestre el contenido que buscamos por x factores, ya sea formato admitido, longitud, etc. La posible solución a esto es un proxy como **Burpsuite** o **ZAP**, pero es importante realizar o analizar la respuesta con estos ya que la respuesta puede ser algo distinta o como querriamos ver y diferir de la que nos muestra el navegador.

## Eliminación de recorrido

Con eliminación de recorrido nos referimos a que se evalua la entrada o ruta que proporcionamoss al inyectar una ruta y que esta contiene los carcteres `../`, para evitar la brecha de seguridad estos caracteres se eliminan. La implementación es coherente y funciona, pero algunas malas implementaciones o la falta de recursividad hace que podamos burlar este sistema de sanitización.

Esta sería una función en PHP que elimina todas las coincidencias de ruta que contengan `../`, pero esto solo se hace una vez.

```php
function eliminarTraversal($ruta) {
    return str_replace("../", "", $ruta);
}

// Ejemplo de uso
$rutaEntrada = "../../etc/passwd";
$rutaSegura = eliminarTraversal($rutaEntrada);
echo "Ruta segura: " . $rutaSegura;   

// Ruta segura: etc/passwd
```

Esto parece seguro, pero tiene un fallo, que podemos mezclar caracteres que al ser eliminados nos retornen el resultado que queremos, por ejemplo la siguiente ruta:

```php
$entrada = "....//....//....//....//....//....//etc/passwd"
$rutaSegura = eliminarTraversal($rutaEntrada);
echo "Ruta segura: " . $rutaSegura;

// Ruta segura: ../../../../../../etc/passwd

// explicación

$cadena = "....//"
// se elimina los tres caracteres de en medio ya que solo estos coinciden
$cadena_resultante = "../"
```

En este caso solo se elimina una vez ya que solo se ejecuta una función normal y no de manera recursiva, entenderlo es simple, pero es una oportunidad de recorrer directorios que tienen un filtro no muy robusto.

## Codificación y codificación doble

En muchos casos, existirá una lista blanca, negra u otro tipo de mecanismos que eliminarán o desinfectarán nuestra entrada, esto puede evadirse con la codificación URL o una codificación URL doble, la cual nos permitirá evadir filtros de protección.

```bash
# texto plano
../

# url encoded
..%2f                         # %2f es --> /

# doble url encoded
..%252f                       # %25 es --> %
```

Algunas veces podremos no tener resultados con la primer codificación, entonces pasemos a una segunda -- no sé si hasta una tercera --, pero mientras más pruebes y entiendas cómo funciona, mejor.

Existen codificaciones alternativas para hacer tu payload como [UTF-8](https://en.wikipedia.org/wiki/UTF-8), te recomendamos buscar "utf-8 overlong", [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) y [RFC 3629](https://www.rfc-editor.org/rfc/rfc3629) que te pueden ayudar en esto pero no estoy muy seguro de cómo encontrar más info, esto es lo que me dejó chatGPT:

Las codificaciones que mencionas, `..%c0%af` y `..%ef%bc%8f`, son ejemplos de intentos de evasión mediante el uso de codificaciones no estándar para realizar ataques de path traversal (también conocidos como directory traversal). Estas codificaciones específicamente apuntan a representar secuencias de caracteres que pueden ser interpretadas por el servidor o la aplicación web como el carácter de barra inclinada ("/") o la secuencia "../", que son comúnmente utilizadas en estos ataques para navegar a través de los directorios del sistema de archivos.

1. **"..%c0%af"**: Esta secuencia intenta representar una barra inclinada ("/") utilizando una codificación **`overlong UTF-8`**. "%c0%af" es una forma overlong de codificar el carácter "/", que debería ser simplemente "%2F" en una codificación porcentual estándar. Algunos procesadores de URL pueden no validar correctamente las formas overlong y tratar este patrón como una barra inclinada legítima, permitiendo la navegación de directorios.
    
2. **"..%ef%bc%8f"**: Similarmente, esta secuencia representa un intento de codificar el carácter "/", pero utilizando otra representación. En este caso, "%ef%bc%8f" es la representación UTF-8 del carácter de barra inclinada en el bloque de caracteres de ancho completo y medio ancho del estándar Unicode, que algunas aplicaciones pueden interpretar como un carácter de barra inclinada regular.
### Dónde encontrar más información:

- **Documentación sobre URL y URI**: Revisar las especificaciones de RFC 3986 (Uniform Resource Identifier) y RFC 3629 (UTF-8) puede proporcionarte una base sólida sobre cómo se supone que deben ser codificados los caracteres en las URLs y las peculiaridades de la codificación UTF-8.
    
- **Recursos de seguridad informática y pentesting**: Los blogs, foros y manuales de herramientas de seguridad informática como OWASP (Open Web Application Security Project) frecuentemente discuten técnicas de evasión, incluyendo el uso de codificaciones no estándar para ataques de path traversal y otros vectores de ataque.
    
- **Fuentes sobre codificación de caracteres**: Explorar la documentación y recursos sobre codificación de caracteres Unicode y UTF-8 puede ayudarte a entender cómo se pueden explotar las representaciones alternativas de caracteres para evadir filtros o controles de seguridad.

## Ruta base requerida

En algunos casos se pone como requerimiento de una ruta base, por ejemplo el programa tiene una ruta base y un archivo al que apunta:

```bash
https://insecure-web.com/resources/images?filename=/var/www/images/my_image.jpg
```

En este caso si borramos la ruta `/var/www/images` puede no pasar nada o informarsenos de un error, en ambos casos podemos probar si solo dejando la ruta pero sin poner el archivo de destino que en este caso es `my_image.jpg`, si cambia algo o se nos muestra un error, etc. El análisis nos dirá qué hacer, pero en este caso es erquerida la ruta, lo que podemos hacer es:

```bash
https://insecure-web.com/resources/images?filename=/var/www/images/../../../etc/passwd
```

El prefijo no impide que la ruta que proporcionemos no pueda moverse de manera ascendente. A partir de este punto podemos combinar técnicas y pensar mil y un cosas para evadir todos los filtros que tengamos en frente.

## Extensión requerida

En algunos casos la extensión del archivo que se carga es una extensión específica o un conjunto específico, si esto es así, podemos hacer uno del `NULL BYTE` que esto significa fin de linea en otras palábras.

En todos los lenguajes de programación las cadenas o _strings_ solo son un arreglo de caracteres, bueno, para delimitar la cadena o saber que cierta cadena termina en un punto se hace uso del `NULL BYTE (\0 o \x00 en hexadecimal)`, aquí tenemos un ejemplo en el lenguaje C:

```c
char cadena[20];

cadena[0] = "H";
cadena[1] = "o";
cadena[2] = "l";
cadena[3] = "a";
cadena[4] = "\0"; // Este 0 es obligatorio
// El cero al final es una manera de especificar que ahí termina la cadena.

char str[] = "hello\0world";
printf("%s\n", str);     // hello
```

Este es un breve concepto, la implementación en los distintos lenguajes es distinto, pero funciona porque las utilidades o lo necesario para tratar y procesar la cadena ya no depende del lenguaje si no que se hace a bajo nivel y estos y leen el `NULL BYTE`, en consecuencia el ataque es posible.

Como el `NULL BYTE` es leido, pero lo que le sigue tambien ya que las cadenas en los lenguajes no interpretan esto como un fin de linea procesan la extensión que ellos quiere que el archivo tenga mientras que el programa procesa y realiza operaciones con la cadena, en algún punto se trunca gracias a este y el ataque se hace posible. Un ejemplo:

```bash
https://insecure-web.com/resources/images?filename=../../../etc/passwd%00.png
```

El `NULL BYTE` codificado a _URL encode_ hace su trabajo y trunca la cadena, pero como la extensión es una extensión admitida, se muestra el archivo de manera correcta y evadiendo el filtro.

> <span style="display: flex; align-items: center;color: #E4E65D; margin-bottom: .75rem;"><span style="font-family: 'Material'; font-size: 1.25rem; margin-right: .5rem">warning</span> **Advertencia** </span>
> Todo el contenido relacionado con el _hacking_ presentado tiene únicamente fines didácticos y académicos. Mi objetivo es promover la educación y el conocimiento en área de la seguridad informática y la conciencia sobre la ciberseguridad. Rechazo el uso de técnicas de hacking y el contenido aquí mostrado para actividades ilegales o maliciosas.
