WARMUP.baddie = function(spec, my) {
    my = my || {};
    var that = WARMUP.creature(spec, my);

    var movingLeft = true;

    var fainted = false;

    my.speed = 1;
    
    var respawn = function() {
        setTimeout(function() {
            my.x    = spec.startX;
            my.y    = spec.startY;
            my.size = spec.size;
            fainted = false;
        }, 1000 );
    };

    that.faint = function() {
        fainted = true;
    };

    my.tick = function() {
        if ( fainted ) {
            if ( my.size > 0 ) {
                my.size--;
                return;
            }
            else {
                respawn();
            }
        }

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
