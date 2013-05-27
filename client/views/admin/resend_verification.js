Template.resend_verification.rendered = function(){
    console.log('this is the rendered function');
    userId=Session.get('selectedUserId');
    var user = Meteor.user(),
        emails = user.emails,
        verified = false,
        sent = false;


    for (var i = emails.length - 1; i >= 0; i--) {
      if(emails[i].verified){
        verified = true;
        break;
      }
    };
    console.log('howmanytimes');
    if(!verified && 1===2){
        console.log('this is not verified');
        if(!sent){
            Meteor.call('sendVerification', userId, function(error, result){
                console.log('sendverification called');
                console.log('error ', error, 'result', result);
            });
            console.log('reset sent');
            sent = true;
        }

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