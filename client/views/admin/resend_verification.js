Template.resend_verification.rendered = function(){
    userId=Session.get('selectedUserId');
    console.log(Meteor, userId);
    Meteor.call('sendVerification', userId, function(error, result){
        console.log('error ', error, 'result', result);
    });
    console.log(userId + ' should be receiving his email');
  // console.log('rendered');
}