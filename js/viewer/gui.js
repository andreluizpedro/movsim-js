movsim.namespace('movsim.gui');

(function (ns) {

    ns.init = function () {
        $('.projectlabel').text('scenario: ' + movsim.project.getName());

        addListeners()

    };

    function addListeners() {
        var $maincontrol = $('#maincontrol');
        $maincontrol.on('click', function () {
            if ($maincontrol.text() === 'Start') {
                $maincontrol.text('Stop');
                movsim.start();
            } else {
                $maincontrol.text('Start');
                movsim.stop();
            }
        })
    }

    return ns;

})(movsim.gui);