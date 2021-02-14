//components
import Button from '@material-ui/core/Button';
//type
import {CartItemsTypes} from '../App';
//style
import {Wrapper} from './cartItem.style';


type Props = {
  cartItem: CartItemsTypes;
  addItem: (item: CartItemsTypes) => void;
  removeItem: (id: number) => void;
};

const CartItem:React.FC<Props> = ({cartItem, addItem, removeItem}) => {
  return(
    <Wrapper>
      <div>
        <h4>{cartItem.title}</h4>
        <div className="info">
          <span>$ {cartItem.price}</span>
          <span>$ {cartItem.price * cartItem.amount}</span>
        </div>
        <div className="button">
          <Button
            size='small'
            disableElevation
            variant='contained'
            onClick={() => addItem(cartItem)}>
            +
          </Button>
          {cartItem.amount}
          <Button
            size='small'
            disableElevation
            variant='contained'
            onClick={() => removeItem(cartItem.id)}>
            -
          </Button>
        </div>
      </div>
      <img src={cartItem.image} alt=""/>
    </Wrapper>
  )
}

export default CartItem;