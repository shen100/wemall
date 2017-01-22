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

/*
 * 总的订单数
 */
Order.getTotalOrderCount = () => {
    return Order.count();
};

/*
 * 今日总的订单数
 */
Order.getTodayOrderCount = () => {
	let today = new Date();
	today     = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	return Order.count({
		where: ['created_at > ?', today]
	});
};

/*
 * 今日总的销售额
 */
Order.getTodayTotalSale = () => {
    let today = new Date();
    today     = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return Order.sum('payment', {
        where: ['created_at > ?', today]
    });
};

/*
 * 总的销售额
 */
Order.getTotalSale = () => {
    return Order.sum('payment');
};

/*
 * 近30天，每天的销售额
 */
Order.getSaleFor30d = () => {
    let today = new Date();
    today     = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let before30 = today.getTime() - 30 * 24 * 60 * 60 * 1000;
    var sql = `
        SELECT sum(payment) as amount, DATE_FORMAT(created_at,'%Y-%m-%d') as createdAt
        FROM \`order\`
        WHERE created_at > ${before30}
        GROUP BY DATE_FORMAT(created_at,'%Y-%m-%d');
    `;
    return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
};

/*
 * 近30天，每天的订单数
 */
Order.getOrderFor30d = () => {
    let today = new Date();
    today     = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let before30 = today.getTime() - 30 * 24 * 60 * 60 * 1000;
    var sql = `
        SELECT count(id) as count, DATE_FORMAT(created_at,'%Y-%m-%d') as createdAt
        FROM \`order\`
        WHERE created_at > ${before30}
        GROUP BY DATE_FORMAT(created_at,'%Y-%m-%d');
    `;
    return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
};

module.exports = Order;

