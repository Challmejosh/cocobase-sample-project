import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFetch = (url) => {
    const [pending,setPending] = useState(false)
    const [data,setData] = useState([])
    useEffect(()=>{
        try {
            fetch(url)
            .then(res => res.json())
            .then(data=>{
                setPending(true)
                setData(data)
            })
            
        } catch (error) {
            toast(error.code)
        }
    },[url])
    return {pending,data};
}
 
export default useFetch;