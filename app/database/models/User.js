const { DataTypes, Model } = require('sequelize')
const { sequelizeClient } = require('../connectDb')
const { createHash, isPasswordValid } = require('../../services/authService')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
    path: path.join(__dirname, '../../../.env')
})


class User extends Model {}


User.init({

    firstName : {
        type: DataTypes.STRING,
        allowNull: false,
        set(val){
            this.setDataValue('firstName', val.charAt(0).toUpperCase() + val.slice(1).toLowerCase())
        }
    },
    lastName : {
        type: DataTypes.STRING,
        allowNull: false,
        set(val){
            this.setDataValue('lastName', val.charAt(0).toUpperCase() + val.slice(1).toLowerCase())
        }
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,       
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
        set(val){
            this.setDataValue('password', createHash(val))
        }
    },
    role: {
        type: DataTypes.ENUM(["user", "user_premium", "admin"]),
        allowNull: false,
        defaultValue: "user"
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
         return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
         throw new Error('Do not try to set the `fullName` value!');
        },
    }


}, {
    sequelize: sequelizeClient,
    tableName: 'users',
    modelName: 'user',
    hooks: {
        beforeCreate: (user, options) => {
            if((user.email == process.env.ADMIN_EMAIL)){ 
                user.role = "admin"
            }
        }
    }
})

/* function syncModel(){
    User.sync({ 
        alter: true
    })
}


syncModel(User) */

module.exports = User 