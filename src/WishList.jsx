import React, { useContext } from "react";
import Header from "./Common/Header";
import { DataContext } from "./Context/Context";

function WishList() {
  let { wishList, setWishList, bag, setBag } = useContext(DataContext);
  // console.log(wishList);
  let Bag = (v, idx) => {
    let updateWishlist = wishList.filter((v, i) => {
      return i !== idx;
    });
    setBag([...bag, v]);
    setWishList(updateWishlist);
  };
  let Remove = (idx) => {
    let updateWishlist = wishList.filter((v, i) => {
      return i !== idx;
    });
    setWishList(updateWishlist);
  };
  return (
    <div className="w-full">
      <Header />
      <table className="border-collapse my-[80px] mx-auto w-[80%]">
        <thead>
          <tr>
            <th className=" border border-slate-400 p-1">Sno</th>
            <th className=" border border-slate-400 p-1">Product Image</th>
            <th className=" border border-slate-400 p-1">Product</th>
            <th className=" border border-slate-400 p-1">Price</th>
            <th colSpan={2} className=" border border-slate-400 p-1">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {wishList.length > 0
            ? wishList.map((v, i) => {
              // console.log(v)
                return (
                  <tr>
                    <td className=" border border-slate-400 p-1 text-center">{i + 1}</td>
                    <td className=" border border-slate-400 p-1">
                      <img
                        src={v.Uthumbnail}
                        alt={v.Utitle}
                        className="object-contain w-[100px] h-[100px] mx-auto"
                      />
                    </td>
                    <td className=" border border-slate-400 p-1 font-semibold">{v.Utitle}</td>
                    <td className=" border border-slate-400 p-1 text-center">${v.Uprice}</td>
                    <td className=" border border-slate-400 p-1">
                      <button
                        className="bg-blue-700 cursor-pointer text-white rounded-[10px] p-1 w-full"
                        onClick={() => Bag(v, i)}
                      >
                        Bag
                      </button>
                    </td>
                    <td className=" border border-slate-400 p-1">
                      <button
                        className="bg-red-700 cursor-pointer text-white rounded-[10px] p-1 w-full"
                        onClick={() => Remove(i)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })
            : "No item added to wishlist"}
        </tbody>
      </table>
    </div>
  );
}

export default WishList;
