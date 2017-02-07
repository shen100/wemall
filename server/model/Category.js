'use strict';

let BaseModel = require('./BaseModel');

let Category = BaseModel.extend({
    tableName: 'category',
    attrs: {
    	id: {
    		field: 'id'
    	},
    	name: {
    		field: 'name'
    	},
    	parentId: {
    		field: 'parent_id'
    	},
    	order: {
    		field: 'order'
    	},
    	remark: {
    		field: 'remark'
    	},
        status: {
            field: 'status'
        },
        createAt: {
            field: 'create_at'
        },
        updateAt: {
            field: 'update_at'
        }
    }
}, {

});

Category.STATUS_OPEN  = 1;
Category.STATUS_CLOSE = 2;

module.exports = Category;