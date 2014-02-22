ts.namespace('ts.gui');

(function (ns) {

    ns.init = function () {
        $('.projectlabel').text('scenario: ' + ts.project.getName());

        addListeners()

    };

    function addListeners() {
        var $maincontrol = $('#maincontrol');
        $maincontrol.on('click', function () {
            if ($maincontrol.text() === 'Start') {
                $maincontrol.text('Stop');
                ts.start();
            } else {
                $maincontrol.text('Start');
                ts.stop();
            }
        })
    }

    return ns;

})(ts.gui);