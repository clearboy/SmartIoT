/**
 * Module dependencies.
 */

var Controller = require('../lib/PID.js')
  , should = require('should')
  , assert = require('assert')
  ;
const Controller_PID = require("../lib/PID.js");

/**
 * Testspid_
 */
describe('pid-controller', function(){

  var k_p = 0.5,
      k_i = 0.1,
      k_d = 0.2,
      rampRate =  0,
      intMax = 2000,
      intMin = -2000
    ;

  // Create the controller
  var ctr = new Controller_PID(k_p, k_i, k_d,rampRate, intMax, intMin);

  it('should have set the coefficient', function() {
    ctr.k_p.should.equal(k_p);
    ctr.k_i.should.equal(k_i);
    ctr.k_d.should.equal(k_d);
  });

  it('should set the target', function(){
    var v = 120; // 120km/h
    ctr.setTarget(v);
    ctr.target.should.equal(v);
  });

  it('should return the correction', function(){
    var vt = 110; // current speed
    var correction = ctr.update(vt);
    correction.should.equal(8);
  });

});
