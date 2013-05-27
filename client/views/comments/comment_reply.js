Template.comment_reply.post = function(){
  var selectedComment = Comments.findOne(Session.get('selectedCommentId'));
  return selectedComment && Posts.findOne(selectedComment.post);
};

Template.comment_reply.helpers({
	comment: function(){
		var comment = Comments.findOne(Session.get('selectedCommentId'));
		return comment;
	},
    isNotVerified: function(){
        var user = Meteor.user();
        if(!!user){
            var emails = user.emails,
                verified = false;
            for (var i = emails.length - 1; i >= 0; i--) {
                if(emails[i].verified){
                    verified = true;
                    break;
                }
            };
            return !verified;
        } else {
            return false;
        }
    }
});