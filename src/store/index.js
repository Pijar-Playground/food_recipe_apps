import {configureStore} from '@reduxjs/toolkit';

import counterReducer from './reducers/counterSlice';
import recipeReducer from './reducers/recipeSlice';

export const store = configureStore({
  reducer: {counter: counterReducer, recipe: recipeReducer},
});
