import { toast } from "react-toastify";
import db from "./cocobase";

// Register a new user
export const newUser = async(email,password)=>{
     await db.register(email, password);
     return {
      success: true,
      data: db.user,
      message: "User created successfully",
     }
}
// console.log("User registered:", newUser?.email);

// Login an existing user
export const user = async (email, password) => {
  try {
    await db.login(email, password);
    return {
      success: true,
      user: db.user,
      message: "Login successful!",
    };
  } catch (error) {
      
      if (error.code === "INVALID_CREDENTIALS") {
          toast.error("Invalid email or password.");
        } else if (error.code === "USER_NOT_FOUND") {
            toast.error("No account found with this email.");
        } else if (error.code === "NETWORK_ERROR") {
            toast.error("Network error. Please check your connection.");
        }else{
            toast.error("Login failed. Please try again.");
        }

    return {
      success: false,
      user: null,
      message: error?.message || "Login failed",
    };
  }
};

// console.log("User logged in:", user?.email);

// Logout the current user
export const logout =async () => await db.logout();
// console.log("User logged out");