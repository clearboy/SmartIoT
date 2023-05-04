//module.exports = require('./lib/index.js');
module.exports = function(RED) { // RED  可以对node-red 进行访问
    "use strict";
    var Controller_PID = require('./lib/PID.js');
    function Control_PID(config) {
        RED.nodes.createNode(this, config); // 节点本身就会对调用该函数，包括节点输入的属性
        var node = this;
        this.name = config.name;
        this.user = config.user;

        this.target = config.target;
        this.ramprate = config.ramprate;
        this.intMaxLimit = config.intMaxLimit;
        this.intMinLimit = config.intMinLimit;
        this.kp = config.kp;
        this.ki = config.ki;
        this.kd = config.kd;

        this.controller = new Controller_PID(this.kp, this.ki, this.kd, this.ramprate, this.intMaxLimit, this.intMinLimit);
        this.controller.setTarget(this.target);
        this.status({fill:"blue",shape:"dot",text:"set point:"+this.target});

        var tgt = this.target;

        this.accum = 0;


        this.on('input', function(msg) {
            if(msg.hasOwnProperty("setpoint")) {
                tgt = Number(msg.setpoint);
                this.controller.setTarget(tgt);
                this.status({fill:"blue",shape:"dot",text:"set point:"+tgt});
            }
            else if (!isNaN(msg.payload)) {
                //this.accum = this.accum + msg.payload * this.ki;
                //msg.payload = this.accum ;
                msg.payload = this.controller.update(Number(msg.payload));
                msg.topic = "PID";
                msg.parameter = {
                  "K_p": this.K_p,
                  "K_i": this.K_i,
                  "K_d": this.K_d,
                  "ramprate": this.ramprate,
                  "intMaxLimit": this.intMaxLimit
                };
                this.send(msg);
            }
            else { this.warn("Non numeric input"); }

            // 积分器饱和的提示
            if (this.controller.sat)
                this.status({fill:"yellow",shape:"dot",text:"set point:"+tgt});
        });
    }
    RED.nodes.registerType("智能控制PID",Control_PID);
}