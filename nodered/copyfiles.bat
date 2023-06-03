
echo off
cls

echo Pleasse input the directory of node_modules:
set dirTarget="C:\Users\admin\AppData\Roaming\npm\node_modules\node-red"
echo %dirTarget%
set /p dirTarget=":"

echo "--------------------"
echo Will copy files to:
echo %dirTarget%
PAUSE

COPY nodered-config\settings.js %dirTarget%\node_modules\node-red\.

COPY nodered-config\xywang.svg %dirTarget%\node_modules\@node-red\editor-client\public\icon.svg
COPY nodered-config\xywang.svg %dirTarget%\node_modules\@node-red\editor-client\public\red\images\icon.svg
COPY nodered-config\xywang.svg %dirTarget%\node_modules\@node-red\editor-client\public\red\images\node-red.svg
COPY nodered-config\xywang.svg %dirTarget%\node_modules\@node-red\editor-client\public\red\images\node-red-256.svg
COPY nodered-config\theme.js %dirTarget%\node_modules\@node-red\editor-api\lib\editor\theme.js

PAUSE