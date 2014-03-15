movsim.namespace('movsim.carfollowing.models');

(function (ns) {
    "use strict";

    var maxDeceleration = 20;

    ns.getMaxDeceleration = function () {
        return maxDeceleration;
    };
    
    function idmCalcAcc(s, v, vl, v0eff, parameters) {
        var accFree = parameters.a * (1 - Math.pow(v / v0eff, parameters.delta));
        var sstar = parameters.s0 + v * parameters.T +  parameters.s1 * Math.sqrt((v + 0.0001) / v0eff) + 0.5 * v * (v - vl) / Math.sqrt(parameters.a * parameters.b);
        var accInt = -parameters.a * Math.pow(sstar / Math.max(s, parameters.s0), 2);
        return Math.max(-maxDeceleration, accFree + accInt);
    }

    ns.calculateAcceleration = function (s, v, vl, v0eff, parameters) {
        if (parameters instanceof movsim.carfollowing.idmParameters.IdmParameters) {
            return idmCalcAcc(s, v, vl, v0eff, parameters);
        } else{
            throw Error("cannot map parameters to acceleration function"+parameters.toString());
        }
    };
    
    return ns;

})(movsim.carfollowing.models);
