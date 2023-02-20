import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {

  const cartMealsList = useSelector(state => state.cart.addedMealsList);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartMealsList.map(el => (
                <CartItem
                item={{ title: el.title , quantity: el.amount , total: el.totPrice, price: el.price, id: el.id }}
                key = {Math.floor(Math.random()*100000)}/>
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
