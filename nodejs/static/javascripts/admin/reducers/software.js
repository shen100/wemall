import {
	REQUEST_SOFTWARE
} from '../constants/actionTypes';

let initState = {
    name        : softwareConfig.name,
    version     : softwareConfig.version,
    officialURL : softwareConfig.officialURL
};

export default (state = initState, action) => {
	switch (action.type) {
		case REQUEST_SOFTWARE: {
			return state;
		}
		default: {
			return state
		}
	}
}



