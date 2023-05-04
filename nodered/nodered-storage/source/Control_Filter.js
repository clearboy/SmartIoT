module.exports = function(RED) { // RED  可以对node-red 进行访问
    "use strict";
    function Control_Filter(config) {
        RED.nodes.createNode(this,config); // 节点本身就会对调用该函数，包括节点输入的属性
        var node = this;
        node.name = config.name;
        node.user = config.user;
        this.kp = config.kp;
        this.ki = config.ki;
        this.kd = config.kd;
        this.accum = 0;


        node.on('input', function(msg) {
            if (!isNaN(msg.payload)) {
                this.accum = this.accum + msg.payload * this.ki;
                msg.payload = this.accum ;
                node.send(msg);
            }
            else { node.warn("Non numeric input"); }
        });
    }
    RED.nodes.registerType("反馈滤波器",Control_Filter);
}