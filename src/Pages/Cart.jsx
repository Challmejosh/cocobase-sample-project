import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Utilities/Context";
import {MdShoppingBasket} from 'react-icons/md'

const Cart = () => {
    const {cart,handleRemCart,handleDelete,total,getUser,localCart,localTotal,getCart,gettingCart,addCart} = useContext(AppContext)
    const [data,setData] = useState([])
    // const data = cart?.map(itm => itm?.data)
    useEffect(()=>{
        setData(cart)
    },[cart])
    useEffect(()=>{
        if(getUser){
            getCart()
        }else{
            localCart()
        }
    },[getCart,getUser,localCart,cart])
    const local =Math.round(localTotal).toFixed(2)
    const user =Math.round(total).toFixed(2)

    return ( 
        <div className="sm:mx-14 mx-0 flex items-center justify-center flex-col">
            <h1 className="flex w-full items-center justify-center font-semibold text-lg p-3">Cart</h1>
            {getUser && <>
            {gettingCart ? (
                <>
                    {cart.length !== 0 ? (
                    <div className=" h-fit flex flex-col gap-y-3 items-center justify-center ">
                        
                        {data?.map?.(itm => itm?.data).map((item,index) => (
                            <div key={index} className="w-full shadow-md rounded-lg p-2 flex gap-x-3 sm:items-center items-start ">
                                    <img src={item?.image} alt="" className="w-[100px] sm:w-[250px] h-[80px] sm:h-[80px] rounded-md object-cover " />
                                    <div className="w-full flex-col sm:flex-row flex sm:items-center items-start justify-center sm:justify-between gap-3 sm:gap-0 ">
                                        <div className="flex flex-col items-start justify-center gap-y-3 ">
                                            <div className="flex items-center justify-start w-full">
                                                <h2 className="font-semibold">{item?.title}</h2>
                                            </div>
                                            <div className="flex items-center gap-x-3 justify-between w-full ">
                                                <p className="w-[40%] "> {item?.price} x {item?.quantity}</p>
                                                <div className="w-[30%] ">
                                                    <p className="">${Math.round(item?.price * item?.quantity)}</p>
                                                </div>
                                                <div className=" w-[30%] flex items-center justify-center gap-x-3 ">
                                                    <p onClick={()=>addCart(item, 1)} className="font-semibold rounded-full border p-3 hover:bg-[#333] w-[20px] h-[20px] flex items-center justify-center cursor-pointer ">+</p>
                                                    <p onClick={()=>handleRemCart(item,1)} className="font-semibold rounded-full border p-3 hover:bg-[#333] w-[20px] h-[20px] flex items-center justify-center cursor-pointer ">-</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end w-full ">
                                            <div onClick={()=>handleDelete(item)} className="cursor-pointer bg-gradient-to-r from-[#b148ff] to-[#f137a2] p-3 rounded-md w-[90px] flex items-center  sm:justify-center hover:bg-red-400 text-white ">remove</div>
                                        </div>
                                    </div>
                                </div>
                        ))}


                    </div>
                    ):(
                        <div className="">
                            <MdShoppingBasket size={30} />
                        </div>
                    )}
                </>
            ): <p className="">loading....</p> }
            </>}
            {!getUser && (
                <>
                    {cart.map((item,index) => (
                            <div key={index} className="w-full shadow-md rounded-lg p-2 flex gap-x-3 sm:items-center items-start ">
                                    <img src={item?.image} alt="" className="w-[100px] sm:w-[250px] h-[80px] sm:h-[80px] rounded-md object-cover " />
                                    <div className="w-full flex-col sm:flex-row flex sm:items-center items-start justify-center sm:justify-between gap-3 sm:gap-0 ">
                                        <div className="flex flex-col items-start justify-center gap-y-3 ">
                                            <div className="flex items-center justify-start w-full">
                                                <h2 className="font-semibold">{item?.title}</h2>
                                            </div>
                                            <div className="flex items-center gap-x-3 justify-between w-full ">
                                                <p className="w-[40%] "> {item?.price} x {item?.quantity}</p>
                                                <div className="w-[30%] ">
                                                    <p className="">${Math.round(item?.price * item?.quantity)}</p>
                                                </div>
                                                <div className=" w-[30%] flex items-center justify-center gap-x-3 ">
                                                    <p onClick={()=>addCart(item, 1)} className="font-semibold rounded-full border p-3 hover:bg-[#333] w-[20px] h-[20px] flex items-center justify-center cursor-pointer ">+</p>
                                                    <p onClick={()=>handleRemCart(item,1)} className="font-semibold rounded-full border p-3 hover:bg-[#333] w-[20px] h-[20px] flex items-center justify-center cursor-pointer ">-</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end w-full  sm:justify-center ">
                                            <div onClick={()=>handleDelete(item)} className="cursor-pointer bg-gradient-to-r from-[#b148ff] to-[#f137a2] p-3 rounded-md w-[90px] flex items-center  sm:justify-center hover:bg-red-400 text-white ">remove</div>
                                        </div>
                                    </div>
                                </div>
                        ))}
                </>
            )}
            {!getUser && cart.length <= 0 && (
                <div className="">
                    <MdShoppingBasket size={30} />
                </div>
            )}
            {!cart.length<=0 && 
            (
                <>
                    <div className="flex items-center justify-between p-3 w-full ">
                        <p className="flex items-center justify-center text-lg font-semibold">Total</p>
                        <p className="font-semibold text-lg flex items-center justify-center ">{getUser? user : local } </p>
                    </div>
                    <button className="bg-gradient-to-r from-[#b148ff] to-[#f137a2] rounded-md cursor-pointer p-3 w-[180px] flex items-center justify-center text-white ">Proceed</button>
                </>
            )}
        </div>
     );
}
 
export default Cart;