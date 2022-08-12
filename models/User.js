const { Model, DataTypes } = require('sequelize');
//import bcrypt package to hash passwords
const bcrypt = require('bcrypt');

const sequelize = require('../config/connection');

// create our "User" model
class User extends Model {
    //Set up method to run on instance data(per user) to check password
    checkPassword(loginPw){
        //Using the keyword this, we can access this user's properties, including the password, which was stored as a hashed string
        return bcrypt.compareSync(loginPw, this.password);
    }
};

// define table columns and configuration
User.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
    },
    image: {
        type: DataTypes.STRING
    }
  },
  {
    //To add hooks must be pass in a new object = hooks
    hooks: {
        // set up beforeCreate lifecycle "hook" functionality in an async function
        async beforeCreate(newUserData){
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        //set up beforeUpdate lifecycle "hook" functionality in an async function
        //need to add an option to the query call  user-routes.js file { individualHooks: true }
        async beforeUpdate(updateUserData) {
            updateUserData.password = await bcrypt.hash(updateUserData.password, 10);
            return updateUserData;
        }
    },
    // TABLE CONFIGURATION OPTIONS GO HERE
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;