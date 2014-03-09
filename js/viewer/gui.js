movsim.namespace('movsim.gui');

(function (ns) {
    "use strict";

    var $startControl;
    var $restartControl;
    var $projectLabel;
    var $timeWarpControl;
    var $aControl;
    var $v0Control;
    var $timeGapControl;
    var $s0Control;
    var $bControl;

    ns.init = function () {

        $projectLabel = $('.projectlabel');
        $startControl = $('#startcontrol');
        $restartControl = $('#restartcontrol');

        $timeWarpControl = $('#time-warp').slider();
        $aControl = $('#a').slider();
        $v0Control = $('#v0').slider();
        $timeGapControl = $('#time-gap').slider();
        $s0Control = $('#s0').slider();
        $bControl = $('#b').slider();

        addListeners();

    };

    ns.reset = function (name) {
        $startControl.text('Stop');
        $projectLabel.text('scenario: ' + name);
    };

    function addListeners() {

        // menu dropdown on hover
        $('.navbar .dropdown').hover(function() {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(200).slideDown();
        }, function() {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();
        });

        // scenario change
        $('#scenario-ringroad').on('click', function () {
            movsim.setScenario('ringRoad');
        });
        $('#scenario-startstop').on('click', function () {
            movsim.setScenario('startStop');
        });

        // main simulation controls
        $startControl.on('click', function () {
            if ($startControl.text() === 'Start') {
                $startControl.text('Stop');
                movsim.start();
            } else {
                $startControl.text('Start');
                movsim.stop();
            }
        });

        $restartControl.on('click', function () {
            movsim.setScenario();
        });

        // model parameters controls
        var defaultCar = movsim.carfollowing.idmParameters.getDefaultCar();
        var defaultTruck = movsim.carfollowing.idmParameters.getDefaultTruck();

        var $timeWarpValue = $('#time-warp-value');
        var $aValue = $('#a-value');
        var $v0Value= $('#v0-value');
        var $timeGapValue = $('#time-gap-value');
        var $s0Value= $('#s0-value');
        var $bValue= $('#b-value');

        $timeWarpControl.on('slide', function (ev) {
            var value = ev.value;
            movsim.setTimeWarp(value);
            $timeWarpValue.text(value.toFixed(1) + ' times');
        });

        $aControl.on('slide', function (ev) {
            var value = ev.value;
            defaultCar.a = value;
            defaultTruck.a = 0.8 * value;
            $aValue.html(value.toFixed(1) + ' m/s<sup>2</sup>');
        });

        $v0Control.on('slide', function (ev) {
            var value = ev.value;
            defaultCar.v0 = value;
            defaultTruck.v0 = 0.8 * value;
            $v0Value.text(value.toFixed(1) + ' m/s');
        });

        $timeGapControl.on('slide', function (ev) {
            var value = ev.value;
            defaultCar.t = value;
            defaultTruck.t = 1.2 * value;
            $timeGapValue.text(value.toFixed(1) + ' s');
        });

        $s0Control.on('slide', function (ev) {
            var value = ev.value;
            defaultCar.s0 = value;
            defaultTruck.s0 = value;
            $s0Value.text(value.toFixed(1) + ' m');
        });

        $bControl.on('slide', function (ev) {
            var value = ev.value;
            defaultCar.b = value;
            defaultTruck.b = value;
            $bValue.html(value.toFixed(1) + ' m/s<sup>2</sup>');
        });
    }

    return ns;

})(movsim.gui);