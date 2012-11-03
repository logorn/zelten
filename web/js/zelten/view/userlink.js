define(["backbone", "zelten/view/user", "clickover"], function(Backbone, UserView) {
    var userLinkView = Backbone.View.extend({
        render: function() {
            this.$el.clickover({
                title:'User-Details',
                content: '&nbsp;',
                html: true,
                placement: 'bottom',
                width: 400,
                template: '<div class="popover popover-user-details"><div class="arrow"></div><div class="popover-inner"><div class="popover-content loading"><p></p></div></div></div>'
            }).bind('shown', this.clickoverIsShown);
        },
        clickoverIsShown: function(e) {
            var link = $(this);
            $.get($(e.currentTarget).attr('href'), function(data) {
                data = $(data);
                var userView = new UserView({
                    el: data
                });

                link.data('clickover')
                    .tip()
                    .find('.popover-content')
                    .removeClass('loading').html(data);
            });
        }
    });

    return userLinkView;
});