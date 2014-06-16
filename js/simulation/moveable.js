movsim.namespace('movsim.simulation.moveable');

(function (ns) {
    "use strict";

    // @constructor
    function Moveable(vehicle, position) {
        // public variables
        this.vehicle = vehicle;
        this.position = position;
    }

    ns.Moveable = Moveable;

    // Factory
    ns.create = function (vehicle, newPosition) {
        return new Moveable(vehicle, newPosition);
    };
    
    // public functions
    var p = Moveable.prototype;
    p.getLength = function () {
        return this.vehicle.length;
    };
    
    p.getSpeed = function () {
        return this.vehicle.speed;
    };
    
    return ns;

})(movsim.simulation.moveable);