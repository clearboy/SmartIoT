/** 
 *  PID Controller_PID.
 */
var Controller_PID = function(kp, ki, kd, rampRate, MaxLimit, MinLimit) {
  this.kp = Number(kp) || 1;
  this.ki = Number(ki) || 0;
  this.kd = Number(kd) || 0;

  this.rampRate = Number(rampRate);
  let limit = Number(MaxLimit);
  if(limit>0)
    this.MaxLimit   = limit;
  else
    this.MaxLimit   = Number.MAX_VALUE;
  limit = Number(MinLimit);
  if(MinLimit && Math.abs(limit) >Number.MIN_VALUE)
    this.MinLimit   = limit;
  else
    this.MaxLimit   = -this.MaxLimit;

  this.sumInt  = 0;
  this.lastError = 0;
  this.lastTime  = 0;

  this.sat       = false; //是否积分饱和

  this.commandSet = 0; // default value, can be modified with .setTarget
  this.command    = 0;
};

Controller_PID.prototype.setCommand = function(cmd) {
  this.commandSet = cmd;
};

Controller_PID.prototype.setRamprate = function(rampRate) {
  this.rampRate = rampRate;
};

Controller_PID.prototype.getParameters = function() {
  return {
    "kp": this.kp,
    "ki": this.ki,
    "kd": this.kd,
    "rampRate": this.rampRate,
    "MaxLimit": this.MaxLimit,
    "MinLimit": this.MinLimit,
    "command": this.command
  };
};

/*
feedback: 当前反馈值
dt: 两次计算的时间差
 */

Controller_PID.prototype.update = function(feedback, dt) {
  let error;
  let result;

  // 指令的Ramp up
  error = this.commandSet - this.command;
  if(this.rampRate > 0)
    if (error > this.rampRate)
      error = this.rampRate;
    else if (error < - this.rampRate)
      error = - this.rampRate;
  this.command = this.command + error;


  // PID的计算
  // 积分的计算
  this.feedback = feedback;
  error = this.command - this.feedback;
  this.sumInt = this.sumInt + error * this.ki;

  //积分饱和的处理
  if(this.sumInt  > this.MaxLimit) {
    this.sumInt = this.MaxLimit;
    this.sat = true;
  }
  else if(this.sumInt < this.MinLimit) {
    this.sumInt = this.MinLimit;
    this.sat = true;
  } else
    this.sat = false;

  // 微分的计算
  var dError = error - this.lastError;
  this.lastError = error;

  //最终的限幅值
  result =(this.kp*error) + this.sumInt + (this.kd * dError);
  if(result  > this.MaxLimit) {
    result = this.MaxLimit;
    this.sat = true || this.sat;
  }
  else if(this.sumInt < this.MinLimit) {
    result = this.MinLimit;
    this.sat = true || this.sat;
  }
  return result;
};

module.exports = Controller_PID;