import React, { useContext, useState, useEffect } from "react";
import Header from "./Common/Header";
import { DataContext } from "./Context/Context";

function Bag() {
  let { bag, setBag } = useContext(DataContext);
  // let [qty, setQty] = useState([{ id: "", qty: "" }]);
  // let [price, setPrice] = useState([{ id: "", price: "" }]);
  // console.log(qty);
  // console.log(price);

  // console.log(bag);

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
            <th className=" border border-slate-400 p-1">Qnt</th>
            <th colSpan={2} className=" border border-slate-400 p-1">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {bag.length > 0
            ? bag.map((v, i) => {
                return <Tr product={v} index={i} />;
              })
            : "No item added to wishlist"}
        </tbody>
      </table>
      <Total />
    </div>
  );
}

export default Bag;

// function Quantity(Product,key) {
//   return (
//     <>
//       <input
//         type="number"
//         min={1}
//         defaultValue={1}
//         className="w-[50px] bg-slate-300 focus:border-none focus:outline-none p-1 text-center"
//       />
//     </>
//   );
// }

// function Td(product, key) {
//   // console.log(product.product)
//   return (
//     <td className=" border border-slate-400 p-1" id="price">
//       ${product.product.price}
//     </td>
//   );
// }
function Tr({ product, index }) {
  // console.log("product")
  let { bag, setBag } = useContext(DataContext);
  // let [qty, setQty] = useState([{ id: "", qty: "" }]);
  // let [price, setPrice] = useState([{ id: "", price: "" }]);
  function Quantity(e) {
    let count = e.target.value;
    let OldData = [...bag];
    OldData[index].Uqnty = count;
    setBag(OldData);
  }
  // console.log(bag)
  // function Price(idx, e) {
  //   setPrice([...price, { id: idx, price: e.target.value }]);
  // }
  let Remove = (idx) => {
    let updateWishlist = bag.filter((v, i) => {
      return i !== idx;
    });
    setBag(updateWishlist);
  };
  return (
    <tr>
      <td className=" border border-slate-400 p-1 text-center">{index + 1}</td>
      <td className=" border border-slate-400 p-1">
        <img
          src={product.Uthumbnail}
          alt={product.Utitle}
          className="object-contain w-[100px] h-[100px] mx-auto"
        />
      </td>
      <td className=" border border-slate-400 p-1 font-semibold">
        {product.Utitle}
      </td>
      {/* <Td product={v} key={i} /> */}
      <td className=" border border-slate-400 p-1 text-center" id="price">
        ${(product.Uprice * product.Uqnty).toFixed(2)}{" "}
      </td>
      <td className=" border border-slate-400 p-1">
        {/* <Quantity product={v} key={i}/> */}
        <input
          type="number"
          min={1}
          defaultValue={product.Uqnty}
          className="w-[50px] bg-slate-300 focus:border-none focus:outline-none p-1 text-center"
          onChange={(e) => Quantity(e)}
        />
      </td>

      <td className=" border border-slate-400 p-1">
        <button
          className="bg-red-700 cursor-pointer text-white rounded-[10px] p-1 w-full"
          onClick={() => Remove(index)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
function Total() {
  let { bag, setBag } = useContext(DataContext);
  let [price, setPrice] = useState(0);
  console.log(price);
  let Billing = () => {
    let finalAmount = 0;
    bag.map((v, i) => {
      finalAmount += v.Uprice * v.Uqnty;
    });
    setPrice(finalAmount);
  };
  console.log(bag);

  useEffect(() => {
    Billing();
  }, [bag]);
  return (
    <div className="w-[100%] mx-auto flex flex-col align-items-center justify-center  mt-[-70px]">
      <table className="border-collapse my-[80px] mx-auto w-[80%]">
        <tbody>
          <tr className="text-[13px]">
            <td className="border border-slate-400 font-semibold w-[20%] p-1">
              Price
            </td>
            <td className="border border-slate-400 font-semibold w-[80%] p-1">
              ${price.toFixed(2)}
            </td>
          </tr>
          <tr className="text-[13px]">
            <td className="border border-slate-400 font-semibold w-[20%] p-1">
              Discount (10%)
            </td>
            <td className="border border-slate-400 font-semibold w-[80%] p-1">
              {((price * 10) / 100).toFixed(2)}/-
            </td>
          </tr>
          <tr className="text-[13px]">
            <td className="border border-slate-400 font-semibold w-[20%] p-1">
              Tax (18%)
            </td>
            <td className="border border-slate-400 font-semibold w-[80%] p-1">
              {((price - 0.1 * price) * (18 / 100)).toFixed(2)}/-
            </td>
          </tr>
          <tr className="text-[13px]">
            <td className="border border-slate-400 font-semibold w-[20%] p-1">
              Shipping Charges
            </td>
            <td className="border border-slate-400 font-semibold w-[80%] p-1">
              0
            </td>
          </tr>

          <tr className="text-[13px] bg-blue-700 text-white">
            <td className="border border-slate-400 font-bold w-[20%] p-1">
              Total Amount
            </td>
            <td className="border border-slate-400 font-bold w-[80%] p-1">
              {(price - (price * 10) / 100 + ((price-0.1*price) * 18) / 100).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="w-[20%] mx-auto mt-[-50px]">
        <button className="bg-green-600 text-white rounded-[10px] p-1 w-full">
          Checkout
        </button>
      </div>
    </div>
  );
}
