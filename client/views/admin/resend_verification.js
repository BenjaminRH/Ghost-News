Template.resend_verification.rendered = function(){
    userId=Session.get('selectedUserId');
    var user = Meteor.user(),
        emails = user.emails,
        verified = false;

    for (var i = emails.length - 1; i >= 0; i--) {
      if(emails[i].verified){
        verified = true;
        break;
      }
    };
    if(!verified){
        Meteor.call('sendVerification', userId, function(error, result){
            console.log('error ', error, 'result', result);
        });
    }
};


Template.resend_verification.helpers({
    isNotVerified: function(){
        var user = Meteor.user();
        console.log(user);
        if(!!user){
            console.log('if !!user');
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
            console.log('is user');
            return false;
        }
    }
});