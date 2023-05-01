FROM nodered/node-red:latest

# Copy package.json to the WORKDIR so npm builds all
# of your added nodes modules for Node-RED
#RUN npm install node-red-contrib-influxdb \
#                node-red-dashboard
#                node-red-node-serialport \

# Copy package.json to the WORKDIR so npm builds all
# of your added nodes modules for Node-RED
# COPY package.json .
# RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production

# Copy _your_ Node-RED project files into place
# NOTE: This will only work if you DO NOT later mount /data as an external volume.
#       If you need to use an external volume for persistence then
#       copy your settings and flows files to that volume instead.
# NodeRed的设置信息
COPY nodered-config/settings.js /data/.
# 个性化定制界面
COPY nodered-config/icon.svg node_modules/@node-red/editor-client/public/icon.svg
COPY nodered-config/icon.svg node_modules/@node-red/editor-client/public/red/images/icon.svg
COPY nodered-config/theme.js node_modules/@node-red/editor-api/lib/editor/theme.js
# 默认的文件
COPY nodered-config/atl.json /data/.

#COPY flows_cred.json /data/flows_cred.json
#COPY flows.json /data/flows.json

# You should add extra nodes via your package.json file but you can also add them here:
# WORKDIR /usr/src/node-red
# WORKDIR /data
#RUN npm install node-red-node-smooth
