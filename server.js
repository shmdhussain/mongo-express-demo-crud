// https://zellwk.com/blog/crud-express-mongodb/


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ejs = require('ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())



app.set('view engine', 'ejs')





app.get('/', function(request, response) {
    // do something here


    var cursor = db.collection('quotes').find().toArray(function(err, results) {


        console.log(results)
        // send HTML file populated with quotes here


        response.render('index.ejs', { quotes: results })
    })



});

app.put('/quotes', (req, res) => {
    db.collection('quotes')
        .findOneAndUpdate({ name: 'hussain' }, {
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        }, {
            sort: { _id: -1 },
            upsert: true
        }, (err, result) => {
            if (err) return res.send(err)
            res.send(result)
        })
})


app.post('/quotes', (req, res) => {

    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/');
    })

})

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'A Hussain quote got deleted'})
  })
})



var db;

MongoClient.connect('mongodb://hussaindev:hussaindev@ds019624.mlab.com:19624/my-quotes', (err, client) => {
    if (err) return console.log(err)
    db = client.db('my-quotes') // whatever your database name is


    app.listen(9001, () => {
        console.log('listening on 9001')
    });



})