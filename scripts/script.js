/* variable */
let add_t_c = document.querySelector(".add-t-c"),
    pageHeader = document.querySelector(".page-header"),
    main = document.querySelector(".main"),
    modal = document.querySelector(".modal"),
    modal2 = document.querySelector(".modal2"),
    cartProducts = document.querySelector(".cart-products"),
    sCartProducts = document.querySelector(".summary .cart-products"),
    clearCartBtn = document.querySelector(".cart-modal__remove"),
    pCount = document.querySelector(".p-count"),
    p2Count = document.querySelector(".cart-modal__heading span"),
    total_price = document.querySelectorAll(".total-price"),
    pop = document.getElementById("open-popup-btn");

const menuIcon = document.querySelector(".menu_btn");
const navbar = document.querySelector(".header-nav");

/* EventListener */
loadEventListener();

function loadEventListener() {
    pageHeader.addEventListener("click", openModal);
    cartProducts.addEventListener("click", productCount);
    main.addEventListener("click", buyProduct);

    clearCartBtn.addEventListener("click", clearCart);
    document.addEventListener("DOMContentLoaded", getFromLocalStorage);
}
menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("change");
});

pop.addEventListener("click", openTwoModal);

/* function */
function openModal(e) {
    if (e.target.classList.contains("add-t-c")) {
        modal.style.display = "block";
    } else if (e.target.classList.contains("modal")) {
        modal.style.display = "none";
    }
    totalPrice();
}

function count(products) {
    pCount.innerHTML = products.length;
    p2Count.innerHTML = `(${products.length})`;
}

function openTwoModal() {
    modal2.classList.add("active");
    setTimeout(() => {
        clearLocalStorage();
        modal2.style.display = "none";
        totalPrice();
        clearCart();
    }, 3000);
}

function productCount(e) {
    let number = e.target.closest(".quantity").children[1];

    if (e.target.classList.contains("minus-btn")) {
        if (number.value != 1) {
            --number.value;
        }
    } else if (e.target.classList.contains("plus-btn")) {
        ++number.value;
    }

    let products = getProductsFromStorage();
    products.filter((product) => {
        if (
            product.id ===
            number.nextElementSibling.nextElementSibling.getAttribute("data-id")
        ) {
            product.count = parseInt(number.value);
        }
    });
    localStorage.setItem("products", JSON.stringify(products));
    totalPrice();
}

function totalPrice() {
    let products = getProductsFromStorage();
    let totals = products.reduce(
        (total, product) => total + parseInt(product.price * product.count),
        0
    );
    total_price.forEach((e) => {
        e.innerHTML = `$ ${totals.toLocaleString()}`;
    });
    let shipping = document
        .querySelector(".shipping")
        .textContent.replace("$", "")
        .trim();
    let transaction = document
        .querySelector(".transaction")
        .textContent.replace("$", "")
        .trim();
    let total_prices = document.querySelector(".total-prices");
    if (totals === 0) {
        total_prices.innerHTML = `$ 0`;
        document.querySelector(".shipping").innerHTML = `$ 0`;
        document.querySelector(".transaction").innerHTML = `$ 0`;
    } else {
        total_prices.innerHTML = `$ ${(
            parseInt(shipping) +
            parseInt(transaction) +
            parseInt(totals)
        ).toLocaleString()}`;
    }
}

function checkout() {
    let products = getProductsFromStorage();

    products.forEach((product) => {
        let div2 = document.createElement("div");
        div2.classList.add("cart-product");
        div2.classList.add("u-space-between");
        div2.innerHTML += `
                       <div class="product-info">
                            <div class="product-info__img">
                                <img src="${
                                    product.img
                                }" width="36" height="40" alt="" />
                            </div>
                            <div class="u-direction-column">
                                <p class="product-info__title">${
                                    product.title
                                }</p>
                                <span class="product-info__price">$ ${product.price.toLocaleString()}</span>
                            </div>
                        </div>
                        <p class="product-info__title u-opacity-50">x${
                            product.count
                        }</p>
    `;

        sCartProducts.appendChild(div2);
    });
    totalPrice();
}

checkout();

function buyProduct(e) {
    const product = e.target.closest(".card");
    if (e.target.classList.contains("add-t-c")) {
        const productInfo = {
            img: product.querySelector("img").src,
            title: product.querySelector("h2").textContent,
            price: product
                .querySelector(".price")
                .textContent.replace(",", "")
                .replace("$", "")
                .trim(),
            id: product.querySelector("a").getAttribute("data-id"),
            count: 1,
        };

        addIntoCart(productInfo);
    }
}

function addIntoCart(product) {
    let div = document.createElement("div");
    div.classList.add("cart-product");
    div.classList.add("u-space-between");
    div.innerHTML = `
                        <div class="product-info">
                            <div class="product-info__img"> 
                                <img src="${
                                    product.img
                                }" width="36" height="40" alt="" />
                            </div>
                            <div class="u-direction-column">
                                <p class="product-info__title">${
                                    product.title
                                }</p>
                                <span class="product-info__price">$ ${product.price.toLocaleString()}</span>
                            </div>
                        </div>
                        <div class="quantity quantity-product">
                            <button class=" btn-quantity minus-btn disabled" type="button">-</button>
                            <input type="text" class="quantity__input" name="" id="quantity" value="${
                                product.count
                            }" />
                            <button class="btn-quantity plus-btn" type="button">+</button>
                            <a href='#' class='hidden' data-id='${
                                product.id
                            }'></a>
                        </div>
                        `;

    cartProducts.appendChild(div);
    saveIntoStorage(product);
}

function saveIntoStorage(product) {
    let products = getProductsFromStorage();
    products.push(product);

    localStorage.setItem("products", JSON.stringify(products));

    count(products);
}

function getFromLocalStorage() {
    let products = getProductsFromStorage();

    products.forEach((product) => {
        let div = document.createElement("div");
        div.classList.add("cart-product");
        div.classList.add("u-space-between");
        div.innerHTML = `
                        <div class="product-info">
                            <div class="product-info__img">
                     
                                <img src="${
                                    product.img
                                }" width="30" height="40" alt="" />
                            </div>
                            <div class="u-direction-column">
                                <p class="product-info__title">${
                                    product.title
                                }</p>
                                <span class="product-info__price">$ ${product.price.toLocaleString()}</span>
                            </div>
                        </div>
                        <div class="quantity quantity-product">
                            <button class=" btn-quantity minus-btn disabled" type="button">-</button>
                            <input type="text" class="quantity__input" name="" id="quantity" value="${
                                product.count
                            }" />
                            <button class="btn-quantity plus-btn" type="button">+</button>
                            <a href='#' class='hidden' data-id='${
                                product.id
                            }' ></a>
                        </div>
    `;
        cartProducts.appendChild(div);
    });

    count(products);

    totalPrice();
}

function getProductsFromStorage() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function clearCart() {
    while (cartProducts.firstChild) {
        cartProducts.removeChild(cartProducts.firstChild);
    }
    clearLocalStorage();

    while (sCartProducts.firstChild) {
        sCartProducts.removeChild(sCartProducts.firstChild);
    }
}

function clearLocalStorage() {
    localStorage.clear();
    let products = getProductsFromStorage();
    count(products);
}

$(document).ready(function () {
    $(".content .radio_content").hide();
    $(".content .radio_content:first-child").show();

    $(".label-radio").click(function () {
        var current_raido = $(this).attr("data-radio");
        $(".content .radio_content").hide();
        $("." + current_raido).show();
    });

    if ($("input[type=radio]:checked").length > 0) {
        $("input[name='radio']:checked").parent().addClass("selected");
    }
    $("input[type=radio][name=radio]").change(function () {
        $("input[name='radio']").parent().removeClass("selected");
        $("input[name='radio']:checked").parent().addClass("selected");
    });

    $(".read-more-btn").click(function () {
        $(this).prev().toggle();
        if ($(this).text() == "and 2 other item(s)") {
            $(this).text("view less");
        } else {
            $(this).text("and 2 other item(s)");
        }
    });
});
