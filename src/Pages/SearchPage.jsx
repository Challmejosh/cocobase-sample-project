import { useContext } from "react";
import { AppContext } from "../Utilities/Context";
import Item from "../Components/Items";
const SearchPage = () => {
    const {product} = useContext(AppContext)
    return ( 
        <div className="">
            <Item Items={product} />
        </div>
     );
}
 
export default SearchPage;