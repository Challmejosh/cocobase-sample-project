import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Utilities/Context";
import Category from "./Category";
// import { motion } from "framer-motion";

const Item = ({Items}) => {
    const {pending,handleCart,detailFunc} = useContext(AppContext)
    return ( 
        <div className="w-full">
        {/* {pending ? <Category /> : null} */}
        {pending ? (
            <>
            
                <Category />
            <div className=" gap-5 grid items-center justify-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full ">
                {Items?.map(item => (
                    <div className="w-full rounded-lg shadow h-[500px] overflow-hidden flex flex-col items-center justify-start pb-3 gap-y-3 " key={item.id}>
                        <img src={item.image} alt="" className="w-full h-[60%] " />
                            <div className="h-[20%] w-full flex flex-col  px-2 ">
                                <p className="font-semibold text-md hidden sm:flex w-full "> {item.title}</p>
                                <div className="p-3 w-full ">
                                    <p className="font-semibold text-sm  "> ${item.price} </p>
                                    <p className="font-semibold text-md  "> Review : {item.rating.rate} </p>
                                </div>
                            </div>

                            <div className="p-2 flex flex-col text-[12px] sm:text-[14px] sm:flex-row w-full items-center justify-between h-[20%] gap-x-1 ">
                                <Link onClick={()=>detailFunc(item,Items)} to={`/detail/${item.id}`} className=" cursor-pointer p-2 rounded-md bg-[#f8f8f8] flex items-center justify-center w-full  ">Review Details</Link>
                               
                                <div className=" w-full sm:w-full p-2 bg-gradient-to-r from-[#b148ff] to-[#f137a2] flex items-center justify-center rounded-md  text-white cursor-pointer text-md " 
                                    onClick={()=>{
                                        handleCart(item);
                                        }}
                                    >  ADD TO CART</div>
                            
                            </div>
                    </div>
                ))}
            </div>
            </>
        ):(
            <div className="flex items-center h-screen justify-center ">
                <div className="loader bg-gradient-to-r from-[#b148ff] to-[#f137a2]">

                </div>
            </div>
        )}

    </div>
     );
}
 
export default Item;