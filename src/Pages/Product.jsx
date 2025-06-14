import { useContext } from "react";
import { AppContext } from "../Utilities/Context";
import Item from "../Components/Items";

const Product = () => {
    const {data} = useContext(AppContext)
    return ( 
            <Item Items={data} />
     );
}
 
export default Product;