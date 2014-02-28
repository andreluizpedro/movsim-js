movsim.namespace('movsim.carFollowingModel.idmParameters');

(function (ns) {
    "use strict";

    // default parameters for car
    var v0Init = 20;
    var aInit = 1.2;
    var bInit = 1.2;
    var tInit = 1.5;
    var s0Init = 2;
    var s1Init = 0;
    var deltaInit = 4;

    var defaultCar = new IdmParameters(v0Init, aInit, bInit, tInit, s0Init, s1Init, deltaInit);

    var defaultTruck = new IdmParameters(0.8 * v0Init, 0.8 * aInit, bInit, 1.2 * tInit, s0Init, s1Init, deltaInit);

    function IdmParameters(v0, a, b, T, s0, s1, delta) {
        if (arguments.length !== 7) {
            throw new Error('missing parameters by creating intelligent driver model');
        }
        this.v0 = v0;
        this.a = a;
        this.b = b;
        this.T = T;
        this.s0 = s0;
        this.s1 = s1;
        this.delta = delta;  
    }

    ns.IdmParameters = IdmParameters;

    ns.getDefaultCar = function () {
        return defaultCar;
    };

    ns.getDefaultTruck = function () {
        return defaultTruck;
    };

    ns.createParameters = function (v0, a, b, T, s0, s1) {
        return new IdmParameters(v0, a, b, T, s0, s1, deltaInit);
    };

    return ns;

})(movsim.carFollowingModel.idmParameters);
