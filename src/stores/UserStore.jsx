import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

const userStore = create(persist((set,get) => ({
    authToken: "",
    setAuthToken: (token) => {
        set(state => ({authToken: token}));
        localStorage.setItem("access_token", token);
    }
}), {
    name: "react-blog-storage",
    storage: createJSONStorage(() => sessionStorage)
}));

export default userStore;