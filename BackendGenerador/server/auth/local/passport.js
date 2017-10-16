import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import sha512 from 'sha512';

function localAuthenticate(User, email, password, done) {
  User.find({
    where: {
      email: email.toLowerCase()
    }
  })
    .then(user => {
      if(!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      if (password) {
        if (user.password === sha512(password).toString('hex')) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'The password is incorrect!.'
          });
        }
      } else {
        return done(authError);
      }
    })
    .catch(err => done(err));
}

export function setup(User/*, config*/) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function(email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
}
