# 慧演智能 SmartIoT边缘计算平台

- xywang.org



# MING (Mosquitto, InfluxDB, NodeRed, Grafana)

MING is a containerised IoT sensor server stack in the traditions of LAMP.

We've leveraged #OpenBalena to provide a embedded Linux environment to provide:

- Mosquitto MQtt broker listening on port 1883 for MQtt message publications

- InfluxDB listening on port 8086 providing a time series database for sensor data storage

- NodeRed listening on port 1880 to provide an easy to use graphical environment for parsing,
  analysing, storing, and forwarding sensor data messages

  We've also installed the NodeRed InfluxDB nodes by default so you easily store and retrieve
  data locally.

- Grafana listening on port 80 providing a data visualisation environment for sensor data.

Each of these applications is built and runs in its own container on an
embedded Linux target supporting Balena.io (Docker for Embedded Systems).

# Optional Components

We've added some nice applications that we think run nicely alongside the MING stack, they can be optionally enabled by uncommenting them in the [`docker-compose.yml`](docker-compose.yml) file in this repo

These components are:

## [Home-Assistant](https://www.home-assistant.io/)

Open source home automation that puts local control and privacy first.

## [Rhasspy](https://rhasspy.readthedocs.io/en/latest/)

Rhasspy (pronounced RAH-SPEE) is an open source, fully offline voice assistant toolkit for many languages that works well with Home Assistant, Hass.io, and Node-RED.

## [Wifi-Connect](https://github.com/balena-io/wifi-connect) (AP Mode)

This is only available When using Balena. It allows you to a Wifi Access Point on a device with AP capable hardware such as a Raspberry Pi 3, simply uncomment the docker-compose SERVICE labelled "ap" and set `MING_AP` to a value of `1` in your [Balena device variables or service variables](#configure-via-environment-variables).

## Enabling these optional components

To enable [Home-Assistant](https://www.home-assistant.io/) for example, uncomment it in [`docker-compose.yml`](docker-compose.yml)

Enabled ✔
```
  hassio:
    restart: always
    build: ./hassio
    ports:
      - "8123:8123" 
    volumes:
      - 'hassio-data:/config'
```
Disabled ✖
```
#  hassio:
#    restart: always
#    build: ./hassio
#    ports:
#      - "8123:8123" 
#    volumes:
#      - 'hassio-data:/config'
```

# Supported Targets

Currently tested targets are

- Intel NUC (which can be used for testing with QEMUx86_64)

Example command: Note the host to guest port forwarding

```sudo qemu-system-x86_64 -drive file=balena-cloud-IntelNucTest-qemux86-64-2.38.0+rev1-dev-v9.15.7.img,media=disk,cache=none,format=raw -net nic,model=virtio -net user,hostfwd=tcp::5880-:1880,hostfwd=tcp::5000-:3000,hostfwd=tcp::5883-:1883,hostfwd=tcp::5884-:1884 -m 1024 -nographic -machine type=pc,accel=kvm -smp 4 -cpu host```

You may need to increase the size of the qemu image download you get from Balena.io:

```qemu-img resize balena-cloud-IntelNucTest-qemux86-64-2.38.0+rev1-dev-v9.15.7.img -f raw +10G```

This will be picked up when the image boots and the partition/filesystem resized accordingly

- Raspberry Pi 3 B+

- Raspberry Pi Zero may work [TBD]

# Getting going

Clone this repository and follow getting started instructions at Balena.io

Either start with a Raspberry Pi 3B+, [here](https://www.balena.io/os/docs/raspberrypi3/getting-started)

Or you might choose so test with a VirtualBox VM, [here](https://www.balena.io/blog/no-hardware-use-virtualbox)

Add the remote from the Balena.io dashboard to this repo and do a git push.

Balena.io will build and deploy the containers to your target.

It's that easy!

## Configure via [environment variables](https://docs.resin.io/management/env-vars/)
Variable Name | Value | Description | Default
------------ | ------------- | ------------- | -------------
**`JUPYTER_MING_PASS`** | `STRING` | the password Jupyter Labs will start up with | mingstack
**`MING_AP`** | `1` OR `0` | Whether to start a Wifi AP or not, 0 = off, 1 = on  | 0

# More detail

Here's an example of what you will see on the Balena dashboard.

You can see the individual containers running, the unique ID (UID) of the newly registered device,
and it's local IP address. You can also enable a public URL to access the device remotely. By default
if you enable access to port 80 you'll enable access to the Grafana server.

![](https://i.ibb.co/jvxDcNr/Screenshot-from-2019-10-13-18-46-32.png)

You can see from the above that the short form of the UID for this device is e844144.

You can change this but for now if you attempt to ping that UID you should have connectivity

`$ ping e844144.local`

If you run into problems just try pinging to the local IP address you see on the dashboard 

`$ ping 192.168.0.228`

With connectivity working you can now take a look at the servers running on the target.

- NodeRed http://e844144.local:1880

![](https://i.ibb.co/pPMRkgS/Screenshot-from-2019-10-13-19-00-18.png)

- Grafana http://e844144.local:80 (default password: admin, admin)

![](https://i.ibb.co/rZ8C1qD/Screenshot-from-2019-10-13-19-00-54.png)

- You can also publish to Mosquitto using MQtt on the default port 1883

# Maintainer / Contributors

- Alex J Lennon (@embedded_iot)
- Julian Todd (@goatchurch)
- Matthew Croughan (@matthewcroughan)

# Attribution

- This is in part based on excellent work done by the Balena.io team

@see: https://github.com/balena-io-projects/balena-sense

# Contributing

Please raise issues and generate PRs at

https://github.com/DynamicDevices/ming
