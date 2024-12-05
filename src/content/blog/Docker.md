---
title: 'Docker'
description: 'Introducción a docker y contenedores en entornos linux.'
pubDate: 'May 27 2024'
updatedDate: 'May 31 2024'
heroImage: '/images/linux/docker.webp'
---

## Docker

Docker es una tecnología de contenedores, que es un entorno cargado con un sistema linux mínimo (aún menor que una máquina virtual) que nos permite estandarizar un entorno en el que está cargado un conjunto de software para que funcione para todos de igual manera siendo agnóstico a la versión y tecnologías.

![container-meme](https://blog.kintoandar.com/images/containers_not_vms.jpg)

> [!Important]
> Los contenedores Docker utilizan el kernel del sistema operativo anfitrión. En Windows y macOS, **Docker Desktop** emplea una máquina virtual con un kernel de Linux para ejecutar contenedores Linux, lo que puede afectar el rendimiento y la compatibilidad comparado con un entorno Linux nativo.

Partes de un **contenedor**:

- **OS**: El sistema operativo es el que se encarga de gestionar todo el entorno, el kernel se comparte con el host.
- **Software**: El conjunto de paquetes instalados para poder correr nuestra aplicación.
- **Aplicación**: Es el software creado para que pueda ser ejecutado o desarrollado en un entorno con el mismo software de dependencias, desarrollo y ejecución para todos los devs y clientes.

Estos tres componentes son una **Imágen** y esta al ejecutarse se convierte en un contenedor que es un OS encapsulado por así decirlo.

La **diferencia** entre un contenedor y una imágen es que la imágen es inmutable y es la base sobre la cual se construye un contenedor. Un contenedor es la instancia ejecutable de una imágen, si ejecutas la misma imágen tres veces se crearán tres contenedores distintos y separados que comparten el mismo "molde" (la imágen), estos contenedores son mutables y están aislados de otros.

## Empezando con docker

Estoy usando Arch Linux, y para trabajar con Docker es importante:

- Instalar `docker` y `docker compose`.
- Añadir tu usuario al grupo de Docker con `sudo usermod -aG docker <usuario>`, luego reiniciar el sistema para evitar usar `sudo` en cada comando.
- Activar el demonio de `docker.socket` con `sudo systemctl start docker.socket`. Si surge algún error, verifica que `docker.service` esté activo; si persiste, revisa los **_logs_** o consulta en foros.

Si estás usando otras distros o SOs pueden haber diferencias en los pasos que tienes que seguir, te sugiero que leas la documentación y continúes una vez configurado todo.

Para tener una imágen, podemos hacer dos cosas, en primer lugar podemos crearlo nosotros mismos o descargar una ya hecha por la comunidad y descargarla en [Dockerhub](https://hub.docker.com).

```bash
docker [OPTIONS] COMMAND [ARG...]
```

Las opciones no las usaremos mucho, pero en algún momento las necesitaremos (o no), la única que necesitamos ahora es `--help`:

```bash
Commands:
run         Create and run a new container from an image
exec        Execute a command in a running container
ps          List containers
build       Build an image from a Dockerfile
pull        Download an image from a registry
push        Upload an image to a registry
images      List images
search      Search Docker Hub for images
attach      Attach local standard input, output, and error streams to a running container
cp          Copy files/folders between a container and the local filesystem
create      Create a new container
kill        Kill one or more running containers
logs        Fetch the logs of a container
pause       Pause all processes within one or more containers
restart     Restart one or more containers
rm          Remove one or more containers
rmi         Remove one or more images
start       Start one or more stopped containers
stop        Stop one or more running containers
top         Display the running processes of a container
...
```

Como ves, hay muchas opciones y listar todas es muy tedioso, te muestro las que te sirver para un uso básico y algunas otras que les puedes encontrar utilidad, si quieres ver todos los comandos, puedes ejecutar `docker --help` o buscar en la [documentacion oficial](https://docs.docker.com/manuals/) de docker.

Por ejemplo para descargar una imagen podemos ejecutar:

```bash
docker pull ubuntu
```

y ahora si queremos ejecutar el contenedor podemos ejecutar el comando (si no tienes la imagen la va a descargar):

```bash
docker run ubuntu
```

Podemos descargar diferentes versiones de una sola imagen o conjunto de software de una imágen en el apartado de `tags` de la imágen en docker hub, por ejemplo:

```bash
docker run ubuntu:noble-20240212
```

## Dockerfile

Es un archivo de configuración para crear una imágen y se despliegue de manera correcta. Puedes encontrar la documentación para crear un archivo y crear tu propia imagen en [Dockerfile](https://docs.docker.com/reference/dockerfile/).

## Docker compose

Docker Compose es un superset de docker, lo que nos permite ejecutar contenedores y desplegarlos de manera simple, puedes pasar parámetros, definir redes locales, compartir recursos, volúmenes, etc.

La simplicidad de docker compose reside en que todo lo que quieras desplegar se configura en un solo archivo y presenta una sintaxis simple, los errores se solucionan de manera sencilla ya que compose hace todo lo posible por mitigarlos.

Puedes encontrar documentación en [Docker compose](https://docs.docker.com/compose/).

> [!Note]
> No se ahonda más en este tema porque no cuento con tanta experiencia con **docker compose** y quisiera entregar un artículo más robusto y corregido, con lo cual actualizaré este artículo en un futuro. Espero su comprensión 🥲.
