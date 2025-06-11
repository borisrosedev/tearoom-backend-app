
const { DataTypes, Model  } = require('sequelize')
const { sequelizeClient } = require('../connectDb')


class Cart extends Model {}


Cart.init({

  content: {
    type: DataTypes.JSON,
    allowNull: true,
    validate: {
      isValidStructure(value) {
      
          if (typeof value !== 'object') {
            throw new Error('Content must be a valid JSON object');
          }
      }
    }
  }

}, {

    sequelize: sequelizeClient,
    tableName:'carts',
    modelName:'cart'
})

module.exports = Cart 