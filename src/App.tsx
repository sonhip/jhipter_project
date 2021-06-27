import { useState } from "react";
import { useQuery } from "react-query";
// components
import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Wrapper, StyledButton } from "./App.style";
import Item from "./item/item";
import Cart from "./cart/cart";
// types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();
const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) => {
    // return items.reduce((a: number, item) => a + item.amount, 0);
    return items.length;
  };

  const handleAddToCart = (itemAdd: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === itemAdd.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === itemAdd.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      return [...prev, { ...itemAdd, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((cur, item) => {
        if (item.id === id) {
          if (item.amount === 1) return cur;
          return [...cur, { ...item, amount: item.amount - 1 }];
        } else {
          return [...cur, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <h2>Something went wrong!</h2>;
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          remoteFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={3}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
