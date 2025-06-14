import { useParams,Link } from "react-router-dom";
import useFetch from '../Utilities/useFetch';
// import {AppContext} from '../Utilities/Context';
// import { useContext } from "react";
import Item from "../Components/Items";
const CategoryPage = () => {
    const {category} = useParams()
    const {data} = useFetch(`https://fakestoreapi.com/products/category/${category}`)
    return ( 
        <div className="">
            <Item Items={data} />
        </div>
     );
}
 
export default CategoryPage;