define(["text!application/views/stats.html"], function (template) { return Backbone.View.extend({

    className: 'stats',
    tagName: 'div',

    time: 0,
    clickCount: 0,

    initialize: function() {
        this.model.on('spacePress', _.bind(this.spacePress, this));
    },

    render: function() {
        $(this.el).html(template);
        $('#container').append(this.el);
        $('body').on('click', _.bind(this.clicks, this));
        this.counter();
    },

    counter: function() {
        setInterval(_.bind(this.updateCounter, this), 1000);
    },

    updateCounter: function() {
        this.time++;

        var min = Math.floor(this.time / 60);
        min = (min < 10) ? '0' + min : min;
        var sek = this.time - min * 60;
        sek = (sek < 10) ? '0' + sek : sek;

        $('#timer').html(min + ':' + sek);
    },

    clicks: function(e) {
        var target = $(e.target);

        if (target.context.tagName == 'IMG'
            && target.attr('class') == 'card_container') {
            this.incrementClickCount();
        }
    },

    spacePress: function() {
        this.incrementClickCount();
    },

    incrementClickCount: function() {
        this.clickCount += 1;
        $('#clicks').html(this.clickCount);
    }
});
});
