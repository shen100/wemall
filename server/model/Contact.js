'use strict';

const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const Contact = sequelize.define('contact', {
	id: {
		type: Sequelize.INTEGER.UNSIGNED, 
		primaryKey: true,
		autoIncrement: true
	},
    name: {
	   	type: Sequelize.STRING(100),
	   	field: 'name'
 	},
    phone: {
        type: Sequelize.STRING(20),
        field: 'phone'
    },
    province: {
        type: Sequelize.INTEGER,
        field: 'province'
    },
    city: {
        type: Sequelize.INTEGER,
        field: 'city' 
    },
    street: {
        type: Sequelize.INTEGER,
        field: 'street'    
    },
    address: {
        type: Sequelize.STRING(200),
        field: 'address'    
    },
    zipcode: {
        type: Sequelize.STRING(50),
        field: 'zipcode'    
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        field : 'updated_at',
        defaultValue: Sequelize.NOW
    }
}, {
	freezeTableName: true
});

module.exports = Contact;