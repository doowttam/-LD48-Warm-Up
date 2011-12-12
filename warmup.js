WARMUP = function() {

    var canvas  = null;
    var context = null;

    var frameInterval = null;

    var zoe     = null;
    var gravity = null;
    var map     = null;
    var baddie  = null;

    var creatures = [];

    return {
        init: function(doc, win) {
            canvas  = doc.getElementById("game_canvas");
            context = canvas.getContext("2d");

            map = WARMUP.map({
                "canvas":  canvas,
                "context": context,
                "platforms": [
                    [ 0, 300, canvas.width, 300 ],
                    [ 60, 260, 100, 260 ],
                    [ 100, 220, 140, 220 ],
                    [ 340, 260, 375, 260 ]
                ]
            });

            zoe = WARMUP.zoe({
                "context": context,
                "canvas":  canvas,
                "startX":  350,
                "startY":  40,
                "size":    10,
                "map":     map,
                "color":   "black"
            });

            baddie = WARMUP.baddie({
                "context": context,
                "canvas":  canvas,
                "startX":  120,
                "startY":  40,
                "size":    10,
                "map":     map,
                "color":   "red"
            });

            gravity = WARMUP.gravity();

            creatures.push(zoe);
            creatures.push(baddie);

            win.onkeypress = function(e) {
                zoe.movement(e);
            };

            frameInterval = this.play();
        },

        play: function() {
            return setInterval( function() {
                WARMUP.drawFrame();
            }, 50 );
        },

        pause: function() {
            if ( frameInterval ) {

                clearInterval( frameInterval );
                clearInterval = null;

                context.font = "bold 12px sans-serif";
                context.textAlign = "right";
                context.textBaseline = "top";
                context.fillText("PAUSED", canvas.width - 20, 20);
            }
            else {
                frameInterval = this.play();
            }
        },

        resetCanvas: function() {
            canvas.width = canvas.width;
        },

        drawFrame: function() {
            this.resetCanvas();

            gravity.pull(creatures);

            map.draw();
            zoe.draw();
            baddie.draw();
        }
    };
}();
