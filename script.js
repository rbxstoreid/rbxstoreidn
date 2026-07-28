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
// ===============================
// WHATSAPP + ORDER CONFIRMATION
// ===============================

let pendingWhatsAppURL = "";

function bukaWhatsApp(pesan) {

    pendingWhatsAppURL =
        "https://wa.me/" +
        nomorWA +
        "?text=" +
        encodeURIComponent(pesan);


    // Ambil data dari pesan WhatsApp
    const productMatch = pesan.match(/Produk:\s*(.+)/);
    const orderMatch = pesan.match(/Pesanan:\s*(.+)/);
    const priceMatch = pesan.match(/Harga:\s*(.+)/);

    const game = productMatch
        ? productMatch[1].trim()
        : "Custom Order";

    const product = orderMatch
        ? orderMatch[1].trim()
        : "Custom Order";

    const price = priceMatch
        ? priceMatch[1].trim()
        : "Menunggu Konfirmasi";


    // Masukkan ke popup
    document.getElementById("confirmGame").textContent = game;
    document.getElementById("confirmProduct").textContent = product;
    document.getElementById("confirmPrice").textContent = price;


    // Tampilkan popup
    document
        .getElementById("orderConfirm")
        .classList.add("active");

    document.body.style.overflow = "hidden";
}


// CANCEL
document
    .getElementById("cancelOrder")
    .addEventListener("click", function () {

        document
            .getElementById("orderConfirm")
            .classList.remove("active");

        document.body.style.overflow = "";

        pendingWhatsAppURL = "";
    });


// CONTINUE TO WHATSAPP
document
    .getElementById("continueOrder")
    .addEventListener("click", function () {

        if (!pendingWhatsAppURL) return;

        window.open(pendingWhatsAppURL, "_blank");

        document
            .getElementById("orderConfirm")
            .classList.remove("active");

        document.body.style.overflow = "";

        pendingWhatsAppURL = "";
    });

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
// ===============================
// PRODUCT SCROLL ANIMATION
// ===============================

const gameCards = document.querySelectorAll(".game-card");

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("card-visible");
        } else {
            entry.target.classList.remove("card-visible");
        }

    });
}, {
    threshold: 0.15
});

gameCards.forEach((card) => {
    cardObserver.observe(card);
});
// ===============================
// FAQ ACCORDION
// ===============================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {

        // Tutup FAQ lain yang sedang terbuka
        faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }
        });

        // Buka / tutup FAQ yang ditekan
        item.classList.toggle("active");
    });
});
// ===============================
// SHARE STORE
// ===============================

const shareStore = document.getElementById("shareStore");

shareStore.addEventListener("click", async function () {

    const shareData = {
        title: "RBXSTORE.ID",
        text: "Check out RBXSTORE.ID - Premium Game Store Indonesia!",
        url: "https://rbxstoreid.github.io/rbxstoreidn/"
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            // User membatalkan share
        }
    } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Store link copied!");
    }

});
// ===============================
// LANGUAGE SYSTEM
// ===============================

const languageSelect = document.getElementById("languageSelect");

const translations = {
    id: {
        subtitle: "Premium Game Store Indonesia",
        about: "Tentang Kami",
        report: "Laporkan Masalah",
        share: "Bagikan Toko",

        selectNominal: "Pilih Nominal",
        selectProduct: "Pilih Produk",
        selectDiamond: "Pilih Diamond",
        selectDiamonds: "Pilih Diamonds",
        selectFC: "Pilih FC Points",

        buyWA: "Beli Sekarang via WhatsApp",

        customTitle: "Custom Pembelian",
        customDesc1: "Tidak menemukan produk yang kamu cari? Kamu dapat mengajukan pembelian item atau kebutuhan game online lainnya melalui RBXSTORE.ID.",
        customDesc2: "Hubungi kami untuk mengecek ketersediaan produk dan harga.",
        customButton: "Custom Pembelian"
    },

    en: {
        subtitle: "Premium Game Store Indonesia",
        about: "About Us",
        report: "Report an Issue",
        share: "Share Store",

        selectNominal: "Select Amount",
        selectProduct: "Select Product",
        selectDiamond: "Select Diamond",
        selectDiamonds: "Select Diamonds",
        selectFC: "Select FC Points",

        buyWA: "Buy Now via WhatsApp",

        customTitle: "Custom Order",
        customDesc1: "Can't find the product you're looking for? You can request other game items or online gaming products through RBXSTORE.ID.",
        customDesc2: "Contact us to check product availability and pricing.",
        customButton: "Custom Order"
    },

    fil: {
        subtitle: "Premium Game Store Indonesia",
        about: "Tungkol sa Amin",
        report: "Mag-report ng Problema",
        share: "Ibahagi ang Store",

        selectNominal: "Pumili ng Halaga",
        selectProduct: "Pumili ng Produkto",
        selectDiamond: "Pumili ng Diamond",
        selectDiamonds: "Pumili ng Diamonds",
        selectFC: "Pumili ng FC Points",

        buyWA: "Bumili sa WhatsApp",

        customTitle: "Custom Order",
        customDesc1: "Hindi makita ang produktong hinahanap mo? Maaari kang humiling ng iba pang game items sa RBXSTORE.ID.",
        customDesc2: "Makipag-ugnayan sa amin upang malaman ang availability at presyo.",
        customButton: "Custom Order"
    },

    zh: {
        subtitle: "印度尼西亚优质游戏商店",
        about: "关于我们",
        report: "报告问题",
        share: "分享商店",

        selectNominal: "选择数量",
        selectProduct: "选择商品",
        selectDiamond: "选择钻石",
        selectDiamonds: "选择钻石",
        selectFC: "选择 FC Points",

        buyWA: "通过 WhatsApp 购买",

        customTitle: "自定义购买",
        customDesc1: "找不到您想要的商品？您可以通过 RBXSTORE.ID 咨询其他游戏商品。",
        customDesc2: "联系我们以确认商品库存和价格。",
        customButton: "自定义购买"
    },

    es: {
        subtitle: "Tienda Premium de Videojuegos de Indonesia",
        about: "Sobre Nosotros",
        report: "Reportar un Problema",
        share: "Compartir Tienda",

        selectNominal: "Seleccionar Cantidad",
        selectProduct: "Seleccionar Producto",
        selectDiamond: "Seleccionar Diamante",
        selectDiamonds: "Seleccionar Diamantes",
        selectFC: "Seleccionar FC Points",

        buyWA: "Comprar por WhatsApp",

        customTitle: "Pedido Personalizado",
        customDesc1: "¿No encuentras el producto que buscas? Puedes solicitar otros artículos de juegos a través de RBXSTORE.ID.",
        customDesc2: "Contáctanos para consultar disponibilidad y precio.",
        customButton: "Pedido Personalizado"
    }
};


function changeLanguage(language) {

    const t = translations[language];

    if (!t) return;

    // Ubah atribut bahasa HTML
    document.documentElement.lang = language;

    // Header
    document.querySelector("header p").textContent = t.subtitle;

    // Top menu
    document.getElementById("openAbout").textContent = t.about;
    document.getElementById("openReport").textContent = t.report;
    document.getElementById("shareStore").textContent = t.share;


    // ===============================
    // PRODUCT LABELS
    // ===============================

    const cards = document.querySelectorAll(".game-card");

    // Robux
    cards[0].querySelector("label").textContent = t.selectNominal;

    // Grow A Garden
    cards[1].querySelector("label").textContent = t.selectProduct;

    // Toilet Tower Defense
    cards[2].querySelector("label").textContent = t.selectProduct;

    // Mobile Legends
    cards[3].querySelector("label").textContent = t.selectDiamond;

    // 99 Nights
    cards[4].querySelector("label").textContent = t.selectDiamonds;

    // FC Mobile
    cards[5].querySelector("label").textContent = t.selectFC;

    // Free Fire
    cards[6].querySelector("label").textContent = t.selectDiamonds;


    // ===============================
    // WHATSAPP BUTTONS
    // ===============================

    document.getElementById("waRobux").textContent = t.buyWA;
    document.getElementById("waGarden").textContent = t.buyWA;
    document.getElementById("waTTD").textContent = t.buyWA;
    document.getElementById("waML").textContent = t.buyWA;
    document.getElementById("waForest").textContent = t.buyWA;
    document.getElementById("waFC").textContent = t.buyWA;
    document.getElementById("waFF").textContent = t.buyWA;


    // ===============================
    // CUSTOM ORDER CARD
    // ===============================

    const customCard = document.querySelector(".custom-order-card");

    customCard.querySelector("h2").textContent =
        t.customTitle;

    const customParagraphs =
        customCard.querySelectorAll("p");

    customParagraphs[0].textContent =
        t.customDesc1;

    customParagraphs[1].textContent =
        t.customDesc2;

    document.getElementById("customOrder").textContent =
        t.customButton;

// ===============================
// HOW TO ORDER + FAQ TRANSLATION
// ===============================

const extraTranslations = {

    id: {
        howTitle: "Cara Pemesanan",
        howSubtitle: "Pemesanan Mudah & Sederhana",

        steps: [
            ["Pilih Produk", "Pilih game, item, atau nominal yang ingin kamu beli."],
            ["Pesan via WhatsApp", "Tekan tombol WhatsApp dan detail pesanan akan dibuat secara otomatis."],
            ["Selesaikan Pembayaran", "Ikuti petunjuk pembayaran yang diberikan oleh RBXSTORE.ID."],
            ["Pesanan Diproses", "Setelah pembayaran dikonfirmasi, pesanan kamu akan diproses."]
        ],

        faqTitle: "Pertanyaan yang Sering Diajukan",

        faq: [
            ["Berapa lama pesanan diproses?", "Waktu proses tergantung pada produk dan ketersediaan saat ini."],
            ["Bagaimana cara memesan?", "Pilih produk dan nominal, lalu tekan tombol Beli via WhatsApp."],
            ["Metode pembayaran apa yang tersedia?", "Metode pembayaran yang tersedia akan diberikan melalui WhatsApp saat melakukan pemesanan."],
            ["Bagaimana jika produk yang saya cari tidak tersedia di menu?", "Gunakan Custom Pembelian, pilih game, lalu masukkan produk atau item yang kamu cari."],
            ["Apa yang harus dilakukan jika ada masalah dengan pesanan?", "Gunakan Report an Issue atau hubungi RBXSTORE.ID melalui WhatsApp."],
            ["Apakah harga dapat berubah?", "Ya. Harga dapat berubah tergantung ketersediaan produk dan kondisi pasar."]
        ]
    },

    en: {
        howTitle: "HOW TO ORDER",
        howSubtitle: "Simple & Easy Ordering",

        steps: [
            ["Choose Your Product", "Select the game, item, or amount you want to purchase."],
            ["Order via WhatsApp", "Tap the WhatsApp button and your order details will be prepared automatically."],
            ["Complete Payment", "Follow the payment instructions provided by RBXSTORE.ID."],
            ["Order Processed", "After payment is confirmed, your order will be processed."]
        ],

        faqTitle: "Frequently Asked Questions",

        faq: [
            ["How long does an order take?", "Processing time depends on the product and current availability."],
            ["How do I place an order?", "Choose a product, select the amount, then tap the Buy via WhatsApp button."],
            ["What payment methods are available?", "Available payment methods will be provided through WhatsApp when you place an order."],
            ["What if the product I want isn't listed?", "Use Custom Order, select your game, and enter the product or item you are looking for."],
            ["What should I do if I have an issue with my order?", "Use Report an Issue or contact RBXSTORE.ID through WhatsApp."],
            ["Can prices change?", "Yes. Prices may change depending on product availability and market conditions."]
        ]
    },

    fil: {
        howTitle: "PAANO UMORDER",
        howSubtitle: "Simple at Madaling Pag-order",

        steps: [
            ["Pumili ng Produkto", "Piliin ang game, item, o halaga na gusto mong bilhin."],
            ["Umorder sa WhatsApp", "Pindutin ang WhatsApp button at awtomatikong ihahanda ang detalye ng order."],
            ["Kumpletuhin ang Bayad", "Sundin ang payment instructions mula sa RBXSTORE.ID."],
            ["Ipoproseso ang Order", "Kapag nakumpirma na ang bayad, ipoproseso ang iyong order."]
        ],

        faqTitle: "Mga Madalas Itanong",

        faq: [
            ["Gaano katagal ang pagproseso ng order?", "Depende ito sa produkto at kasalukuyang availability."],
            ["Paano ako oorder?", "Pumili ng produkto at halaga, pagkatapos pindutin ang WhatsApp button."],
            ["Anong payment methods ang available?", "Ibibigay sa WhatsApp ang available na payment methods kapag umorder ka."],
            ["Paano kung wala sa listahan ang gusto kong produkto?", "Gamitin ang Custom Order at ilagay ang game at item na hinahanap mo."],
            ["Ano ang gagawin kung may problema sa order?", "Gamitin ang Report an Issue o kontakin ang RBXSTORE.ID sa WhatsApp."],
            ["Puwede bang magbago ang presyo?", "Oo. Maaaring magbago ang presyo depende sa availability at market conditions."]
        ]
    },

    zh: {
        howTitle: "购买流程",
        howSubtitle: "简单快捷的购买方式",

        steps: [
            ["选择商品", "选择您想购买的游戏、商品或数量。"],
            ["通过 WhatsApp 下单", "点击 WhatsApp 按钮，系统会自动准备订单信息。"],
            ["完成付款", "按照 RBXSTORE.ID 提供的付款说明完成付款。"],
            ["处理订单", "付款确认后，我们将处理您的订单。"]
        ],

        faqTitle: "常见问题",

        faq: [
            ["订单需要多长时间处理？", "处理时间取决于商品和当前库存情况。"],
            ["如何下单？", "选择商品和数量，然后点击 WhatsApp 购买按钮。"],
            ["有哪些付款方式？", "下单后，我们会通过 WhatsApp 告知可用的付款方式。"],
            ["如果没有我想要的商品怎么办？", "使用自定义购买功能，选择游戏并输入您想要的商品。"],
            ["订单出现问题怎么办？", "使用问题报告功能或通过 WhatsApp 联系 RBXSTORE.ID。"],
            ["价格会变化吗？", "会。价格可能根据商品库存和市场情况发生变化。"]
        ]
    },

    es: {
        howTitle: "CÓMO COMPRAR",
        howSubtitle: "Compra Simple y Fácil",

        steps: [
            ["Elige tu Producto", "Selecciona el juego, artículo o cantidad que deseas comprar."],
            ["Compra por WhatsApp", "Pulsa el botón de WhatsApp y los detalles del pedido se prepararán automáticamente."],
            ["Completa el Pago", "Sigue las instrucciones de pago proporcionadas por RBXSTORE.ID."],
            ["Pedido Procesado", "Después de confirmar el pago, tu pedido será procesado."]
        ],

        faqTitle: "Preguntas Frecuentes",

        faq: [
            ["¿Cuánto tarda un pedido?", "El tiempo de procesamiento depende del producto y de su disponibilidad."],
            ["¿Cómo hago un pedido?", "Elige un producto y una cantidad, luego pulsa el botón de WhatsApp."],
            ["¿Qué métodos de pago están disponibles?", "Los métodos de pago disponibles se proporcionarán por WhatsApp al realizar el pedido."],
            ["¿Qué pasa si el producto que quiero no aparece?", "Utiliza Pedido Personalizado, selecciona el juego e introduce el artículo que buscas."],
            ["¿Qué hago si tengo un problema con mi pedido?", "Utiliza Reportar un Problema o contacta con RBXSTORE.ID por WhatsApp."],
            ["¿Los precios pueden cambiar?", "Sí. Los precios pueden cambiar según la disponibilidad y las condiciones del mercado."]
        ]
    }
};

const extra = extraTranslations[language];

// HOW TO ORDER
document.querySelector(".how-label").textContent = extra.howTitle;
document.querySelector(".how-to-order > h2").textContent = extra.howSubtitle;

const orderSteps = document.querySelectorAll(".order-step");

orderSteps.forEach((step, index) => {
    step.querySelector("h3").textContent = extra.steps[index][0];
    step.querySelector("p").textContent = extra.steps[index][1];
});

// FAQ
document.querySelector(".faq-section > h2").textContent = extra.faqTitle;

const faqItemsLanguage = document.querySelectorAll(".faq-item");

faqItemsLanguage.forEach((item, index) => {

    const question = item.querySelector(".faq-question");
    const plus = question.querySelector("span");

    question.childNodes[0].textContent =
        extra.faq[index][0] + " ";

    plus.textContent = "+";

    item.querySelector(".faq-answer p").textContent =
        extra.faq[index][1];
});
// ===============================
// ABOUT + REPORT + CUSTOM PAGE
// ===============================

const pageTranslations = {

    id: {
        back: "← Kembali ke Toko",

        storyLabel: "CERITA KAMI",
        storyTitle: "Kisah di Balik RBXSTORE.ID",
        story: [
            "RBXSTORE.ID dimulai pada 30 Juli 2025 dari sebuah ide sederhana yang muncul saat pendirinya sedang berada di sekolah. Ide kecil untuk menjual produk game online kemudian berkembang menjadi sesuatu yang lebih serius.",
            "Pada awalnya, RBXSTORE.ID belum memiliki website atau toko digital. Menu produk pertama dibuat menggunakan kertas ketika toko masih dalam tahap pengembangan.",
            "Seiring berkembangnya ide tersebut, seorang teman bernama Jesslyn membantu membuat menu produk yang lebih baik menggunakan Canva.",
            "Seiring waktu, RBXSTORE.ID terus mengembangkan katalog, menghadirkan promosi dan diskon, serta menambah pilihan produk game untuk pelanggan.",
            "Pada Juli 2026, RBXSTORE.ID mencapai tahap baru ketika pendirinya mulai mengembangkan website sendiri. Proyek ini berkembang dari menu berbasis kertas menjadi toko digital yang dibuat menggunakan HTML, CSS, JavaScript, GitHub, dan GitHub Pages.",
            "Saat ini, RBXSTORE.ID terus beroperasi dan berkembang dengan tujuan memberikan cara yang sederhana dan nyaman bagi pelanggan untuk membeli produk game digital."
        ],
        established: "Didirikan 30 Juli 2025.",

        support: "DUKUNGAN PELANGGAN",
        reportTitle: "Laporkan Masalah",
        reportDesc: "Mengalami masalah dengan RBXSTORE.ID? Kirim laporan di bawah ini dan berikan informasi yang cukup agar kami dapat memahami masalah kamu.",
        name: "Nama",
        namePlaceholder: "Nama kamu",
        category: "Kategori Masalah",
        describe: "Jelaskan Masalah",
        messagePlaceholder: "Jelaskan masalah yang kamu alami...",
        submit: "Kirim Laporan",
        reportNote: "Laporan dikirim secara pribadi ke RBXSTORE.ID dan tidak memengaruhi rating publik toko.",

        customLabel: "PESANAN KHUSUS",
        customTitlePage: "Custom Pembelian",
        customIntro: "Pilih game dan masukkan produk atau item yang ingin dibeli. Ketersediaan dan harga akan dikonfirmasi melalui WhatsApp.",
        chooseGame: "Pilih Game",
        gamePlaceholder: "Pilih game",
        gameName: "Nama Game",
        gameNamePlaceholder: "Masukkan nama game",
        orderName: "Nama Pesanan",
        orderPlaceholder: "Masukkan nama produk atau item",
        continueWA: "Lanjutkan via WhatsApp"
    },

    en: {
        back: "← Back to Store",

        storyLabel: "OUR STORY",
        storyTitle: "The Story Behind RBXSTORE.ID",
        story: [
            "RBXSTORE.ID began on July 30, 2025, from a simple idea that came to its founder during a school day. What started as a small idea about selling online gaming products soon developed into something more serious.",
            "In its earliest days, RBXSTORE.ID did not have a website or digital storefront. The first product menu was organised using paper while the store was still being developed.",
            "As the idea continued to grow, a friend named Jesslyn helped create an improved product menu using Canva.",
            "Over time, RBXSTORE.ID continued to improve its catalogue, introduce promotions and discounts, and expand its selection of gaming products.",
            "In July 2026, RBXSTORE.ID reached another milestone when its founder began developing an independent website using HTML, CSS, JavaScript, GitHub and GitHub Pages.",
            "Today, RBXSTORE.ID continues to operate and develop with the goal of providing a simple and convenient way to purchase digital gaming products."
        ],
        established: "Established July 30, 2025.",

        support: "CUSTOMER SUPPORT",
        reportTitle: "Report an Issue",
        reportDesc: "Experiencing an issue with RBXSTORE.ID? Submit a report below and provide enough information so we can understand your concern.",
        name: "Name",
        namePlaceholder: "Your name",
        category: "Issue Category",
        describe: "Describe the Issue",
        messagePlaceholder: "Please describe the issue...",
        submit: "Submit Report",
        reportNote: "Reports are sent privately to RBXSTORE.ID and do not affect any public store rating.",

        customLabel: "CUSTOM ORDER",
        customTitlePage: "Custom Order",
        customIntro: "Select a game and enter the product or item you want to purchase. Availability and pricing will be confirmed through WhatsApp.",
        chooseGame: "Select Game",
        gamePlaceholder: "Select a game",
        gameName: "Game Name",
        gameNamePlaceholder: "Enter game name",
        orderName: "Order Name",
        orderPlaceholder: "Enter product or item name",
        continueWA: "Continue via WhatsApp"
    },

    fil: {
        back: "← Bumalik sa Store",

        storyLabel: "ANG AMING KWENTO",
        storyTitle: "Ang Kwento ng RBXSTORE.ID",
        story: [
            "Nagsimula ang RBXSTORE.ID noong Hulyo 30, 2025 mula sa isang simpleng ideya ng founder nito habang nasa paaralan.",
            "Noong una, walang website o digital storefront ang RBXSTORE.ID. Ang unang product menu ay ginawa gamit ang papel.",
            "Habang lumalago ang ideya, tumulong ang isang kaibigang nagngangalang Jesslyn sa paggawa ng mas maayos na product menu gamit ang Canva.",
            "Sa paglipas ng panahon, pinalawak ng RBXSTORE.ID ang catalogue nito at nagdagdag ng mga promotion, discount, at gaming products.",
            "Noong Hulyo 2026, nagsimulang gumawa ang founder ng sariling website gamit ang HTML, CSS, JavaScript, GitHub at GitHub Pages.",
            "Patuloy na umuunlad ang RBXSTORE.ID upang magbigay ng simple at convenient na paraan ng pagbili ng digital gaming products."
        ],
        established: "Itinatag noong Hulyo 30, 2025.",

        support: "CUSTOMER SUPPORT",
        reportTitle: "Mag-report ng Problema",
        reportDesc: "May problema sa RBXSTORE.ID? Magpadala ng report sa ibaba at ibigay ang kinakailangang impormasyon.",
        name: "Pangalan",
        namePlaceholder: "Iyong pangalan",
        category: "Kategorya ng Problema",
        describe: "Ilarawan ang Problema",
        messagePlaceholder: "Ilarawan ang problema...",
        submit: "Ipadala ang Report",
        reportNote: "Pribadong ipinapadala ang mga report sa RBXSTORE.ID at hindi nito naaapektuhan ang public store rating.",

        customLabel: "CUSTOM ORDER",
        customTitlePage: "Custom Order",
        customIntro: "Pumili ng game at ilagay ang produkto o item na gusto mong bilhin. Ang availability at presyo ay kukumpirmahin sa WhatsApp.",
        chooseGame: "Pumili ng Game",
        gamePlaceholder: "Pumili ng game",
        gameName: "Pangalan ng Game",
        gameNamePlaceholder: "Ilagay ang pangalan ng game",
        orderName: "Pangalan ng Order",
        orderPlaceholder: "Ilagay ang produkto o item",
        continueWA: "Magpatuloy sa WhatsApp"
    },

    zh: {
        back: "← 返回商店",

        storyLabel: "我们的故事",
        storyTitle: "RBXSTORE.ID 背后的故事",
        story: [
            "RBXSTORE.ID 于 2025 年 7 月 30 日创立，最初的想法来自创始人在学校期间产生的一个简单构想。",
            "在最初阶段，RBXSTORE.ID 还没有网站或数字商店，第一个商品菜单是使用纸张制作的。",
            "随着这个想法不断发展，一位名叫 Jesslyn 的朋友使用 Canva 帮助制作了更加完善的商品菜单。",
            "随着时间推移，RBXSTORE.ID 不断完善商品目录，并推出促销、折扣以及更多游戏商品。",
            "2026 年 7 月，创始人开始使用 HTML、CSS、JavaScript、GitHub 和 GitHub Pages 开发独立网站。",
            "如今，RBXSTORE.ID 继续运营和发展，致力于为顾客提供简单便捷的数字游戏商品购买方式。"
        ],
        established: "成立于 2025 年 7 月 30 日。",

        support: "客户支持",
        reportTitle: "报告问题",
        reportDesc: "如果您在使用 RBXSTORE.ID 时遇到问题，请提交以下报告并提供相关信息。",
        name: "姓名",
        namePlaceholder: "您的姓名",
        category: "问题类别",
        describe: "描述问题",
        messagePlaceholder: "请描述您遇到的问题...",
        submit: "提交报告",
        reportNote: "报告将私下发送给 RBXSTORE.ID，不会影响商店的公开评分。",

        customLabel: "自定义订单",
        customTitlePage: "自定义购买",
        customIntro: "选择游戏并输入您想购买的商品。库存和价格将通过 WhatsApp 确认。",
        chooseGame: "选择游戏",
        gamePlaceholder: "选择游戏",
        gameName: "游戏名称",
        gameNamePlaceholder: "输入游戏名称",
        orderName: "商品名称",
        orderPlaceholder: "输入商品或物品名称",
        continueWA: "通过 WhatsApp 继续"
    },

    es: {
        back: "← Volver a la Tienda",

        storyLabel: "NUESTRA HISTORIA",
        storyTitle: "La Historia de RBXSTORE.ID",
        story: [
            "RBXSTORE.ID comenzó el 30 de julio de 2025 a partir de una idea sencilla que tuvo su fundador durante un día de escuela.",
            "Al principio, RBXSTORE.ID no tenía sitio web ni tienda digital. El primer menú de productos fue creado utilizando papel.",
            "A medida que la idea creció, una amiga llamada Jesslyn ayudó a crear un menú de productos mejorado utilizando Canva.",
            "Con el tiempo, RBXSTORE.ID amplió su catálogo e introdujo promociones, descuentos y más productos de videojuegos.",
            "En julio de 2026, el fundador comenzó a desarrollar un sitio web independiente utilizando HTML, CSS, JavaScript, GitHub y GitHub Pages.",
            "Actualmente, RBXSTORE.ID continúa operando y desarrollándose para ofrecer una forma sencilla y cómoda de comprar productos digitales de videojuegos."
        ],
        established: "Fundada el 30 de julio de 2025.",

        support: "ATENCIÓN AL CLIENTE",
        reportTitle: "Reportar un Problema",
        reportDesc: "¿Tienes algún problema con RBXSTORE.ID? Envía un reporte y proporciona información suficiente para que podamos entender el problema.",
        name: "Nombre",
        namePlaceholder: "Tu nombre",
        category: "Categoría del Problema",
        describe: "Describe el Problema",
        messagePlaceholder: "Describe el problema...",
        submit: "Enviar Reporte",
        reportNote: "Los reportes se envían de forma privada a RBXSTORE.ID y no afectan ninguna valoración pública de la tienda.",

        customLabel: "PEDIDO PERSONALIZADO",
        customTitlePage: "Pedido Personalizado",
        customIntro: "Selecciona un juego e introduce el producto que deseas comprar. La disponibilidad y el precio se confirmarán por WhatsApp.",
        chooseGame: "Seleccionar Juego",
        gamePlaceholder: "Selecciona un juego",
        gameName: "Nombre del Juego",
        gameNamePlaceholder: "Introduce el nombre del juego",
        orderName: "Nombre del Pedido",
        orderPlaceholder: "Introduce el producto o artículo",
        continueWA: "Continuar por WhatsApp"
    }
};

const pageT = pageTranslations[language];


// ABOUT US
const aboutContent = document.querySelector("#aboutPage .info-content");
const aboutParagraphs = aboutContent.querySelectorAll("p");

document.getElementById("closeAbout").textContent = pageT.back;
aboutContent.querySelector(".info-label").textContent = pageT.storyLabel;
aboutContent.querySelector("h1").textContent = pageT.storyTitle;

pageT.story.forEach((text, index) => {
    aboutParagraphs[index + 1].textContent = text;
});

aboutContent.querySelector(".about-date").textContent = pageT.established;


// REPORT
const reportContent = document.querySelector("#reportPage .info-content");

document.getElementById("closeReport").textContent = pageT.back;
reportContent.querySelector(".info-label").textContent = pageT.support;
reportContent.querySelector("h1").textContent = pageT.reportTitle;

const reportDescription = reportContent.querySelector("h1 + p");
reportDescription.textContent = pageT.reportDesc;

const reportName = document.getElementById("reportName");
const reportCategory = document.getElementById("reportCategory");
const reportMessage = document.getElementById("reportMessage");

document.querySelector('label[for="reportName"]').textContent = pageT.name;
reportName.placeholder = pageT.namePlaceholder;

document.querySelector('label[for="reportCategory"]').textContent = pageT.category;

document.querySelector('label[for="reportMessage"]').textContent = pageT.describe;
reportMessage.placeholder = pageT.messagePlaceholder;

document.querySelector('#reportForm button[type="submit"]').textContent = pageT.submit;
reportContent.querySelector(".report-note").textContent = pageT.reportNote;


// CUSTOM ORDER PAGE
const customPage = document.querySelector("#customOrderPage .info-content");

document.getElementById("closeCustomOrder").textContent = pageT.back;
customPage.querySelector(".info-label").textContent = pageT.customLabel;
customPage.querySelector("h1").textContent = pageT.customTitlePage;
customPage.querySelector("h1 + p").textContent = pageT.customIntro;

document.querySelector('label[for="customGame"]').textContent = pageT.chooseGame;

const customGameSelect = document.getElementById("customGame");
customGameSelect.options[0].textContent = pageT.gamePlaceholder;

document.querySelector('label[for="otherGame"]').textContent = pageT.gameName;
document.getElementById("otherGame").placeholder = pageT.gameNamePlaceholder;

document.querySelector('label[for="customItem"]').textContent = pageT.orderName;
document.getElementById("customItem").placeholder = pageT.orderPlaceholder;

document.querySelector('#customOrderForm button[type="submit"]').textContent =
    pageT.continueWA;
    // Simpan pilihan bahasa
    localStorage.setItem("rbxLanguage", language);
}


// Saat customer mengganti bahasa
languageSelect.addEventListener("change", function () {
    changeLanguage(this.value);
});


// Ambil bahasa terakhir
const savedLanguage =
    localStorage.getItem("rbxLanguage") || "id";

languageSelect.value = savedLanguage;

changeLanguage(savedLanguage);