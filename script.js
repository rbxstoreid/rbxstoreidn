// ===============================
// RBXSTORE.ID
// ===============================

// Nomor WhatsApp tujuan
const nomorWA = "6282169942899";

// Format harga
function formatHarga(angka) {
    return "Rp " + Number(angka).toLocaleString("en-US");
}

// Buka WhatsApp
function bukaWhatsApp(pesan) {
    const url =
        "https://wa.me/" +
        nomorWA +
        "?text=" +
        encodeURIComponent(pesan);

    window.open(url, "_blank");
}


// ===============================
// ROBUX - ROBLOX
// ===============================

const robux = document.getElementById("robux");
const hargaRobux = document.getElementById("hargaRobux");
const customRobuxBox = document.getElementById("customRobuxBox");
const customRobux = document.getElementById("customRobux");
const waRobux = document.getElementById("waRobux");

robux.addEventListener("change", function () {

    if (robux.value === "custom") {

        customRobuxBox.style.display = "block";
        hargaRobux.textContent = "Harga: Menunggu Konfirmasi";

    } else {

        customRobuxBox.style.display = "none";
        hargaRobux.textContent = formatHarga(robux.value);

    }

});

waRobux.addEventListener("click", function () {

    let pesanan;
    let harga;

    if (robux.value === "custom") {

        if (!customRobux.value || Number(customRobux.value) <= 0) {
            alert("Masukkan jumlah Robux terlebih dahulu.");
            return;
        }

        pesanan = customRobux.value + " Robux";
        harga = "Menunggu Konfirmasi";

    } else {

        pesanan =
            robux.options[robux.selectedIndex].text.split(" - Rp")[0];

        harga = formatHarga(robux.value);

    }

    const pesan =
`Halo RBXSTORE.ID.

Saya ingin memesan:

Produk: Robux - Roblox
Pesanan: ${pesanan}
Harga: ${harga}
Jumlah Item: 1

Mohon diproses pesanannya. Terima kasih.`;

    bukaWhatsApp(pesan);

});


// ===============================
// GROW A GARDEN 2
// ===============================

const garden = document.getElementById("garden");
const hargaGarden = document.getElementById("hargaGarden");
const waGarden = document.getElementById("waGarden");

garden.addEventListener("change", function () {

    hargaGarden.textContent =
        formatHarga(garden.value);

});

waGarden.addEventListener("click", function () {

    const pesanan =
        garden.options[garden.selectedIndex].text.split(" - Rp")[0];

    const harga =
        formatHarga(garden.value);

    const pesan =
`Halo RBXSTORE.ID.

Saya ingin memesan:

Produk: Grow A Garden 2 - Roblox
Pesanan: ${pesanan}
Harga: ${harga}
Jumlah Item: 1

Mohon diproses pesanannya. Terima kasih.`;

    bukaWhatsApp(pesan);

});


// ===============================
// TOILET TOWER DEFENSE
// ===============================

const ttd = document.getElementById("ttd");
const hargaTTD = document.getElementById("hargaTTD");
const waTTD = document.getElementById("waTTD");

ttd.addEventListener("change", function () {

    hargaTTD.textContent =
        formatHarga(ttd.value);

});

waTTD.addEventListener("click", function () {

    const pesanan =
        ttd.options[ttd.selectedIndex].text.split(" - Rp")[0];

    const harga =
        formatHarga(ttd.value);

    const pesan =
`Halo RBXSTORE.ID.

Saya ingin memesan:

Produk: Toilet Tower Defense - Roblox
Pesanan: ${pesanan}
Harga: ${harga}
Jumlah Item: 1

Mohon diproses pesanannya. Terima kasih.`;

    bukaWhatsApp(pesan);

});


// ===============================
// MOBILE LEGENDS
// ===============================

const ml = document.getElementById("ml");
const hargaML = document.getElementById("hargaML");
const customDiamondBox = document.getElementById("customDiamondBox");
const customDiamond = document.getElementById("customDiamond");
const waML = document.getElementById("waML");

ml.addEventListener("change", function () {

    if (ml.value === "custom") {

        customDiamondBox.style.display = "block";
        hargaML.textContent =
            "Harga: Menunggu Konfirmasi";

    } else {

        customDiamondBox.style.display = "none";
        hargaML.textContent =
            formatHarga(ml.value);

    }

});

waML.addEventListener("click", function () {

    let pesanan;
    let harga;

    if (ml.value === "custom") {

        if (!customDiamond.value || Number(customDiamond.value) <= 0) {
            alert("Masukkan jumlah Diamonds terlebih dahulu.");
            return;
        }

        pesanan =
            customDiamond.value + " Diamonds";

        harga =
            "Menunggu Konfirmasi";

    } else {

        pesanan =
            ml.options[ml.selectedIndex].text.split(" - Rp")[0];

        harga =
            formatHarga(ml.value);

    }

    const pesan =
`Halo RBXSTORE.ID.

Saya ingin memesan:

Produk: Mobile Legends
Pesanan: ${pesanan}
Harga: ${harga}
Jumlah Item: 1

Mohon diproses pesanannya. Terima kasih.`;

    bukaWhatsApp(pesan);

});


// ===============================
// CUSTOM PEMBELIAN
// ===============================

const customOrder =
    document.getElementById("customOrder");

customOrder.addEventListener("click", function () {

    const pesan =
`Halo RBXSTORE.ID.

Saya ingin mengajukan custom pembelian untuk produk game yang belum tersedia di website.

Game:
Produk/Item:
Jumlah:

Mohon informasi mengenai ketersediaan dan harganya. Terima kasih.`;

    bukaWhatsApp(pesan);

});