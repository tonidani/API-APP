
const express = require('express'); //necesita express
const router = express.Router(); //permite tener rutas en otros archivos que root

const mysqlConnection = require('./database'); ///require la base de datos



router.get('/', (req, res) => {
    res.render('index.html', {title: 'root'});
});

router.get('/login', (req, res) => {
    res.render('login.html', {title: 'Login'});
});

router.get('/register', (req, res) => {
    res.render('register.html', {title: 'Register'});
});


/// API get
router.get('/API',(req, res) => {
     mysqlConnection.query('SELECT * FROM users', (err, rows) => {
        
        if(!err)
        { 
            
            res.render('api.html',{title: 'api', data:rows}); //data:rows le da la informacion necesaria al front

        }
        else
        {
            console.log(err);
        }
    
    });
});


//API get by ID
router.get('/API/:id', (req, res) => {
    const { id } = req.params;
    
    mysqlConnection.query('SELECT * FROM users WHERE id = ? ', [id] , (err, rows, fields) => {
    
        (!err) ? res.json(rows[0]) : console.log(err)
     });
});

router.get('/API/delete/(:id)', function(req, res, next) {
    var user = { id: req.params.id }
     
    mysqlConnection.query("UPDATE users SET iddeleted= '1' WHERE id = " + req.params.id, user, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.redirect('/API')
            } else {
                res.redirect('/API')
            }
        })
   })
 

router.post('/register/submit', (req, res) => {

    var name = req.body.name;
    var surname = req.body.surname;
    var login =  req.body.login;
    var password = req.body.password;
    var date = req.body.date;
    var sql = "INSERT INTO users (`name`, `surname`, `dateofbirth`, `login`, `password`) VALUES ('"+name+"','"+surname+"','"+date+"','"+login+"','"+password+"')";
    res.write('"Name :"'+name+'"\n Login : "'+login+'" Sent');


    mysqlConnection.query(sql, (err, result) =>{

        (err) ? console.log(err) : console.log('1 row added.');

    });


})


router.post('/auth', (req,res)=>{
    var username = req.body.username;
    var passwd = req.body.password;

    if(username && passwd){
        mysqlConnection.query('SELECT * FROM users WHERE login = ? AND password = ?', [username, passwd], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/home');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

router.get('/home', (req, res)  =>{
	if (req.session.loggedin) {
		res.send('Welcome back, ' + req.session.username + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

module.exports = router;