---
title: 'Intro to linux'
description: 'Introducción e instalación de sistemas linux y algunos comandos básicos.'
pubDate: 'Jan 22 2025'
heroImage: '/images/linux/intro-2-linux.webp'
---
> Creditos a [catalyststuff](https://www.freepik.com/author/catalyststuff) por el diseño del pinguinito <3.

GNU/Linux es un sistema operativo el cual es de uso gratuito (existen opciones de pago, pero de esas hablamos luego 😁). El proyecto nació gracias a Linus Torvalds, el responsable de crear el kernel de Linux, y Richard Stallman, quien creó GNU ("GNU's Not Unix"), que es el sistema operativo per se.

Aquí tenemos tres conceptos clave antes de ahondar un poco más en su concepción:

- Kernel: Software que permite la comunicación entre un sistema operativo con el hardware, gestionar sus recursos como la memoria, procesadores, etc. y que los programas se puedan ejecutar sin interferir entre sí.

- Unix: Un sistema operativo antiguo, el cual es como el "abuelo" de muchos SOs actuales . Unix era un software privativo, el cual no puede modificarse, acceder al código con el que fue creado o redistribuirse, entonces no es flexible y podría hacer cualquier cosa sin el conocimiento del usuario.

- Sistema operativo: Es un software que te permite interactuar con tu dispositivo sin programarlo como todo un hacker. Gracias a él, puedes guardar tus archivos, ejecutar programas y realizar todas tus tareas cotidianas de manera sencilla.

Si quieres aprender a instalar tu sistema operativo Linux, puedes saltarte la sección de introducción e ir a la parte de [instalación](#instalación-de-linux).

## Historia...?

El proyecto GNU\Linux vio la luz porque Linus Torvalds quería experimentar con el hardware de su computadora creando un programa que no dependiera de un sistema operativo existente. Por otro lado, Richard Stallman quería un sistema operativo como Unix, pero que sea de código abierto, libre, gratuito y con juegos de azar y mujerzuelas. Ah, espera, eso último no, jeje 😅. 

Entonces, Linux, GNU, software libre y un pinguinito fueron los ingredientes elegidos para crear al sistema operativo perfecto, pero Linus Torvalds agregó accidentalmente otro ingrediente a la fórmula... la licencia GPL (General Public License). Y así nació GNU/Linux tal y como lo conocemos hoy, con el cual puedes hackear Interbank Perú (¡por favor, no lo hagan!), levantar tus servidores, revivir tu computadora de hace veinte años, hacer que tu refri corra Doom, combatir el crimen y muchas otras cosas más.

Al ser de código abierto, los usuarios pueden ver realmente lo que hace este software y asegurarse de que no realice acciones raras como ejecutar procesos no requeridos. Además pueden modificar dicho sistema, para que pueda tener nuevas funcionalidades, mejorar las ya existentes o corregir errores. Esta flexibilidad y colaboración entre la comunidad es lo que mantiene al entorno Linux rico, seguro y con un pingüino todo gordito, todo bonito.

![GNU project meme](/images/linux/intro-2-linux/intro-linux-meme.webp)

Créditos de la imagen a quien corresponda; no encontré al autor original y solo vi el meme en Facebook.

> [!Note]

> A partir de ahora llamaré linux a GNU\Linux porque es más simple llamarlo así y no quiero entrar en el dilema de si se debe agregra el GNU o no.

## ¿Por qué Linux?

Las principales razones por las que recomiendo usar Linux son:

- Distribuciones: En Linux existen muchas variantes o distribuciones que se enfocan en usos o necesidades particulares, como ciberseguridad, rendimiento, accesibilidad, virtualización, etc. Entonces, al haber muchas opciones, puedes elegir entre la que más te guste y personalizarla, que es aún mejor.

- Hardware/Rendimiento: Linux es muy eficiente en cuanto a recursos, ya que puede funcionar en computadoras con especificaciones bajas o incluso en equipos antiguos. Al ser altamente configurable, solo ejecuta los procesos que realmente necesitas, lo que resulta en un mejor rendimiento, menos consumo de memoria y una mejor experiencia.

- Personalización: Es extensible, con lo cual puedes configurarlo a tu gusto y hacerlo "tuyo", instalándole solamente los paquetes y programas que requieras; también puedes hacer tu "fashion linux" y personalizar tu escritorio para que sea precioso. Si no, mira [gh0stzk/dotfiles](https://github.com/gh0stzk/dotfiles).

- Facilidad/Accesibilidad: Aunque parezca que Linux solo puede ser usado por expertos informáticos que con presionar "Enter" pueden hackear el gobierno, Linux es fácil de usar y de instalar, agregando que también es gratuito. Existen distros para usuarios avanzados y con funcionalidades particulares, pero para un usuario principiante existen muchas opciones amigables; incluso en algunas no te darás cuenta de la transición con tu sistema operativo anterior.

Estas son algunas de las razones por las que uso Linux: Me gusta mucho, es flexible, personalizable, usa muchos menos recursos que otros sistemas operativos (\*tose\* Windows \*tose\*) y solo tiene los programas que yo requiero, haciendo que sea un sistema muy limpio, sin programas adicionales que no uso.

## ¿Qué es una distribución de Linux?

En la sección anterior mencioné brevemente el concepto de distribución, pero ahondemos un poco más. Como mencioné, una distribución es como una variante o modificación particular de una distribución base, por así decirlo, entonces abstraigamos este concepto.

Imagina cualquier objeto que tengas en mente; por ejemplo, yo imagino una bicicleta. Existen muchos tipos de bicicletas: De montaña, BMX, urbanas, la que usa Jaimito el cartero, etc. Entonces lo mismo pasa con las distribuciones Linux, ya que existe una base y sobre ella se crean variantes con un propósito particular.

Actualmente uso una distribución llamada Arch Linux. Es un poco avanzada, pero en sí todas las distros se parecen bastante, solo cambian en aspectos particulares como la forma en la que se instalan programas, la estructura de algunos archivos y directorios, pero en general son muy similares.

### Distribuciones para principiantes

Añade un cuadro comparativo entre las distros para ayudar a los lectores a elegir.

Existen muchas distribuciones para principiantes que te pueden servir para introducirte en el mundo de linux y que tienen una interfaz gráfica amigable para que hagas tus tareas en lo que te acostumbras o usas la terminal de comandos (esa pantalla negra con letras verdes en la que los hackers hacen cosas de hackers).

| Nombre                                         | Características                                                                                 | Enfoque                                                                     |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [Ubuntu](https://ubuntu.com/)              | Entorno de escritorio amigable, soporte extenso, amplia comunidad.                              | Nuevos usuarios, uso general.                                               |
| [Linux Mint](https://www.linuxmint.com/)   | Basado en Ubuntu, tiene un aspecto familiar para usuarios de Windows.                           | Usuarios que vienen de Windows.                                             |
| [elementary OS](https://elementary.io/es/) | Entorno de escritorio similar a macOS.                                                          | Usuarios que buscan simplicidad y estética.                                 |
| [Zorin OS](https://zorin.com/os/)          | Basado en Ubuntu, diseño similar a Windows, fácil de usar, muchas herramientas preinstaladas.   | Nuevos usuarios, migrantes de Windows.                                      |
| [Pop! OS](https://pop.system76.com/)       | Basado en Ubuntu, soporte de software para juegos, enfoque en productividad.                    | Usuarios que necesitan rendimiento y juegos.                                |
| [Manjaro](https://manjaro.org/)            | Basado en Arch Linux, pero fácil de instalar.                                                   | Usuarios que quieren aprender más y buscan algo más avanzado pero amigable. |
| [Lubuntu](https://lubuntu.me/)             | Basado en Ubuntu, entorno de escritorio LXQt, ligero, rápido.                                   | Computadoras antiguas o con recursos limitados.                             |
| [Deepin](https://www.deepin.org/index/en)  | Entorno de escritorio Deepin, visualmente atractivo, basado en Debian (el papá de Ubuntu, jeje). | Usuarios que buscan facilidad, un escritorio bonito y productividad.        |
| [Peppermint OS](https://peppermintos.com/) | Ligero, basado en Ubuntu y estable.                                                     | Computadoras antiguas o con recursos limitados.                             |

La elección es toda tuya según tus preferencias, ya sea lo bonito que se ve, el software que venga instalado o el que sea compatible, los recursos de tu sistema, etc. Sin embargo, la instalación es muy similar y, en caso de no serlo, la documentación e información de ayuda en la instalación es gigante. También existe el asistente de instalación que te guiará al momento de instalar tu sistema operativo, así que no tengas miedo.

## Instalación de Linux

Ahora viene la parte divertida… instalar tu nuevito, bonito y gordito Linux. Recomiendo encarecidamente hacerlo en un equipo viejo que no uses, o si quieres usarlo en tu día a día en tu computador o laptop personal, sería lo óptimo, pero esto puede entrar en conflicto con tus actividades, así que con un equipo antiguo está más que bien.

No recomiendo usar una máquina virtual porque, siendo sinceros (y a mí me pasó), no lo vas a usar mucho y pues no te vas a forzar a aprender, o no lo harás tan rápido como un equipo que solo tiene Linux o usa un dual boot (que tiene dos sistemas operativos en una sola máquina).

Aún así, enseñaré a instalarlos en un equipo mediante el menú del boot (en una PC que no uses, por ejemplo) o en un software de virtualización (como otra computadora dentro de la tuya), ya que la única diferencia es sobre dónde se ejecuta el sistema operativo, la instalación como tal es exacta en ambos sistemas. Dicho esto, empezamos. 

### Descarga del archivo ISO

Sea la distribución que hayas escogido, ve al apartado de descargas y te aparecerá un archivo ISO o algo parecido, no te preocupes si el archivo dice LTS (Soporte a largo plazo), incluso es mejor ya que tendrás soporte y actualizaciones por un periodo extendido.

En este caso usaré Linux Mint y en el servidor de Chile.

![Mint ISO](/images/linux/intro-2-linux/mint-iso.webp)

Ahora haré una bifurcación respecto a los que van a usar un equipo real y sobre quienes quieran virtualizar. De ahora en adelante será para este primer grupo, para quienes usen software de virtualización, vayan a la sección de [virtualización](#virtuarización).

### Crear medio de instalación

Para instalar tu nuevo sistema operativo, primero tienes que crear un medio de instalación, ya sea un USB o una memoria SD con su adaptador y preferiblemente que esté vacío, en caso contrario, guarda los archivos contenidos en él en otro lugar. Sea cual sea el dispositivo que elijas, este será necesario para almacenar la ISO y que puedas instalar tu Linux.

Usaremos el software de [Balena Etcher](https://etcher.balena.io/#download-etcher) para este propósito; asumo que usas Windows o Mac, así que simplemente puedes descargar los archivos respectivos y ejecutar el programa con un par de clics.

![balenaEtcher ISO](/images/linux/intro-2-linux/balena-iso.webp)

Selecciona la opción de "flash from file" y selecciona la ISO que acabas de descargar.

![balena etcher device](/images/linux/intro-2-linux/balena-device.webp)

Ahora selecciona tu USB o tu dispositivo en "select target". En la imagen se ve un símbolo de alerta porque el software analizó mi disco y, como es de un TB, me dice que me asegure que no contenga datos que yo quiera mantener, ya que va a borrarlos todos.

![Balena Etcher flash](/images/linux/intro-2-linux/balena-flash.webp)

Ahora que ya está tanto tu ISO como tu dispositivo, es hora de "flashear" o grabar la ISO en tu dispositivo. Se cambiará el panel y te mostrará el progreso de la operación; solo espera a que finalice y ya estará listo para que puedas instalar el SO.

### Menú de BOOT

El menú de boot es aquel que nos permite inicializar nuestro equipo desde una unidad que seleccionemos. Para acceder al menú del boot, reiniciaremos el equipo y esperaremos a que cargue el menú principal o esa pantalla negra en la que aparecen letras extrañas en la parte inferior que te dirá algo como "**F12 BOOT MENU**" o algo similar.

La tecla que tengas que presionar depende de la placa base de tu equipo, por lo general es F10, F11 o F12, pero es mejor que revises y verifiques qué tecla es la que corresponde. Así mismo, existen muchos tutoriales en internet, también para determinar el tipo de placa hay un montón de recursos en línea.

Una vez en este menú, seleccionamos nuestro dispositivo, la selección del dispositivo dependerá de si te encuentras en BIOS o UEFI (la versión moderna de BIOS). Puedes ver un ejemplo mejor explicado de lo que yo haría en [Cómo arrancar Windows y Mac desde un USB BOOT o CD](https://youtu.be/4-kf3K0iXSU?si=-wDjFxtVCdOpQkYk) o [¿cómo cambiar la prioridad de arranque o boot?](https://youtu.be/TVTur11z2Bw?si=XHVNm7gyVZ65Thw-)

Si aún así tienes problemas, puedes usar la IA para ayudarte o consultarlo en foros. Créeme, muchos han hecho esto muchas veces antes y ya solucionaron los posibles problemas que se te presenten.

Ahora solo queda instalar como tal el sistema, dirígete al apartado de [Instalación.](#instalación)

### Virtualización

Ya teniendo la ISO descargada, ahora instalaremos nuestro software de virtualización elegido, en mi caso será [VirtualBox](https://www.virtualbox.org/wiki/Downloads), pero puedes usar perfectamente [VMWare](https://www.vmware.com/) u otro programa.

Una vez dentro de VirtualBox, en la parte superior habrá un botón con el texto "**New**", el cual nos permitirá crear una nueva máquina virtual. Posteriormente se nos abrirá un formulario en el cual especificaremos los datos de nuestra máquina.

![virtual box form](/images/linux/intro-2-linux/new-machine.webp)

Como se puede observar, le puse el nombre de "Linux Mint" y a mí de manera automática se me cambió el tipo, subtipo y la versión, pero puedes cambiarlo de manera manual, y si no estás seguro de qué subtipo es, simplemente elige "Linux".

La versión es importante, al momento de descargar la ISO tienes que ver qué arquitectura elegiste, si es x32 o x64, con esa información determinarás qué versión usar, igualmente que en el subtipo. Si no sabes qué elegir, solo selecciona subtipo (<tuArquitectura>-bit). Selecciona "Finish" y en el panel izquierdo se debe haber creado tu máquina virtual.

Ahora configuraremos las opciones de nuestra máquina virtual, solo modificaremos las opciones System, Display y Storage. En tu máquina virtual, presiona clic derecho > settings y se te abrirá el siguiente panel.

![Sistem and display settings](/images/linux/intro-2-linux/settings-1.webp)

Ahora modifica el campo de Base Memory a la memoria RAM requerida por tu distribución, asegúrate de leer la documentación y asignarle la memoria adecuada. Dale toda la memoria de video posible, que son 128 MB, a la máquina.

Ahora montaremos la ISO en el apartado de Storage, en el "controller: IDE" hay un disco que dice Empty, selecciónalo y en el panel de la derecha se mostrará el logo de un disco azul. Selecciónalo y "clickea" la opción de "_Choose a disk file_", se abrirá un explorador de archivos y simplemente selecciona la ISO de tu Linux.

![choose disk](/images/linux/intro-2-linux/choose-disk.webp)

Ahora solo guarda tus cambios con el botón OK de la parte inferior y para iniciar tu máquina haz doble clic en ella o presiona clic derecho en la máquina y selecciona "run".

### Instalación

Ahora, independientemente de cuál haya sido la forma en la que hayas arrancado el sistema operativo, empezaremos con la instalación en el equipo designado. Primero entraremos en el menú del GRUB (Cargador de arranque múltiple), que nos permitirá iniciar el SO con muchas opciones, pero elegiremos la primera que está seleccionada por defecto.

![mint grub](/images/linux/intro-2-linux/mint-grub.webp)

Ahora se iniciará el SO y se presentarán un par de íconos en el escritorio. Indistintamente de tu distribución, existirá uno que sea el instalador. Haz doble clic sobre él y se abrirá el asistente de instalación. Los pasos son sencillos y el instalador te guiará, pero aún así te guiaré por partes importantes.

En primer lugar, seleccionarás el lenguaje, tu ubicación o zona horaria, la distribución de tu teclado y algunas cosas sencillas de configuración. 

Ahora si viene lo importante, que es la instalación en el disco. Por lo general hay dos opciones: la primera, que es borrar la información del disco (eliminará tu sistema operativo anterior si es que tenías alguno), o la de definir tú mismo las particiones. Si eres nuevo, te recomiendo la opción de borrar todo el disco e instalar tu sistema operativo, ya que asumo que usas una máquina virtual que no contiene otro SO o un equipo antiguo al que no te importa eliminar el sistema operativo (si tienes datos que quieras mantener, te recomiendo guardarlos en un USB o algo similar, la nube también es válida).

![Borrar disco Linux Mint](/images/linux/intro-2-linux/disk-mint.webp)

Ahora, si procedo con la instalación, me mostrará el panel de selección de región, el panel de usuario y contraseña. La contraseña debe ser difícil de adivinar y puse que encriptar mi directorio "home" para que, si roban mi disco, no pueda ser leído. Prefiero seleccionar la opción "Log in automatically" para que en cada inicio de sesión me pida mi contraseña.

![user definition](/images/linux/intro-2-linux/user-mint.webp)

Ahora, si presiono el botón de continuar, iniciará el proceso de instalación, pero si tienes más pasos, elige las opciones que correspondan, si no, deja las opciones por defecto, que por lo general son las adecuadas para usuarios principiantes.

Una vez finalizada la instalación, procederemos a reiniciar nuestro sistema. Si es un equipo físico como tu PC o laptop, al reiniciar debes desconectar tu USB booteado.

En cambio, si estás en máquina virtual, debes eliminar el "**Controller IDE**" que pusiste con la ISO y, si ya no se encuentra, déjalo como está. Si no sabes cómo, solo presiona el botón de Windows y apaga tu equipo. Luego ve a tu máquina virtual y hazle clic derecho. En la sección de ajustes o "_settings_", encontrarás dicha opción. En mi caso no es necesario, ya que al reiniciar el SO ya me aparece quitar la unidad presionando "Enter".

Ahora solo resta introducir tu contraseña y acceder a tu sistema. Enhorabuena, ya eres un nuevo usuario de Linux.

![Welcome to linux.](/images/linux/intro-2-linux/welcome-linux.webp)

En este menú contextual se te presentarán las opciones que tienes para iniciar y personalizar tu sistema, pero lo dejo a libre albedrío para que puedas explorarlo.

## Comandos básicos

Si bien las distribuciones para usuarios principiantes tienen una interfaz gráfica con ventanas y todo para que no dependas de ejecutar comandos constantemente, es importante saber que todo lo que puedes hacer con las ventanas y los clics también puedes hacerlo con la terminal de comandos.

La terminal de comandos es una ventana o interfaz que nos permite ejecutar comandos (valga la redundancia) con los cuales podemos hacer operaciones dentro de nuestro sistema operativo.

No te enseñaré todos los comandos porque existen muchísimos y no creo que necesites todos, solo te mostraré los más básicos y útiles (a mi parecer) para que puedas ir explorando la terminal.

Comandos:

- **ls**: Permite listar los archivos en un directorio.
- **pwd**: Muestra el directorio actual donde se encuentra el usuario.
- **cd**: Permite desplazarte entre los distintos directorios.
- **cp**: Este comando sirve para copiar archivos en otras rutas.
- **mv**: Mover archivos a otras carpetas.
- **rm**: Elimina archivos.
- **mkdir**: Crear carpetas.
- **cat**: Muestra el contenido de un archivo.

Estos comandos te servirán para tus tareas cotidianas y te daré un breve ejemplo de cómo funcionan los comandos en Linux, pero el fin de esto es aprender, así que va por tu cuenta ahondar más en el funcionamiento de cada comando.

### Ejemplos

Para ejecutar comandos, primero abriremos la terminal. Presiona el símbolo de Windows o la tecla "maestra" de tu teclado y en el buscador de aplicaciones busca la terminal. Una vez se abra este programa, podrás escribir tus comandos.

Probemos con el comando ls que es para listar los archivos que contiene una carpeta. Por lo general, al abrir una terminal nos posicionamos en nuestro directorio principal, que es /home/<tu_usuario>, puedes comprobar esto con el comando pwd.

Al ejecutar el comando, ls se nos muestran las carpetas y archivos de la carpeta o la ruta donde nos encontremos en ese momento.

![ls](/images/linux/intro-2-linux/ls.webp)

En la imagen puedes ver que ejecuté pwd y me mostró la ruta en la que me encuentro, con ls listé el contenido de esa ruta, pero en el siguiente ls ves el texto adicional "`-la`", este texto adicional son las "opciones" o, como me gusta llamarlo, "modificadores".

Las opciones nos permiten modificar el comportamiento de un comando, por ejemplo, la opción `-l` hace que el comando muestre información adicional como los permisos, propietarios, el tamaño de la carpeta o archivo e información extra. La opción `-a` hace que se listen archivos o directorios ocultos, por lo general aquellos cuyo nombre empieza con un punto (_dotfiles_).

## Manual

No tienes que aprenderte todos los comandos existentes, a medida que vayas ganando experiencia, podrás usar más comandos y entender su funcionamiento, pero hay una pregunta importante: ¿Cómo sé qué hace un comando?, ¿Qué opciones tiene?, ¿Dichas opciones son obligatorias?, etc.

Para resolver la mayoría de tus dudas, existe el comando man que nos permite ver la información asociada a un comando. El uso del comando man es simple, solo escribes man, dejas un espacio y escribes el comando del que quieres saber información.

```bash
man ls       # Esto abrirá el manual de ls
```

![manual](/images/linux/intro-2-linux/manual.webp)

Al ejecutar man ls, se nos abre esta ventana. En el apartado de NAME está el nombre del comando y una breve descripción, en SYNOPSIS se nos muestra si necesita opciones u otras entradas y en qué orden. Luego tenemos la DESCRIPTION, que nos da un resumen de lo que hace el comando. Bajo este resumen se encuentran las opciones disponibles, pero antes de eso quiero explicarte algo sobre la sintaxis del manual.

En la parte de SYNOPSIS ves que existen datos entre corchetes [OPTIONS] y [FILE], estos corchetes nos indican que estos datos o entradas son opcionales, por eso pudimos ejecutar ls sin nada más y no obtuvimos errores. 

Ahora, ¿cómo sabemos si una opción, archivo o lo que sea es obligatorio? La sintaxis del manual nos ayudará, en el mismo apartado de SYNOPSIS, dicho dato no tendrá corchetes, como `[DIRECTORY]`, o estará entre los símbolos de mayor y menor que ("<" y ">"), por ejemplo `<DIRECTORY>`. Lo mismo para utilidades de terminal que descargues de internet, esta sintaxis te ayudará a guiarte.

En caso de no tener un manual o que te salga error, puedes usar la sintaxis de --help o -h como opción de tu comando, estas opciones por lo general hacen lo mismo, salvo ciertas excepciones.

```bash
ls -h
ls --help
```

Me gustaría ahondar un poco más sobre cómo funciona el lenguaje, pero creo que se extendería mucho el artículo y no es lo óptimo. Posteriormente, crearé un artículo con comandos en profundidad y el lenguaje Bash, que permite usar estos comandos y otras sintaxis para automatizar tareas.

Aún así no los quiero dejar en la incertidumbre y les dejaré enlace a dos videos del [Pelado Nerd](https://www.youtube.com/@PeladoNerd) en los cuales te explica algunos comandos con sus opciones para que puedas ir aprendiendo y "el pelade" explica muy bien, así que vas a aprender de un capo en Linux.

- [MAS DE 30 COMANDOS en LINUX para manejar tu SERVER!](https://www.youtube.com/watch?v=0BA4k3jweaE&ab_channel=PeladoNerd)
- [MÁS COMANDOS de LINUX para MANEJAR tu SERVER - PARTE 2!](https://www.youtube.com/watch?v=LbR83223zdM&ab_channel=PeladoNerd)

## Instalación de programas

En las distribuciones para principiantes tendrás tiendas de software, en las cuales buscarás el programa que deseas y no instalarás, como en la Play Store o la tienda de Windows. Puedes presionar el botón con el logo de Windows de tu teclado y buscar "Software manager", "Install program" o cosas así y te llevará a la tienda de aplicaciones.

![App Store](/images/linux/intro-2-linux/app-store.webp)

También existe la opción de instalar programas desde la terminal de comandos mediante el gestor de paquetes de nuestra distribución o desde GitHub, pero es un poco más avanzado y, si quieres probarlo, adelante, pero de momento la tienda te servirá.

La instalación de programas desde la terminal o desde GitHub puedes buscarla en internet o esperar a que escriba otro artículo al respecto. Si aún así quieres intentarlo, solo busca cómo instalar programas desde la terminal, en la distribución que estás usando, y habrá miles de artículos y videos al respecto.

## Consejos para principiantes

1. **No necesitas hacer todo en la terminal.**

    Aprender a usar la terminal es importante, pero no te obligues a hacerlo todo desde allí si perjudica o entorpece tu trabajo. Usa la interfaz gráfica para tus tareas diarias mientras ganas confianza en la terminal. Más adelante, puedes automatizar procesos con scripts si lo consideras útil.

2. **Personaliza tu entorno.**

    Haz de Linux un lugar en el que te guste trabajar. Configura atajos de teclado para abrir tus programas favoritos rápidamente y personaliza la apariencia del escritorio con temas, iconos, wallpapers, y fuentes. Esto no solo hará que te sientas cómodo, sino que también incrementará tu productividad.    

3. **No necesitas saberlo todo.**

    No te agobies intentando memorizar cada comando o herramienta. La comunidad de Linux es muy activa y hay recursos, foros, y hasta asistentes de IA que te pueden ayudar cuando tengas dudas. Aprende lo que necesitas para tus tareas cotidianas y aprende nuevas cosas a medida que necesites.

4. **Encuentra software compatible.**

    Aunque no todos los programas populares están disponibles para Linux, existen alternativas igual de funcionales (incluso mejores en algunos casos). Busca aplicaciones de código abierto o nativas de Linux. Si necesitas un programa específico que no esté disponible, considera herramientas como Wine o crea un entorno dual con tu sistema operativo preferido. ¡Aprovecha la flexibilidad!

## Extras

Aquí te recomiendo algunos recursos extras con mucho contenido sobre Linux e informática que te pueden interesar y servir en tu viaje linuxero.

- [Linux Journey - Web de introducción a Linux](https://linuxjourney.com/).
- [Karla's Project - Canal de youtube](https://www.youtube.com/@KarlasProject/videos).
- [Pelado Nerd - Canal de YouTube](https://www.youtube.com/@PeladoNerd).
- [Linuxchad - Canal de YouTube](https://www.youtube.com/@LinuxChad).

Bueno, creo que expliqué lo mínimo indispensable para introducirte al mundo de Linux, aun así hay mucho por aprender, como rutas, permisos, usuarios, procesos y muuuuchas cosas más, pero lo aprenderás a su momento, joven padawan. Espero te haya gustado este artículo y, si tienes dudas o sugerencias, no dudes en enviarme un mensaje a alguna de mis redes sociales.
