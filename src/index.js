const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var session = require('express-session');


//settings
app.set('port', 4000); // utiliza el puerto 4000
app.set('views', path.join(__dirname, 'views')); //donde estan los views
app.engine('html', require('ejs').renderFile); // cambiamos la extension de ejs a html
app.set('view engine', 'ejs'); // motor de plantillas



//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//routes

app.use(require('./routes/index')); //rutas de otro archivo
app.use('/', indexRouter);

//static files
//Css/image/somepics/everything

app.use(express.static(path.join(__dirname, 'public')));


//listening the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port')); // run app
});