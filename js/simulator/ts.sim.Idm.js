ts.namespace('ts.sim');

(function (ns) {

    var Idm = (function () {

        // static variables

        /**
         * Constructor Intelligent Driver Model
         * Longitudinal Model
         *
         * @param {number} v0 - desired velocity, m/s
         * @param {number} a - maximum acceleration, m/s^2
         * @param {number} b - desired deceleration (comfortable braking), m/s^2
         * @param {number} T - safe time headway, seconds
         * @param {number} s0 - bumper to bumper vehicle distance in stationary traffic, meters
         * @param {number} s1 - gap parameter, meters
         * @constructor
         */
        function Idm(v0, a, b, T, s0, s1) {
            console.log(' * new IDM: ');

            // public variables
            this.v0 = v0;
            this.a = a;
            this.b = b;
            this.T = T;
            this.s0 = s0;
            this.s1 = s1;

            this.vlimit=v0; // if effective speed limits, vlimit<v0
            this.vmax=v0; // if vehicle restricts speed, vmax<vlimit, v0
        }

        var p = Idm.prototype;
        // public functions
        p.calculateAcceleration = function (s, v, vl) {
            var v0eff = Math.min(this.v0, this.vlimit, this.vmax);
            var accFree = this.a * (1 - Math.pow(v / v0eff, 4));
            var sstar = this.s0 + v * this.T + 0.5 * v * (v - vl) / Math.sqrt(this.a * this.b);
            var accInt = -this.a * Math.pow(sstar / Math.max(s, this.s0), 2);
//            var accInt_IDMplus = accInt + this.a;
            return Math.max(-20, accFree + accInt);
        };

        return Idm;

    })();


    ns.Idm = Idm;

    return ns;

})(ts.sim);
