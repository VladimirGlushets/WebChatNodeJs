//// 3 вариант
var mongoose = require('libs/mongoose');
var async = require('async');
var User = require('models/user').User;

// 1. drop db
// 2. create & save users
// 3. close connection

var db = mongoose.connection.db; // уровень mongodb native driver

// console.log(mongoose.connection.readyState);  // 2-connecting т.к. js однопоточный, то нужно использовать событие

mongoose.connection.on('open', function() {
  // 1. drop db
    db.dropDatabase(function(err) {
        if (err) throw err;
        console.log('OK');

        // 2. create & save users
        var vasya = new User({username: 'Вася', password: 'supervasya'});
        var petya = new User({username: 'Петя', password: '123'});
        var admin = new User({username: 'admin', password: 'admin'});

        // 3. close connection
        mongoose.disconnect();
    });
});


//// 2 вариант
// var User = require('models/user').User;
// var user = new User({
//   username: "Tester",
//   password: "secret"
// });
//
// user.save(function(err, user, affected){
//   if(err) throw err;
//
//   User.findOne({username: "Tester"}, function(err, tester){
//     console.log(tester);
//   });
// });


//// 1 вариант
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
//
// var schema = mongoose.Schema({
//   name: String
// });
//
// schema.methods.meow = function(){
//   console.log(this.get('name'));
// }
//
// var Cat = mongoose.model('Cat', schema);
//
// var kitty = new Cat({
//     name: 'Zildjian'
// });
//
// // affected - количество измененных данных
// kitty.save(function(err, kitty, affected) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('meow');
//     }
// });
