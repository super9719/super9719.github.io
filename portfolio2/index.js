const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const app = express();

app.use(express.static('assets'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/myportfolio', (req, res) => {
    res.sendFile(__dirname + '/main.html');
});

app.post('/myportfolio/contact', (req,res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'myportfolio2aymene@gmail.com',
          pass: 'super20191397'
        }
    });
    let mailoptions = {
        from: 'myportfolio2aymene@gmail.com',
        to: 'dafriaymene@gmail.com',
        subject: req.body.title,
        text: 'Mr/Ms' + req.body.name + '/n' + req.body.email + '/n' + req.body.message
    }
    transporter.sendMail(mailoptions, (err, info)=> {
        if(err){
            console.log(err)
        }else{
            console.log(info);
            res.status(200).end();
        };
    });
    
});


let port = process.env.PORT || 3000

app.listen(port, (err)=>{
    console.log('done');
});