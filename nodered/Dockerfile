FROM nodered/node-red:latest

# Copy package.json to the WORKDIR so npm builds all
# of your added nodes modules for Node-RED
#RUN npm install node-red-contrib-influxdb \
#                node-red-dashboard
#                node-red-node-serialport \
RUN npm install @js-on/node-red-contrib-py3run \
                @wz2b/node-red-influxdb-line-protocol \
                node-red-node-smooth \
                node-red-contrib-ads \
                node-red-contrib-influxdb \
                node-red-contrib-omron-fins \
                node-red-contrib-pid \
                node-red-contrib-python3-function \
                node-red-contrib-tdengine \
                node-red-dashboard \
                node-red-node-pidcontrol 

# Copy package.json to the WORKDIR so npm builds all
# of your added nodes modules for Node-RED
# COPY package.json .
# RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production

# Copy _your_ Node-RED project files into place
# NOTE: This will only work if you DO NOT later mount /data as an external volume.
#       If you need to use an external volume for persistence then
#       copy your settings and flows files to that volume instead.
# NodeRed的设置信息
# COPY nodered-config/settings.js /data/.
# COPY nodered-config/settings.js .
# 个性化定制界面
COPY nodered-config/icon.svg node_modules/@node-red/editor-client/public/icon.svg
COPY nodered-config/icon.svg node_modules/@node-red/editor-client/public/red/images/icon.svg
COPY nodered-config/icon.svg node_modules/@node-red/editor-client/public/red/images/node-red-256.svg
COPY nodered-config/theme.js node_modules/@node-red/editor-api/lib/editor/theme.js



# 默认的文件
COPY nodered-config/atl.json /data/flows.json

#COPY flows_cred.json /data/flows_cred.json
#COPY flows.json /data/flows.json

# You should add extra nodes via your package.json file but you can also add them here:
#WORKDIR /usr/src/node-red
#RUN npm install node-red-node-smooth
