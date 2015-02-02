var nodemailer = require('nodemailer')
var fs = require('fs');
var Handlebars = require('handlebars');
var pivotal = require('pivotaltracker')
var d3 = require('d3')
var config = require("./env.json")

var pivotal_token = config.pivotal_token;
var project_id = config.project_id;
var client = new pivotal.Client(pivotal_token)

/*
client.project(project_id).stories.all(function(error, stories) {
    console.log(stories);
})*/

var convertToMillis = function(time) {
    var format = "%Y-%m-%dT%H:%M:%SZ";
    return new Date(format.parse(time)).getTime();

}

var getLastFriday = function() {
    return new Date(d3.time.friday.offset(new Date(), -2)).getTime();
}

var last_friday = getLastFriday()
var data = require('./data.txt')


var getTemplate = function() {
    fs.readFile('./templates/email.html', 'utf8', function(err, file) {
        if (err) {
            return console.log(err);
        }
        var template = Handlebars.compile(file);
        var data = {
            "receiver": "Brooks Gibbins",
            "story": [1, 2, 3]
        }

        var result = template(data);
        //sendMail(result);
    })
}


var sendMail = function(email) {
    var mailOptions = {
        from: 'Mister Binder ✔ <g@gmail.com>', // sender address
        to: 'g@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ✔', // plaintext body
        html: email // html body
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });

}