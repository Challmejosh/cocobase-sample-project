import { Cocobase } from "cocobase";

// Initialize the client
const db = new Cocobase({
  apiKey: import.meta.env.VITE_API_KEY,
});


export default db;