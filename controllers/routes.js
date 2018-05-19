var db = require('../models');
var path = require('path');

module.exports = function (app) {

    app.get('/', function (req, res) {
        db.Burger.findAll({}).then(function (burger_data) {
            res.render('index', { burger_data })
        });
    });

    app.post('/burgers/update', function (req, res) {
        console.log(req.body)
        db.Burger.update({
            devoured: true
        }, {
                where: {
                    id: req.body.burger_id
                }
            }).then(function (result) {
                res.redirect('/');
            })
    });

    app.post('/burgers/add', function (req, res) {

        db.Burger.create({
            burger_name: req.body.burger_name
        }).then(function (result) {
            res.redirect('/');
        })
    })

    app.delete('/burgers/delete/:id', function (req, res) {
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            res.send(true);
        });
    })
}