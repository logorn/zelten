define(["backbone","zelten/model/message","zelten/view/modaldialog","autosize","select2"],function(e,t,n){var r=e.View.extend({events:{"click .message":"showActions","keyup .message":"showActions","change .message":"showActions","click .stream-message-add-cancel":"cancelPosting",submit:"writeMessage"},initialize:function(e){this.mentions=e.mentions||"",this.hasPermissions=this.$el.find(".complete-permissions").length>0},render:function(){this.$el.find("textarea").autosize({}),this.actions=this.$el.find(".actions"),this.messageBox=this.$el.find(".message"),this.btn=this.$el.find(".stream-message-add-btn"),this.charsLeft=this.$el.find(".status-length-left"),this.hasPermissions&&this.$el.find(".complete-permissions").select2({tags:["Everybody"]})},cancelPosting:function(){var e=this.$el.find(".actions");this.$el.find(".message").data("AutoResizer").config.extraSpace=0,this.$el.find(".message").css("height",30),e.slideUp()},writeMessage:function(e){var t=$(e.currentTarget),r=t.find(".message").val();if(typeof r=="undefined"||r.length==0)return t.find(".message").addClass("error"),!1;if(r.length>256){var i=new n({params:{title:"Publish this Post as Essay?",post:"The text of this status message is longer than 256 chars. Do you want to post the status as an essay instead?",label:"Yes, publish!"},success:_.bind(this.sendMessage,this,t)});return i.render(),!1}return this.sendMessage(t),!1},sendMessage:function(e){return e.find(".stream-message-add-btn").attr("disabled",!0),$.ajax({url:e.attr("action"),type:"POST",data:e.serialize(),success:_.bind(this.writeMessageSuccess,this)}),!1},writeMessageSuccess:function(e){var n=$(e),r=new t({id:n.data("message-id"),entity:n.data("entity"),published:n.data("published"),element:n});this.collection&&this.collection.add(r),this.$el.find(".stream-message-add-btn").attr("disabled",!1),this.$el.each(function(){this.reset()}),this.cancelPosting()},showActions:function(){this.actions.is(":hidden")&&(this.actions.slideDown(),this.hasPermissions&&this.$el.find(".complete-permissions").select2("data",{id:"public",text:"Everybody"}),this.messageBox.css("height",60),this.messageBox.data("AutoResizer").config.extraSpace=50,this.mentions.length>0&&this.messageBox.val(this.mentions+" "));var e=this.messageBox.val();this.btn.attr("disabled",e.length==0),this.charsLeft.text(256-e.length)}});return r})