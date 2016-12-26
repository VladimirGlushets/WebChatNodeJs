//// 3 вариант
var async = require('async');
var User = require('./models/user').User;
var mongoose = require('./libs/mongoose');

// 1. drop db
// 2. create & save users
// 3. close connection

// запускаем функции друг за другом
async.series([
  open,
  dropDatabase,
  createUsers,
  close
], function(err, results){
    console.log("Test");
    if(err){throw err;}

  console.log(results);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db; // уровень mongodb native driver
    db.dropDatabase(callback);
}

function createUsers(callback) {
    // 2. create & save users
    async.parallel([
        function(callback) {
            var vasya = new User({
                username: 'Вася',
                password: 'supervasya'
            });
            vasya.save(function(err) {
                if(err){
                    throw err;
                }
                callback(err, vasya);
            });
        },
        function(callback) {
            var petya = new User({
                username: 'Петя',
                password: '123'
            });
            petya.save(function(err) {
                callback(err, petya);
            });
        },
        function(callback) {
            var admin = new User({
                username: 'admin',
                password: 'admin'
            });
            admin.save(function(err) {
                callback(err, admin);
            });
        }
    ], callback);
}

function close(callback) {
    // 3. close connection
    mongoose.disconnect(callback);

    //mongoose.connection.close()
}



//// 3 вариант
// mongoose.connection.on('open', function() {
//     var db = mongoose.connection.db; // уровень mongodb native driver
//     // 1. drop db
//     db.dropDatabase(function(err) {
//         if (err) throw err;
//         console.log('OK');
//
//         // 2. create & save users
//         async.parallel([
//                 function(callback) {
//                     var vasya = new User({
//                         username: 'Вася',
//                         password: 'supervasya'
//                     });
//                     vasya.save(function(err) {
//                         callback(err, vasya);
//                     });
//                 },
//                 function(callback) {
//                     var petya = new User({
//                         username: 'Петя',
//                         password: '123'
//                     });
//                     petya.save(function(err) {
//                         callback(err, petya);
//                     });
//                 },
//                 function(callback) {
//                     var admin = new User({
//                         username: 'admin',
//                         password: 'admin'
//                     });
//                     admin.save(function(err) {
//                         callback(err, admin);
//                     });
//                 }
//             ],
//             function(err, results) {
//                 console.log(arguments);
//
//                 // 3. close connection
//                 mongoose.disconnect();
//             }
//         );
//     });
// });


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
