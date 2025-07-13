// "use client";

// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useRouter } from "next/navigation";

// const Furnizime = () => {
//   const { role } = useAuth();
//   const router = useRouter();

//   const [products, setProducts] = useState<any[]>([]);
//   const [inputQuantities, setInputQuantities] = useState<{ [key: string]: number | "" }>({});
//   const [editCostProduct, setEditCostProduct] = useState<any>(null);
//   const [newCost, setNewCost] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");


// // Modal state
//   const [newProduct, setNewProduct] = useState({ productName: "", cost: "", quantity: "" });
//   const [showAddModal, setShowAddModal] = useState(false);


// //   useEffect(() => {
// //     if (role && role !== "pronar") {
// //       router.replace("/login");
// //     }
// //   }, [role, router]);

//   useEffect(() => {
//     // if (role !== "pronar") return;

//     fetch("http://localhost:8080/api/magazine")
//       .then(res => res.json())
//       .then(data => setProducts(data))
//       .catch(err => console.error("Gabim:", err));
//   }, [role]);

//   const handleQuantityChange = (id: string, value: string) => {
//     if (value === "") {
//     setInputQuantities(prev => ({
//       ...prev,
//       [id]: ""
//     }));
//     return;
//   }

//   const numericValue = parseInt(value, 10);
//   if (!isNaN(numericValue)) {
//     setInputQuantities(prev => ({
//       ...prev,
//       [id]: Math.max(1, numericValue)
//     }));
//   }
// };

// //     let numericValue = parseInt(value, 10);
// //     if (isNaN(numericValue) || numericValue < 1) {
// //       numericValue = 1;
// //     }
// //     setInputQuantities(prev => ({
// //       ...prev,
// //        [id]: isNaN(numericValue) ? "" : numericValue
// //     // [id]: numericValue
// //     }));
// //   };

//   const handleUpdate = async (product: any) => {
//     // const addedQuantity = inputQuantities[product.id];

//     // if (isNaN(addedQuantity) || addedQuantity <= 0) {
//     //   alert("Ju lutem vendosni një sasi pozitive.");
//     //   return;
//     // }

//     const rawInput = inputQuantities[product.id];
//     const addedQuantity = Number(rawInput);

//     if (isNaN(addedQuantity) || addedQuantity < 1) {
//   alert("Ju lutem vendosni një sasi pozitive.");
//   return;
//    }

//     try {
//       const res = await fetch(`http://localhost:8080/api/magazine/${product.id}`);
//       const current = await res.json();
//       const updatedQuantity = current.quantity + addedQuantity;

//       const payload = {
//         ...current,
//         quantity: updatedQuantity,
//         lastRestocked: new Date().toISOString().split("T")[0],
//       };

//       const updateRes = await fetch(`http://localhost:8080/api/magazine/${product.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const updated = await updateRes.json();

//       setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
//       setInputQuantities(prev => ({ ...prev, [product.id]: "" }));
//       alert("U përditësua me sukses");
//     } catch (err) {
//       console.error("Gabim gjatë përditësimit:", err);
//       alert("Gabim gjatë përditësimit");
//     }
//   };

//   const openCostDialog = (product: any) => {
//     setEditCostProduct(product);
//     setNewCost(product.cost.toString());
//   };

//   const handleCostUpdate = async () => {
//     if (!editCostProduct) return;

//     const parsedCost = parseInt(newCost);
//     if (isNaN(parsedCost) || parsedCost <1) {
//       alert("Ju lutem vendosni një çmim të vlefshëm (> 0).");
//       return;
//     }

//     const updated = {
//       ...editCostProduct,
//       cost: parsedCost,
//     };

//     try {
//       await fetch(`http://localhost:8080/api/magazine/${updated.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updated),
//       });

//       setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
//       setEditCostProduct(null);
//       alert("Çmimi u përditësua");
//     } catch (err) {
//       alert("Gabim gjatë përditësimit të çmimit");
//     }
//   };

//     const handleAddProduct = async () => {
//     const { productName, cost, quantity } = newProduct;
//     if (!productName || parseInt(cost) <= 0 || parseInt(quantity) < 0) {
//       alert("Plotësoni të gjitha fushat me vlera të vlefshme.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:8080/api/magazine", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           productName,
//           cost: parseInt(cost),
//           quantity: parseInt(quantity),
//         }),
//       });

//       if (!res.ok) throw new Error("Shtimi dështoi");

//       const added = await res.json();
//       setProducts(prev => [...prev, added]);
//       setShowAddModal(false);
//       setNewProduct({ productName: "", cost: "", quantity: "" });
//       alert("Produkti u shtua me sukses");
//     } catch (err) {
//       alert("Gabim gjatë shtimit të produktit");
//     }
//   };

//   if (!role || role !== "pronar") return null;

//   const filteredProducts = products.filter((p) =>
//     p.productName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen p-8 bg-gradient-to-tr from-gray-100 to-white">
//         <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Furnizime</h1>
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="bg-blue-500 hover:bg-blu-600 text-white px-4 py-2 rounded-full text-xl"
//         >
//           + Shto 
//         </button>
//       </div>

//      <input
//         type="text"
//         placeholder="Kërko produktin..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="mb-6 w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="bg-white shadow-md rounded-lg p-6">
//             <h2 className="text-lg font-semibold">{product.productName}</h2>
//             <p className="text-sm text-gray-500">ID: {product.id}</p>
//             <p className="text-sm text-gray-600">Çmimi: {product.cost} lekë</p>
//             <p className="text-sm text-gray-600">Sasia në stok: {product.quantity}</p>

//             <input
//               type="number"
//               placeholder="Shto sasinë"
//                min={1}
//               value={inputQuantities[product.id] || ""}
//               onChange={(e) => handleQuantityChange(product.id, e.target.value)}
//               className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
//             />

//             <div className="flex justify-between items-center mt-4">
//               <button
//                 onClick={() => handleUpdate(product)}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//               >
//                 Ruaj
//               </button>
//               <button
//                 onClick={() => openCostDialog(product)}
//                 className="text-sm text-blue-600 underline hover:text-blue-800"
//               >
//                 Ndrysho çmimin
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Editing Cost */}
//       {editCostProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
//             <h2 className="text-lg font-bold mb-4">Ndrysho Çmimin</h2>
//             <input
//               type="number"
//               value={newCost}
//               min={1}
//               onChange={(e) => setNewCost(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 mb-4"
//             />
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setEditCostProduct(null)}
//                 className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//               >
//                 Anulo
//               </button>
//               <button
//                 onClick={handleCostUpdate}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//               >
//                 Ruaj
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//      {/* Modal për shtim produkti */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
//             <h2 className="text-lg font-bold mb-4">Shto Produkt të Ri</h2>
//             <input
//               type="text"
//               placeholder="Emri i produktit"
//               value={newProduct.productName}
//               onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
//             />
//             <input
//               type="number"
//               placeholder="Çmimi"
//               value={newProduct.cost}
//               onChange={(e) => setNewProduct({ ...newProduct, cost: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
//             />
//             <input
//               type="number"
//               placeholder="Sasia"
//               value={newProduct.quantity}
//               onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
//             />
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowAddModal(false)}
//                 className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//               >
//                 Anulo
//               </button>
//               <button
//                 onClick={handleAddProduct}
//                 className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//               >
//                 Shto
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Furnizime;







"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Furnizime = () => {
  const { role } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [inputQuantities, setInputQuantities] = useState<{ [key: string]: number | "" }>({});
  const [editCostProduct, setEditCostProduct] = useState<any>(null);
  const [newCost, setNewCost] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [newProduct, setNewProduct] = useState({ productName: "", cost: "", quantity: "" });
  const [showAddModal, setShowAddModal] = useState(false);

  // ✅ Kontroll për autentifikim dhe rol
  useEffect(() => {
    if (!role) {
      router.replace("/login");
    } else if (role !== "pronar") {
      router.replace("/login");
    }
  }, [role, router]);

  useEffect(() => {
    if (role !== "pronar") return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/magazine`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Gabim:", err));
  }, [role]);

  const handleQuantityChange = (id: string, value: string) => {
    if (value === "") {
      setInputQuantities(prev => ({ ...prev, [id]: "" }));
      return;
    }

    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      setInputQuantities(prev => ({ ...prev, [id]: Math.max(1, numericValue) }));
    }
  };

  const handleUpdate = async (product: any) => {
    const rawInput = inputQuantities[product.id];
    const addedQuantity = Number(rawInput);

    if (isNaN(addedQuantity) || addedQuantity < 1) {
      alert("Ju lutem vendosni një sasi pozitive.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/magazine/${product.id}`);
      const current = await res.json();
      const updatedQuantity = current.quantity + addedQuantity;

      const payload = {
        ...current,
        quantity: updatedQuantity,
        lastRestocked: new Date().toISOString().split("T")[0],
      };

      const updateRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/magazine/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const updated = await updateRes.json();
      setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
      setInputQuantities(prev => ({ ...prev, [product.id]: "" }));
      alert("U përditësua me sukses");
    } catch (err) {
      console.error("Gabim gjatë përditësimit:", err);
      alert("Gabim gjatë përditësimit");
    }
  };

  const openCostDialog = (product: any) => {
    setEditCostProduct(product);
    setNewCost(product.cost.toString());
  };

  const handleCostUpdate = async () => {
    if (!editCostProduct) return;

    const parsedCost = parseInt(newCost);
    if (isNaN(parsedCost) || parsedCost < 1) {
      alert("Ju lutem vendosni një çmim të vlefshëm (> 0).");
      return;
    }

    const updated = { ...editCostProduct, cost: parsedCost };

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/magazine/${updated.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
      setEditCostProduct(null);
      alert("Çmimi u përditësua");
    } catch (err) {
      alert("Gabim gjatë përditësimit të çmimit");
    }
  };

  const handleAddProduct = async () => {
    const { productName, cost, quantity } = newProduct;
    if (!productName || parseInt(cost) <= 0 || parseInt(quantity) < 0) {
      alert("Plotësoni të gjitha fushat me vlera të vlefshme.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/magazine`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          cost: parseInt(cost),
          quantity: parseInt(quantity),
        }),
      });

      if (!res.ok) throw new Error("Shtimi dështoi");

      const added = await res.json();
      setProducts(prev => [...prev, added]);
      setShowAddModal(false);
      setNewProduct({ productName: "", cost: "", quantity: "" });
      alert("Produkti u shtua me sukses");
    } catch (err) {
      alert("Gabim gjatë shtimit të produktit");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
     <div className="min-h-screen p-8 bg-gradient-to-tr from-gray-100 to-white">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Furnizime</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 hover:bg-blu-600 text-white px-4 py-2 rounded-full text-xl"
        >
          + Shto 
        </button>
      </div>

     <input
        type="text"
        placeholder="Kërko produktin..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold">{product.productName}</h2>
            <p className="text-sm text-gray-500">ID: {product.id}</p>
            <p className="text-sm text-gray-600">Çmimi: {product.cost} lekë</p>
            <p className="text-sm text-gray-600">Sasia në stok: {product.quantity}</p>

            <input
              type="number"
              placeholder="Shto sasinë"
               min={1}
              value={inputQuantities[product.id] || ""}
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
              className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handleUpdate(product)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Ruaj
              </button>
              <button
                onClick={() => openCostDialog(product)}
                className="text-sm text-blue-600 underline hover:text-blue-800"
              >
                Ndrysho çmimin
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Editing Cost */}
      {editCostProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Ndrysho Çmimin</h2>
            <input
              type="number"
              value={newCost}
              min={1}
              onChange={(e) => setNewCost(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditCostProduct(null)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Anulo
              </button>
              <button
                onClick={handleCostUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Ruaj
              </button>
            </div>
          </div>
        </div>
      )}
     {/* Modal për shtim produkti */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Shto Produkt të Ri</h2>
            <input
              type="text"
              placeholder="Emri i produktit"
              value={newProduct.productName}
              onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
            />
            <input
              type="number"
              placeholder="Çmimi"
              value={newProduct.cost}
              onChange={(e) => setNewProduct({ ...newProduct, cost: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
            />
            <input
              type="number"
              placeholder="Sasia"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Anulo
              </button>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Shto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Furnizime;



