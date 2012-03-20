define(function() { return Backbone.View.extend({

        focus: -1,

        initialize: function() {
            $('body').on('keydown', _.bind(this.handleKeydown, this));
            $('body').on('click', _.bind(this.handleClick, this));

            this.model.on('finished', _.bind(this.finished, this));
            this.model.on('started', _.bind(this.gameStarted, this));
        },

        render: function() {
            $('#container').html('');

            this.buildRaster();

            $('#container').append('<div><input type="button" id="start" value="START" /></div>');
            $('#start').on('click', _.bind(this.model.startGame, this.model));
        },

        gameStarted: function() {
            $('#start').hide();
        },

        buildRaster: function() {
            var count = Math.sqrt(this.model.length);

            var id = 0;

            for (var rows = 0; rows < count; rows++) {
                var row = $('<div class="row"></div>');
                for (var cells = 0; cells < count; cells++) {
                    var cell = $('<div class="span2" id="' + id++ + '"></div>');
                    row.append(cell);
                }
                $('#container').append(row);
            }
        },

        handleKeydown: function(e) {
            var count = Math.sqrt(this.model.length);

            switch (e.keyCode) {
                case 37:
                    if (this.focus % count > 0) {
                        this.focus -= 1;
                    }
                    break;
                case 39:
                    if (this.focus % count < count - 1) {
                        this.focus += 1;
                    }
                    break;
                case 38:
                    if (Math.floor(this.focus / count) > 0) {
                        this.focus -= count;
                    }
                    break;
                case 40:
                    if (this.focus / count < count - 1 && this.focus > -1) {
                        this.focus += count;
                    }
                    break;
                case 32:
                    if (this.focus > -1) {
                        this.model.trigger('spacePress');
                        this.model.at(this.focus).toggleStatus();
                    }
                    break;
                case 72:
                    this.focus = this.model.cheat();
                    break;
            }
            this.handleFocus();
        },

        handleClick: function() {
            this.focus = -1;
            this.handleFocus();
        },

        handleFocus: function() {
            $('.active').removeClass('active');
            if (this.focus > -1) {
                $('#' + this.focus).addClass('active');
            }
        },

        finished: function(data) {

            var container = $('#container');

            container.html('');

            console.log(data);

            for (var i = 0; i < data.length; i++) {
                container.append($('<div>' + data[i].name + ' - hits: ' +  data[i].hit + ' - misses: ' + data[i].miss + '</div>'));
            }
            container.append($('<div><a href="/#game">Back to game list</a></div>'));
        }
    });
});