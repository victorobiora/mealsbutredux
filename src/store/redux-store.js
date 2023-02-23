import { createSlice, configureStore } from '@reduxjs/toolkit';


const meals = [{
    title: 'Rice',
    text: 'This is a first product - amazing!',
    price: 6,
    id: 'e1',
    amount: 1,
    totPrice: 6
},
{
    title: 'Indomie',
    text: 'a Sapa Meal',
    price: 12,
    id: 'e2',
    amount: 1,
    totPrice: 12
},
{
    title: 'Bread',
    text: 'na everybody go chop breakfast!',
    price: 11,
    id: 'e3',
    amount: 1,
    totPrice: 11
}]

const CartInitialState = {
    addedMealsList: [],
    totalPrice: 0,
    showCart: false,

}

const mealsInitialState = {
    initMealsList: meals,
    showNotifications: null

}

const cartSlice = createSlice({
    name: 'cart',
    initialState: CartInitialState,
    reducers: {
        addToCart(state, action) {
            // First check that meals array is empty then add meal to cart
            if (state.addedMealsList.length === 0) {
                state.addedMealsList.push(action.payload)
            } else {
                // using findIndex, check if the meal had been added 
                let cIndex = state.addedMealsList.findIndex(element => element.id === action.payload.id)
                // if Yes, simply increase total price and amount       
                if (cIndex !== -1) {
                    const el = state.addedMealsList[cIndex]
                    el.totPrice = el.totPrice + el.price
                    el.amount++
                } else {
                    //if No, add meal to addedMealsList
                    state.addedMealsList.push(action.payload)
                }
            }
        },
        increment: (state, action) => {

            let cIndex = state.addedMealsList.findIndex(element => element.id === action.payload)
            state.addedMealsList[cIndex].amount++
            state.addedMealsList[cIndex].totPrice =
                state.addedMealsList[cIndex].totPrice + state.addedMealsList[cIndex].price
        },
        decrement: (state, action) => {
            let cIndex = state.addedMealsList.findIndex(element => element.id === action.payload)
            if (state.addedMealsList[cIndex].amount === 1) {
                state.addedMealsList.splice(state.addedMealsList[cIndex], 1)
            } else {
                state.addedMealsList[cIndex].amount--
                state.addedMealsList[cIndex].totPrice =
                    state.addedMealsList[cIndex].totPrice - state.addedMealsList[cIndex].price
            }

        },
        showCart(state, action) {
            console.log('cart was shown')
            state.showCart = !state.showCart;
        }
    }
})

const mealSlice = createSlice({
    name: 'meals',
    initialState: mealsInitialState,
    reducers: {
     setNotification(state, action){
                    state.showNotifications = 
                    { status: action.payload.status,
                      message: action.payload.message,
                      title: action.payload.title,
                    }
            }
    }
})

const cartActions = cartSlice.actions
const mealActions = mealSlice.actions


const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        meals: mealSlice.reducer
    }
})

export { cartActions, mealActions }
export default store;