let products = document.querySelector("#products");
let originalProducts = [];
const logoutbtn = document.getElementById("logout");
const loginbtn = document.getElementById("login");
const accountImg = document.getElementById("myaccount");

document.onreadystatechange = function () {
  const loader = document.querySelector(".loader");
  if (document.readyState !== "complete") {
    loader.style.display = "grid";
  } else {
    loader.style.display = "none";
  }
};

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Automatically change slide every 3 seconds
setInterval(function () {
  plusSlides(1);
}, 3000);

const addToCartPage = document.getElementById("cartimg");
addToCartPage.addEventListener("click", () => {
  window.location.href = "./html/cart.html";
});

function navigateToModule(module) {
  if (module) {
    window.location.href = module;
  }
}

function addNewProduct() {
  // Create a new product container
  var newProductContainer = document.createElement("div");
  newProductContainer.className = "product-item";

  // HTML content for the new product
  var newProductHTML = `
    <div class="container1">
      <img loading="lazy" src="./img/atpay.png" class="product-img" alt="New Product"  style="max-height: 195px";>
      <img loading="lazy" src="./img/ATS-dark-logo.png" class="product-img1" alt="image varala..">

    </div>
    <div class="container2">
      <h2 class="product-ttle">atPayments</h2>
      <div class="price-container">
        <h3 class="product-price">Rs.9999</h3>
        <h6 class="product-price">Rs.16999</h6>
      </div>
    </div>
    <div class="container3">
      <p class="product-description">Request to Pay or RtP is currently in the spotlight of the banking and payments industry. But why is this concept g...</p>
    </div>
    <div class="container4">
      <div class="ratingstar">
        <p>⭐ 4.8   </p>
      </div>
      <div class="reviews">
        <p>6k+ Reviews</p>
      </div>
    </div>
      `;

  // Set the HTML content for the new product container
  newProductContainer.innerHTML = newProductHTML;

  // Append the new product container to the existing products container
  var productsContainer = document.getElementById("products");
  productsContainer.appendChild(newProductContainer);
}

// Call the function to add the new product

async function fetchProducts(url) {
  try {
    let data = await fetch(url);
    let response = await data.json();

    response?.products?.forEach((item, i) => {
      originalProducts.push({ ...response.products[i] });
      products.innerHTML += `
      <div data-productId="${
        response?.products[i]?.id
      }" onclick="productDetails(${
        response?.products[i]?.id
      });" id="product" class="product-item">
      <div class="container1">
      <img loading="lazy" src="${
        response?.products[i]?.images[0]
      }" class="product-img" alt="atbooksProducts">
      </div>
      <div class="container2">
      <h2 class="product-title">${response?.products[i]?.title}</h2>
      <div class="price-container">
      <h3 class="product-price">Rs.${(
        response?.products[i]?.price * 64
      ).toFixed()}</h3>
        <h6 class="product-price">Rs.${(
          (response?.products[i]?.price + 50) *
          64
        ).toFixed(2)}</h6>
          </div>
          </div>
          <div class="container3">
          <p class="product-description">${
            response?.products[i]?.description
          }</p>
          </div>
          <div class="container4">
          <div class="ratingstar">
          <p>
          ${"⭐".repeat(Math.floor(response?.products[i]?.rating))} ${
        " " + response?.products[i]?.rating
      }
          </p>
          </div>
          <div class="reviews">
          <p>${
            (response?.products[i]?.discountPercentage).toFixed(0) + 500
          } + reviews</p>
          </div>
          </div>
          <span class="tooltip" id="customTooltip">Click to view details</span>
          
          `;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

let icon = {
  success: '<span class="material-symbols-outlined"></span>',
};

const showToast = (
  message = "Sample Message",
  toastType = "info",
  duration = 5000
) => {
  if (!Object.keys(icon).includes(toastType)) toastType = "info";

  let box = document.createElement("div");
  box.classList.add("toast", `toast-${toastType}`);
  box.innerHTML = ` <div class="toast-content-wrapper"> 
      <div class="toast-icon"> 
      ${icon[toastType]} 
      </div> 
      <div class="toast-message">${message}</div> 
					<div class="toast-progress"></div> 
					</div>`;
  duration = duration || 5000;
  box.querySelector(".toast-progress").style.animationDuration = `${
    duration / 1000
  }s`;

  let toastAlready = document.body.querySelector(".toast");
  if (toastAlready) {
    toastAlready.remove();
  }

  document.body.appendChild(box);
};

loginbtn.addEventListener("click", (e) => {
  window.location.href = "./html/login.html";
});

(function checklog() {
  const loginStatus = localStorage.getItem("login");

  // Check if the value of login is true
  if (loginStatus === "true") {
    console.log("User is logged in");
    accountImg.style.display = "flex";
    loginbtn.style.display = "none";
    let logoutTimeout;
    accountImg.addEventListener("mouseover", () => {
      clearTimeout(logoutTimeout);
      logoutbtn.style.display = "flex";
    });
    accountImg.addEventListener("mouseout", () => {
      logoutTimeout = setTimeout(() => {
        logoutbtn.style.display = "none";
      }, 2000);
    });
  } else {
    console.log("User is not logged in");
  }
})();

document.querySelector("#product").addEventListener("mousemove", function (e) {
  var tooltip = document.getElementById("customTooltip");
  tooltip.style.left = e.pageX + "px";
  tooltip.style.top = e.pageY + "px";
});

function productDetails(productId) {
  // Construct the query string with the product ID
  const queryString = `?id=${productId}`;

  // Construct the URL for the new page (productDetails.html) with the query string
  const newPageUrl = `./html/productDetails.html${queryString}`;

  // Redirect to the new page in the same window
  window.location.href = newPageUrl;
}

let docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Come Back☺️";
});
window.addEventListener("focus", () => {
  document.title = "atProducts";
});

//-------------------------------->>>>>>>CallBacks

fetchProducts("https://dummyjson.com/products");
addNewProduct();
