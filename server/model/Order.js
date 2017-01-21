'use strict';

const Sequelize = require( 'sequelize');
const sequelize = require('./sequelize');
const User      = require('./User');

const Order = sequelize.define('order', {
	id: {
		type: Sequelize.INTEGER.UNSIGNED, 
		primaryKey: true,
		autoIncrement: true
	},
    totalPrice: {
	   	type: Sequelize.DOUBLE,
	   	field: 'total_price'
 	},
    payment: {
        type: Sequelize.DOUBLE,
        field: 'payment'
    },
    payStatus: {
    	type: Sequelize.INTEGER,
        field: 'pay_status'
    },
    freight: {
        type: Sequelize.DOUBLE,
        field: 'freight'
    },
    remark: {
        type: Sequelize.TEXT,
        field: 'remark' 
    },
    discount: {
        type: Sequelize.INTEGER,
        field: 'discount'    
    },
    deliverStart: {
        type: Sequelize.DATE,
        field: 'deliver_start'    
    },
    deliverEnd: {
        type: Sequelize.DATE,
        field: 'deliver_end'    
    },
    status: {
    	type: Sequelize.INTEGER,
        field: 'status'
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
    },
    userId: {
	   	type: Sequelize.INTEGER.UNSIGNED,
	   	field: 'user_id',
	   	references: {
			model: User,
			key: 'id'
	   	}
 	}
}, {
	freezeTableName: true
});

Order.getTotalOrderCount = () => {
    let today = new Date();
    today     = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return Order.count();
};

Order.getTodayOrderCount = () => {
	let today = new Date();
	today     = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	return Order.count({
		where: ['created_at > ?', today]
	});
};

Order.getTodayTotalSale = () => {
    let today = new Date();
    today     = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return Order.sum('payment', {
        where: ['created_at > ?', today]
    });
};

Order.getTotalSale = () => {
    return Order.sum('payment');
};

module.exports = Order;

