module.exports = function(RED) { // RED  可以对node-red 进行访问
    function RF_write(config) {
        RED.nodes.createNode(this,config); // 节点本身就会对调用该函数，包括节点输入的属性
        var node = this;
        node.name = config.name;
        node.user = config.user;

        node.on('input', function(msg) {
            node.send(msg);
        });
    }
    RED.nodes.registerType("涂布机",RF_write);
}