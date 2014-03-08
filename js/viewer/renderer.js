movsim.namespace('movsim.renderer');

(function (ns) {
    "use strict";

    // private vars
    var canvas;
    var ctx;
    var roadNetwork;
    var scenarioRenderer;

    ns.getCanvas = function () {
        return canvas;
    };

    // public methods
    ns.init = function (network) {
        roadNetwork = network;
        canvas = document.getElementById("animation-canvas");
        ctx = canvas.getContext("2d");
    };

    ns.drawBackground = function () {
        scenarioRenderer.drawBackground();
    };

    ns.clear = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    ns.drawRoads = function () {
        scenarioRenderer.drawRoads();
    };

    ns.drawVehicles = function () {
        scenarioRenderer.drawVehicles(roadNetwork);
    };

    ns.setRendererForScenario = function (scenario) {
        switch (scenario) {
            case 'startStop' :
                scenarioRenderer = new ns.StartStopRenderer();
                break;
            case 'ringRoad' :
                scenarioRenderer = new ns.RingRoadRenderer();
                break;
            default :
                throw new Error('scenario name has no match');
        }
    };

    ns.setRenderer = function (renderer) {
        scenarioRenderer = renderer;
    };

    /**
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   {Number}  h       The hue (periodic, period 1!)
     * @param   {Number}  s       The saturation
     * @param   {Number}  l       The lightness
     * @return  {Array}           The RGB representation
     */
    ns.hslaToRgba = function (h, s, l, a) {
        var r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = Math.round(255 * hue2rgb(p, q, h + 1 / 3));
            g = Math.round(255 * hue2rgb(p, q, h));
            b = Math.round(255 * hue2rgb(p, q, h - 1 / 3));
        }

        function hue2rgb(p, q, t) {
            if (t < 0) {
                t += 1;
            }
            if (t > 1) {
                t -= 1;
            }
            if (t < 1 / 6) {
                return p + (q - p) * 6 * t;
            }
            if (t < 1 / 2) {
                return q;
            }
            if (t < 2 / 3) {
                return p + (q - p) * (2 / 3 - t) * 6;
            }
            return p;
        }

        return [r, g, b, a];

    };

    /**
     * changes speed in semi-transparent rainbow colors
     * if (isTruck) [arg optional], then everything is darker
     *
     * @param {number} v
     * @param {number} vmin
     * @param {number} vmax
     * @param {string} [vehType]
     * @returns {string} rgba
     */
    ns.colormapSpeed = function (v, vmin, vmax, vehType) {
        var hue_vmin = 0 / 360; // color wheel: 0=360=red
        var hue_vmax = 150 / 360; // color wheel: 0=360=red

        var vRelative = (v - vmin) / (vmax - vmin);
        //vRelative=Math.min(Math.max(0,vRelative), 1);
        var hue = hue_vmin + vRelative * (hue_vmax - hue_vmin);

        // use max. saturation
        var sat = 1;

        // brightness=1: all white; 0: all black; colors: in between
        var brightness = 0.5;
        //var rgbaArr=hslaToRgba(0.1,1,0.5,0.5);
        var rgbaArr = ns.hslaToRgba(hue, sat, brightness, 0.5);

        var r = rgbaArr[0];
        var g = rgbaArr[1];
        var b = rgbaArr[2];
        var a = rgbaArr[3];
        if (vehType === "truck") {
            r = Math.round(0.6 * r);
            g = Math.round(0.6 * g);
            b = Math.round(0.6 * b);
            a = 0.45;
        }
        var colStr = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        return colStr;

    };

    return ns;

})(movsim.renderer);
