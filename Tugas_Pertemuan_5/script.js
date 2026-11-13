$(document).ready(function() {
    const products = [
        { id: 1, name: "Kemeja Flanel", price: 125000, stok: 5, icon: "👔" },
        { id: 2, name: "Celana Jeans", price: 180000, stok: 3, icon: "👖" },
        { id: 3, name: "Sepatu Sneakers", price: 350000, stok: 2, icon: "👟" },
        { id: 4, name: "Jaket Hoodie", price: 220000, stok: 4, icon: "🧥" },
        { id: 5, name: "Kaos Polos", price: 50000, stok: 10, icon: "👕" },
        { id: 6, name: "Topi Baseball", price: 45000, stok: 7, icon: "🧢" }
    ];

    let cart = [];

    const productContainer = document.getElementById("product-list");

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        // Membuat elemen ikon/simbol visual produk
        const iconDiv = document.createElement("div");
        iconDiv.className = "product-img";
        iconDiv.appendChild(document.createTextNode(product.icon));

        const title = document.createElement("h3");
        title.appendChild(document.createTextNode(product.name));

        const price = document.createElement("p");
        price.appendChild(document.createTextNode(`Rp ${product.price.toLocaleString()}`));

        const stock = document.createElement("p");
        stock.className = "product-stock";
        stock.appendChild(document.createTextNode(`Stok: ${product.stok}`));

        const btn = document.createElement("button");
        btn.appendChild(document.createTextNode("Tambah ke Keranjang"));
        btn.setAttribute("data-id", product.id);

        card.appendChild(iconDiv);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(stock);
        card.appendChild(btn);

        productContainer.appendChild(card);
    });

    function updateCartUI() {
        const $cartlist = $("#cart-items");
        $cartlist.empty();

        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach((item, index) => {
            totalItems += item.jumlah;
            totalPrice += item.harga * item.jumlah;

            const $li = $("<li>").html(`
                <span>${item.nama} (${item.jumlah}x) - Rp ${(item.harga * item.jumlah).toLocaleString()}</span>
                <button class="remove-btn" data-index="${index}">Hapus</button>
            `);

            $cartlist.append($li);
            $li.fadeIn(400);
        });

        $("#cart-count").text(totalItems);
        $("#cart-total").text(`Rp ${totalPrice.toLocaleString()}`);
    }

    $(document).on("click", ".product-card button", function() {
        const id = $(this).data("id");
        const product = products.find(p => p.id === id);

        if (product.stok > 0) {
            product.stok -= 1;
            $(this).siblings(".product-stock").text(`Stok: ${product.stok}`);

            const existing = cart.find(item => item.id === id);
            if (existing) {
                existing.jumlah += 1;
            } else {
                cart.push({ id: product.id, nama: product.name, harga: product.price, jumlah: 1 });
            }

            updateCartUI();
        } else {
            alert("Stok produk " + product.name + " sudah habis!");
        }
    });

    $(document).on("click", ".remove-btn", function() {
        const index = $(this).data("index");
        const $li = $(this).parent();

        if (confirm("Yakin ingin menghapus item ini dari keranjang?")) {
            const cartItem = cart[index];
            const originalProduct = products.find(p => p.id === cartItem.id);
            
            if (originalProduct) {
                originalProduct.stok += cartItem.jumlah;
                $(`.product-card button[data-id="${cartItem.id}"]`).siblings(".product-stock").text(`Stok: ${originalProduct.stok}`);
            }

            $li.fadeOut(300, function() {
                cart.splice(index, 1);
                updateCartUI();
            });
        }
    });

    $("#empty-cart").on("click", function() {
        if (cart.length === 0) {
            alert("Keranjang Anda sudah kosong.");
            return;
        }

        if (confirm("Yakin ingin mengosongkan keranjang belanja?")) {
            cart.forEach(cartItem => {
                const originalProduct = products.find(p => p.id === cartItem.id);
                if (originalProduct) {
                    originalProduct.stok += cartItem.jumlah;
                    $(`.product-card button[data-id="${cartItem.id}"]`).siblings(".product-stock").text(`Stok: ${originalProduct.stok}`);
                }
            });

            cart = [];
            $("#cart-items").empty();
            updateCartUI();
            $("#summary-box").hide();
        }
    });

    $("#toggle-cart").on("click", function() {
        $(".cart-items, .cart-actions").fadeToggle(300);
    });

    $("#search-input").on("keyup", function() {
        const keyword = $(this).val().toLowerCase();

        $(".product-card").each(function() {
            const productName = $(this).find("h3").text().toLowerCase();
            $(this).toggle(productName.indexOf(keyword) > -1);
        });
    });

    $("#checkout-btn").on("click", function() {
        if (cart.length === 0) {
            alert("Keranjang masih kosong, silakan pilih produk dulu.");
            return;
        }

        const buyerName = prompt("Masukkan nama pembeli:");
        if (buyerName && buyerName.trim() !== "") {
            let summaryListHtml = "";
            let grandTotal = 0;

            cart.forEach(item => {
                let subtotal = item.harga * item.jumlah;
                grandTotal += subtotal;
                summaryListHtml += `<li>${item.nama} (${item.jumlah}x) - Rp ${subtotal.toLocaleString()}</li>`;
            });

            $("#summary-name").text(buyerName);
            $("#summary-list").html(summaryListHtml);
            $("#summary-total").text(grandTotal.toLocaleString());
            $("#summary-box").fadeIn();

            alert("Pesanan atas nama " + buyerName + " berhasil dibuat!");
        }
    });
});