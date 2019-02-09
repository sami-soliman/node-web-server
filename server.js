const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

var port = process.env.PORT || 3000 ;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

// using bulit in middleWare 
// app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: trying to  ${req.path} `;
    fs.appendFile('server.log', log + '\n',(err)=>{
        if(err)
        console.log("error !!");
    });
    next();
});

hbs.registerHelper('getCurrenrYear',()=>{
    return new Date().getFullYear();
});

app.get('/', (req,res)=> {
    // res.send('<h1> Hello express !</h1>');    // content type text/html
    /** res.send(   // cotent type json
        {
            name : 'sam',
            likes : ['codeing','cr7']
        }
    );*/

    res.render('home.hbs',{
        pageTitle : 'Home'
    })
});

app.get('/about', (req,res)=> {
    //res.send('<h1> hello from about !</h1>');    // content type text/html
    res.render('about.hbs',
    {
        pageTitle : 'about'
    });
});


app.listen(port,()=>{
    var datetime = new Date();
    console.log( datetime + ` : starting the app at port ${port} ...`)
});
