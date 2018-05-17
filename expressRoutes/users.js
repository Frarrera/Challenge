var express = require('express');
let User = require('../models/users');
var router = express.Router();
const {check,validationResult} = require('express-validator/check');

/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/
router.route('/')
    .post([
        check('name').isLength({min:5,max:10}),
        check('phone').isNumeric().isLength({min:10,max:10}),
        check('email').isEmpty()
    ],(request,response)=>{
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.array() });
        }

        let name = request.body.name,
            business = request.body.business,
            phone = request.body.phone,
            email = request.body.email;
        User.create({
            principal_name : name,
            business_name : business,
            phone : phone,
            email : email
        }).then((success)=>{
            response.json({ message: 'User created!' });
        }).catch((error)=>{
            response.send(error);
        });
    })
    .get((request,response)=>{
        User.showAll((success)=>{
            if(success){
                response.json(success);
            }else{
                response.send(404,'No encontrado');
            }
        });
    });
router.route('/create')
    .get((request,response)=>{
        response.render('form');
    })

module.exports = router;
