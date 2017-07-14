import {
    REQUEST_UPDATE_INVENTORY,
    REQUEST_UPDATE_INVENTORY_SUCCESS
} from '../../constants';

export default function(data) {
    return {
        inventoryId : data.inventoryId,
        count       : data.count,
        type        : REQUEST_UPDATE_INVENTORY_SUCCESS
    };
}

