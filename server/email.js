var sendEmail = function(to, subject, text, html){

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

console.log('this is a thing');
var sendVerification = function(id){
  console.log(id);
  // console.log(Accounts.emailTemplates.verifyEmail.text());
  Accounts.sendVerificationEmail(id);
  // Email.send({
  //   to: 'javorszky.gabor@gmail.com',
  //   from: 'noreply@javorszky.co.uk',
  //   subject: 'this is a subject',
  //   text: 'this is the message body'
  // });

};

Meteor.methods({
  sendVerification: sendVerification
});