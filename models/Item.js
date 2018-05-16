let connection = require('./dbconnection');
let item = connection.define('item',{
    id : {
        type : 'number',
        key : true
    },
    principal_name : {
        type : 'text'
    },
    business_name : {
        type : 'text'
    }
},{
    methods : {
        yolo(){
            console.log('lo mas yolo');
        }
    }
});

module.exports = item;