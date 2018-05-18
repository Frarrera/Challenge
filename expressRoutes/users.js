var express = require('express');
let User = require('../models/users');
var router = express.Router();
const {check,validationResult} = require('express-validator/check');

/* GET users listing */
router.route('/')
    // ADD NEW USER
    .post([
        check('rfc').isLength({max:18}),
        check('name').isLength({max:50}).withMessage('The name field may not be greater than 80 characters.').not().isEmpty(),
        check('business').isLength({max:80}).withMessage('The email field may not be greater than 80 characters.'),
        check('phone').isNumeric().isLength({min:10,max:10}).not().isEmpty(),
        check('email').isEmail().isLength({max:80}).not().isEmpty()
    ],(request,response)=>{
        const errors = validationResult(request.body);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.array() });
        }

        let rfc = request.body.rfc.toUpperCase(),
            name = request.body.name,
            business = request.body.business,
            phone = request.body.phone,
            email = request.body.email;
        User.create({
            rfc : rfc,
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
//GET AN SPECIFIC USER
router.route('/:user')
    .get((request,response)=>{
        let user_id = request.params.user;
        User.findById(user_id).then((success)=>{
            response.json(success);
        }).catch((error)=>{
            response.send(404,'No encontrado');
        })

    })
    .post((request,response)=>{
        let user_id = request.params.user;
        let rfc = request.body.rfc.toUpperCase(),
            name = request.body.name,
            business = request.body.business,
            phone = request.body.phone,
            email = request.body.email;
        User.update({
            rfc : rfc,
            principal_name : name,
            business_name : business,
            phone : phone,
            email : email
        },{
            where : {
                id : user_id
            }
        }).then((success)=>{
            response.json({ message: 'User updated!' });
        }).catch((error)=>{
            response.send('420','error');
        });
    })
    .delete((request,response)=>{
        let user_id = request.params.user;
        User.destroy({
            where:{
                id : user_id
            }
        }).then((success)=>{
            response.json({ message : 'User deleted!'});
        });
    });

module.exports = router;
