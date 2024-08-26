import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./Common/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataContext } from "./Context/Context";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  let {API, setAPI } = useContext(DataContext);
  // console.log(API);

  // categories
  let Categories = () => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((result) => {
        setCategories(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Products
  let Products = (name) => {
    // let API =
    // name !== undefined && name.length > 0
    //   ? `https://dummyjson.com/products/category/${name}`
    //   : "https://dummyjson.com/products?limit=100";
    axios
      .get(API)
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let FilteredByCategory = (name) => {
    setAPI(`https://dummyjson.com/products/category/${name}`);
    Products();
  };
  useEffect(() => {
    Categories();
    Products();
  }, [API]);
  return (
    <div className="w-full">
      <Header />
      {/* Main Start*/}
      <div className="grid grid-cols-[20%_80%] w-[100%] my-[100px]">
        <div className="categories">
          <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {categories.map((v, i) => {
              return (
                <li
                  key={i}
                  className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 hover:bg-blue-700 hover:text-white cursor-pointer"
                  onClick={() => FilteredByCategory(v.slug)}
                >
                  {v.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="products grid grid-cols-4 gap-3 mx-1">
          {products.length > 0
            ? products.map((v, i) => {
                return <Card product={v} idx={i} />;
              })
            : "No Product Available"}
        </div>
      </div>
      {/* Main End*/}
    </div>
  );
}

export default App;

function Card({ product, idx }) {
  return (
    <div
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-[550px]"
      key={idx}
    >
        <img
          className="rounded-t-lg"
          src={product.thumbnail}
          alt={`${product.thumbnail}`}
        />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          ${product.price}
        </p>{" "}
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {product.category}
        </p>{" "}
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {product.availabilityStatus}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          {/* <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg> */}
        </Link>
      </div>
    </div>
  );
}
