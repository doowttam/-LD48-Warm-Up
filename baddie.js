WARMUP.baddie = function(spec, my) {
    my = my || {};
    var that = WARMUP.creature(spec, my);

    var movingLeft = true;

    my.speed = 2;

    my.tick = function() {
        if ( !my.map.onPlatform(that) ) {
            return;
        }

        if ( movingLeft ) {
            if ( my.x <= 0 ) {
                movingLeft = false;
                return;
            }

            my.x = my.x - my.speed;
        }
        else {
            if ( my.x + my.size >= my.canvas.width ) {
                movingLeft = true;
                return;
            }

            my.x = my.x + my.speed;
        }

    };

    return that;
};
