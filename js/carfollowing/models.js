movsim.namespace('movsim.carfollowing.model');

(function (ns) {
    "use strict";

    var maxDeceleration = 20;

    ns.getMaxDeceleration = function () {
        return maxDeceleration;
    }

    ns.calculateAcceleration = function (followingVehicle, leadingVehicle) {
        var leaderPosition = leadingVehicle ? leadingVehicle.position : 1000000;
        var leaderSpeed = leadingVehicle ? leadingVehicle.speed : 100;
        var distance = leaderPosition - followingVehicle.position;
        if (distance < 0) {
            throw new Error('negative distance');
        }
        var effectiveDesiredSpeed = Math.min(parameters.v0, followingVehicle.vLimit, followingVehicle.vMax);
        var acc = calcAcc(distance, followingVehicle.speed, leaderSpeed, effectiveDesiredSpeed, followingVehicle.carFollowingModelParameters);
        return acc;
    };

    ns.calculateAccelerationSimple = function (s, v, vl, v0eff, parameters) {
        if(parameters instanceof IdmParameters){
        var accFree = parameters.a * (1 - Math.pow(v / v0eff, parameters.delta));
        var sstar = parameters.s0 + v * parameters.T +  parameters.s1 * Math.sqrt((v + 0.0001) / v0eff) + 0.5 * v * (v - vl) / Math.sqrt(parameters.a * parameters.b);
        var accInt = -parameters.a * Math.pow(sstar / Math.max(s, parameters.s0), 2);
        return Math.max(-maxDeceleration, accFree + accInt);
        }
        else{
            throw Error("cannot map parameters to acceleration function"+parameters.toString());
        }
    }

    return ns;

})(movsim.carfollowing.model);
