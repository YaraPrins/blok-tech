const { db } = require('mongodb')


const strategy = require('passport-local').Strategy

function initialize(passport) {
    passport.use(new strategy({ usernameField: 'name'}, (name, password, done) => {

        db.collection('users').findOne({name: name})
        .then(user => {
            if(!user) {
                console.log('Sorry, can\'t find that');
                return done(null, false);
            }

            bcryptjs.compare(password, user.password, (err, matching) => {
                if(err) throw err;

                if(matching) {
                    console.log('success')
                    return done(null, user);
                } else {
                    return done(null, false);
                }
                });
            })
            .catch(err => console.log(err));
        })
    );
}