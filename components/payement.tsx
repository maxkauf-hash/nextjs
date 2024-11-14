import { createOrders, getAllOrderss } from "@/actions/orders/orders-actions";
import { ProductsType } from "@/lib/types";

type PayementProps = {
  userId: string | null;
  cartProducts: ProductsType[];
  totalAmount: number;
};

type props = {
  props: PayementProps;
};

const Payement = async ({ props }: props) => {
  const saveOrder = await getAllOrderss();
  return <button>Pay : {props.totalAmount}</button>;
};

export default Payement;
