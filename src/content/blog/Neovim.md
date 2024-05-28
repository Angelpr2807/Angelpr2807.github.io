---
title: 'Neovim'
description: 'Aprendiendo a usar el editor de texto basado en terminal llamado "neovim".'
pubDate: 'May 28 2024'
---

## Neovim

Notas sobre neovim, instalación, uso, cheatsheet, plugins, etc.

> <span style="display: flex; align-items: center;color: var(--red); margin-bottom: .75rem;"><span style="font-family: 'Material'; font-size: 1.25rem; margin-right: .5rem">priority_high</span> **Importante** </span>
> Toda la información es extraida de [Learn vim](https://github.com/iggredible/Learn-Vim) y modificada ligeramente a mis necesidades, por favor, apoyen al material original y mandenle un saludo de mi parte :).

## Conceptos básicos

Comandos básicos, modos, etc.

**Abrir neovim:**

```bash
nvim                    # Forma normal.
nvim <file>             # Abrir archivo especifico.
nvim <file1 file2 ...>  # Abrir multiples archivos (en buffers separados).
```

Multiplexores: Abrir multiples ventanas de neovim en una sola terminal.

```bash
nvim -o[num]       # Abre num ventanas de forma horizontal.
nvim -O[num]       # Abre num ventanas de forma vertical.
# No se pueden combinar estos parámetros.

nvim -o[num] <file1 file2 ...fileN> # Abrirá num ventanas y en las N primeras pondrá los archivos del uno al N. 
```

Argumentos: 
Puedes revisar estos argumentos en la página del manual con el comando `man nvim`.

```bash
nvim [options] [file ...]
nvim [options] -
nvim [options] -t tag
nvim [options] -q [errorfile]
```

Los argumentos (no sé si todos) se pueden pasar como comandos y no solo en la terminal. Hablando de los comandos, no es necesario escribir los comandos en su totalidad, a medida que vayas escribiendo, puedes presionar `Tab` para listar comandos que coincidan con lo que estás escribiendo o si el comando ya se distingue de otros y no has terminado de escribirlo puedes ejecutarlo sin culminarlo ya que como es distinguible neovim sabrá deducirá el comando que quieres ejecutar.

```bash
:version       # La version de neovim
```

**Autocompletado:**

Cuando escribes un comando, puedes presionar `Tab` para autocompletarlo y/o ver sugerencias de comandos. Imagina que tienes tres archivos de nombre `text1.txt, text2.txt y text3.txt` y quieres abrir uno de estos.

```bash
:edit t<Tab>
```

Al presionar `Tab` se abrirá una ventana emergente que mostrará todas las sugerencias que empiecen con "t", que serian los tres archivos y al presionar enter expande el resultado que seleccionamos.

```bash
:edit text1.txt
```

**Comodines:**

Como en bash, puedes poner comodines para que te muestre todas las coincidencias que buscas.

```bash
:edit *.txt<Tab>
```

En este caso nos mostrará todos los archivos con extensión ".txt" que existan en nuestro directorio para poder seleccionarlos.

**Modos:**

Aquí está el corazón de vim/neovim.

- **Normal:** Puedes ejecutar combinaciones de teclas, moverte y ejecutar comandos.
- **Inserción:** Editar el texto.
- **Visual:** Puedes seleccinar con el cursor.
- **Select:** Similar al modo visual.
- **Replace:** Reemplazar caracteres.

**Salir de vim:**

```bash
:q       # Salir de manera normal (abreviado).
:quit    # Salir de manera normal (extendido).
:q!      # Salir sin guardar cambios (forzado).
```

**Guardar:**

```bash
:w             # Guardado normal.
:w <file.some> # Guardar en archivo especifico.
:wq            # Guardar + salir.
:x             # Lo mismo que ":wq".
```

**Ayuda:**

```bash
:help                 # Ayuda (extendido).
:h                    # Ayuda (abreviado).
:h <term>             # Paginas de termino especifico.
:h <command>          # Paginas de comando especifico.
:h <mode>_<command>   # Paginas de comando en modo especifico.
```

**Suspender neovim:**

Suspender neovim es ponerlo en segundo plano para volver a editarlo despues (mientras la terminal siga abierta, caso contrario, todos los procesos de fondo se eliminarán).

```bash
:stop
:suspend
Ctrl + z
```

Devolverlo a primer plano:

```bash
fg [idJob]       # El id puede no ser necesario (No estoy seguro).
```


## Ventanas

Las ventanas o pestañas de vim/neovim trabajan con tres abstracciones de visualización: 

- **Buffers:** Un "buffer" es un área de almacenamiento en la memoria donde se guarda el contenido de un archivo que estás editando (solo el contenido, no tiene nada que ver con la ventana ni la pestaña). Cuando abres un archivo en Vim, su contenido se carga en un buffer para que puedas ver y editar el texto.

- **Ventanas:**  Una "ventana" se refiere a una región en la pantalla donde se muestra el contenido de un buffer. Puedes tener múltiples ventanas abiertas en Vim, cada una mostrando diferentes partes del mismo archivo o mostrando contenido de distintos buffers.

- **Pestañas:** las "pestañas" son contenedores que pueden alojar conjuntos de ventanas y buffers. Se utilizan para organizar y trabajar con varios conjuntos de archivos de manera más estructurada.

### Buffers

Al abrir multiples archivos directamente con el comando `nvim` notarás que solo se muestra una ventana y una pestaña, pero abriste dos buffers, entonces, cómo sé que realmente los demás archivos se cargaron? Los comandos de buffer nos permitirán listarlos.

```bash
# Se abren 3 archivos con su respectivo buffer, pero solo se muestra text1.txt. 
nvim text1.txt text2.txt text3.txt

# Comandos para listar buffers
:buffers        # lista todos los buffers existentes.
:files          # lo mismo que buffers.
:ls             # lo mismo que buffers.```
```

Navegación:

```bash
#navegar entre buffers
:bnext             # siguiente buffer.
:bprev[ious]       # buffer anterior.
:buffer [num]      # Buffer con numero especifico (listado).
:buffer file.some  # Buffer de archivo especifico.

Ctrl + o    # Buffer anterior (no solo los que abres, tambien los anteriores. Se crearán buffers por cada archivo que abras).
Ctrl + i    # Buffer siguiente. 
```

Eliminar buffers:

```bash
# Borrar buffers
:bdelete <num>     # Buffer con numero num (ls).
:bdelete <file>    # Buffer con nombre file.
```

Cerrar buffers:

```bash
:qall        # Cerrar todos los buffers.
:qall!       # Cerrar todos los buffers sin guardar.
:wqall       # Guardar y cerrar todos los buffers.
:xall        # Lo mismo que ":wqall".
```

### Ventanas

Son las abstracciones gráficas que nos muestran el buffer de manera visual.

Abre una ventana:

```bash
nvim archivo1.txt
```

Deberás ver el buffer del archivo que abriste, pero ahora si quiero abrir otro archivo pero en la misma ventana?, puedes ejecutar el siguiente comando dentro de neovim:

```bash
:split archivo2.txt  # abrir archivo en pestaña horizantal encima de la actual
:vsplit archivo2.txt # abrir archivo en pestaña verticale a la derecha de la actual
```

Se abrirá otra ventana en la parte superior con el buffer de `archivo2.txt` y así con cada archivo que abras.

Comandos para navegar entre las ventanas:

```bash
Ctrl-W H    # Moves the cursor to the left window
Ctrl-W J    # Moves the cursor to the window below
Ctrl-W K    # Moves the cursor to the window upper
Ctrl-W L    # Moves the cursor to the right window
```

Abrir un buffer en una ventana especifica. Si te posicionas en una ventana y escribes:

```bash
:buffer archivoN.txt
```

Se abrirá en esa ventana el buffer seleccionado.

**Abrir multiples ventanas:**

Si abriste un archivo y tienes el cursor en este se abrirán ventanas con ese buffer:

```bash
Ctrl-W V  # Opens a new vertical split
Ctrl-W S  # Opens a new horizontal split
Ctrl-W C  # Closes a window
Ctrl-W O  # Makes the current window the only one on screen and closes other windows
```

Si ejecutas el comando new se abrirá una ventana en blanco y a partir de ahí podras trabajar:

```bash
:new    [file]
:split  [file]
:vsplit [file]
```

**Pestañas:**

Las pestañas son como las de un navegador, las de windows, etc.

```bash
:tabnew [archivo]   # abre una nueva pestaña.
```

```bash
:tabnew file.txt    Open file.txt in a new tab
:tabclose           Close the current tab
:tabnext            Go to next tab
:tabprevious        Go to previous tab
:tablast            Go to last tab
:tabfirst           Go to first tab
```

Desplazamiento entre pestañas:

```bash
# en modo normal
gt     # Siguiente pestaña.
gT     # Pestaña anterior.
```

## Trabajando con archivos

Puedes abrir neovim sin argumentos y se te abrirá el editor en blanco, y estando ahí puedes abrir archivos con el comando:

```bash
:edit <file>
```

Si el archivo existe abre este, caso contrario lo crea.

> <span style="display: flex; align-items: center;color: var(--blue); margin-bottom: 0rem;"><span style="font-family: 'Material'; font-size: 1.25rem; margin-right: .5rem">edit_note</span> **Nota** </span>
>  Si ejecutas muchos `edit` comandos se abrirán como buffers en ventanas distintas, como si ejecutaras `nvim <file1> <file2> ... <fileN>`. El comportamiento es apilar cada buffer, las ventanas estan encima y por debajo de otras.
> Para ver todos los buffers ejecuta `:ls` en el modo normal.

Podemos trabajar con un explorador de archivos nativo de neovim que se abre con el caracter punto (".") y que parte de nuestro directorio actual.

```bash
:edit .
```

Ahora que estamos trabajando con rutas podemos crear archivos, directorios, renombrar, etc (debes estar en el modo `edit .` para poder hacer esto).

```bash
%    Create a new file
d    Create a new directory
R    Rename a file or directory
D    Delete a file or directory
```

## Movimiento

**Movimiento básico:**

| Tecla | Posición              | Tecla | Posición             | Tecla    | Posición                |
| ----- | --------------------- | ----- | -------------------- | -------- | ----------------------- |
| h     | izquierda             | l     | derecha              | w        | inicio sig. palabra     |
| j     | arriba                | k     | abajo                | e        | fin sig. palabra        |
| W     | inicio sig. PALABRA   | E     | fin sig. PALABRA     | b        | inicio ant. palabra     |
| B     | inicio ant. PALABRA   | %     | altern. brackets     | $        | fin de linea            |
| ge    | fin ant. palabra      | gE    | fin ant. PALABRA     | 0 (cero) | inic. de linea          |
| ^     | 1 char de linea       | g_    | ult. char. de linea  | n\|       | n colum de linea        |
| {     | ant. párrafo          | }     | sig. párrafo         | n%       | n porciento del archivo |
| gg    | inicio archivo        | G     | fin archivo          | nG       | linea número n          |
| zt    | cursor inicio ventana | zz    | cursor medio ventana | zb       | cursor fin ventana      |

## Modificación

```bash
d + [[i|a] dpshjklwtbe...]      # eliminar
d + i <caracter>                # eliminar el contenido dentro de ...
d + a <caracter>                # eliminar el contenido mas el caracter ...

# caracteres
w                               # Una palabra
p                               # Un párrafo
s                               # Una sentencia
( or )                          # Pares de ( )
{ or }                          # Pares de { }
[ or ]                          # Pares de [ ]
< or >                          # Pares de < >
t                               # etiquetas XML

# Pares de comillas
"        
'        
`        
```

Por ejemplo si tienes:

```jsx
const hello = function() {
  console.log("Hello Vim");  // di + ( -->  console.log();
  console.log("Hello Vim");  // da + ( -->  console.log;
  return 
	<div>
	  <h1>Header1</h1>       ${/* di + t --> <h1></h1> */}
	  <h1>Header1</h1>       ${/* da + t --> vacío*/}
	  <p>Paragraph1</p>
	  <p>Paragraph2</p>
	</div>
}
```

**Para buscar más sobre esto ejecuta el comando `:help text-objects`.**

## Busqueda

| Tecla | Posición             | Tecla        | Posición                     | Tecla    | Posición                     |
| ----- | -------------------- | ------------ | ---------------------------- | -------- | ---------------------------- |
| /     | Buscar desp. cursor  | ?            | buscar ant. cursor           | n        | sig. coincidencia            |
| //    | Ejec. Busq. anterior | Ctrl + p     | Anterior busqueda (/ comnd)  | Ctrl + n | Siguiente busqueda (/ comnd) |
| N     | ant. coincidencia    | \*            | sig. palabra igual al cursor | #        | ant. palabra igual al cursor |

><span style="display: flex; align-items: center;color: var(--red); margin-bottom: .75rem;"><span style="font-family: 'Material'; font-size: 1.25rem; margin-right: .5rem">priority_high</span> **Importante** </span>
> Si quieres hacer busquedas con regexp por lo general tendrás que escapar algunos caracteres para que no los tome de manera literal como `{}` para los contadores o `|` para un patron u otro, cuantificadores como `+, ?, ...` y así.
> Si no quieres escaparlo inicia la secuencia de regexp con `\v` (magic syntax) por ejemplo: `/\v(id|div)+`  porque sin `\v` sería `/\(id\|div\)\+`.

```bash
\d   # Digito [0-9]
\D   # No digito [^0-9]
\s   # Caracteres de espaciado (espacio y tab)
\S   # Caracteres de no espaciado (todo excepto espacio y tab)
\w   # Alfanumérico [0-9A-Za-z_]
\l   # Caracteres en minuscula [a-z]
\u   # Caracteres en mayuscula [A-Z]
```

## Sustitución

Para sustitución básica (en la linea del cursor) puedes ejecutar:

```bash
:s/pattern/replace/[flag]
```

Las banderas o [flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#advanced_searching_with_flags) son modificadores que permiten alterar cómo se tratan las [expresiones regulares](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions).

```bash
&   # Reuse the flags from the previous substitute command.
g   # Replace all matches in the line.
c   # Ask for substitution confirmation.
e   # Prevent error message from displaying when substitution fails.
i   # Perform case insensitive substitution.
I   # Perform case sensitive substitution.
```

Para una sustitución extendida (% significa de archivo completo, pero solo la primer coincidencia de cada linea) ejecutamos:

```bash
:%s/pattern/replace/[flag]
```

En el tópico de [Busqueda](#Busqueda) vemos la combinación de teclas `//` que es la busqueda anterior que se hizo y podemos aprovechar eso, por ejemplo buscamos `/hola`, entonces al ejecutar `//` estariamos buscando "hola" y podemos reemplazarlo en nuestra sustitución.

```bash
:[%]s//replace/[flag]
```

y el comando `:s` o la tecla `&` son un shortcut para nuestro último reemplazo, por ejemplo:

```bash
:s/hola/mundo   # Sustitución básica
:s              # --> ejecuta :s/hola/mundo
&               # --> lo mismo que :s
```

**Sustitución entre rangos:**

Podemos sustituir en lineas especificas o entre lineas especificas, del siguiente modo

```bash
"El formato [some] es de un parámetro opcional y el formato <some> es de un parámetro requerido"

# Formato
:[[inicio],[fin]]s/pattern/replace/[flag]  # formato general.

:<num>s/pattern/replace/[flag]              # Solo reemplaza en la linea num.
:<num>,s/pattern/replace/[flag]             # empezando en la linea num hasta la actual.
:,<num>s/pattern/replace/[flag]             # Desde la linea actual hasta la linea num.
:<i>,<f>s/pattern/replace/[flag]            # Desde la linea i hasta la linea f.

#Ejemplos
:3s/pattern/replace/[flag]          # Reemplaza la liena 3.
:3,s/pattern/replace/[flag]         # Reemplaza desde la linea 3 hasta la actual.
:,80s/pattern/replace/[flag]        # Reemplaza desde la linea actual hasta la linea 80.
:1,6s/pattern/replace/[flag]        # Reemplaza desde la linea 1 hasta la linea 6.
```

> <span style="display: flex; align-items: center;color: var(--blue); margin-bottom: 0rem;"><span style="font-family: 'Material'; font-size: 1.25rem; margin-right: .5rem">lightbulb</span> **Tip** </span>
> El caracter `\0` y el caracter `&` representan al patron coincidente, ten esto en cuenta cuando quieras agregar cosas a algo que ya tienes, por ejemplo si quieres agregar comillas a tus números ejecuta `:%s/\d\+/"\0"` o `:%s/\d\+/"&"` que busca todos los números y los encierra entre comillas ya que `\0` y `&` representan a `\d\+` (nuestro patron de búsqueda).
>
> **Los caracteres no guardan las banderas**.

**Cambiar posición:**

Por ejemplo si quieres intercambiar la posición de muchas cosas puedes tener grupos en tus regex e intercalar su orden.

```bash
# contenido del archivo
let one = "1";
let two = "2";
let three = "3";

# comando
:%s/\v(\w+) (\w+)/\2 \1

# resultado
one let = "1";
two let = "2";
three let = "3";
```

- Cada `(\w+)` es un [grupo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences#types) (porque están entre paréntesis en una regexp) y cada grupo está enumerado por un índice que empieza en uno y termina en el número de grupos que exista.

- \\1 y \\2 son los índices, entonces estamos diciendo que busque el patron el la primera expresion y en la segunda le decimos que ponga el grupo dos al inicio y el grupo uno después o al final (que en este caso es lo mismo).

Solo considerará los grupos existentes, por ejemplo poner `\3` no hará nada.

**Cambiar delimitador de sustitución:**

A veces tendremos la necesidad de cambiar el delimitador ya que es complejo verlo si trabajamos sin `magic` o con urls, etc. Cambiarlo es tan simple como reemplazarlo con cualquier caracter de un byte unicode que **no sean letras del alfabeto, números o `"`, `|`y `\`**.

```bash
# + es el delimitador
:s+https:\/\/mysite.com\/a\/b\/c\/d\/e+hello+

# sin cambio de delimitador
:s/https:\/\/mysite.com\/a\/b\/c\/d\/e/hello/
```

Esto mejora la legibilidad.



## Deshacer

| Tecla      | Posición                 | Tecla    | Posición               | Tecla    | Posición                      |
| ---------- | ------------------------ | -------- | ---------------------- | -------- | ----------------------------- |
| u          | Deshacer último cambio   | Ctrl + r | Rehacer último cambio  | U        | Deshace todos cambios (linea) |
| Ctrl + g u | Delimitar bloque cambio  | g + "+"  | Deshacer cambios arbol | g + "-"  | Rehacer cambios arbol         |

## Insert mode

El modo de insersión de texto permite la edición de texto, pero comúnmente vas a intercalarlo con el normal para ejecutar comandos o desplazarte.

| Tecla    | Posición                 | Tecla    | Posición               | Tecla    | Posición               |
| -------- | ------------------------ | -------- | ---------------------- | -------- | ---------------------- |
| i        | Insert. antes cursor     | I        | Insert. antes linea    | a        | Insert. despues cursor |
| A        | Insert. fin linea        | o        | Insert. debajo linea   | O        | Insert. encima linea   |
| s        | Del. char & insertar     | S        | Borra linea & insert   | b        | inicio ant. palabra    |
| Ctrl + h | Borrar anterior caracter | Ctrl + w |Borrar palabra anterior | Ctrl + u |Borrar linea            |

Para ejecutar comandos ejecuta (en el modo inserción):

```bash
Ctrl + o !! <comando>
```

Cuando se procesa y termina la ejecución del comando.

## Comando punto

El comando punto nos permite rehacer cambios rapidamente.

```js
let one = "1";
let two = "2";
let three = "3";
```

Ejecute los siguientes comandos:

```bash
/let
cwconst<Enter>
```

Ahora con `n` posicionate en el siguiente `let` y presiona la tecla punto ".", verás que `let` se cambió por `const`. El último cambio ejecutado se guarda en un buffer y el punto lo ejecuta nuevamente donde se posiciona el cursor para acortar este.

## Visual mode

El modo visual es similar a seleccionar fragmentos largos manteniendo click en editores de texto con interfaz gráfica.

| Tecla    | Posición                   | Tecla    | Posición               | Tecla    | Posición                |
| -------- | -------------------------- | -------- | ---------------------- | -------- | ----------------------- |
| v        | Modo visual (normal)       | V        | Modo visual (linea)    | Ctrl + v | Modo visual (bloque)    |
| gU       | Conv. mayusculas selec.    | gv       | Modo visual anterior   | o        | Intercalar posc. cursor |
| x        | Eliminar texto selec.      | y        | Copiar seleccion       | d        | Eliminar texto selec.   |
| r [char] | Reemp. toda linea por char | -        | -                      | -        | -                       |

Para **reemplazar en bloque** ejecuta (en cualquier modo visual) el siguiente comando sin borrar nada que genere neovim:

```bash
:s/string/replace/g
```

Esto sería un ejemplo (los corchetes son la seleccion del modo visual):

```js
[let num1 = 1;
let num2 = 2;]
let num3 = 3;
let num4 = 4;
```

Al ejecutar el comando `:s'<,'>/const/let/g` el resultado sería:

```js
const num1 = 1;
const num2 = 2;
let num3 = 3;
let num4 = 4;
```

El fragmento `'<,'>` se refiere al bloque en sí así que no te preocupes por lo que hace, solo debes saber que establece tu bloque seleccionado.

**Insertar texto en bloque:**

Para agregar texto en un bloque debes estár en el modo visual de bloque `Ctrl + v` y posicionar tu cursor donde desees, luego de ello presiona las teclas `A` (insertar despues del cursor de fin) o `I` (Insertar antes del cursor de inicio).

```js
[const num1 = 1
const num2 = 2
let arr3 = [3,"tres"]
l]et str4 = "cuatro"
```

En este caso empezamos en la "c" de `const num1`, presionamos `Ctrl + v` y presionamos `3j` lo que seleccionará la primer letra de cada linea, posteriormente presionamos `$` lo que hará que se seleccione desde el principio hasta el fin de cada linea y aquí entra en juego las letras `A` o `I`.

Si en este punto ejecutamos `A` y escribimos `;` solo se mostrará que se modificó la primer linea, pero para que se apliquen los cambios en toda la linea debemos presionar `<Esc>`:

```js
const num1 = 1;
const num2 = 2;
let arr3 = [3,"tres"];
let str4 = "cuatro";
```

Y si en caso contrario hubieramos presionado `I` lo que escribamos se pondrá antes de la primer letra de cada linea, por ejemplo escribamos "$" y presionemos `<Esc>`:

```js
$const num1 = 1
$const num2 = 2
$let arr3 = [3,"tres"]
$let str4 = "cuatro"
```

Como explicamos es **antes y despues de la selección, no del cursor** a tener en cuenta.

> <span style="display: flex; align-items: center;color: var(--blue); margin-bottom: 0rem;"><span style="font-family: 'Material'; font-size: 1.25rem; margin-right: .5rem">edit_note</span> **Nota** </span>
> Si está en el modo visual normal puede ejecutar el comando `:normal! [A|I]<string>` para insertar texto en bloque del mismo modo que ya vimos. Se ponen al inicio o final de la linea (según hayas escogido `A` o `I`) y no importa que hayas seleccionado solo una porcion y no toda la linea, la inserción se hará en estos.


**Incremento y disminucion:**

Los comandos para incrementar y hacer decremento (en el modo visual bloque) son `Ctrl + a` y `Ctrl + x` respectivamente.

La utilidad `$` de [Emmet - item numbering](https://docs.emmet.io/abbreviations/syntax/#item-numbering) es lo más parecido a estas utilidades, por ejemplo:

```html
<div id="app-1"></div>
<div id="app-[1"></div>
<div id="app-1"></div>
<div id="app-1"></div>
<div id="app-1]"></div>
```

> [!Warning]
> Está seleccionado desde la segunda fila por una razón, si empezamos por la primera fila va a incrementar todo de manera secuencial `2, 3, 4, 5 y 6`, pero lo que queremos esque empiece en `1, 2, 3, 4, 5` por eso el cursor empieza en segunda posición.

El modo es el visual por bloque y solo tomando los unos, ahora presionaremos `g Ctrl + a` para incrementar, con cual se verá así:

```html
<div id="app-1"></div>
<div id="app-2"></div>
<div id="app-3"></div>
<div id="app-4"></div>
<div id="app-5"></div>
```

Y si ahora (empezando desde el uno) seleccionas todos los números (en bloque) y presionas `Ctrl + x` se verá así:

```html
<div id="app-0"></div>
<div id="app-1"></div>
<div id="app-2"></div>
<div id="app-3"></div>
<div id="app-4"></div>
```

Tambien trabaja con letras.

## Comandos

Podemos ejecutar comandos para insertarlos en nuestro archivo como vimos en el [Insert mode](#insert-mode), pero existe otra manera de hacer esto (el resultado del comando se insertará en la linea en la que se encuentre tu cursol):

```bash
:[line]r !<comando>
```

Esto se hace en el modo normal.

Para ejecutar un comando y que no se inserte en el documento simplemente vete al modo normal y escribe:

```bash
:!<comando> [parametros...]
```

> [!Caution]
> Si quieres pasar parámetros como rutas y otras cosas hazlo con comillas, sin estas pueden ocurrir errores o los comandos no entender lo que quieres hacer.

Realmente el comando `r` es para leer el contenido de archivos y lo hace si le pasas el nombre de un archivo:

```bash
:[line]r file.txt
```

Tambien acepta una linea, por ejemplo `10r !ls` hará que el resultado del comando se ponga bajo la linea 10 y desplazando a el contenido que estaba bajo esa linea ahora bajo el resultado del comando.

> <span style="display: flex; align-items: center;color: var(--blue); margin-bottom: 0rem;"><span style="font-family: 'Material'; font-size: 1.25rem; margin-right: .5rem">edit_note</span> **Nota** </span>
> Para desplazarte puedes hacerlo con las flechas izquierda y derecha, pero esto es caracter por caracter, si quieres palabra por palabra sería con `Shift + izquierda` y `Shift + derecha`.
> Si quieres desplazarte al inicio presiona `Ctrl + b` y para ir al fin de la linea `Ctrl + e`

**Ejecutar comandos de archivo como argumento:**

Podemos ejecutar comandos en una vista similar a la de una pseudoterminal con `:w` que además de ser el comando para guardar podemos pasarle parámetros para que el contenido del archivo sea un STDIN para los comandos que ejecutemos.

```bash
:[num[,fin]]w !<comando>
```

Podemos agregarle uno o dos números de linea para que el comando lea solo esa linea o el rango de lineas que se pasaron.

**Ejecutando comandos en la terminal integrada de neovim:**

Podemos ejecutar comandos básicos con la siguiente sintaxis (no ejecuta muy bien todos los comandos, pero puede hacer algunas cosas simples):

```bash
:[num [,fin]]!<comando [parámetros]>
```

No le veo mucha utilidad como reemplazo a una terminal, pero sí para editar textos, por ejemplo en vez de recordar combinaciones de neovim puedes reemplazar o modificar cosas con comandos como AWK, tr, etc.

**Repetir el último comando:**

Si no queremos volver a escribir ni navegar hasta el último comando podemos ejecutar el comando `@:` y listo, se ejecutará el ultimo comando.

> <span style="display: flex; align-items: center;color: var(--red); margin-bottom: .75rem;"><span style="font-family: 'Material'; font-size: 1.25rem; margin-right: .5rem">priority_high</span> **Importante** </span>
> Recuerda que si quieres hacer cambios en todo el documento puedes usar `%` en vez de numeros o intervalos.

**Historial de comandos:**

Podemos acceder al historial de comandos con el comando `:his` que desplegará una ventana con estos, por ejemplo:

```bash
#  cmd history
1  %s/h,j,k,l/h,n,t,s
2  %s/kitty/alacritty
3  %s/offset-y = 5/offset-y = ${size.offset-y}
4  %s/\\u0020/\\u0020\\u0020
5  %s/${c/$(c/g
6  %s/red-color/blue-color/g
7  %s/button-color/green-color/g
```

Esto solo es una lista, ahora ¿Cómo podemos ejecutar un comando de estos?, pues con el comando `q:` en el modo normal se abrirá una ventana con el historial de comandos y tenemos dos opciones, ejecutar el comando o modificarlo con el modo inserción.

## Doblar

Con "doblar" me refiero a colapsar texto, como el de un editor que quiere ocultar bloques de código que no quiere ver pero sin eliminarlos, ¿cómo podemos colapsar texto?, pues con la tecla `z`.

```bash
zf    # colapsar selección o puedes moverte con teclas de desplazamiento y sus numeros.
zo    # abrir colapso.
zc    # cerrar colapso.
za    # hacer un toggle entre abrir y cerrar el colapso.
zd    # borrar colapso.
zj    # siguiente colapso.
zk    # colapso anterior.
zR    # Abre todos los pliegues del archivo.
zM    # Cierra todos los pliegues del archivo.
zE    # Borra todos los pliegues del archivo.
```

## Tips

Para indendar podemos hacer dos cosas, la primera es el indentado simple, que todo lo seleccionado vaya un espacio de tabulación antes o despues del que querramos, que se hace con:

```vim
>>
<num>>
<<
<<num>
```

La notacíon de `<num>` hace referencia a un número, entonces si presionamos `2 + >` entonces hará dos tabulaciones o indentará con doble sangría. Lo mismo con `<` para reducir la sangría.

Y el indentado "inteligente", simplemente si estamos sobre una linea presionamos `= + =` o si estamos sobre un bloque de manera **visual** o **visual de bloque** simplemente con `=` se indenta respetando la jerarquía de donde se encuenta todo.
