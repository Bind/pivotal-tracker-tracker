var nodemailer = require('nodemailer')
var fs = require('fs');
var Handlebars = require('handlebars');
var pivotal = require('pivotal')
var d3 = require('d3')

var pivotal_token = "4016b5bb335217e4861bba8658026df4"
var project_id = 1184976;

var getLastFriday = function() {
    return new Date(d3.time.friday.offset(new Date(), -2)).getTime();
}

var last_friday = getLastFriday()
pivotal.useToken(pivotal_token);

pivotal.getStories(project_id, {
    date_format: "millis",
    limit: 20,
    filter: last_friday,
}, function(err, ret) {
    console.log("runningx")
    if (err) {
        console.log("Error".red, JSON.stringify(err));
    }
    console.log(ret)
})


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
        from: 'Mister Binder ✔ <douglasjbinder@gmail.com>', // sender address
        to: 'douglasjbinder@gmail.com', // list of receivers
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