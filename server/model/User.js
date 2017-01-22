'use strict';

const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const Contact   = require('./Contact');

const User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER.UNSIGNED, 
		primaryKey: true,
		autoIncrement: true
	},
    openId: {
    	type  : Sequelize.TEXT,
    	field : 'open_id'
  	},
    nickname: {
    	type  : Sequelize.STRING(100),
    	field : 'nickname'
  	},
    username: {
    	type  : Sequelize.STRING(100),
    	field : 'username'
  	},
    phone: {
    	type  : Sequelize.STRING(20),
    	field : 'phone'
  	},
    password: {
    	type  : Sequelize.STRING(20),
    	field : 'password'
  	},
    token: {
    	type  : Sequelize.TEXT,
    	field : 'token'
  	},
    avatar: {
    	type  : Sequelize.TEXT,
    	field : 'avatar'
  	},
    sex: {
    	type  : Sequelize.BOOLEAN,
    	field : 'sex'
  	},
    subscribe: {
    	type  : Sequelize.BOOLEAN,
    	field : 'subscribe'
  	},
    status: {
    	type  : Sequelize.INTEGER,
    	field : 'status'
  	},
    lastIp: {
    	type  : Sequelize.STRING(50),
    	field : 'lastip'
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
    contactId: {
	   	type: Sequelize.INTEGER.UNSIGNED,
	   	field: 'contact_id',
	   	references: {
			model: Contact,
			key: 'id'
	   	}
 	}
}, {
	freezeTableName: true
});

/*
 * 近30天，每天注册的新用户数
 */
User.getUserFor30d = () => {
    let today    = new Date();
    today        = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let before30 = today.getTime() - 30 * 24 * 60 * 60 * 1000;
    var sql = `
        SELECT count(*) as count, DATE_FORMAT(created_at,'%Y-%m-%d') as createdAt
        FROM user
        WHERE created_at > ${before30}
        GROUP BY DATE_FORMAT(created_at,'%Y-%m-%d');
    `;
    return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
};

/*
 * 近30天，每天有消费形为的用户数
 */
User.getUserSaleFor30d = () => {
    let today    = new Date();
    today        = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let before30 = today.getTime() - 30 * 24 * 60 * 60 * 1000;
    var sql = `
        SELECT COUNT(DISTINCT user_id) as count, DATE_FORMAT(created_at,'%Y-%m-%d') as createdAt
        FROM \`order\`
        WHERE created_at > ${before30}
        GROUP BY DATE_FORMAT(created_at,'%Y-%m-%d');
    `;
    return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
};

module.exports = User;