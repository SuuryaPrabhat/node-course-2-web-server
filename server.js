

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//This starts the web server
var app = express();
//to stop repeating same code in each page
hbs.registerPartials(__dirname+'/views/Partials');
//this sets to hbs view engine middle wear
 app.set('view engine','hbs');
//this uses static directory where html file is located

//middlewear it keep track how server running
app.use((req,res,next)=>{
    var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('error')
        }
    });
    next();
});
//no next to stop other function only post mainantance in every site
app.use((req,res,next)=>{
    res.render('maintainance.hbs',{
        pageTitle:'The Sie is under Maitainance',
        message:'It is currently updating will be back soon'
    });
})
app.use(express.static(__dirname+'/public'));
//It helps like saving code in DRY
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

//to make text upper case
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

//user http request and response statement 

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page',
        message:'welcome to Home Page',
        
    });
});

//about page router
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        
    });
});
//bad page router

//this locates to webserver and start listning to server local host 4200 port
app.listen(4200,()=>{
    console.log("Server is up at port 4200");
});
