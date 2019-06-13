import { FETCH_POSTS, NEW_POST } from '../action/types';

const intialState = {
  items: [],
  item:[],
  redirect:false,
  error:'djjd',
};
export default (state = intialState ,action)=> {
switch (action.type) {
  case NEW_POST:
  return {
    ...state , item: action.payload,
  }
  default:
  return state;

}
}
export const getProductsError = state => state.item;
