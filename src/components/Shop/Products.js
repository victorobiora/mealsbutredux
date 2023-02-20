import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { useSelector } from 'react-redux';

const Products = (props) => {
  const totalMeals = useSelector(state => state.meals.initMealsList);
  
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {totalMeals.map(el => (
          <ProductItem title = {el.title}
          price= {el.price}
          description= {el.text}
          id = {el.id}
          key= {el.id}/>
        )        
        )}
      </ul>
    </section>
  );
};

export default Products;
