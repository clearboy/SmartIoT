REM 提取镜像
set ip_addr="192.168.30.202"
docker pull %ip_addr%:5000/smartiot-nodered:latest

docker pull %ip_addr%:5000/smartiot-grafana:latest

docker pull %ip_addr%:5000/smartiot-mqtt:latest

docker pull %ip_addr%:5000/smartiot-influxdb:latest

docker pull %ip_addr%:5000/emqx/emqx:latest


REM docker compose -f "docker-compose.yml" up -d --build