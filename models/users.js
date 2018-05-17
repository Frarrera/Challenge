const sequelize = require('../config/sequelize');
const DataTypes = require('sequelize');
let User = sequelize.define( 'profile',{
    rfc : DataTypes.STRING,
    principal_name : DataTypes.STRING,
    business_name : DataTypes.STRING,
    phone : DataTypes.STRING,
    email : DataTypes.STRING,
    created_date : DataTypes.DATE
});
User.showAll = (success,error) => {
    User.findAll({raw: true}).then(success).error(error);
};

User.append = (success,error) => {
    let name = this.principal_name;
    let business = this.business_name;
    let phone = this.phone;
    let email = this.email;
    this.build({
        principal_name : name,
        business_name : business,
        phone : phone,
        email : email
    }).save().then(success).catch(error);
};

module.exports = User;