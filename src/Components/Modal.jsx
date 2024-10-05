/* eslint-disable react/prop-types */
const Modal = ({ setModal, product }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg flex flex-col md:flex-row gap-5 items-center max-w-4xl w-full mx-4 md:mx-auto">
          {product && (
            <div className="flex flex-col md:flex-row items-center gap-3">
              <img
                src={product.image}
                alt={product.model}
                className="w-full md:w-1/2 lg:w-1/3 h-auto rounded-md"
              />
  
              <div className="flex-1">
                <table className="table-auto w-full">
                  <tbody>
                    <tr>
                      <td className="font-bold">Year:</td>
                      <td>{product.year}</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Color:</td>
                      <td>{product.color}</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Mileage:</td>
                      <td>{product.mileage} km</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Price:</td>
                      <td>Rs {product.price}</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Fuel Type:</td>
                      <td>{product.fuelType}</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Transmission:</td>
                      <td>{product.transmission}</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Engine:</td>
                      <td>{product.engine}</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Horsepower:</td>
                      <td>{product.horsepower} HP</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Features:</td>
                      <td>{product.features.join(", ")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
  
          <button
            className="mt-4 md:mt-0 bg-red-500 text-white px-4 py-2 rounded md:self-start"
            onClick={() => setModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default Modal;
  