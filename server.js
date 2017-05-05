const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
// req parameter - request object/ anything that comes from client
// res paramenter - response object
// next parameter- when your middleware function is done

  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

//This maintenance middleware function will stop others from executing
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

//using middleware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Welcome Page',
    welcomeMessage: 'Welcome to my WEBSITE! :D'
  });
});

app.get('/about', (req, res)=>{
   res.render('about.hbs', {
     pageTitle: 'About Page'
   });
})

app.get('/projects', (req, res)=>{
   res.render('projects.hbs', {
     pageTitle: 'Projects'
   });
})

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: "Something went wrong"
  });
})

//2nd argument is a function it will do something once server is up
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
