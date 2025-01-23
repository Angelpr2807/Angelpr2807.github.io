---
title: 'Virtual Machines'
description: 'Explorando entornos virtualizados con VirtualBox y creando nuestra VM junto con sus configuraciones.'
pubDate: 'Jan 22 2025'
heroImage: '/images/linux/VMs.webp'
---
## Introducción

La virtualización es la capacidad que tiene un software para simular características de componentes de hardware. Entonces, una máquina virtual es un sistema operativo que es independiente al equipo físico. Por ejemplo, puedes usar una sola CPU (un solo conjunto de hardware) con un software como Virtual Box y VMware que nos permite tener múltiples sistemas operativos en una misma computadora.

El software encargado de gestionar y asignar los recursos de hardware se llama "hipervisor", entonces, gracias a este, dichas máquinas virtuales pueden usar los recursos del equipo y permitirle operar con las capacidades que nosotros definamos como cantidad de RAM, almacenamiento, comunicación en red, etc.

Existen dos tipos de hipervisores: los que se ejecutan directamente sobre el hardware físico (VMWare ESXi o Microsoft Hyper-V) y los que se ejecutan sobre un sistema operativo (VirtualBox y VMware Workstation).

Existen algunas ventajas y desventajas de trabajar con este tipo de tecnologías.

### Ventajas

- **Ahorro de costos**: Tener un solo hardware que ejecuta múltiples máquinas reduce los costes a diferencia de usar hardware independiente para cada sistema operativo que querramos usar.
- **Aislamiento**: Cada máquina virtual es independiente de las demás, entonces los problemas asociados no afectan a las demás máquinas.
- **Versatilidad**: Puedes tener muchos sistemas operativos de distintos tipos sobre un solo hardware. Puedes tener Linux, Windows y macOS en un solo dispositivo.
- **Entorno de pruebas**: Relacionado con el pentesting, las máquinas virtuales son una gran herramienta para simular ataques en entornos de pruebas controlados y experimentar sin comprometer equipos reales.

### Desventajas

- **Rendimiento**: Algunos procesos o tareas pueden verse limitados y tener un menor rendimiento a diferencia.
- **Capacitación**: Como cualquier software, se requiere conocimiento previo para poder usar en toda su capacidad el software de virtualización.
- **Volumen**: Las máquinas virtuales tienen un SO completo, que consume mucho más espacio de almacenamiento y otros recursos que un contenedor como los de Docker.

> [!Important]
> A partir de aquí voy a usar VirtualBox como software de virtualización, pero las bases casi son las mismas para otro tipo de virtualizadores como VMware. Si los pasos difieren mucho, sientete libre de buscar en internet o con la ayuda de IA, lo más importante son los conceptos.

## Instalación y configuración de VirtualBox

Para instalar VirtualBox, vamos a la página de [descargas](https://www.virtualbox.org/wiki/Downloads?) y descargamos el ejecutable, o para nuestras distros de Linux, nos podemos ayudar de nuestro gestor de paquetes e instalarlo. Si descargaste el ejecutable, solo haz doble clic y listo, comenzará la instalación. Aquí te dejo algunos ejemplos de instalación en distribuciones Linux, yo lo hago desde Arch Linux, pero es similar en las demás distros.

> [!Tip]
> Si requieres de alguna versión anterior de virtualbox o alguno de sus complementos, puedes ir al panel de [descargas](https://download.virtualbox.org/virtualbox) de VirtualBox desde versiones anteriores hasta la última versión.

```bash
# Arch linux
sudo pacman -S virtualbox virtualbox-host-modules-arch

# Debian
sudo apt-get install virtualbox virtualbox-ext-pack
```

### Pack de extensión

El pack de extensión es un archivo que nos permite extender las funciones y capacidades que tienen nuestras máquinas virtuales para que puedan hacer cosas como soporte para dispositivos USB de versiones 2.0 y 3.0. Conexión a escritorio remoto, encriptar discos virtuales y muchas otras características más.

Para instalarlo es tan simple como ir a la página de [descargas](https://www.virtualbox.org/wiki/Downloads?) y en la sección de VirtualBox Extension Pack clickeas el botón de "_Accept and download_" y comenzará la descarga. Ten en cuenta que la versión de la extensión debe ser la misma que la de VirtualBox, puedes revisar la versión de esta en Help > About VirtualBox en la barra superior de menús.

Una vez descargado el pack de extensión para incluirlo en VirtualBox, abrimos el programa y en la barra superior de menús, seleccionaremos **File > Tools > Extension Pack Manager** o, en su defecto, también puedes presionar `Ctrl + T` y lo incluiremos con el botón de instalar.

![extensión pack](/images/linux/vms/extension-pack.webp)

## Instalación de una VM

Existen dos formas de crear una máquina virtual, la primera es una máquina virtual en "blanco", la cual configuraremos desde cero, y la segunda forma es importar una máquina virtual existente. En ambos casos podemos modificar los recursos asignados y realizar otras configuraciones para que pueda arrancar nuestra máquina virtual.

### Crear una máquina virtual

Para crear una nueva máquina virtual, puedes ir al menú de la barra superior y en el apartado de Machine hay una opción de New, también en el panel principal existe el botón de New y de manera más corta simplemente puedes usar `Ctrl + N`.

![new machine](/images/linux/vms/new-machine.webp)

Ahora se nos abre una pestaña básica para proporcionar algunos datos y configuración inicial.

![Basic Configuration](/images/linux/vms/basic-config.webp)

Lo más importante en este punto es "**Name & Operating System**": El primer apartado nos permite definir cual va a ser el nombre de la máquina virtual que estamos creando, el folder o carpeta donde se guardan los datos de la VM. 

La ISO (imagen del sistema operativo), el tipo se refiere a cuál es el "sistema base", por así decirlo, como Windows, Linux, MacOS u otros. El subtipo es la variante o distro, como Windows 10, Vista, Arch Linux, Debian, MacOS X y muchas otras más. Finalmente, la versión es la arquitectura del SO, por ejemplo, `x32` y `x64`.

Ahora configuraremos las opciones de nuestra máquina virtual, solo modificaremos las opciones System, Display y Storage. En tu máquina virtual, presiona clic derecho > settings y se te abrirá el siguiente panel.

![Sistem and display settings](/images/linux/intro-2-linux/settings-1.webp)

Ahora modifica el campo de Base Memory que se refiere a la memoria RAM, pon la capacidad requerida por tu distribución, y asegúrate de leer la documentación y asignarle la memoria adecuada. Dale toda la memoria de video posible, que son 128 MB a la máquina.

Ahora montaremos la ISO en el apartado de Storage, en el "controller": IDE" hay un disco que dice Empty; selecciónalo y en el panel de la derecha se mostrará el logo de un disco azul, selecciónalo y "clickea" la opción de "_Choose a disk file_", se abrirá un explorador de archivos y simplemente selecciona la ISO de tu SO.

![choose disk](/images/linux/intro-2-linux/choose-disk.webp)

Ahora solo guarda tus cambios con el botón OK de la parte inferior y para iniciar tu máquina haz doble clic en ella o presiona clic derecho en la máquina y selecciona "run".

En este punto ya puedes darle a finalizar o explorar las configuraciones. Posteriormente ahondaré en las configuraciones que nos quedan pendientes con la configuración avanzada y explicaré por secciones.

### Exportar e Importar VMs

Si tienes una máquina virtual en una computadora o servidor y quieres pasarlo a otro dispositivo, no es necesario crearla nuevamente y configurarla, simplemente puedes exportar la máquina en formato `.ova` o `.ovf`. Luego ese mismo archivo se puede importar en el otro dispositivo y tendrás la máquina en el estado en el que la hayas exportado. Las configuraciones de la máquina virtual (como RAM, red, CPU, etc.) se pueden conservar al exportar, así que no te preocupes por eso.

#### ¿Cómo exportar una VM?

Para exportar una máquina, puedes dirigirte al panel principal de VirtualBox y seleccionar el botón de export, así mismo, puedes dirigirte al menú de la parte superior en **File > Export** Appliance o, en su defecto, al presionar `Ctrl + E`.

![Export Machine](/images/linux/vms/export.webp)

Posteriormente se abrirá un menú, el cual mostrará las máquinas existentes, y selecciona la que desees. En el apartado de Format Settings tenemos el formato en el que se va a exportar con la extensión `.ovf`.

![format settings](/images/linux/vms/format-settings.webp)

El "Format" se refiere al estándar o tipo de formato (valga la redundancia) respecto a las versiones de virtualización. Por ejemplo, las versiones 0.9 y 1.0 son para ediciones algo antiguas de VirtualBox, la 2.0 es para versiones más modernas y la versión "Oracle Cloud Infrastructure" es para un entorno en la nube, así que elige la que te convenga.

El archivo es el de la máquina virtual, así que no es necesario cambiarlo y, finalmente, en "MAC Address Policy" se refiere a las opciones de red, si quieres o no conservar la dirección MAC de la red NAT, de todas las tarjetas de red o de ninguna. La parte adicional la dejo a criterio si incluirla o no, pero, si tienes discos que desees conservar, puedes habilitar la casilla de ISO.

En la parte de "Appliance settings" no veo muy necesario ampliar la explicación, ya que solo son descripciones del nombre de la máquina, la misma descripción, licencia y otros campos.

### Importar una VM

Ya creaste tu máquina virtual en formato `.ovf`, ahora lo que quieres es importarla en tu mismo dispositivo por si formateas la máquina o se corrompe la máquina, también puedes importarla en otro dispositivo con un hipervisor.

Ingresaremos al panel principal de VirtualBox y seleccionaremos el botón de "Import". Puedes ir al menú superior en el apartado de **File > Import Appliance** o presionando las teclas `Ctrl + I` se te abrirá un panel en que puedes seleccionar el archivo a importar y listo, la máquina se importará automáticamente y se abrirá un panel con el progreso del proceso.

![Importar máquina](/images/linux/vms/import-machine.webp)

Enhorabuena, ahora puedes exportar e importar tus máquinas para que puedas trabajar en distintos entornos sin instalar todo de nuevo y de forma sencilla. Ahora veremos, ¿cómo podemos configurar nuestras máquinas para darles las capacidades necesarias para que estos funcionen correctamente?

## Configuraciones básicas

Para acceder a la configuración de cualquier máquina, simplemente tienes que hacerle clic derecho y seleccionar Settings, posteriormente se te abrirá el siguiente panel y por defecto estará en la opción de "Basic" en la parte superior. Si bien esto es bueno para configuraciones iniciales, es mejor que te presente todas las opciones y uses las que necesites.

![Opciones](/images/linux/vms/basic-options.webp)

Describiré todas las secciones en orden para que tengas una idea de lo que contienen y qué configuraciones puedes hacer, pero si se necesita ahondar o son temas muy particulares, se verán en la sección de [configuraciones avanzadas](#configuraciones-avanzadas).

> [!Note]
> En las siguientes descripciones mencionaré "pestañas" como aquellas sub secciones contenidas en las secciones del panel izquierdo, por ejemplo en la imágen anterior, las pestañas de la sección general son: Basic, Advanced, Description y Disk Encryption. Esto lo aclaro para evitar confusiones, sé que es redundante, pero no quiero que nadie se pierda.

- **General**: Contiene los datos básicos de la VM, como el nombre, sistema operativo, en el apartado Advanced tiene la clipboard (portapapeles) y drag'n drop (arrastrar y soltar), también tiene la descripción de la máquina virtual y,finalmente, la opción para encriptar el disco.

	En "Advanced" puedes configurar las capacidades antes mencionadas para que estén deshabilitadas, que sea de Host (tu pc en este caso) a máquina virtual, de máquina virtual a Host o bidireccional. En el apartado de cifrado puedes habilitar dicha opción para encriptar tu disco simplemente proporcionando una contraseña, el algoritmo usado es [AES-XTS](https://www.kingston.com/es/blog/data-security/xts-encryption) que puedes elegir entre el modo de 128 bits o 256 bits, que es la longitud de la clave generada.

- **System**: Las opciones como la cantidad de memoria RAM, el orden de boot, el chipset (compatibilidad de placa base), el pointing device, que es el dispositivo para el ratón o mouse, el [I/O APIC](https://serverfault.com/questions/74672/why-should-i-enable-io-apic-in-virtualbox) EFI (versión moderna de BOOT).

	En la segunda pestaña tenemos opciones de procesador con la cantidad de núcleos que queremos configurar y su capacidad de ejecución.

- **Display**: Presenta las opciones de visualización como el uso de VRAM, monitores, factor de escala, controlador de gráficos (para el rendimiento gráfico) en la cual tienes tres opciones: **VBoxVGA**, que es para versiones antiguas de Windows o Linux; **VMSVGA**, para versiones modernas de Linux y Windows y finalmente **VBoxSVGA**, que es compatible con Windows para Direct3D. La aceleración 3D también es una opción interesante para usar OpenGL y Direct3D.

	En la pestaña de Remote Display se puede configurar el acceso a nuestra VM mediante el protocolo VRDP (VirtualBox Remote Desktop), que usa RDP para el acceso remoto. No lo he usado, pero sé que hay un montón de información en línea que te puede ayudar y, si estás en Linux, puedes usarxfreerdp. 

	La última pestaña (Recording) permite grabar la pantalla y puedes configurar las opciones como el tamaño, el archivo, la calidad del video y los monitores que se van a grabar.

- **Storage**: Aquí tenemos los dispositivos de almacenamiento como nuestro disco duro virtual o unidades de arranque como imágenes ISO y demás.

- **Audio**: Las opciones básicas de audio como el driver, el controlador y las opciones de entrada y salida de audio.

- **Network**: Tiene cuatro pestañas, cada una con una tarjeta de red que puedes personalizar, pero en configuraciones avanzadas te explicaré más sobre cada tipo de red que puedes usar en cada tarjeta. Por defecto está en red NAT que usará la tarjeta de la computadora principal.

- **Serial Ports**: Permite configurar puertos seriales que son interfaces que se utilizan para conectar dispositivos como módems, impresoras, o para la depuración de software y sistemas operativos. 

- **USB**: Puedes habilitar los controladores de USB, para tener todas las versiones que se pueden usar, necesitan instalar la [extension pack](#pack-de-extensión).

- **Shared Folders**: En esta opción puedes crear carpetas que se comparten entre el host (la máquina principal que hospeda las virtuales) y las máquinas virtuales.

- **User Interfaces**: En esta sección puedes habilitar o deshabilitar las opciones que se te muestran al encender tu VM y configurar opciones, por ejemplo, el factor de escala, dispositivos, etc.

## Configuraciones avanzadas

Esta sección ahonda más en algunas opciones extra o que requieren pasos adicionales para ampliar las funcionalidades de las máquinas virtuales.

### Configuraciones de red

En la sección anterior explicamos de manera superficial sobre la configuración por defecto de red cuando creas una máquina virtual, pero ahora veremos el resto de opciones disponibles.

Las opciones disponibles son:

- **NAT**: La máquina virtual comparte conexión con el host (también su IP), no requiere configuración adicional y es simple de usar.
- **Bridget Adapter**:  Se conecta directamente a la red y se le asigna su propia IP, es otro dispositivo más, en otras palabras.
- **Internal Network**: Se usa una red aislada donde pueden interactuar VMs en una misma red. No he usado esta opción, pero aquí te dejo un artículo sobre [internal network](https://docs.oracle.com/en/virtualization/virtualbox/6.0/user/network_internal.html) del mismo Oracle.
- **Host Only-Adapter**: Permite la comunicación entre el host y la VM u otras VMs que estén con esta opción, pero las VMs no tendrán internet.
- **Generic Driver**: Usa controladores o módulos personalizados, tampoco conozco mucho sobre esta opción, pero te dejo una breve descripción en [_networking modes_](https://docs.oracle.com/en/virtualization/virtualbox/6.0/user/networkingmodes.html) de Oracle.
- **NAT Network**: Es como la NAT, pero permite que muchas VMs puedan comunicarse entre sí, haciendo un entorno aislado (esta opción la uso mucho para pentesting en entornos controlados y practicar pivoting, por ejemplo). Requiere la creación de las redes que queramos usar, posteriormente mostraré cómo configurar estas redes internas.
- **Not Attached**: No tiene ninguna conexión.

### Creando una red NAT

Las redes NAT nos permiten interconectar máquinas virtuales a una red o redes que definamos y si quieres simular un entorno de pruebas de red, pentesting u otro tipo de conectividad.

Lo primero que tenemos que hacer es abrir la pestaña de creación de redes NAT en VirtualBox, con el botón a la derecha de Tools (menú de herramientas) y la opción "Network" accederemos al panel de creación de redes. Posteriormente nos dirigiremos a la pestaña de "NAT Networks".

![NAT Network panel](/images/linux/vms/nat-network.webp)

Como verás, en la parte superior hay un botón "Create", con este puedes crear tantas redes como desees y, si el panel de "General Options" o "Port Forwarding" no está visible, solo presiona el botón "Properties".

Las opciones generales tienen la configuración que necesitaremos: el nombre de la red, luego el [CIDR](https://es.wikipedia.org/wiki/Classless_Inter-Domain_Routing) de la red (una sintaxis para definir las IP que se les va a asignar a los dispositivos y la [máscara de subred](https://es.wikipedia.org/wiki/Subred) respectiva). Por ejemplo, en mi red NAT "Pentest", es una [red de tipo C](https://www.ibm.com/docs/es/aix/7.1?topic=addresses-class-c) y tiene habilitado el [DHCP](https://es.wikipedia.org/wiki/Protocolo_de_configuraci%C3%B3n_din%C3%A1mica_de_host) para asignar IPs de manera dinámica.

También tienes la opción de IPv6, pero por lo general usarás la de v4. Además existe el port forwarding, aún así no lo cubriré de momento, pero te dejo un video asociado.

- [Port Forwarding on VirtualBox - YouTube](https://youtu.be/zKlirCNdY4I?si=Fwd-zYMRkDftRlT8)

Ahora solo queda configurar tu VM para que use esta red.

![Config nat network to virtual machine](/images/linux/vms/nat-machine.webp)

## Snapshots (instantáneas)

En la sección de [exportar e importar VMs](#exportar-e-importar-vms) mencioné que si se producía un error podías recuperar tu máquina importando un .ovf o .ova de respaldo que tengas, pero esto tiene algunas limitaciones, por ejemplo, si a partir de este respaldo hiciste configuraciones adicionales, instalaste programas, agregaste usuarios u otro tipo de acciones, estas no se guardarán y se perderá todo el progreso.

Las snapshots entran a nuestro rescate en estos casos, ya que podemos guardar el estado de nuestra máquina en cualquier punto. En caso de que ocurran fallos o malas configuraciones, puedes volver a estas instantáneas y recuperar tu progreso.

Para realizar una instantánea, primero seleccionaremos la VM a la que queremos hacer una instantánea, luego haremos click en "**menú de herramientas > Snapshots**". En la parte superior se nos mostrará una serie de botones, pero los que más nos interesan (o bueno, a mí) son "Take" para crear una nueva snapshot y clone, que te permite hacer una copia completa de tu VM.

![create a snapshot menu](/images/linux/vms/create-snapshot.webp)

Los pasos son sencillos: solo toma una nueva snapshot; se te abrirá un pequeño panel para ponerle un nombre que puedas recordar y una descripción para que puedas explicar qué características tiene la captura.

> [!Note]
> Con la opción de clonación no sé si solo crea una copia de la última versión (Current State) o de la snapshot que está seleccionada y tengo esta confusión porque aparece en el panel de snapshots, pero si haces click derecho de nuestra VM tenemos la opción de "clone" es de la versión actual y ahí tengo menos confusión.

Ahora, ¿cómo restauramos a una instantánea que creamos? A la izquierda de Properties está el botón de Restore y este nos permite volver a la snapshot que esté seleccionada previamente.

![restore snapshot](/images/linux/vms/restore-snaphshot.webp)

En mi caso, por ejemplo, tengo una snapshot con el nombre "Stable 1", entonces esta es la que seleccioné y se me habilita el botón de Restore y esa se volverá la versión Current State. Mientras más capturas o instantáneas tomen, se ordenarán de forma escalonada y, si restauras una versión muy anterior, las versiones que parten de ella se eliminarán, así que debes tener esto en cuenta.

## Alternativas a las VMs

Ya vimos cuáles son las ventajas y desventajas de usar máquinas virtuales, pero no es la única forma en la que puedes compartir recursos para ejecutar sistemas operativos o aplicaciones que requieras.

Las principales alternativas son:

- **Contenedores**: Son entornos ligeros que permiten ejecutar aplicaciones de manera sencilla y comparten kernel y recursos con la máquina que los hospeda. Solo ejecuta las aplicaciones o procesos necesarios y no el sistema operativo completo, lo cual es una ventaja. Tengo un artículo al respecto hablando sobre [Docker](/blog/docker/), si te interesa, te recomiendo revisarlo.

- **Hipervisores de tipo 1 (Bare-metal)**: Son hipervisores que ejecutan las VMs directamente sobre el hardware, sin necesidad de un host.

- **Servicios en la nube**: Existen VMs o contenedores que puedes gestionar de manera remota y que no requieren hardware propio, solo pagas por su uso.

Y eso fue todo. Es algo extenso el artículo, pero espero mucho que te sirva para que puedas trabajar en entornos virtualizados con VirtualBox y, si quieres adentrarte en el hacking, es una muy buena forma de tener laboratorios controlados para practicar.

El artículo se basa en mi experiencia trabajando con él y las funciones que más uso, pero puede estar limitado o tener algunos errores, siéntete motivado a ahondar más si lo necesitas para el uso que requieras. 

Gracias por leer el artículo y si tienes alguna duda, notas algún error o simplemente quieres hablar, por favor no dudes en contactarme que estaré encantado de responderte tan pronto me sea posible y… nos vemos en otro artículo.

