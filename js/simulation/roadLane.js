movsim.namespace('movsim.simulation.roadLane');

(function (ns) {
    "use strict";

    // Constructor
    function RoadLane(){
        this.vehicles = [];
    };

    // Factory
    ns.create = function (){
        return new RoadLane();
    };

    var p = RoadLane.prototype;
    p.addVehicle = function(vehicle){
        this.vehicles.push(vehicle);
    };

    p.calcAccelerations = function() {
        for(var i=0; i<this.vehicles.length; i++){
            var vehicle = this.vehicles[i];
            // TODO special case ringroad
            if(vehicle.length>1){
               var leader = (i==this.vehicles.length-1) ? this.vehicles[0] : this.vehicles[i+1];
               vehicle.updateAcceleration(leader);
            }
            else{
               vehicle.updateAcceleration();
            }
        }
    };

    p.updateSpeedAndPosition = function (dt) {
        for(var i=0; i<this.vehicles.length; i++){
            // TODO better naming for ide
            this.vehicles[i].updateSpeedAndPosition(dt);
        }
    };

    p._sortVehicles = function (){
        // TODO sort according to Vehicle.position
    };

    return ns;

})(movsim.simulation.roadLane);