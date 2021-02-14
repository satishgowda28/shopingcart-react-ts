//component
import CartItem from '../cartItem/cartITem';
//type
import {CartItemsTypes} from '../App';
//style
import {Wrapper} from './cart.style';

type Props = {
  cartItems: CartItemsTypes[];
  addToCart: (item: CartItemsTypes) => void;
  removeFromCart: (id: number) => void
}

const Cart:React.FC<Props> = ({cartItems, addToCart, removeFromCart}) => {

  return (
    <Wrapper>
      <h3>Cart</h3>
      {cartItems.length === 0 ? <p>Cart is Empty</p> : null}
      {
        cartItems.map(item => (
          <CartItem cartItem={item} addItem={addToCart} removeItem={removeFromCart}/>
        ))
      }
    </Wrapper>
  )
}

export default Cart;