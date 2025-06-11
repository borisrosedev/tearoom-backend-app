const User = require('./User')
const Cart = require('./Cart');
const { sequelizeClient } = require('../connectDb');


User.hasOne(Cart, {
    foreignKey: "userId"
});
Cart.belongsTo(User, {
    foreignKey: "userId"
});

async function syncModel(){
    await User.sync({ force: true })
    await Cart.sync({ force: true })
}


//syncModel()

module.exports = { User, Cart }