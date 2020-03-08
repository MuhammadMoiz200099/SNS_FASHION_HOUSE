const AddItemToShoppingCart = () => {
  $(".add-item-to-cart").on("click", function() {
    let product_item = $(this)
      .parent()
      .parent()
      .parent()
      .parent();

    let imgSource = product_item.children()[0];
    let detailsSource = product_item.children()[1];

    let id = imgSource.children[0].innerText;
    let image = imgSource.children[1].src;

    let title = detailsSource.children[1].innerText;

    let price = detailsSource.children[2].innerText.split(" ")[1];

    var allitems = JSON.parse(localStorage.getItem("snsShoppingCart")) || [];

    let product_ids = [];
    for (var itemId of allitems) {
      product_ids.push(itemId.id);
    }

    if (product_ids.includes(id)) {
      for (var itemId of allitems) {
        if (itemId.id === id) {
          itemId.quantity++;
        }
      }
      localStorage.setItem("snsShoppingCart", JSON.stringify(allitems));
    } else {
      allitems.push({
        id: id,
        img: image,
        title: title,
        price: price,
        quantity: 1
      });
      localStorage.setItem("snsShoppingCart", JSON.stringify(allitems));
    }

    $("#snackbar")[0].innerHTML = "Product Added Successfully"+`<i class="ti-close" style="font-size: 12px;margin-left:15px" onclick="closeSnackBar()"></i>`;
    snackBar();
  });
};

AddItemToShoppingCart();

const RetriveToShoppingCart = () => {
  let totalCartPrice = "Rs. 00";
  let subtotal = 0;
  let total = 0;

  let allitems = JSON.parse(localStorage.getItem("snsShoppingCart")) || [];

  let cartData = ``;

  for (var itemId of allitems) {
    cartData += `
        <tr>
            <td class="cart-pic first-row">
                <img src="${itemId.img}" alt="" />
            </td>
            <td class="cart-title first-row">
                <h5>${itemId.title}</h5>
            </td>
            <td class="p-price first-row">${itemId.price}</td>
            <td class="qua-col first-row">
                <div class="quantity">
                    <div class="pro-qty">
                        <b style = "display: none;">${itemId.id}</b>
                        <input type="number" value="${
                          itemId.quantity
                        }" style="margin-top: -6px;" class="QuantityUpdate" />
                    </div>
                </div>
            </td>
            <td class="total-price first-row">${itemId.quantity *
              parseInt(itemId.price)}</td>
            <td class="close-td first-row"><i class="ti-close" onclick="DeleteItem(${
              itemId.id
            })"></i></td>
        </tr>
        `;

    subtotal += parseInt(itemId.price);
    total += itemId.quantity * parseInt(itemId.price);
  }

  if (subtotal != 0 || total != 0) {
    $("#cartSTotal").append("Rs. " + subtotal);
    $("#cartPTotal").append("Rs. " + total);
  } else {
    $("#cartSTotal").append(totalCartPrice);
    $("#cartPTotal").append(totalCartPrice);
  }

  $("#CartTableBody").append(cartData);
};

RetriveToShoppingCart();

const UpdateItem = () => {
  $(".QuantityUpdate").on("change", function() {
    var id = $(this)
      .parent()
      .children()[0].innerText;

    var allitems = JSON.parse(localStorage.getItem("snsShoppingCart")) || [];

    let product_ids = [];
    for (var itemId of allitems) {
      product_ids.push(itemId.id);
    }

    if (product_ids.includes(id)) {
      for (var itemId of allitems) {
        if (itemId.id === id) {
          itemId.quantity = $(this)[0].value;
        }
      }
      localStorage.setItem("snsShoppingCart", JSON.stringify(allitems));
    }
  });
};

UpdateItem();

const DeleteItem = id => {
  let allitems = JSON.parse(localStorage.getItem("snsShoppingCart")) || [];

  for (var i = 0; i < allitems.length; i++) {
    if (allitems[i].id == id) {
      allitems.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("snsShoppingCart", JSON.stringify(allitems));

  $("#snackbar")[0].innerHTML = "Product Deleted Successfully"+`<i class="ti-close" style="font-size: 12px;margin-left:15px" onclick="closeSnackBar()"></i>`;

  snackBar();
};

/*-------------------
	snackBar
--------------------- */

const snackBar = () => {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
}

const closeSnackBar = () => {
    var x = document.getElementById("snackbar");
    x.className = "";
}

const updateCart = () => {
    window.location.reload();
}