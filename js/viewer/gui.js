movsim.namespace('movsim.gui');

(function (ns) {
    "use strict";

    var $mainControl;
    var $timeWarp;

    ns.init = function () {

        $('.projectlabel').text('scenario: ' + 'ring road');

        $mainControl = $('#maincontrol');
        $timeWarp = $('#time-warp').slider();

        addListeners();

    };

    function addListeners() {

        $mainControl.on('click', function () {
            if ($mainControl.text() === 'Start') {
                $mainControl.text('Stop');
                movsim.start();
            } else {
                $mainControl.text('Start');
                movsim.stop();
            }
        });

        $timeWarp.on('slide', function(ev){
            var value = ev.value;
            movsim.setTimeWarp(value);
        });
    }

    return ns;

})(movsim.gui);