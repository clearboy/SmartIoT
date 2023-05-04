//module.exports = require('./lib/index.js');
module.exports = function(RED) { // RED  可以对node-red 进行访问
    "use strict";
    var Controller_PID = require('./lib/PID.js');
    function Control_PID(config) {
        RED.nodes.createNode(this, config); // 节点本身就会对调用该函数，包括节点输入的属性
        var node = this;
        this.name = config.name;
        this.user = config.user;
/*
// 这段不是必要的。
        this.command = config.command;
        this.rampRate = config.rampRate;
        this.MaxLimit = config.MaxLimit;
        this.MinLimit = config.MinLimit;
        this.kp = config.kp;
        this.ki = config.ki;
        this.kd = config.kd;
*/
        this.bandWidth = Number(config.bandWidth);

        this.controller = new Controller_PID(config.kp, config.ki, config.kd, config.rampRate, config.MaxLimit, config.MinLimit);
        this.controller.setCommand(config.command);
        this.status({fill:"blue",shape:"dot",text:"set point:"+config.command});

        var cmd = Number(config.command);

        this.on('input', function(msg) {
            if(msg.hasOwnProperty("setpoint")) {
                cmd = Number(msg.setpoint);
                this.controller.setCommand(cmd);
                this.status({fill:"blue",shape:"dot",text:"set point:"+cmd});
            }
            else if (!isNaN(msg.payload)) {
                //this.accum = this.accum + msg.payload * this.ki;
                //msg.payload = this.accum ;
                msg.payload = Number(this.controller.update(Number(msg.payload)));
                msg.topic = "PID";
                msg.parameters = this.controller.getParameters();
                this.send(msg);
            }
            else { this.warn("Non numeric input"); }

            // 积分器饱和的提示
            if (this.controller.sat)
                this.status({fill:"yellow",shape:"dot",text:"set point:"+this.controller.command});
            else
                this.status({fill:"blue",shape:"dot",text:"set point:"+this.controller.command});
        });
    }
    RED.nodes.registerType("智能控制PID",Control_PID);
}