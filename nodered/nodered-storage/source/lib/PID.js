/** 
 *  PID Controller_PID.
 */
var Controller_PID = function(k_p, k_i, k_d, rampRate, intMax, intMin) {
  this.k_p = k_p || 1;
  this.k_i = k_i || 0;
  this.k_d = k_d || 0;

  this.rampRate = rampRate;
  if(intMax && intMax>0)
    this.intMax   = intMax;
  else
    this.intMax   = Number.MAX_VALUE;
  if(intMin && Math.abs(intMin) >Number.MIN_VALUE)
    this.intMin   = intMin;
  else
    this.intMax   = -this.intMax;

  this.sumError  = 0;
  this.lastError = 0;
  this.lastTime  = 0;

  this.sat       = false; //是否积分饱和

  this.target    = 0; // default value, can be modified with .setTarget
  this.current_target = 0;
  console.log("k_i:" + k_i);
  console.log("intMax:" + intMax);
};

Controller_PID.prototype.setTarget = function(target) {
  this.target = target;
};

Controller_PID.prototype.setRamprate = function(rampRate) {
  this.rampRate = rampRate;
};

/*
current_value: 当前误差值
dt: 两次计算的时间差
 */

Controller_PID.prototype.update = function(current_value, dt) {
  let error;

  // 指令的Ramp up
  error = this.target - this.current_target;
  if(this.rampRate>0)
    if (error > this.rampRate)
      error = this.rampRate;
  this.current_target = this.current_target + error;


  // PID
  this.current_value = current_value;
  error = (this.current_target - this.current_value);
  this.sumError = this.sumError + error;
  //积分饱和的处理
  if(this.sumError * this.k_i > this.intMax) {
    this.sumError = this.intMax/this.k_i;
    this.sat = true;
  }
  else if(this.sumError * this.k_i < this.intMin) {
    this.sumError = this.intMin/this.k_i;
    this.sat = true;
  } else
    this.sat = false;


  var dError = error - this.lastError;
  this.lastError = error;

  return (this.k_p*error) + (this.k_i * this.sumError) + (this.k_d * dError);
};

module.exports = Controller_PID;