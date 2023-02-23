import { cartActions } from "./redux-store";


export const getLoadingData = cartData => {
    return async (dispatch) => {

    const response = await fetch('https://react-http-67cf3-default-rtdb.firebaseio.com/cart.json')
        
    if(!response.ok) {
        throw new Error('data not fetched');
    }

    const data = await response.json();

    console.log(data)

    dispatch(cartActions.replaceCart(data || []))
    
    }

}