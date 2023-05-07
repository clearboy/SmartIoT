
echo off
cls

echo Pleasse input the directory of node_modules:
set dirToolbox=%CD%
set dirTarget="C:\Users\xywang\.node-red"
echo %dirTarget%
set /p dirTarget=":"

cd /D %dirTarget%
echo --------------------
echo Will intall toolbox from
echo %dirToolbox%
echo to:
echo %dirTarget%
PAUSE

npm install %dirToolbox%\nodered-storage --no-save

PAUSE