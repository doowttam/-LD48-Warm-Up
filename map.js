WARMUP.map = function(spec, my) {
    var that = {};
    my = my || {};

    var canvas    = spec.canvas;
    var platforms = spec.platforms;
    
    that.onPlatform = function(creature) {
        var pos = creature.getPos();
        var nextPlatform = that.getNextPlatform(creature);

        if ( pos.y == nextPlatform ) {
            return true;
        }

        return false;
    };

    that.getNextPlatform = function(creature) {
        return canvas.height;
    };

    return that;
};