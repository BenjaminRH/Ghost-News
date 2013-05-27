sendEmail = function(to, subject, text, html){

  // TO-DO: limit who can send emails

  var from = getSetting('defaultEmail') || 'noreply@example.com';
  var siteName = getSetting('title');
  var subject = '['+siteName+'] '+subject

  console.log('sending email…');
  console.log(from)
  console.log(to)
  console.log(subject)
  console.log(text)
  console.log(html)

  Email.send({
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html
  });
};

/**
 * If you want to redefine what is being sent out in the email
 */
var newTemplate = {
  from: 'Example User <user@domain.com>', // as per http://tools.ietf.org/html/rfc5322
  siteName: 'Ghost-News', // Public name of application
  verifyEmail: {
    subject: function(user) { // takes a user object with all of its bells and whistles
      return "Here is your verification link, " + user.profile.name;
    },
    text: function(user, url){
      return "Dear " + user.profile.name + "\n\n"
      + "Please click on the following URL to verify your"
      + " account, so you can being posting and commenting"
      + " on the site.\n\n"
      + url
      + "\n\n"
      + "Best regards,\n"
      + "Ghost Team\n\n";
    }
  },
  // Import the original ones
  resetPassword: Accounts.emailTemplates.resetPassword,
  enrollAccount: Accounts.emailTemplates.enrollAccount
};


// Comment out the following line if you're happy with the original one
Accounts.emailTemplates = newTemplate;



/**
 * Meteor wrapper that holds functions and makes them
 * accessible from the client side that's using
 * Meteor.call('functionName')
 *
 * @type {[type]}
 */
Meteor.methods({
  sendVerification: function(id){
    Accounts.sendVerificationEmail(id);
  };
});
