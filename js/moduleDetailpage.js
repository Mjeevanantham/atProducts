// // // document.addEventListener("DOMContentLoaded", function () {
// // //   const productList = document.getElementById("productList");

// // //   // Fetch data from the API
// // //   fetch("http://localhost:8080/allProducts")
// // //     .then((response) => {
// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! Status: ${response.status}`);
// // //       }
// // //       return response.json();
// // //     })
// // //     .then((data) => {
// // //       console.log(response);
// // //       // Loop through each product and display it
// // //       data.forEach((product) => {
// // //         const productDiv = document.createElement("div");
// // //         productDiv.classList.add("product");

// // //         // Display product information
// // //         productDiv.innerHTML = `
// // //             <h2>${product.module}</h2>
// // //             <p>${product.about}</p>
// // //             <p>Price: $${product.price}</p>
// // //             <p>Advantages: ${product.advantages}</p>
// // //           `;

// // //         // Append the product to the product list
// // //         productList.appendChild(productDiv);
// // //       });
// // //     })
// // //     .catch((error) => console.error("Error fetching data:", error));
// // // });


// // document.addEventListener("DOMContentLoaded", function () {
// //   const productList = document.getElementById("productList");

// //   // Fetch data from the API
// //   fetch("http://localhost:8080/allProducts")
// //     .then((response) => {
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! Status: ${response.status}`);
// //       }
// //       return response.json();
// //     })
// //     .then((data) => {
// //       console.log(data); // Log the retrieved data

// //       // Loop through each product and display it
// //       data.forEach((product) => {
// //         const productDiv = document.createElement("div");
// //         productDiv.classList.add("product");

// //         // Display product information
// //         productDiv.innerHTML = `
// //           <h2>${product.module}</h2>
// //           <p>${product.about}</p>
// //           <p>Price: $${product.price}</p>
// //           <p>Advantages: ${JSON.stringify(product.advantages)}</p> <!-- Display advantages as JSON string -->
// //         `;

// //         // Append the product to the product list
// //         productList.appendChild(productDiv);
// //       });
// //     })
// //     .catch((error) => console.error("Error fetching data:", error));
// // });




document.addEventListener("DOMContentLoaded", function () {
    const productListContainer = document.getElementById("productListContainer");
  
    // Fetch data from the API
    fetch("http://localhost:8080/allProducts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the retrieved data
  
        // Organize products by module
        const productsByModule = {};
  
        // Exclude data at the 0th index
        data.slice(1).forEach((product) => {
          const module = product.module;
  
          // Create a product list for each module if not already created
          if (!productsByModule[module]) {
            productsByModule[module] = [];
          }
  
          // Add the product to the respective module's list
          productsByModule[module].push(product);
        });
  
        // Loop through each module and display its products
        Object.entries(productsByModule).forEach(([module, products]) => {
          const moduleDiv = document.createElement("div");
          moduleDiv.classList.add("module");
  
          // Display module name
          moduleDiv.innerHTML = `<h2>${module}</h2>`;
  
          // Create a product list for the module
          const productList = document.createElement("div");
          productList.classList.add("productList");
  
          // Loop through each product and display it
          products.forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
  
            // Display product information
            productDiv.innerHTML = `
              <p>${product.about}</p>
              <p>Price: $${product.price}</p>
              <p>Advantages: ${JSON.stringify(product.advantages)}</p>
            `;
  
            // Append the product to the product list
            productList.appendChild(productDiv);
          });
  
          // Append the product list to the module container
          moduleDiv.appendChild(productList);
  
          // Append the module container to the main container
          productListContainer.appendChild(moduleDiv);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
  

// document.addEventListener("DOMContentLoaded", function () {
//     const productListContainer = document.getElementById("productListContainer");
  
//     // Extract module from the URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const module = urlParams.get('module');
//     console.log(module);
//     // Fetch data from the API
//     fetch("http://localhost:8080/allProducts")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // Filter products based on the module
//         const filteredProducts = data.filter(product => product.id === parseInt(module));
  
//         if (filteredProducts.length > 0) {
//           const moduleDiv = document.createElement("div");
//           moduleDiv.classList.add("module");
  
//           // Display module name
//           moduleDiv.innerHTML = `<h2>Module ${module} Details</h2>`;
  
//           // Create a product list for the module
//           const productList = document.createElement("div");
//           productList.classList.add("productList");
  
//           // Loop through each product and display it
//           filteredProducts.forEach((product) => {
//             const productDiv = document.createElement("div");
//             productDiv.classList.add("product");
  
//             // Display product information
//             productDiv.innerHTML = `
//               <p>${product.about}</p>
//               <p>Price: $${product.price}</p>
//               <p>Advantages: ${JSON.stringify(product.advantages)}</p>
//             `;
  
//             // Append the product to the product list
//             productList.appendChild(productDiv);
//           });
  
//           // Append the product list to the module container
//           moduleDiv.appendChild(productList);
  
//           // Append the module container to the main container
//           productListContainer.appendChild(moduleDiv);
//         } else {
//           // Display a message if no matching products are found
//           productListContainer.innerHTML = `<p>No products found for Module ${module}</p>`;
//         }
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   });
  