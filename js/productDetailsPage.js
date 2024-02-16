// document.addEventListener('DOMContentLoaded', function() {
//     // Extract product ID from the URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const productId = urlParams.get('id');
//     console.log(productId);
//     // Check if productId is present
//     if (productId) {
//         // Fetch and display product details for the specific productId
//         const apiUrl = `https://dummyjson.com/products/${productId}`;
//         displayProductDetails(apiUrl);
//     } else {
//         // Handle missing productId
//         console.error("Invalid or missing productId for product details.");
//         // You can redirect or display an error message as needed.
//     }
// });

// async function displayProductDetails(url) {
//     try {
//         let data = await fetch(url);
//         let response = await data.json();
//         console.log(data);

//         // Assuming your product details container has an ID 'product-details-container'
//         const productDetailsContainer = document.getElementById('product-details-container');

//         // Clear previous content in the container
//         productDetailsContainer.innerHTML = "";

//         response?.products?.forEach((item, i) => {
//             // Create HTML content with the product details
//             const detailsHTML = `
//                 <div data-productId="${response?.products[i]?.id}" id="product" class="product-item">
//                     <div class="container1">
//                         <img src="${response?.products[i]?.images[0]}" class="product-img" alt="atbooksProducts">
//                     </div>
//                     <div class="container2">
//                         <h2 class="product-title">${response?.products[i]?.title}</h2>
//                         <div class="price-container">
//                             <h3 class="product-price">Rs.${(response?.products[i]?.price * 64).toFixed()}</h3>
//                             <h6 class="product-price">Rs.${((response?.products[i]?.price + 50) * 64).toFixed(2)}</h6>
//                         </div>
//                     </div>
//                     <div class="container3">
//                         <p class="product-description">${response?.products[i]?.description}</p>
//                     </div>
//                     <div class="container4">
//                         <div class="ratingstar">
//                             <p>${"⭐".repeat(Math.floor(response?.products[i]?.rating))} ${" " + response?.products[i]?.rating}</p>
//                         </div>
//                         <div class="reviews">
//                             <p>${(response?.products[i]?.discountPercentage).toFixed(0) + 500} + reviews</p>
//                         </div>
//                     </div>
//                     <span class="tooltip" id="customTooltip">Click to view details</span>
//                 </div>
//             `;

//             // Append the details HTML to the container
//             productDetailsContainer.innerHTML += detailsHTML;
//         });
//     } catch (error) {
//         console.error("Error fetching products:", error);
//     }
// }

document.addEventListener("DOMContentLoaded", function () {
  // Get product ID from query parameters
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get("id");
  var ID = productId;

  // Check if the productId is present
  if (productId) {
    // Fetch and display product details on the page
    const apiUrl = `https://dummyjson.com/products/${productId}`;
    displayProductDetails(apiUrl);
  } else {
    // Handle missing productId
    console.error("Invalid or missing productId for product details.");
    // You can redirect or display an error message as needed.
  }
});

async function displayProductDetails(url) {
  try {
    let data = await fetch(url);
    let response = await data.json();

    // Assuming your product details container has an ID 'product-details-container'
    const productDetailsContainer = document.getElementById(
      "product-details-container"
    );

    // Clear previous content in the container
    productDetailsContainer.innerHTML = "";

    // Create HTML content with all the product details using optional chaining
    const detailsHTML = `
        <div class="product-details">
        <div class="product-info">
        <h2>${response?.title}</h2>
        <p><strong>Description:</strong> ${response?.description}</p>
        <p><strong>Price:</strong> Rs.${(response?.price * 64)?.toFixed(2)}</p>
        <p><strong>Discount Percentage:</strong> ${response?.discountPercentage?.toFixed(
          2
        )}%</p>
        <p><strong>Rating:</strong> ${"⭐".repeat(
          Math.floor(response?.rating)
        )} ${response?.rating}</p>
        <p><strong>Stock:</strong> ${response?.stock}</p>
        <p><strong>Brand:</strong> ${response?.brand}</p>
        <p><strong>Category:</strong> ${response?.category}</p>
        <a data-productId="${response?.id}" onclick="addToCart(${
      response?.id
    });" class="add-to-cart">add-to-cart</a>
        </div>
        
        <div id="slideshow" class="product-images">
        <img src="${response?.images[0]}" alt="Product Image">
        </div>
        </div>
        `;

    var pid = `${response?.id}`;
    console.log(pid);
    // Set the HTML content to the details container
    productDetailsContainer.innerHTML = detailsHTML;

    // Add automatic slideshow functionality
    startSlideshow();
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

// function addToCart(id) {
//   if (id) {
//     // Get product details from the displayed content
//     const prourl = "https://dummyjson.com/products/" + id;

//     console.log(prourl);

//     // Retrieve existing cart items from localStorage
//     let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

//     // Add the current product to the cart
//     cartItems.push(productDetails);

//     // Save the updated cart back to localStorage
//     localStorage.setItem("cart", JSON.stringify(cartItems));

//     // Provide feedback to the user (optional)
//     alert("Product added to cart!");
//   }
// }

// function addToCart(productId) {
//   // Get the product details based on the productId
//   console.log(productId);
//   const selectedProduct = productId;

//   // Check if the product is found
//   if (selectedProduct) {
//     // Add the product details to the local storage
//     const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
//     cartItems.push(selectedProduct);
//     localStorage.setItem("cart", JSON.stringify(cartItems));

//     // Log the product ID (optional)
//     console.log("Product added to cart:", productId);
//   } else {
//     console.error("Product not found.");
//   }
// }

async function addToCart(productId) {
  // Fetch product details based on the productId
  const response = await fetch(`https://dummyjson.com/products/${productId}`);
  const productData = await response.json();

  // Check if the product is found
  if (productData) {
    // Initialize cart or retrieve existing cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProductIndex = cartItems.findIndex(
      (item) => item.productId === productId
    );

    if (existingProductIndex !== -1) {
      // If the product already exists, increment the quantity
      cartItems[existingProductIndex].quantity++;
    } else {
      // If the product is new, add it to the cart with quantity 1
      const newCartItem = {
        productId: productId,
        quantity: 1,
        title: productData.title,
        price: productData.price,
        description: productData.description,
        image: productData.images[0], // Assuming the first image is the thumbnail
      };
      cartItems.push(newCartItem);
    }

    // Save the updated cart items to local storage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Log the product ID (optional)
    console.log("Product added to cart:", productId);
  } else {
    console.error("Product not found.");
  }
}

function startSlideshow() {
  const slideshowContainer = document.getElementById("slideshow");
  const images = slideshowContainer.getElementsByTagName("img");
  let currentImageIndex = 0;

  setInterval(() => {
    images[currentImageIndex].style.display = "none";
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].style.display = "flex";
  }, 3000);
}

//      =================  Cookies  ==========

function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

function setCookie(cookieName, cookieValue, daysToExpire) {
  var d = new Date();
  d.setTime(d.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

(function checkCookie() {
  var val = getCookie("login");
  if (val == "true") {
    console.log("User logged status : " + val);
  } else {
    val = alert("You're ");
    if (username != null && username != "") {
      setCookie("username", username, 365);
    }
  }
})();

// ============  end cookies   ==================
