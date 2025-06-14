// import { useParams } from "react-router-dom";
import {AppContext} from '../Utilities/Context'
import { useContext } from "react";
const Detail = ()=>{
    // const {id} = useParams()
    const {detail,handleCart} = useContext(AppContext)
    return(
        <div className="flex mx-3 items-center flex-col justify-center p-5">
            <div className="">
                        <div className="w-[300px] sm:w-[400px] rounded-lg shadow h-fit overflow-hidden flex flex-col items-center justify-start pb-3 gap-y-3 ">
                            <img src={detail.image} alt="" className="w-full h-[400px] bg-amber-500 " />

                                <div className=" w-full flex flex-col  px-2 ">
                                    <p className="font-semibold text-md hidden sm:flex w-full "> {detail.title}</p>
                                    <div className="p-3 w-full ">
                                        <p className="font-semibold text-sm  "> ${detail.price} </p>
                                        <p className="font-semibold text-md  "> Review : {detail.rating.rate} </p>
                                    </div>
                                    <div className="">{detail.description}</div>
                                </div>

                                <div className="p-2 flex w-full items-center justify-between gap-x-1 ">
                                    <div className=" w-full sm:w-[40%] p-2 bg-red-500 flex items-center justify-center rounded-md  text-white cursor-pointer " 
                                        onClick={()=>{
                                            handleCart(detail) 
                                            }}
                                        >  ADD TO CART</div>
                                
                                </div>
                    </div>
                </div>
        </div>
    )
}
export default Detail;