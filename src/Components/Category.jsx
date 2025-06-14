import { Link } from "react-router-dom";
import useFetch from "../Utilities/useFetch";

const Category = () => {
    const {data} = useFetch('https://fakestoreapi.com/products/categories')
    
    return ( 
        <div className="w-full  my-5 flex items-center justify-center ">
            {/* {pending ? ( */}
                <div className="flex p-1 flex-wrap items-center justify-start gap-x-3">
                    <p className="font-semibold text-lg  ">Category : </p>
                    <div className="flex flex-wrap items-center justify-between gap-1 ">
                        <Link to="/" className="p-2 flex items-center justify-center border rounded-[999px] hover:bg-gradient-to-r hover:from-[#b148ff] hover:to-[#f137a2]">All</Link>
                        {data.map((item,index)=> (
                            <Link to={`/category/${item}`} key={index} className="p-2 flex items-center justify-center border rounded-[999px] hover:bg-gradient-to-r hover:from-[#b148ff] hover:to-[#f137a2] " >{item}</Link>
                        ))}
                    </div>
                </div>
            {/* ):(
                <div className="">
                    category loading....
                </div>
            )} */}
        </div>
     );
}
 
export default Category;