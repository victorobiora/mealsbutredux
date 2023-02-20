import classes from './CartButton.module.css';
import { cartActions } from '../../store/redux-store';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {

  const itemsAmount = useSelector(state => state.cart.addedMealsList)

  const dispatch = useDispatch()

  const cartViewHandler = () => {
    dispatch(cartActions.showCart())
  }
  return (
    <button className={classes.button} onClick = {cartViewHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemsAmount.length}</span>
    </button>
  );
};

export default CartButton;
