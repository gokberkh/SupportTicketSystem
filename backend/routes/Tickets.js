var fs = require('fs');
const express = require('express')
var path = require('path');
var multer = require('multer');
var bodyParser = require('body-parser');

const tickets = express.Router()
var Ticket = require('../models/Ticket');
const {
    ObjectId
} = require('mongodb');
const mongoose = require('mongoose');
tickets.use(bodyParser.urlencoded({
    extended: false
}))
tickets.use(bodyParser.json())

const DIR = 'public/';
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname.toLowerCase().split(' ').join('-'))
    }
});


var upload = multer({
    storage: storage
});

tickets.get('/getTicketAll', (req, res) => {
    Ticket.find({}, (err, items) => {
        if (err) {
            console.log(err);
        } else {
            //   res.render('tickets', { items: items });
            console.log(items)
            res.json(items)
        }
    });
});


// Uploading the image 
tickets.post('/addTickets', upload.array('img'), (req, res, next) => {
    console.log("req body");
    console.log(req.body);
    console.log("req files");
    console.log(req.files);

    var obj = {
        name: req.body.name,
        img: req.files[0].filename,
        content: req.body.content,
        messages: {
            "text": req.body.messages,
        },
        role: req.body.role,
    }
    console.log(obj);
    Ticket.create(obj).then(result => {
        console.log(result);
        res.json({
            status: 200
        })
    }).catch(err => {
        res.json({
            status: 404
        })
    })

});

tickets.post('/addMessages', /* upload.array('img'),*/ function (req, res, next) {
    console.log(req.body);
    Ticket.update({
            "_id": req.body.id
        }, {
            $push: {
                messages: {
                    text: req.body.messages
                }
            }
        },
        function (err, row) {
            if (err) {
                res.json({
                    error: err
                });
            } else {
                res.json({
                    code: 1,
                    message: row
                });
            }
        });

});


tickets.put('/changeStatus', function (req, res, next) {

    Ticket.findByIdAndUpdate({
            _id: ObjectId(req.body.id)
        },

        {
            $set: {
                'status': req.body.status
            }
        }, {
            new: true
        },
        function (err) {
            if (err) {
                res.json({
                    error: err
                });
            } else {
                res.json("başarılı");
            }
        });
});


tickets.post('/filterStatus', (req, res) => {
    console.log("filterstatus")
    console.log(req)
    Ticket.find({
        status: req.body.status
    }, (err, items) => {
        if (err) {
            console.log(err);
        } else {
            //   res.render('tickets', { items: items });
            console.log(items)
            res.json(items)
        }
    });
});






module.exports = tickets