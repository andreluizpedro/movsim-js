movsim.namespace('movsim.gui');

(function (ns) {

    var $mainControl = $('#maincontrol');

    ns.init = function () {
        $('.projectlabel').text('scenario: ' + 'ring road');
//        $mainControl.text('Stop');

        addListeners()

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
        })
    }

    return ns;

})(movsim.gui);