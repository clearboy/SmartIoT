
REM smartiot-grafana
REM docker tag smartiot-grafana localhost:5000/smartiot-grafana:latest
REM docker push localhost:5000/smartiot-grafana:latest


REM smartiot-nodered
set image_name=smartiot-nodered
set ip_addr="192.168.30.12"
REM set ip_addr=localhost

docker tag %image_name% %ip_addr%:5000/%image_name%:latest
docker push %ip_addr%:5000/%image_name%:latest
curl http://%ip_addr%:5000/v2/_catalog

REM smartiot-grafana
set image_name=smartiot-grafana
docker tag %image_name% %ip_addr%:5000/%image_name%:latest
docker push %ip_addr%:5000/%image_name%:latest
curl http://%ip_addr%:5000/v2/_catalog


REM smartiot-mqtt
set image_name=smartiot-mqtt
docker tag %image_name% %ip_addr%:5000/%image_name%:latest
docker push %ip_addr%:5000/%image_name%:latest
curl http://%ip_addr%:5000/v2/_catalog

REM smartiot-influxdb
set image_name=smartiot-influxdb
docker tag %image_name% %ip_addr%:5000/%image_name%:latest
docker push %ip_addr%:5000/%image_name%:latest
curl http://%ip_addr%:5000/v2/_catalog


REM emqx/emqx
set image_name="emqx/emqx"
docker tag %image_name% %ip_addr%:5000/%image_name%:latest
docker push %ip_addr%:5000/%image_name%:latest
curl http://%ip_addr%:5000/v2/_catalog


