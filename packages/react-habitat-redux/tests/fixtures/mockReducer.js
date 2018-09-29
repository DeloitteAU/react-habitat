
export default function counter(state = { count: 0 }, action) {
	switch (action.type) {
	case 'INCREMENT':
		return { count: state.count + action.amount };
	default:
		return state;
	}
}
