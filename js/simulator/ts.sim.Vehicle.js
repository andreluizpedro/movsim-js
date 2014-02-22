ts.namespace('ts.sim');

(function (ns) {

    var Vehicle = (function () {
        // private variables are not possible with constructor creation pattern

        // static variables
        var vehiclesCreatedCount = 0;

        // constructor
        function Vehicle (len, width) {
            console.log(' * new Vehicle len: ', len);

            // public variables
            this.len = len;
            this.width = width;
            this.acc = 0;
            this.longmodel = new ns.Idm();
//            this.laneChangeModel = new.Mobil();

            vehiclesCreatedCount += 1;

        }

        // public functions
        var p = Vehicle.prototype;
        p.updateAcceleration = function () {
            this.acc = this.longmodel.calculateAcceleration(gap, speed, speedLeader);
        };

        p.considerLaneChange = function () {
            return false;
        };

        p.getVehiclesCreatedCount = function () {
            return vehiclesCreatedCount;
        };

        return Vehicle;

    })();


    ns.Vehicle = Vehicle;

    return ns;

})(ts.sim);
