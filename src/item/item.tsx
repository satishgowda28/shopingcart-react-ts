import Button from '@material-ui/core/Button';
import { CartItemsTypes } from '../App';
import { Wrapper } from "./item.style";

type Props = {
  item: CartItemsTypes,
  handleAddToCart: (clikedItem:CartItemsTypes) => void;
}

const Item: React.FC<Props> = ({item, handleAddToCart}) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title}/>
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h4>{item.price}</h4>
      </div>
      <Button onClick={handleAddToCart.bind(null, item)}>Add to Cart</Button>   
    </Wrapper>
  )
}

export default Item;