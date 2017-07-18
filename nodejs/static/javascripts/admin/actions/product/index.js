import {
    REQUEST_PRODUCT,
	REQUEST_PRODUCT_SUCCESS,
    REQUEST_SAVE_INVENTORY,
    REQUEST_SAVE_INVENTORY_SUCCESS,
    REQUEST_SAVE_PRODUCT,
    REQUEST_SAVE_PRODUCT_SUCCESS,
    REQUEST_SAVE_PRODUCT_PROP,
    REQUEST_SAVE_PRODUCT_PROP_SUCCESS,
    REQUEST_SAVE_PRODUCT_PROP_VALUE,
    REQUEST_SAVE_PRODUCT_PROP_VALUE_SUCCESS,
    REQUEST_UPDATE_INVENTORY,
    REQUEST_UPDATE_INVENTORY_SUCCESS,
    REQUEST_UPDATE_HAS_PROPERTY_SUCCESS,
    REQUEST_UPDATE_TOTAL_INVENTORY_TEMP,
    REQUEST_UPDATE_TOTAL_INVENTORY_SUCCESS
} from '../../constants/actionTypes';

export function requestProduct(id) {
    return dispatch => {
        dispatch({
            type: REQUEST_PRODUCT,
        });
        var url = pageConfig.apiPath + '/admin/product/:id';
        url     = url.replace(':id', id);
        return fetch(url)
			.then(response => response.json())
            .then(json => dispatch(function(data) {
                var product = data.product;
                if (product.inventories && product.inventories.length) {
                    var inventories = product.inventories;
                    for (var i = 0; i < inventories.length; i++) {
                        inventories[i].propertyValues.sort(function(a, b) {
                            return a.propertyID > b.propertyID ? 1 : -1;
                        });
                    }
                    inventories.sort(function(a, b) {
                        function compare(pvA, pvB) {
                            var index = pvA.length - 1;
                            if (pvA[index].id > pvB[index].id) {
                                return 1;
                            } else if (pvA[index].id < pvB[index].id) {
                                return -1;
                            }
                            return compare(pvA.slice(0, pvA.length - 1), pvB.slice(0, pvB.length - 1));
                        }
                        return compare(a.propertyValues, b.propertyValues);
                    });
                }
                return {
                    type    : REQUEST_PRODUCT_SUCCESS,
                    product : product
                };
            }(json.data)));
    };
};

export function requestSaveInventory(data) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/product/inventory/save';
        var reqData = {
            productID   : data.productID,
            inventories : data.inventories
        };
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)
            })
            .then(response => response.json())
            .then(json => dispatch(function(data) {
                return {
                    type     : REQUEST_SAVE_INVENTORY_SUCCESS,
                    property : data.property
                };
            }(json.data)));
    };
};

export function requestSaveProduct(product) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/product/update';
        if (!product.id) {
            url = pageConfig.apiPath + '/admin/product/create';
        }
        var categories = [];
        for (var i = 0; i < product.categories.length; i++) {
            var idArr = product.categories[i].split('-');
            categories.push({
                id: parseInt(idArr[idArr.length - 1])
            });
        }
        var reqData = {
            name          : product.name,
            categories    : categories,
            status        : parseInt(product.status),
            imageID       : product.imageID,
            imageIDs      : product.imageIDs,
            originalPrice : product.originalPrice,
            price         : product.price,
            remark        : product.remark,
            detail        : product.detail
        };
        if (product.id) {
            reqData.id = product.id;
        }
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)
            })
            .then(response => response.json())
            .then(json => dispatch(function(data) {
                return {
                    type    : REQUEST_SAVE_PRODUCT_SUCCESS,
                    product : data.product
                };
            }(json.data)));
    };
};

export function requestSaveProperty(data) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/product/property/create';
        var reqData = {
            productID  : data.productID,
            name       : data.name
        };
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)
            })
            .then(response => response.json())
            .then(json => dispatch(function(data) {
                return {
                    type     : REQUEST_SAVE_PRODUCT_PROP_SUCCESS,
                    property : data.property
                };
            }(json.data)));
    };
};

export function requestSavePropertyValue(data) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/product/property/saveval';
        var reqData = {
            productID  : data.productID,
            name       : data.name,
            propertyID : data.propertyID
        };
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)
            })
            .then(response => response.json())
            .then(json => dispatch(function(data) {
                var inventories = data.inventories;
                if (inventories && inventories.length) {
                    for (var i = 0; i < inventories.length; i++) {
                        inventories[i].propertyValues.sort(function(a, b) {
                            return a.propertyID > b.propertyID ? 1 : -1;
                        });
                    }
                    inventories.sort(function(a, b) {
                        function compare(pvA, pvB) {
                            var index = pvA.length - 1;
                            if (pvA[index].id > pvB[index].id) {
                                return 1;
                            } else if (pvA[index].id < pvB[index].id) {
                                return -1;
                            }
                            return compare(pvA.slice(0, pvA.length - 1), pvB.slice(0, pvB.length - 1));
                        }
                        return compare(a.propertyValues, b.propertyValues);
                    });
                }
                return {
                    type          : REQUEST_SAVE_PRODUCT_PROP_VALUE_SUCCESS,
                    propertyValue : data.propertyValue,
                    inventories   : inventories,
                    removed       : data.removed
                };
            }(json.data)));
    };
};

export function requestUpdateInventory(data) {
    return {
        inventoryId : data.inventoryId,
        count       : data.count,
        type        : REQUEST_UPDATE_INVENTORY_SUCCESS
    };
}

export function requestUpdateHasProperty(data) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/product/property/flag';
        var reqData = {
            productID   : data.productID,
            hasProperty : data.value
        };
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)
            })
            .then(response => response.json())
            .then(json => dispatch(function(data) {
                return {
                    hasProperty : reqData.hasProperty,
                    type        : REQUEST_UPDATE_HAS_PROPERTY_SUCCESS
                };
            }(json.data)));
    };
}

export function requestUpdateTotalInventoryTemp(data) {
    return {
        type           : REQUEST_UPDATE_TOTAL_INVENTORY_TEMP,
        totalInventory : data.totalInventory
    };
}

export function requestUpdateTotalInventory(data) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/product/inventory/total';
        var reqData = {
            productID      : data.productID,
            totalInventory : data.totalInventory
        };
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)
            })
            .then(response => response.json())
            .then(json => dispatch(function(data) {
                return {
                    type  : REQUEST_UPDATE_TOTAL_INVENTORY_SUCCESS
                };
            }(json.data)));
    };
}

