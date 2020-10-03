var express = require('express');
var exphbs  = require('express-handlebars');
 //importamos el controller
const MercadoPagoController = require('./controller/MercadoPagoController');
//importamos el service
const MercadoPagoService = require('./services/MercadoPagoService');
// Permitimos que el controller pueda usar el service
const MercadoPagoInstance = new MercadoPagoController(new MercadoPagoService());
 
var app = express();
var bodyParser = require('body-parser');
 // create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.post('/checkout', urlencodedParser, function (req, res) {
    MercadoPagoInstance.getMercadoPagoLink(req, res)
});
 
app.listen(process.env.PORT || 5000, () => {
    console.log('The server now is lisen on 5000');
});