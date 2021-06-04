let minusBtn = document.querySelector(".minus-btn");
let plusBtn = document.querySelector(".plus-btn");
let qty = document.querySelector(".quantity__input");

plusBtn.addEventListener("click", () => {
    qty.value = parseInt(qty.value) + 1;
});
minusBtn.addEventListener("click", () => {
    if (qty.value <= 0) {
        qty.value = 0;
    } else {
        qty.value = parseInt(qty.value) - 1;
    }
});

const addToCart = document.querySelector(".add-t-c");

const modal = document.querySelector(".modal");

addToCart.addEventListener("click", () => {
    modal.classList.toggle("change");
});
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// };
$(document).ready(function() {
    $(".content .radio_content").hide();
    $(".content .radio_content:first-child").show();

    $(".label-radio").click(function() {
        var current_raido = $(this).attr("data-radio");
        $(".content .radio_content").hide();
        $("." + current_raido).show();
    });

    if ($('input[name="radio"]:checked').length > 0) {
        $("this").parent().children("label").css({ color: "red" });
    }
});