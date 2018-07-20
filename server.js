const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');


// creating  middleware  for loging 
//start of logging middle ware
app.use((req,res,nex) =>{
var now = new Date().toString();
var log =`${now} : ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('Server.log',log+'\n',(err)=>{
	if(err)
	{
		console.log('Unable to append to server.log');
	}
});
	nex();
});
//End of logging middleware

// app.use((req,res,next) =>{
// 	res.render('maintenance.hbs');
// })

app.use(express.static(__dirname+ '/public'));

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
})
app.get('/',(req,res)=>{
	//res.send('<h1>Hello express!</h1>');
	res.render('home.hbs',{
		pageTitle:'Home Page',
		name: 'Nitish',
		
	});
});
app.get('/about',(req,res) =>{
	res.render('about.hbs',{
		pageTitle: 'About Page',
	});
});

app.get('/bad',(req,res) => {
	res.send({
		errorMessage: 'bad request',
		erorcode: 404
	});
});

app.listen(port,()=>{
	console.log(`Server is up and running on port ${port}`);
});

//app.listen can take two argumnet first port number and 2nd is the 
// call function