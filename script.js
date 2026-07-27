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

// ===============================
// ABOUT US
// ===============================

const openAbout = document.getElementById("openAbout");
const closeAbout = document.getElementById("closeAbout");
const aboutPage = document.getElementById("aboutPage");

openAbout.addEventListener("click", function () {
    aboutPage.classList.add("active");
    document.body.style.overflow = "hidden";
});

closeAbout.addEventListener("click", function () {
    aboutPage.classList.remove("active");
    document.body.style.overflow = "";
});
// ===============================
// REPORT AN ISSUE
// ===============================

const openReport = document.getElementById("openReport");
const closeReport = document.getElementById("closeReport");
const reportPage = document.getElementById("reportPage");

openReport.addEventListener("click", function () {
    reportPage.classList.add("active");
    document.body.style.overflow = "hidden";
});

closeReport.addEventListener("click", function () {
    reportPage.classList.remove("active");
    document.body.style.overflow = "";
});
// ===============================
// SEND REPORT TO EMAIL
// ===============================

const reportForm = document.getElementById("reportForm");

reportForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = reportForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    const formData = new FormData(reportForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: json
        });

        const result = await response.json();

        if (result.success) {
            alert("Report submitted successfully. Thank you!");
            reportForm.reset();
        } else {
            alert("Failed to submit the report. Please try again.");
        }

    } catch (error) {
        alert("Unable to submit the report. Please check your connection.");
    }

    submitButton.textContent = originalText;
    submitButton.disabled = false;
});
// ===============================
// 99 NIGHTS IN THE FOREST
// ===============================

const forest = document.getElementById("forest");
const hargaForest = document.getElementById("hargaForest");
const waForest = document.getElementById("waForest");

forest.addEventListener("change", function () {
    hargaForest.textContent = formatHarga(forest.value);
});

waForest.addEventListener("click", function () {

    const pesanan =
        forest.options[forest.selectedIndex].text.split(" - Rp")[0];

    const harga = formatHarga(forest.value);

    const pesan =
`Halo RBXSTORE.ID.

Saya ingin memesan:

Produk: 99 Nights in the Forest - Roblox
Pesanan: ${pesanan}
Harga: ${harga}
Jumlah Item: 1

Mohon diproses pesanannya. Terima kasih.`;

    bukaWhatsApp(pesan);
});


// ===============================
// FC MOBILE
// ===============================

const fcMobile = document.getElementById("fcMobile");
const hargaFC = document.getElementById("hargaFC");
const waFC = document.getElementById("waFC");

fcMobile.addEventListener("change", function () {
    hargaFC.textContent = formatHarga(fcMobile.value);
});

waFC.addEventListener("click", function () {

    const pesanan =
        fcMobile.options[fcMobile.selectedIndex].text.split(" - Rp")[0];

    const harga = formatHarga(fcMobile.value);

    const pesan =
`Halo RBXSTORE.ID.

Saya ingin memesan:

Produk: FC Mobile
Pesanan: ${pesanan}
Harga: ${harga}
Jumlah Item: 1

Mohon diproses pesanannya. Terima kasih.`;

    bukaWhatsApp(pesan);
});


// ===============================
// FREE FIRE
// ===============================

const freeFire = document.getElementById("freeFire");
const hargaFF = document.getElementById("hargaFF");
const customFFBox = document.getElementById("customFFBox");
const customFF = document.getElementById("customFF");
const waFF = document.getElementById("waFF");

freeFire.addEventListener("change", function () {

    if (freeFire.value === "custom") {

        customFFBox.style.display = "block";
        hargaFF.textContent = "Harga: Menunggu Konfirmasi";

    } else {

        customFFBox.style.display = "none";
        hargaFF.textContent = formatHarga(freeFire.value);

    }
});

waFF.addEventListener("click", function () {

    let pesanan;
    let harga;

    if (freeFire.value === "custom") {

        if (!customFF.value || Number(customFF.value) <= 0) {
            alert("Masukkan jumlah Diamonds terlebih dahulu.");
            return;
        }

        pesanan = customFF.value + " Diamonds";
        harga = "Menunggu Konfirmasi";

    } else {

        pesanan =
            freeFire.options[freeFire.selectedIndex].text.split(" - Rp")[0];

        harga = formatHarga(freeFire.value);
    }

    const pesan =
`Halo RBXSTORE.ID.

Saya ingin memesan:

Produk: Free Fire
Pesanan: ${pesanan}
Harga: ${harga}
Jumlah Item: 1

Mohon diproses pesanannya. Terima kasih.`;

    bukaWhatsApp(pesan);
});
// ===============================
// CUSTOM ORDER PAGE
// ===============================

const customOrderButton = document.getElementById("customOrder");
const customOrderPage = document.getElementById("customOrderPage");
const closeCustomOrder = document.getElementById("closeCustomOrder");

const customOrderForm = document.getElementById("customOrderForm");
const customGame = document.getElementById("customGame");
const otherGameBox = document.getElementById("otherGameBox");
const otherGame = document.getElementById("otherGame");
const customItem = document.getElementById("customItem");


// Buka halaman Custom Pembelian
customOrderButton.addEventListener("click", function () {
    customOrderPage.classList.add("active");
    document.body.style.overflow = "hidden";
});


// Kembali ke toko
closeCustomOrder.addEventListener("click", function () {
    customOrderPage.classList.remove("active");
    document.body.style.overflow = "";
});


// Kalau pilih Other, munculkan input nama game
customGame.addEventListener("change", function () {

    if (customGame.value === "Other") {
        otherGameBox.style.display = "block";
        otherGame.required = true;
    } else {
        otherGameBox.style.display = "none";
        otherGame.required = false;
        otherGame.value = "";
    }

});


// Kirim Custom Pembelian ke WhatsApp
customOrderForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let namaGame = customGame.value;

    if (namaGame === "Other") {

        if (!otherGame.value.trim()) {
            alert("Masukkan nama game terlebih dahulu.");
            return;
        }

        namaGame = otherGame.value.trim();
    }

    if (!customItem.value.trim()) {
        alert("Masukkan nama pesanan terlebih dahulu.");
        return;
    }

    const pesan =
`Halo RBXSTORE.ID.

Saya ingin mengajukan custom pembelian.

Data Pembelian:

Nama Game: ${namaGame}
Nama Pesanan: ${customItem.value.trim()}
Jumlah Item: 1
Harga: Menunggu Konfirmasi

Mohon informasi mengenai ketersediaan dan harganya. Terima kasih.`;

    bukaWhatsApp(pesan);

});
// ===============================
// RBXSTORE.ID INTRO
// ===============================

const storeIntro = document.getElementById("storeIntro");
const introLogo = document.querySelector(".intro-logo");

// Cek apakah intro sudah pernah tampil di tab ini
if (sessionStorage.getItem("rbxIntroShown") === "true") {

    // Kalau sudah pernah tampil, refresh tidak menampilkan intro lagi
    storeIntro.style.display = "none";

} else {

    // Simpan bahwa intro sudah ditampilkan
    sessionStorage.setItem("rbxIntroShown", "true");

    window.addEventListener("load", function () {

        // 0 - 0.5 detik: putih kosong

        // 0.5 detik: RBXSTORE.ID muncul
        setTimeout(function () {
            introLogo.classList.add("show");
        }, 500);

        // 2 detik: tulisan fade-out
        setTimeout(function () {
            introLogo.classList.add("hide");
        }, 2000);

        // 2.5 - 3.5 detik: putih kosong

        // 3.5 detik: background slide ke kiri
        setTimeout(function () {
            storeIntro.classList.add("intro-exit");
        }, 3500);

        // Intro selesai
        setTimeout(function () {
            storeIntro.style.display = "none";
        }, 4400);

    });
}