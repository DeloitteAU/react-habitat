import { combineReducers } from 'redux';

const albums = (state = [], action) => {
	switch (action.type) {
		case 'ADD_ALBUM':
			return [action.title, ...state];
		default:
			return state;
	}
};

export default combineReducers({
	albums,
});
