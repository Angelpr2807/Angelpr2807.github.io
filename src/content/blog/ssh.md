---
title: 'Aprendiendo SSH'
description: 'Aprendiendo sobre el protocolo SSH para la comunicación remota con otros equipos.'
pubDate: 'May 27 2024'
heroImage: '/images/linux/ssh.webp'
---

## SSH

[SSH](https://es.wikipedia.org/wiki/Secure_Shell) o _Secure Shell_ es una versión cifrada de la tecnología llamada [**Telnet**](https://es.wikipedia.org/wiki/Telnet), este protocolo permite la comunicación entre dispositivos mediante conexiones de red y hace que la comunicación sea segura.

El comando `ssh` nos permite establecer comunicación con otro host que es suficiente si somos clientes, pero si adoptamos el rol de servidor necesitamos hacer dos cosas antes (solo si no tienes el demonio ssh habilitado). Si solo quieres conectarte con un servidor ve al apartado de [comunicación](#Comunicación). 

1. Instalar el paquete de ssh: Para tu distro de linux o windows puede variar el método de instalación de ssh, para arch linux puedes ejecutar el comando:

    ```bash
    sudo pacman -S openssh
    ```

2. Activar el demonio de ssh: El servicio de `ssh` no está activo por defecto y tenemos dos opciones, solo iniciarlo porque no queremos que el servicio inicie e iniciarlo nosotros cuando lo necesitemos o habilitarlo para que se inicie cuando se prenda la máquina.

Si quieres que inicie el demonio cuando se encienda el equipo hacerlo manualmene ejecuta el siguiente código, caso contrario salta esta sección hasta [comunicación](#Comunicación):

```bash
sudo systemctl enable sshd.service
```

Para iniciar el demonio de ssh cada vez que quieras habilitar este servicio ejecuta el comando:

```bash
sudo systemctl start sshd.service
```

Si ejecutaste el `enable` solo tendrás que iniciar el servicio la primera vez que habilites el demonio, luego se iniciará de manera automática cada vez que se encienda la máquina. Para ver el estado de este servicio puedes ejecutar:

```bash
sudo systemctl status sshd.service
# resultado si no ejecutaras enable ni start.
○ sshd.service - OpenSSH Daemon
     Loaded: loaded (/usr/lib/systemd/system/sshd.service; disabled; preset: disabled)
     Active: inactive (dead)
```

## Comunicación

Ahora para establecer una comunicación es necesario que el otro host tenga activo el demonio de ssh, el mismo comando te avisará qué problema hubo en caso de no poder conectarse ya sea cuenta, contraseña, servicio inactivo, etc.

Para conectarnos de manera básica ejecutamos el comando:

```bash
ssh user@<ip|domain>
```

por ejemplo se vería así:

```bash
ssh wiener@192.168.1.30         # ip
ssh wiener@my-server.net        # domain
```

Posteriormente, te preguntará si quieres conectarte al host y te mostrará un [hash SHA256](https://www.techopedia.com/es/definicion/sha-256), si pones `yes` tendrás que proporcionar la contraseña de tu usuario y te conectará automáticamente, si pones `no` cancelarás la conexión. ¿Por qué te menciono lo del hash?, bueno, por ejemplo imagina que el host (servidor) cambió, pero le asignaron la misma IP o dominio, entonces `ssh` te alertará de esto y cancelará la conexión, mostrándote algo así para que te mantengas seguro:

**En caso no te salga esto prosigue a la siguiente sección**

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ... key sent by the remote host is
SHA256:[hash..../....]
Please contact your system administrator.
Add correct host key in /home/user/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /home/user/.ssh/known_hosts:[line]
Host key for [IP] has changed and you have requested strict checking.
Host key verification failed.
```

En caso el host haya cambiado y queramos conectarnos (asegurate de que sea el correcto y no una falsificación de IP o algo así), podemos hacer algo. Editar la(s) línea(s) que nos aparezcan en esta salida, o la ip que esté asociada a este host, el archivo a editar es `/home/user/.ssh/known_hosts`:

```bash
sed -i '<line>d' /home/user/.ssh/known_hosts
```

Ahora puedes volver a conectarte.

## Ingresar sin contraseña

Es difícil recordar muchas contraseñas o simplemente no quieres que alguien que se conecte al servidor la tenga, pero que aún así pueda acceder al servidor, en este caso podemos generar un certificado y pasarlo a nuestro servidor.

Para generar nuestro certificado público y privado ejecutaremos lo siguiente:

```bash
ssh-keygen
```

Posteriormente te preguntará el nombre de archivo con el que se guardará la clave (generalmente se guarda en `/home/user/.ssh/id_rsa`, recomendamos no cambiarlo) y te preguntará si quieres proporcionar un `passphrase` que es una palabra secreta que tendrás que proporcionar cada vez que te conectes, puedes dejarla en blanco si no deseas ese comportamiento.

Ahora tendrás que modificar los permisos de los certificados, pero recomendamos cambiar los permisos de toda la carpeta `.ssh`:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/*
```

Una vez cambiados los permisos, necesitamos enviarle la clave **pública** al servidor y por nada del mundo tenemos que compartir nuestra clave privada, el certificado público tendrá la extensión `.pub`

### Compartir la clave manualmente

En el servidor y con el usuario al que queramos conectarnos (`root`, etc.) debemos ejecutar lo siguiente:

```bash
cd
mkdir -p .ssh
```

y copiar nuestra clave pública en su carpeta `.shh`, yo lo hago con netcat:

```bash
# en el servidor (termina de ejecutar esto primero)
cd ~/.ssh
nc -nlvp 4444 >> authorized_keys

# en nuestra máquina
cd ~/.ssh
nc [IP|domain] 4444 < id_rsa.pub
Ctrl + c
```

### Compartir la clave automáticamente

En vez de hacer el tedioso proceso manual podemos hacer algo muy simple, ejecutar el comando:

```bash
ssh-copy-id user@[IP|domain]
password:
```

En este caso solo brindaremos la contraseña del usuario `user` solo esta vez y automáticamente en el servidor se compartirá nuestra clave pública. Ahora solo queda conectarnos de manera automática:

```bash
ssh user@[IP|domain]
```

Y ya estaría, no necesitamos poner la contraseña de `user` otra vez.

### ¿Muchas claves o una sola?

- **Generalmente, basta con un solo par de claves para un usuario**. Puedes usar la misma clave pública para acceder a múltiples servidores. Esto simplifica la gestión de claves ya que solo necesitas manejar un par de claves en lugar de múltiples.
- Sin embargo, por motivos de seguridad o de organización, podrías querer generar diferentes pares de claves para distintos propósitos o servidores.

## Parámetros interesantes

1. Para ejecutar comandos cuando no se nos permita el acceso a una terminal u otro tipo de causas, podemos ejecutar comandos sin emular una terminal, pasandole los comandos en el mismo ssh:
 
```bash
ssh -t user@my-server.net <command>
```

2. Cuando queramos ejecutar aplicaciones de interfaz gráfica podemos usar el parámetro `-X`:

```bash
ssh -X user@my-server.net
user% firefox
```

En este caso estamos ejecutando el firefox del servidor pero en nuestro entorno, no es muy óptimo para multimedia, pero es muy bueno.

3. Cuando queramos acceder a otro servidor que no está conectado a internet, mediante otro que si acepta conexiones externas podemos usar el parámetro `-t`.

En este caso queremos conectarnos al server2, pero solo tenemos acceso al servidor1, entonces podemos hacer lo siguiente:

```bash
ssh -L 2020:10.8.5.126:22 user@10.8.5.128
```

Esto lo que hace es abrir el puerto `2020` en nuestra máquina local que apunta al puerto `22` de el servidor2 `10.8.5.126`. Esto simplemente redirige el tráfico y deja la terminal conectada al servidor1.

Para conectardos al servidor2 directamente ahora ejecutamos:

```bash
ssh -p 2020 user@localhost
```

## Utilidades extra

Podemos descargar archivos mediante SSH con el comando `scp` (secure copy) que es una extensión de SSH para descargar archivos.

```bash
scp user@host:/absolute/path/to/source file-name-to-save
```

Puedes ver más en:

- [Aprendiendo ssh - comandos Avanzados.](https://www.youtube.com/watch?v=IDDmqlN-hF0)
- [Aprendiendo ssh - comandos Experto.](https://www.youtube.com/watch?v=ZHSGGG_WwUs)

O también ejecutando el comando:

```bash
man ssh
```
