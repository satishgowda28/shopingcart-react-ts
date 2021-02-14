import {useState} from 'react';
import { useQuery } from 'react-query'
//components
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Badge from '@material-ui/core/Badge';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Item from './item/item';
import Cart from './cart/cart';
// Styles
import { Wrapper, CartButton } from './App.style';


//type
export type CartItemsTypes = {
  id: number;
  category: string;
  description: string;
  price: number;
  image: string;
  title: string;
  amount: number;
}


const getProducts = async ():Promise<CartItemsTypes[]> => await (await fetch('https://fakestoreapi.com/products')).json();
const App = () => {
  const [openCart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemsTypes[]);
  const {data, isLoading, error} = useQuery<CartItemsTypes[]>(
    'products',
    getProducts,
  );

  const getTotalItems = (items: CartItemsTypes[]) => items.reduce((acc, item) => acc + item.amount, 0);
  const handleAddToCart = (clickeItem:CartItemsTypes) => {
    setCartItems((prev) => {
      const index = cartItems.findIndex((item) => item.id === clickeItem.id);
      if(index !== -1) {
        const clonePrev = [...prev];
        clonePrev[index].amount += 1;
        return clonePrev;
      }
      return [...prev, {...clickeItem, amount: 1}];
    })
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemsTypes[])
    );
  };
  
  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong</div>

  return (
    <Wrapper>
      <Drawer anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <CartButton onClick={() => {setOpenCart(true)}}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCart />
        </Badge>
      </CartButton>
      <Grid container spacing={3}>
        {
          data?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart}/>
            </Grid>
          ))
        }
      </Grid>
    </Wrapper>
  );
}

export default App;
