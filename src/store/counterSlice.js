import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		count: 0,
	},
	reducers: {
		increaseCount: state => {
			state.count += 1;
		},

		decreaseCount: state => {
			state.count -= 1;
		},
	},
});

export const { increaseCount, decreaseCount } = counterSlice.actions;

export default counterSlice.reducer;
