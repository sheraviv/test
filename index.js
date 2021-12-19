const DOM = {
    productsPaylod: {
    productNameRef: null,
    price: null,
    image: null,
    form: null,
    category: null,
    productsContainer: null,
    
    },
    tableBodyRef: null,
};

const state = { products: [],  };

function init() {
    DOM.productsPaylod.productNameRef = document.querySelector("#productName");
    DOM.productsPaylod.price = document.querySelector("#price");
    DOM.productsPaylod.image = document.querySelector("#image");
    DOM.productsPaylod.category = document.querySelector("#category");
    DOM.tableBodyRef = document.querySelector("#tableBody");
    _pullAndDrawProductsOnLoad()

    function _pullAndDrawProductsOnLoad() {
        let products = [];
        try {
            const productString = localStorage.getItem("products");
            if (!productString) return;
            products = JSON.parse(productString)
        } catch{}
        state.products = products;
        draw(state.products);
    }


}

function addProduct() {
    const { productNameRef } = DOM.productsPaylod;
    const productName = productNameRef.value;
    const product = {
        id: _getProductId(),
        isSelected: false,
        productName: productName,
        productPrice: DOM.productsPaylod.price.value,
        productImage: DOM.productsPaylod.image.value,
        productCategory: DOM.productsPaylod.category.value,
    };
    state.products.push(product);
    localStorage.setItem("products", JSON.stringify(state.products));
    draw(state.products);
    function _getProductId() {
        const pName = productName || "";
        return `location_${pName}_${Math.ceil(Math.random() * 999)}`;
    }
    setProducts(state.products);
};

function draw(products) {
    DOM.tableBodyRef.innerHTML = "";
    for (let index = 0; index < products.length; index++) {
        const currentProduct = products[index];
        const currentProductRow = getProductRow(currentProduct);
        if (currentProductRow ) DOM.tableBodyRef.append(currentProductRow );

}
}

function getProductById(id, products) {
   
    if (typeof id !== "string") return;
    if (!Array.isArray(products)) return;
    for (let index = 0; index < products.length; index++) {
        const currentProduct = products[index];
        if (currentProduct.id === id) {
            return currentProduct;
        }
        
    }

}

function getProductByIndex(id, products) {
    if (typeof id !== "string") return;
    for (let index = 0; index < products.length; index++) {
        const currentProduct = products[index];
        if (currentProduct.id === id) {
            return index;
        }


}
}

function getProductRow(product) {
    if (typeof product !== "object") return;
    const tr = document.createElement("tr");
    tr.classList.add("clickable", "row-hover");
    if (product.isSelected) {
        tr.classList.add("selected-row");
    }
    tr.id = product.id;
    console.log(tr);


    const tdProductNAme = document.createElement("td");
    tdProductNAme.innerText = product.productName;
    tdProductNAme.onclick = function () {
        const currentProductState = getProductById(product.id, state.products);
        currentProductState.isSelected = !currentProductState.isSelected;
        draw(state.products);
        
    };

    

    const tdPrice = document.createElement("td");
    tdPrice.innerText = product.productPrice;

    const tdImage = _getImageTd(product.productImage);

    const tdCategory = document.createElement("td");
    tdCategory.innerText = product.productCategory;

    const tdAction = document.createElement("td");
    const deletButton = document.createElement("button");
    deletButton.innerText = "Delete";
    deletButton.classList.add("btn", "btn-warning");
    deletButton.onclick = function () {
        const productIndex = getProductByIndex(product.id, state.products);
        if (productIndex === undefined) return;
        state.products.splice(productIndex, 1);
        draw(state.products);
        localStorage.setItem("products", JSON.stringify(state.products));
        setProducts(state.products);
    };

    tdAction.append(deletButton);



    tr.append(tdProductNAme,
        tdPrice,
        tdImage,
        tdCategory,
        tdAction);

        return tr;
    
    function _getImageTd(image) {
        const tdImage = document.createElement("td");
        const picture = document.createElement("img");
        picture.src = image;
        picture.classList.add("imageDefault");

        tdImage.append(picture);
        return tdImage;
    };
        
    
}

function setProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
    draw(state.products);
}




    








init();