const setItems = (key,value)=>{
    try{
        window.localStorage.setItem(key, JSON.stringify(value))
    }catch(error){
        console.log(error.code)
    }
}
const getItems = (key)=>{ 
    try {
        const item = window.localStorage.getItem(key)
        if(!item){
            return undefined
        }
        return JSON.parse(item)
    } catch (error) {
        console.log(error.code)
    }
}
export {setItems,getItems}