import React, { createContext, useState } from "react";

export let DataContext = createContext();
function Context({ children }) {
  const [search, setSearch] = useState("");
  const [API, setAPI] = useState("https://dummyjson.com/products?limit=100");
  const [wishList, setWishList] = useState([]);
  const [bag, setBag] = useState([]);
  let Data = {
    search,
    setSearch,
    API,
    setAPI,
    wishList,
    setWishList,
    bag,
    setBag,
  };
  return <DataContext.Provider value={Data}>{children}</DataContext.Provider>;
}

export default Context;
