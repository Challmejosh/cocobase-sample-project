import { useEffect, createContext, useState, useCallback } from "react";
import useFetch from "./useFetch";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
// import { getItems, setItems } from "./localStorage";
import db from "../lib/cocobase";
import { logout, newUser, user } from "../lib/register";
const AppContext = createContext();

const Context = ({ children }) => {
  // const topElementRef =useRef(null)
  const [done, setDone] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [cart, setCart] = useState([]);
  const [gettingCart, setGettingCart] = useState(false);
  const [detail, setDetail] = useState([]);
  const [product, setProduct] = useState([]);
  const [input, setInput] = useState("");
  const [auth,setAuth] = useState(true)
  const [changeCart, setChangeCart] = useState(false);
  const { pending, data } = useFetch(import.meta.env.VITE_URL);

  const getUser = localStorage?.getItem("cocobase-user");
  const localCart = ()=>{
    const cart = localStorage?.getItem("cart")
    if(cart){
      setCart(JSON.parse(cart))
    }
  }


  useEffect(()=>{
    const init = async ()=>{
      await db.initAuth()
    }
    init()
  },[])

    // get Cart on mount


const getCart = useCallback(async () => {
  if (getUser) {
    try {
      const allCart = await db.listDocuments("cart");
      const userOBJ = localStorage.getItem("cocobase-user");
      const user = JSON.parse(userOBJ);

      const check = allCart?.filter(itm => itm?.data.user === user.client_id);

      if (check) {
        setCart(check);
        setGettingCart(true);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }
}, [getUser]);
    
    useEffect(()=>{
      if(getUser){
        getCart()
      }else{
        localCart()
      }
    },[getCart,getUser])

  const handleCart = async (prod) => {
    try {
      const userOBJ = localStorage.getItem("cocobase-user")
      if(userOBJ){
        const allCart = await db.listDocuments("cart");
        const user = JSON.parse(userOBJ)
        const check = allCart?.filter(itm => itm?.data.user === user?.client_id )
        const find = check?.find(item => item?.data?.id === prod?.id )
        if(find){
          toast("already in cart")
          return 
        }
        const checkItem = data.find((item) => item.id === prod.id);
        if (checkItem) {
          const reCheck = cart.find((item) => item.id === prod.id);
          if (reCheck) {
            if (cart.map((item) => item.id === prod.id)) {
              toast("already in cart");
            }
          } else {
              
                  await db.createDocument("cart", {
                    id: prod?.id,
                    title: prod?.title,
                    description: prod?.description,
                    category: prod?.category,
                    image: prod?.image,
                    price: prod?.price,
                    quantity: 1,
                    rating: {
                      rate: prod?.rating?.rate,
                      count: prod?.rating?.count,
                    },
                    user: db.user?.client_id
                  });
                  setCart([...cart, { ...checkItem, quantity: +1 }]);
                  toast("added to cart");
              
  
                  setCart([...cart, { ...checkItem, quantity: +1 }]);
                  toast("added to cart");
                  
                }
              }
            }
            if(!userOBJ){
              const checkItem = data.find((item) => item.id === prod.id);
              if (checkItem) {
                const reCheck = cart.find((item) => item.id === prod.id);
                if (reCheck) {
                  if (cart.map((item) => item.id === prod.id)) {
                    toast("already in cart");
                  }
                }else{
                  const update = [...cart, { ...checkItem, quantity: +1 }]
                  setCart(update);
                  localStorage.setItem("cart",JSON.stringify(update))
                  toast("added to cart");
                }
              }
      }
    } catch (error) {
      toast(error.code);
    }
  };

  // increase quantity
const addCart = async (prodId, change) => {
  if(!getUser){
    setCart(prev=>{
      const update = prev.map(item => item?.id === prodId?.id ? {...item, quantity: item?.quantity + change} : item)
      localStorage.setItem("cart",JSON.stringify(update))
      return update;
    })
    return
  }
  if(getUser){
    let updatedItem = null;
    setCart((prev) =>
      prev.map(item =>
        item.data.id === prodId.id
          ? (() => {
              const newQuantity = (item.data.quantity || 0) + change;
  
              updatedItem = {
                ...item,
                data: {
                  ...item.data,
                  quantity: newQuantity,
                },
              };
  
              return updatedItem;
            })()
          : item
      )
    );
  
        // Wait for state update (optional safety to avoid race conditions)
        await new Promise((r) => setTimeout(r, 0));
  
        if (!updatedItem) return;
  
        try {
          await db.updateDocument("cart", updatedItem.id, {
            ...updatedItem.data,
            quantity: updatedItem.data.quantity,
          });
          toast("added")
        } catch (err) {
          console.error("Failed to update cart item:", err);
        }
  }
};
  // decrease quantity
const handleRemCart = async (prodId, change) => {
    if(!getUser){
    setCart(prev=>{
      const update = prev.map(item => item?.id === prodId?.id ? {...item, quantity: item?.quantity - change} : item).filter(itm => itm?.quantity !== 0)
      localStorage.setItem("cart",JSON.stringify(update))
      return update;
    })
    return 
  }
  if(getUser){
  setCart((prev) =>
    prev
      .map(item => {
        if (item.data.id === prodId.id) {
          const newQuantity = Number(item.data.quantity ?? 0) - Number(change ?? 0);

          if (newQuantity <= 0) return null; // flag for removal

          return {
            ...item,
            data: {
              ...item.data,
              quantity: newQuantity,
            },
          };
        }
        return item;
      })
      .filter(Boolean) // remove nulls
  );
    // Find the updated item after local update
    const itemToUpdate = cart.find(item => item.data.id === prodId?.id);
    if (!itemToUpdate) return;
  
    const newQuantity = Number(itemToUpdate.data.quantity ?? 0) - Number(change ?? 0);
  
    try {
      if (newQuantity <= 0) {
        //  Delete from DB
        await db.deleteDocument("cart", itemToUpdate.id);
        toast("delete")
      } else {
        //  Update quantity in DB
        await db.updateDocument("cart", itemToUpdate.id, {
          ...itemToUpdate.data,
          quantity: newQuantity,
        });
        toast("removed")
      }
    } catch (err) {
      console.error("Failed to update cart item:", err);
    }
  
  }
};
  // delete item in cart
  const handleDelete = async (prod) => {
   if(getUser){
     try {
        const filter = cart.filter((item) => item?.data?.id !== prod?.id);
        const check = cart.find((item) => item?.data?.id !== prod?.id);
        await db.deleteDocument("cart", check?.id);
        setCart(filter);
        toast("deleted sucessfully")
      } catch (error) {
        toast(error.code);
      }
   }
   if(!getUser){
      setCart(prev => {
        const update = prev?.filter(item => item?.id !== prod?.id)
        localStorage.setItem("cart",JSON.stringify(update))
        return update ;
      })
   }
  };

  const total = cart?.reduce((acct, item) => acct + item?.data?.price * item?.data?.quantity,0);
  const localTotal =  cart?.reduce((acct, item) => acct + item?.price * item?.quantity,0);
  const totalQuantity = cart?.reduce((acct, item) => acct + item?.data?.quantity,0);
  const localTotalQuantity = cart?.reduce((acct, item) => acct + item?.quantity,0);
  const detailFunc = (prod, all) => {
    try {
      const check = all.find((item) => item.id === prod.id);
      if (check) {
        setDetail(check);
      }
    } catch (error) {
      toast(error.code);
    }
  };
  const proceed = async (e, router) => {
    e.preventDefault();
    if (total === 0) {
      setEmpty(true);
      setTimeout(() => {
        setEmpty(false);
      }, 5000);
    } else {
      setDone(true);
      await localStorage.removeItem("cart");
      setTimeout(() => {
        setDone(false);
      }, 5000);
      setTimeout(() => {
        router("/");
      }, 6000);
    }
  };

  // authentication


const signUp = async (email, password) => {
    try{
        setAuth(true)
        await newUser(email, password);
        setAuth(false)
    }catch(err){
        console.error(err)
    }
}


const signin = async (email, password) =>{
    try{
        setAuth(true)
        const res = await user(email, password);
        setAuth(false)
        return{success: res.user,message:res.message}
        }catch(err){
            console.error(err)
        }
}
const signout = async () => {
  try {
    await logout();
    localStorage.removeItem("cocobase-user")
    localStorage.removeItem("cocobase-token")
    setAuth(true)
    setTimeout(()=>{setAuth(false)},1000)
  } catch (err) {
    console.error("Sign-out error:", err);
    toast("Failed to sign out");
  }
};

  return (
    <AppContext.Provider
      value={{
        pending,
        signUp,
        signin,
        signout,
        data,
        done,
        empty,
        handleCart,
        handleRemCart,
        detail,
        detailFunc,
        changeCart,
        cart,
        setChangeCart,
        handleDelete,
        total,
        totalQuantity,
        addCart,
        setProduct,
        product,
        input,
        setInput,
        proceed,
        auth,
        getUser,
        getCart,
        gettingCart,
        localCart,
        localTotal,
        localTotalQuantity
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
Context.propTypes = {
  children: PropTypes.node,
};

export { Context, AppContext };
