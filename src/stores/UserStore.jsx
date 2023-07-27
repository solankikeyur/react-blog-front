import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

const userStore = create(persist((set,get) => ({
    authToken: "",
    currentPage: 1,
    setAuthToken: (token) => {
        set(state => ({authToken: token}));
        localStorage.setItem("access_token", token);
    },
    setCurrentPage: (page) => {
        set(state => ({currentPage: page}))
    }
}), {
    name: "react-blog-storage",
    storage: createJSONStorage(() => sessionStorage)
}));

export default userStore;