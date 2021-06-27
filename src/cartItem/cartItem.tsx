import Button from "@material-ui/core/Button";
//types
import { CartItemType } from "../App";
//styles
import { Wrapper } from "./cartItem.style";
type Props = {
  item: CartItemType;
  addToCart: (addItem: CartItemType) => void;
  remoteFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ addToCart, remoteFromCart, item }) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className="information">
        <p>Price: {item.price}</p>
        <p>Total: {(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <Button
          size="small"
          onClick={() => remoteFromCart(item.id)}
          disableElevation
          variant="contained"
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size="small"
          onClick={() => addToCart(item)}
          disableElevation
          variant="contained"
        >
          +
        </Button>
      </div>
    </div>
    <img src={item.image} alt={item.title} />
  </Wrapper>
);
export default CartItem;
