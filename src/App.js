import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment } from 'react'
import { mealActions } from './store/redux-store';

function App() {

   const dispatch = useDispatch()
   const cart = useSelector(state => state.cart.addedMealsList) 
  const isCartShown = useSelector(state => state.cart.showCart)
  const notification = useSelector(state => state.meals.showNotifications)

console.log(notification)

  useEffect(()=> {
 
    const fectchData = async () => {

     dispatch(mealActions.setNotification({
      title: 'Pending...',
      status: 'pending',
      message: 'Cart data being sent'
    }))

    const response = await fetch('https://react-http-67cf3-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart)
    })  

    if(!response.ok){
      console.log('didnt go')
    }
     const data = await response.json()

      dispatch(mealActions.setNotification({
        title: 'Successful',
        status: 'success',
        message: 'Cart data sent successfully'
      }))


   console.log(data)
    }
    fectchData().catch(err => [
      dispatch(mealActions.setNotification({
        title: 'error',
        status: 'error',
        message: 'Cart data failed to send'
      }))

    ])
  }, [cart, dispatch])
  return (
    <Fragment>
        {notification && <Notification status = {notification.status}
     title= {notification.title}
     message = {notification.message}/>} 
     {isCartShown && <Cart />} 
  <Layout>
      <Products />
    </Layout>
    </Fragment>
  
  );
}

export default App;
