import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./Modal";
const Card = () => {
  const [products, setProducts] = useState([]);
  const [ctgry, setCtgry] = useState([]);
  const [fltPro, setfltPro] = useState([]);
  const [searPro, setSearPro] = useState("");
  const [isFound, setIsFound] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getData = async () => {
    try {
      const data = await axios.get("https://freetestapi.com/api/v1/cars");
      const response = data.data;
      setProducts(response);
      setfltPro(response);
      const categories = ["All", ...new Set(response.map((item) => item.make))];
      setCtgry(categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVal = (mo) => {
    if (mo === "All") {
      setfltPro(products);
      setIsFound(true);
    } else {
      const filteredData = products.filter((i) => i.make === mo);
      setfltPro(filteredData);
      setIsFound(filteredData.length > 0);
    }
  };

  const handleSearch = () => {
    const filteredSearch = products.filter((i) =>
      i.model.toLowerCase().includes(searPro.toLowerCase())
    );
    setfltPro(filteredSearch);
    setIsFound(filteredSearch.length > 0);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <header className="bg-blue-600 p-4 md:p-6 lg:p-8">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <h1 className="text-white text-2xl font-bold md:text-3xl lg:text-4xl w-full md:w-auto">
            Cars Listing
          </h1>
          <div className="w-full md:w-1/2 lg:w-1/3 md:ml-auto mt-4 md:mt-0 flex items-center bg-white rounded-md overflow-hidden">
            <input
              type="text"
              value={searPro}
              onChange={(e) => setSearPro(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 focus:outline-none w-full"
            />
            <button
              className="bg-blue-500 text-white px-8 py-2 hidden md:block"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <button className="md:hidden bg-blue-500 text-white px-4 py-2"
              onClick={handleSearch}
          
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </header>
      <div className="my-4">
        <select
          className="p-2 border rounded"
          onChange={(e) => handleVal(e.target.value)}
        >
          {ctgry.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {isFound ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 justify-center lg:grid-cols-4 gap-5 m-10">
          {fltPro.map((item, index) => (
            <div
              key={index}
              className="rounded-lg p-5 bg-gray-300 text-center shadow-md"
            >
              <img
                src={item.image}
                alt={item.model}
                className="w-full h-auto rounded-md"
              />
              <h1 className="text-xl font-bold mt-3">{item.model}</h1>
              <div className="flex items-center justify-center gap-4 mt-3">
                <p className="font-bold">Rs {item.price}</p>
                <button
                  className="border-black-500 font-bold bg-slate-600 text-white p-2 rounded hover:bg-slate-500"
                  onClick={() => handleViewDetails(item)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-red-500 font-bold">No data found</p>
      )}

      {isModalOpen && (
        <Modal
          modal={isModalOpen}
          setModal={setIsModalOpen}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default Card;
