movsim.namespace('movsim.gui');

(function (ns) {
    "use strict";

    var $mainControl;
    var $timeWarp;
    var $acc;
    var $v0;

    ns.init = function () {

        $('.projectlabel').text('scenario: ' + 'ring road');

        $mainControl = $('#maincontrol');
        $timeWarp = $('#time-warp').slider();
        $acc = $('#acc').slider();
        $v0 = $('#v0').slider();

        addListeners();

    };

    function addListeners() {

        var defaultCar = movsim.carfollowing.idmParameters.getDefaultCar();
        var defaultTruck = movsim.carfollowing.idmParameters.getDefaultTruck();
        var $timeWarpValue = $('#time-warp-value');
        var $accValue = $('#acc-value');
        var $v0value= $('#v0-value');

        $mainControl.on('click', function () {
            if ($mainControl.text() === 'Start') {
                $mainControl.text('Stop');
                movsim.start();
            } else {
                $mainControl.text('Start');
                movsim.stop();
            }
        });

        $timeWarp.on('slide', function (ev) {
            var value = ev.value;
            movsim.setTimeWarp(value);
            $timeWarpValue.text(value.toFixed(1) + ' times');
        });

        $acc.on('slide', function (ev) {
            var value = ev.value;
            defaultCar.a = value;
            defaultTruck.a = 0.8 * value;
            $accValue.html(value.toFixed(1) + ' m/s<sup>2</sup>');
        });

        $v0.on('slide', function (ev) {
            var value = ev.value;
            defaultCar.v0 = value;
            defaultTruck.v0 = 0.8 * value;
            $v0value.text(value.toFixed(1) + ' m/s');
        });
    }

    return ns;

})(movsim.gui);