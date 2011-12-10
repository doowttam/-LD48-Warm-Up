WARMUP = function() {

    var canvas  = null;
    var context = null;

    var frameInterval = null;

    var on = false;

    return {
        init: function(doc, win) {
            canvas  = doc.getElementById("game_canvas");
            context = canvas.getContext("2d");

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

            if ( on ) {
                context.fillText("Success!", canvas.width - canvas.width / 2, canvas.height - canvas.height / 2);
            }

            on = !on;
        }
    };
}();