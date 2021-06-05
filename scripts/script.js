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

document
    .getElementById("open-popup-btn")
    .addEventListener("click", function() {
        document.getElementsByClassName("modal2")[0].classList.add("active");
    });
$(document).ready(function() {
    $(".content .radio_content").hide();
    $(".content .radio_content:first-child").show();

    $(".label-radio").click(function() {
        var current_raido = $(this).attr("data-radio");
        $(".content .radio_content").hide();
        $("." + current_raido).show();
    });

    if ($("input[type=radio]:checked").length > 0) {
        $("input[name='radio']:checked").parent().addClass("selected");
    }
    $("input[type=radio][name=radio]").change(function() {
        $("input[name='radio']").parent().removeClass("selected");
        $("input[name='radio']:checked").parent().addClass("selected");
    });

    $(".read-more-btn").click(function() {
        $(this).prev().toggle();
        if ($(this).text() == "and 2 other item(s)") {
            $(this).text("view less");
        } else {
            $(this).text("and 2 other item(s)");
        }
    });
});