Template.nav.events = {
  'click #logout': function(event){
      event.preventDefault();
      Meteor.logout();
  },
  'click #mobile-menu': function(event){
    event.preventDefault();
    $('body').toggleClass('mobile-nav-open');
  },
  'click .login-header': function(e){
      e.preventDefault();
      Meteor.Router.to('/account');
  },
  'click #resend-verification-link': function(e, instance){
    e.preventDefault();
    var user = Meteor.users.findOne({_id: e.target.dataset.who});
    if(user) {
      // console.log('yes, we have a user by that', user);
      Meteor.call('sendVerification', e.target.dataset.who);
    } else {
      console.log('no, we don\'t have a user with that id');
      console.log(Meteor.users.findOne({_id: e.target.dataset.who}));
    }
    // console.log(e, instance);
  }
};

Template.nav.rendered=function(){
  if(!Meteor.user()){
    $('.login-link-text').text("Sign Up/Sign In");
  }else{
    $('#login-buttons-logout').before('<a href="/account" class="account-link button">My Account</a>');
  }
};

Template.nav.helpers({
  site_title: function(){
    return getSetting('title');
  },
  logo_url: function(){
    return getSetting('logoUrl');
  },
  logo_height: function(){
    return getSetting('logoHeight');
  },
  logo_width: function(){
    return getSetting('logoWidth');
  },
  logo_top: function(){
    return Math.floor((70-getSetting('logoHeight'))/2);
  },
  logo_offset: function(){
    return -Math.floor(getSetting('logoWidth')/2);
  },
  intercom: function(){
    return !!getSetting('intercomId');
  },
  canPost: function(){
    return canPost(Meteor.user());
  },
  requirePostsApproval: function(){
    return getSetting('requirePostsApproval');
  },
  hasCategories: function(){
    return Categories.find().count();
  },
  categories: function(){
    return Categories.find();
  },
  isNotVerified: function(){
    var user = Meteor.user();
    // console.log(user);
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
  },
  userId: function() {
    return Meteor.user()._id;
  }
  , findSentEmails: function() {
    var user = Meteor.user(),
        ret = {
          num: 0,
          last: false
        };
    // console.log(user);
    if(!!user){
      var notifications = [],
          num = 0,
          latest = 0,
          time = 0;

      if(user.services){
        notifications = user.services.email.verificationTokens;
        num = notifications.length;
        for (var i = notifications.length - 1; i >= 0; i--) {
          if(notifications[i].when > latest) {
            latest = notifications[i].when;
          }
        }
        time = moment(latest);
        timeString = "on " + time.format('Mo MMMM, YYYY') + " at " + time.format('HH:mm:ss');
        ret.num = num;
        ret.last = timeString;
      }
    }
    return ret;
  }
});