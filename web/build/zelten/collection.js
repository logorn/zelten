define(["backbone"],function(e){var t=e.Collection.extend({getBasePath:function(){return Zelten&&Zelten.ApplicationOptions&&Zelten.ApplicationOptions.base?Zelten.ApplicationOptions.base:""}});return t})