'use strict';

let BaseModel = require('./BaseModel');

let Product = BaseModel.extend({
    tableName: 'product',
    attrs: {
    	id: {
    		field: 'id'
    	},
    	name: {
    		field: 'name'
    	},
    	browseCount: {
    		field: 'browse_count'
    	},
    	buyCount: {
    		field: 'buy_count'
    	},
    	totalSale: {
    		field: 'total_sale'
    	}
    }
}, {

});

module.exports = Product;