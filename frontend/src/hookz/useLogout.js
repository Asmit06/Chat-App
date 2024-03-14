import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import useConversation from "../store/useConversation";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const {selectedConversation , setSelectedConversation} = useConversation();

    const logout = async ()=>{
        setLoading(true);
        try{
            const res = await fetch("/api/auth/logout",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }

            localStorage.removeItem("chat-user");
            setAuthUser(null);
            setSelectedConversation(null)
        }catch(error){
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {loading , logout};
}

export default useLogout