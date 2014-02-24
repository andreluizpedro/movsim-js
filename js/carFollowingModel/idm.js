movsim.namespace('movsim.carFollowingModel.idm');

(function (ns) {
    "use strict";

    var parameters;

    ns.setParameters = function (idmParameters) {
        if (!(idmParameters instanceof movsim.carFollowingModel.idmParameters.IdmParameters)) {
            throw new Error('parameters not instanceof idmParameters');
        }
        parameters = idmParameters;
    };

    ns.getParameters = function () {
        return parameters;
    };

    function calcAcc(s, v, vl, v0eff) {
        var accFree = parameters.a * (1 - Math.pow(v / v0eff, 4));
        var sstar = parameters.s0 + v * parameters.T + 0.5 * v * (v - vl) / Math.sqrt(parameters.a * parameters.b);
        var accInt = -parameters.a * Math.pow(sstar / Math.max(s, parameters.s0), 2);
        return Math.max(-20, accFree + accInt);
    }

    ns.calculateAcceleration = function (followingVehicle, leadingVehicle) {
        var leaderPosition = leadingVehicle ? leadingVehicle.position : 1000000;
        var leaderSpeed = leadingVehicle ? leadingVehicle.speed : 100;
        var distance = leaderPosition - followingVehicle.position;
        if (distance < 0) {
            throw new Error('negative distance');
        }
        var effectiveDesiredSpeed = Math.min(parameters.v0, followingVehicle.vLimit, followingVehicle.vMax);
        var acc = calcAcc(distance, followingVehicle.speed, leaderSpeed, effectiveDesiredSpeed);
        return acc;
    };

    return ns;

})(movsim.carFollowingModel.idm);
