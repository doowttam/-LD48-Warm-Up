WARMUP.map = function(spec, my) {
    var that = {};
    my = my || {};

    var canvas    = spec.canvas;
    var context   = spec.context;
    var platforms = spec.platforms;
    
    that.onPlatform = function(creature) {
        var pos          = creature.getPos();
        var nextPlatform = that.getNextPlatform(creature);

        if ( pos.y == nextPlatform ) {
            return true;
        }

        return false;
    };

    // FIXME: This seems horribly inefficient, could store
    // platforms in a better data structure to make
    // finding the next easier.
    that.getNextPlatform = function(creature) {
        var pos = creature.getPos();

        var nextPlatform           = canvas.height;
        var distanceToNextPlatform = nextPlatform - pos.y;

        for ( var i = 0; i < platforms.length; i++ ) {
            var distance = platforms[i][1] - pos.y;

            if ( distance < distanceToNextPlatform ) {
                var leftEdge  = platforms[i][0];
                var rightEdge = platforms[i][2];

                if ( pos.x < rightEdge && pos.x > leftEdge // hanging off right side
                     || pos.x + pos.size > leftEdge && pos.x + pos.size < rightEdge // hanging off left side
                     || pos.x <= leftEdge && pos.x + pos.size >= rightEdge // bigger than platform
                   ) {
                    nextPlatform           = platforms[i][1];
                    distanceToNextPlatform = distance;

                    // Found the platform we're on, bail
                    if ( distance == 0 ) {
                        break;
                    }
                }
            }
        }

        return nextPlatform;
    };

    that.draw = function() {
        context.strokeStyle = 'black';

        for ( var i = 0; i < platforms.length; i++ ) {
            context.moveTo(platforms[i][0], platforms[i][1]);
            context.lineTo(platforms[i][2], platforms[i][3]);
        }

        context.stroke();
    };

    return that;
};