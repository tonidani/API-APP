const router = require('./index') //permite tener rutas en otros archivos que root

const mysqlConnection = require('./database');

router.get('/API', (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
        
        (!err) ? res.json(rows) : console.log(err)
    
    });
});
