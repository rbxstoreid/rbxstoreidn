// ============================================================
// RBXSTORE.ID - MAIN JAVASCRIPT
// ============================================================


// ============================================================
// CONFIG
// ============================================================

const nomorWA = "6282169942899";


// ============================================================
// LANGUAGE STATE
// ============================================================

let currentLanguage =
    localStorage.getItem("rbxLanguage") || "id";


// ============================================================
// PRICE FORMAT
// ============================================================

function formatHarga(angka) {

    if (
        angka === null ||
        angka === undefined ||
        angka === "" ||
        isNaN(Number(angka))
    ) {
        return "Rp 0";
    }

    return "Rp " + Number(angka).toLocaleString("id-ID");
}


// ============================================================
// SAFE ELEMENT HELPER
// ============================================================

function getElement(id) {
    return document.getElementById(id);
}


// ============================================================
// PROMO SYSTEM
// ============================================================

const promoCodes = [
    "RBXSTOREIDN",
    "THANKSFOR1YEAR",
    "PROMOCODERBXSTOREID",
    "AUGUSTPROMOCODE"
];

const promoExpiry =
    new Date("2026-08-31T23:59:59+07:00");

let activePromoCode = "";
let activePromoDiscount = 0;


// ============================================================
// ORDER STATE
// ============================================================

let pendingWhatsAppURL = "";
let pendingOrderMessage = "";


// ============================================================
// DISCOUNT CALCULATOR
// ============================================================

function calculateDiscount(harga) {

    const amount = Number(harga);

    if (
        isNaN(amount) ||
        amount <= 0
    ) {
        return {
            baseDiscount: 0,
            promoDiscount: 0,
            totalDiscount: 0,
            total: amount
        };
    }

    const baseDiscount =
        amount > 30000
            ? Math.round(amount * 0.10)
            : 0;

    const promoDiscount =
        activePromoCode
            ? Math.round(amount * 0.05)
            : 0;

    const totalDiscount =
        baseDiscount + promoDiscount;

    const total =
        amount - totalDiscount;

    return {
        baseDiscount,
        promoDiscount,
        totalDiscount,
        total
    };
}


// ============================================================
// APPLY DISCOUNT TO MESSAGE
// ============================================================

function applyDiscountToMessage(pesan) {

    if (!pesan) {
        return pesan;
    }

    const matchHarga =
        pesan.match(
            /Harga:\s*Rp\s*([\d.,]+)/
        );

    if (!matchHarga) {
        return pesan;
    }

    const harga =
        Number(
            matchHarga[1]
                .replace(/[.,]/g, "")
        );

    if (
        isNaN(harga) ||
        harga <= 0
    ) {
        return pesan;
    }

    const discount =
        calculateDiscount(harga);

    let replacement =
        `Harga: ${formatHarga(harga)}`;

    if (discount.baseDiscount > 0) {

        replacement +=
            `\nDiskon: -10% (${formatHarga(discount.baseDiscount)})`;
    }

    if (
        activePromoCode &&
        discount.promoDiscount > 0
    ) {

        replacement +=
            `\nPromo Code: ${activePromoCode}`;

        replacement +=
            `\nDiskon Promo: -5% (${formatHarga(discount.promoDiscount)})`;
    }

    if (
        discount.totalDiscount > 0
    ) {

        replacement +=
            `\nTotal Diskon: -${formatHarga(discount.totalDiscount)}`;

        replacement +=
            `\nTotal: ${formatHarga(discount.total)}`;

    } else {

        replacement +=
            `\nTotal: ${formatHarga(harga)}`;
    }

    return pesan.replace(
        /Harga:\s*Rp\s*[\d.,]+/,
        replacement
    );
}


// ============================================================
// CREATE WHATSAPP URL
// ============================================================

function createWhatsAppURL(pesan) {

    return (
        "https://wa.me/" +
        nomorWA +
        "?text=" +
        encodeURIComponent(pesan)
    );
}


// ============================================================
// UPDATE PENDING ORDER WITH PROMO
// ============================================================

function updatePendingOrder() {

    if (!pendingOrderMessage) {
        return;
    }

    const pesanFinal =
        applyDiscountToMessage(
            pendingOrderMessage
        );

    pendingWhatsAppURL =
        createWhatsAppURL(
            pesanFinal
        );

    const priceMatch =
        pesanFinal.match(
            /Harga:\s*(.+)/
        );

    const confirmPrice =
        getElement("confirmPrice");

    if (confirmPrice) {

        if (priceMatch) {

            confirmPrice.textContent =
                priceMatch[1].trim();

        } else {

            confirmPrice.textContent =
                "Menunggu Konfirmasi";
        }
    }
}


// ============================================================
// PROMO CODE ELEMENTS
// ============================================================

const promoCodeInput =
    getElement("promoCode");

const applyPromo =
    getElement("applyPromo");

const promoMessage =
    getElement("promoMessage");


// ============================================================
// APPLY PROMO BUTTON
// ============================================================

if (
    applyPromo &&
    promoCodeInput &&
    promoMessage
) {

    applyPromo.addEventListener(
        "click",
        function () {

            const code =
                promoCodeInput.value
                    .trim()
                    .toUpperCase();

            if (!code) {

                activePromoCode = "";
                activePromoDiscount = 0;

                promoMessage.textContent =
                    "Masukkan promo code terlebih dahulu.";

                return;
            }

            if (
                new Date() >
                promoExpiry
            ) {

                activePromoCode = "";
                activePromoDiscount = 0;

                promoMessage.textContent =
                    "Promo code EXPIRED.";

                updatePendingOrder();

                return;
            }

            if (
                promoCodes.includes(code)
            ) {

                activePromoCode =
                    code;

                activePromoDiscount =
                    0.05;

                promoMessage.textContent =
                    "✓ Promo code berhasil! Diskon tambahan 5% diterapkan.";

                updatePendingOrder();

                if (
                    typeof renderCart ===
                    "function"
                ) {

                    renderCart();
                }

            } else {

                activePromoCode = "";
                activePromoDiscount = 0;

                promoMessage.textContent =
                    "✕ Promo code tidak valid.";

                updatePendingOrder();

                if (
                    typeof renderCart ===
                    "function"
                ) {

                    renderCart();
                }
            }
        }
    );
}


// ============================================================
// WHATSAPP + ORDER CONFIRMATION
// ============================================================

function bukaWhatsApp(pesan) {

    if (!pesan) {
        return;
    }

    pendingOrderMessage =
        pesan;

    const pesanFinal =
        applyDiscountToMessage(
            pesan
        );

    pendingWhatsAppURL =
        createWhatsAppURL(
            pesanFinal
        );

    const productMatch =
        pesanFinal.match(
            /Produk:\s*(.+)/
        );

    const orderMatch =
        pesanFinal.match(
            /Pesanan:\s*(.+)/
        );

    const priceMatch =
        pesanFinal.match(
            /Harga:\s*(.+)/
        );

    const game =
        productMatch
            ? productMatch[1].trim()
            : "Custom Order";

    const product =
        orderMatch
            ? orderMatch[1].trim()
            : "Custom Order";

    const price =
        priceMatch
            ? priceMatch[1].trim()
            : "Menunggu Konfirmasi";

    const confirmGame =
        getElement("confirmGame");

    const confirmProduct =
        getElement("confirmProduct");

    const confirmPrice =
        getElement("confirmPrice");

    const orderConfirm =
        getElement("orderConfirm");

    if (confirmGame) {

        confirmGame.textContent =
            game;
    }

    if (confirmProduct) {

        confirmProduct.textContent =
            product;
    }

    if (confirmPrice) {

        confirmPrice.textContent =
            price;
    }

    if (orderConfirm) {

        orderConfirm.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";
    }
}


// ============================================================
// ORDER CONFIRMATION BUTTONS
// ============================================================

const cancelOrder =
    getElement("cancelOrder");

if (cancelOrder) {

    cancelOrder.addEventListener(
        "click",
        function () {

            const orderConfirm =
                getElement(
                    "orderConfirm"
                );

            if (orderConfirm) {

                orderConfirm.classList.remove(
                    "active"
                );
            }

            document.body.style.overflow =
                "";

            pendingWhatsAppURL =
                "";
        }
    );
}


const continueOrder =
    getElement("continueOrder");

if (continueOrder) {

    continueOrder.addEventListener(
        "click",
        function () {

            if (!pendingWhatsAppURL) {
                return;
            }

            window.open(
                pendingWhatsAppURL,
                "_blank"
            );

            const orderConfirm =
                getElement(
                    "orderConfirm"
                );

            if (orderConfirm) {

                orderConfirm.classList.remove(
                    "active"
                );
            }

            document.body.style.overflow =
                "";

            pendingWhatsAppURL =
                "";
        }
    );
}


// ============================================================
// GENERIC PRODUCT ORDER
// ============================================================

function setupNormalProduct(
    selectId,
    priceId,
    buttonId,
    productName
) {

    const select =
        getElement(selectId);

    const priceElement =
        getElement(priceId);

    const button =
        getElement(buttonId);

    if (
        !select ||
        !priceElement ||
        !button
    ) {
        return;
    }

    select.addEventListener(
        "change",
        function () {

            if (
                !select.value ||
                select.value === "custom"
            ) {
                return;
            }

            priceElement.textContent =
                formatHarga(
                    select.value
                );
        }
    );

    button.addEventListener(
        "click",
        function () {

            if (
                !select.value ||
                select.value === "custom"
            ) {
                return;
            }

            const option =
                select.options[
                    select.selectedIndex
                ];

            const pesanan =
                option.text
                    .split(" - Rp")[0]
                    .trim();

            const harga =
                formatHarga(
                    select.value
                );

            const pesan =
`Halo RBXSTORE.ID.

Saya ingin memesan:

Produk: ${productName}
Pesanan: ${pesanan}
Harga: ${harga}
Jumlah Item: 1

Mohon diproses pesanannya. Terima kasih.`;

            bukaWhatsApp(
                pesan
            );
        }
    );
}


// ============================================================
// ROBUX
// ============================================================

const robux =
    getElement("robux");

const hargaRobux =
    getElement("hargaRobux");

const customRobuxBox =
    getElement("customRobuxBox");

const customRobux =
    getElement("customRobux");

const waRobux =
    getElement("waRobux");

if (
    robux &&
    hargaRobux &&
    customRobuxBox &&
    customRobux &&
    waRobux
) {

    robux.addEventListener(
        "change",
        function () {

            if (
                robux.value ===
                "custom"
            ) {

                customRobuxBox.style.display =
                    "block";

                hargaRobux.textContent =
                    "Harga: Menunggu Konfirmasi";

            } else {

                customRobuxBox.style.display =
                    "none";

                hargaRobux.textContent =
                    formatHarga(
                        robux.value
                    );
            }
        }
    );

    waRobux.addEventListener(
        "click",
        function () {

            let pesanan;
            let harga;

            if (
                robux.value ===
                "custom"
            ) {

                if (
                    !customRobux.value ||
                    Number(
                        customRobux.value
                    ) <= 0
                ) {

                    alert(
                        "Masukkan jumlah Robux terlebih dahulu."
                    );

                    return;
                }

                pesanan =
                    customRobux.value +
                    " Robux";

                harga =
                    "Menunggu Konfirmasi";

            } else {

                pesanan =
                    robux.options[
                        robux.selectedIndex
                    ].text
                    .split(" - Rp")[0]
                    .trim();

                harga =
                    formatHarga(
                        robux.value
                    );
            }

            const pesan =
`Halo RBXSTORE.ID.

Saya ingin memesan:

Produk: Robux - Roblox
Pesanan: ${pesanan}
Harga: ${harga}
Jumlah Item: 1

Mohon diproses pesanannya. Terima kasih.`;

            bukaWhatsApp(
                pesan
            );
        }
    );
}


// ============================================================
// GROW A GARDEN 2
// ============================================================

setupNormalProduct(
    "garden",
    "hargaGarden",
    "waGarden",
    "Grow A Garden 2 - Roblox"
);


// ============================================================
// TOILET TOWER DEFENSE
// ============================================================

setupNormalProduct(
    "ttd",
    "hargaTTD",
    "waTTD",
    "Toilet Tower Defense - Roblox"
);


// ============================================================
// 99 NIGHTS IN THE FOREST
// ============================================================

setupNormalProduct(
    "forest",
    "hargaForest",
    "waForest",
    "99 Nights in the Forest - Roblox"
);


// ============================================================
// FC MOBILE
// ============================================================

setupNormalProduct(
    "fcMobile",
    "hargaFC",
    "waFC",
    "FC Mobile"
);


// ============================================================
// MOBILE LEGENDS
// ============================================================

const ml =
    getElement("ml");

const hargaML =
    getElement("hargaML");

const customDiamondBox =
    getElement("customDiamondBox");

const customDiamond =
    getElement("customDiamond");

const waML =
    getElement("waML");

if (
    ml &&
    hargaML &&
    customDiamondBox &&
    customDiamond &&
    waML
) {

    ml.addEventListener(
        "change",
        function () {

            if (
                ml.value ===
                "custom"
            ) {

                customDiamondBox.style.display =
                    "block";

                hargaML.textContent =
                    "Harga: Menunggu Konfirmasi";

            } else {

                customDiamondBox.style.display =
                    "none";

                hargaML.textContent =
                    formatHarga(
                        ml.value
                    );
            }
        }
    );

    waML.addEventListener(
        "click",
        function () {

            let pesanan;
            let harga;

            if (
                ml.value ===
                "custom"
            ) {

                if (
                    !customDiamond.value ||
                    Number(
                        customDiamond.value
                    ) <= 0
                ) {

                    alert(
                        "Masukkan jumlah Diamonds terlebih dahulu."
                    );

                    return;
                }

                pesanan =
                    customDiamond.value +
                    " Diamonds";

                harga =
                    "Menunggu Konfirmasi";

            } else {

                pesanan =
                    ml.options[
                        ml.selectedIndex
                    ].text
                    .split(" - Rp")[0]
                    .trim();

                harga =
                    formatHarga(
                        ml.value
                    );
            }

            const pesan =
`Halo RBXSTORE.ID.

Saya ingin memesan:

Produk: Mobile Legends
Pesanan: ${pesanan}
Harga: ${harga}
Jumlah Item: 1

Mohon diproses pesanannya. Terima kasih.`;

            bukaWhatsApp(
                pesan
            );
        }
    );
}


// ============================================================
// FREE FIRE
// ============================================================

const freeFire =
    getElement("freeFire");

const hargaFF =
    getElement("hargaFF");

const customFFBox =
    getElement("customFFBox");

const customFF =
    getElement("customFF");

const waFF =
    getElement("waFF");

if (
    freeFire &&
    hargaFF &&
    customFFBox &&
    customFF &&
    waFF
) {

    freeFire.addEventListener(
        "change",
        function () {

            if (
                freeFire.value ===
                "custom"
            ) {

                customFFBox.style.display =
                    "block";

                hargaFF.textContent =
                    "Harga: Menunggu Konfirmasi";

            } else {

                customFFBox.style.display =
                    "none";

                hargaFF.textContent =
                    formatHarga(
                        freeFire.value
                    );
            }
        }
    );

    waFF.addEventListener(
        "click",
        function () {

            let pesanan;
            let harga;

            if (
                freeFire.value ===
                "custom"
            ) {

                if (
                    !customFF.value ||
                    Number(
                        customFF.value
                    ) <= 0
                ) {

                    alert(
                        "Masukkan jumlah Diamonds terlebih dahulu."
                    );

                    return;
                }

                pesanan =
                    customFF.value +
                    " Diamonds";

                harga =
                    "Menunggu Konfirmasi";

            } else {

                pesanan =
                    freeFire.options[
                        freeFire.selectedIndex
                    ].text
                    .split(" - Rp")[0]
                    .trim();

                harga =
                    formatHarga(
                        freeFire.value
                    );
            }

            const pesan =
`Halo RBXSTORE.ID.

Saya ingin memesan:

Produk: Free Fire
Pesanan: ${pesanan}
Harga: ${harga}
Jumlah Item: 1

Mohon diproses pesanannya. Terima kasih.`;

            bukaWhatsApp(
                pesan
            );
        }
    );
}


// ============================================================
// ABOUT US
// ============================================================

const openAbout =
    getElement("openAbout");

const closeAbout =
    getElement("closeAbout");

const aboutPage =
    getElement("aboutPage");

if (
    openAbout &&
    aboutPage
) {

    openAbout.addEventListener(
        "click",
        function () {

            aboutPage.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";
        }
    );
}

if (
    closeAbout &&
    aboutPage
) {

    closeAbout.addEventListener(
        "click",
        function () {

            aboutPage.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";
        }
    );
}


// ============================================================
// REPORT PAGE
// ============================================================

const openReport =
    getElement("openReport");

const closeReport =
    getElement("closeReport");

const reportPage =
    getElement("reportPage");

if (
    openReport &&
    reportPage
) {

    openReport.addEventListener(
        "click",
        function () {

            reportPage.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";
        }
    );
}

if (
    closeReport &&
    reportPage
) {

    closeReport.addEventListener(
        "click",
        function () {

            reportPage.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";
        }
    );
}


// ============================================================
// REPORT FORM
// ============================================================

const reportForm =
    getElement("reportForm");

if (reportForm) {

    reportForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const submitButton =
                reportForm.querySelector(
                    'button[type="submit"]'
                );

            if (!submitButton) {
                return;
            }

            const originalText =
                submitButton.textContent;

            submitButton.textContent =
                "Sending...";

            submitButton.disabled =
                true;

            const formData =
                new FormData(
                    reportForm
                );

            const object =
                Object.fromEntries(
                    formData
                );

            const json =
                JSON.stringify(
                    object
                );

            try {

                const response =
                    await fetch(
                        "https://api.web3forms.com/submit",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Accept":
                                    "application/json"
                            },

                            body: json
                        }
                    );

                const result =
                    await response.json();

                if (
                    result.success
                ) {

                    alert(
                        "Report submitted successfully. Thank you!"
                    );

                    reportForm.reset();

                } else {

                    alert(
                        "Failed to submit the report. Please try again."
                    );
                }

            } catch (error) {

                alert(
                    "Unable to submit the report. Please check your connection."
                );

            } finally {

                submitButton.textContent =
                    originalText;

                submitButton.disabled =
                    false;
            }
        }
    );
}


// ============================================================
// CUSTOM ORDER PAGE
// ============================================================

const customOrderButton =
    getElement("customOrder");

const customOrderPage =
    getElement("customOrderPage");

const closeCustomOrder =
    getElement("closeCustomOrder");

const customOrderForm =
    getElement("customOrderForm");

const customGame =
    getElement("customGame");

const otherGameBox =
    getElement("otherGameBox");

const otherGame =
    getElement("otherGame");

const customItem =
    getElement("customItem");

if (
    customOrderButton &&
    customOrderPage
) {

    customOrderButton.addEventListener(
        "click",
        function () {

            customOrderPage.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";
        }
    );
}

if (
    closeCustomOrder &&
    customOrderPage
) {

    closeCustomOrder.addEventListener(
        "click",
        function () {

            customOrderPage.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";
        }
    );
}

if (
    customGame &&
    otherGameBox &&
    otherGame
) {

    customGame.addEventListener(
        "change",
        function () {

            if (
                customGame.value ===
                "Other"
            ) {

                otherGameBox.style.display =
                    "block";

                otherGame.required =
                    true;

            } else {

                otherGameBox.style.display =
                    "none";

                otherGame.required =
                    false;

                otherGame.value =
                    "";
            }
        }
    );
}

if (
    customOrderForm &&
    customGame &&
    otherGame &&
    customItem
) {

    customOrderForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            let namaGame =
                customGame.value;

            if (!namaGame) {

                alert(
                    "Pilih game terlebih dahulu."
                );

                return;
            }

            if (
                namaGame ===
                "Other"
            ) {

                if (
                    !otherGame.value.trim()
                ) {

                    alert(
                        "Masukkan nama game terlebih dahulu."
                    );

                    return;
                }

                namaGame =
                    otherGame.value.trim();
            }

            if (
                !customItem.value.trim()
            ) {

                alert(
                    "Masukkan nama pesanan terlebih dahulu."
                );

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

            bukaWhatsApp(
                pesan
            );
        }
    );
}


// ============================================================
// INTRO
// ============================================================

const storeIntro =
    getElement("storeIntro");

const introLogo =
    document.querySelector(
        ".intro-logo"
    );

if (
    storeIntro &&
    introLogo
) {

    if (
        sessionStorage.getItem(
            "rbxIntroShown"
        ) === "true"
    ) {

        storeIntro.style.display =
            "none";

    } else {

        sessionStorage.setItem(
            "rbxIntroShown",
            "true"
        );

        window.addEventListener(
            "load",
            function () {

                setTimeout(
                    function () {

                        introLogo.classList.add(
                            "show"
                        );

                    },
                    500
                );

                setTimeout(
                    function () {

                        introLogo.classList.add(
                            "hide"
                        );

                    },
                    2000
                );

                setTimeout(
                    function () {

                        storeIntro.classList.add(
                            "intro-exit"
                        );

                    },
                    3500
                );

                setTimeout(
                    function () {

                        storeIntro.style.display =
                            "none";

                    },
                    4400
                );
            }
        );
    }
}


// ============================================================
// WELCOME POPUP
// ============================================================

const welcomePopup =
    getElement(
        "welcomePopup"
    );

const closeWelcome =
    getElement(
        "closeWelcome"
    );

const welcomeContinue =
    getElement(
        "welcomeContinue"
    );

const welcomeKey =
    "rbxstore_welcome_v2";


function showWelcomePopup() {

    if (!welcomePopup) {
        return;
    }

    if (
        localStorage.getItem(
            welcomeKey
        ) === "shown"
    ) {
        return;
    }

    welcomePopup.classList.add(
        "active"
    );
}


function closeWelcomePopup() {

    if (!welcomePopup) {
        return;
    }

    welcomePopup.classList.remove(
        "active"
    );

    localStorage.setItem(
        welcomeKey,
        "shown"
    );
}


if (closeWelcome) {

    closeWelcome.addEventListener(
        "click",
        closeWelcomePopup
    );
}


if (welcomeContinue) {

    welcomeContinue.addEventListener(
        "click",
        closeWelcomePopup
    );
}


window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                showWelcomePopup();

            },
            4600
        );
    }
);


// ============================================================
// PRODUCT SCROLL ANIMATION
// ============================================================

const gameCards =
    document.querySelectorAll(
        ".game-card"
    );

if (
    "IntersectionObserver" in window
) {

    const cardObserver =
        new IntersectionObserver(
            function (
                entries
            ) {

                entries.forEach(
                    function (
                        entry
                    ) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "card-visible"
                            );

                        } else {

                            entry.target.classList.remove(
                                "card-visible"
                            );
                        }
                    }
                );

            },
            {
                threshold: 0.15
            }
        );

    gameCards.forEach(
        function (card) {

            cardObserver.observe(
                card
            );
        }
    );
}


// ============================================================
// FAQ
// ============================================================

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );

faqItems.forEach(
    function (item) {

        const question =
            item.querySelector(
                ".faq-question"
            );

        if (!question) {
            return;
        }

        question.addEventListener(
            "click",
            function () {

                faqItems.forEach(
                    function (
                        otherItem
                    ) {

                        if (
                            otherItem !==
                            item
                        ) {

                            otherItem.classList.remove(
                                "active"
                            );
                        }
                    }
                );

                item.classList.toggle(
                    "active"
                );
            }
        );
    }
);


// ============================================================
// SHARE STORE
// ============================================================

const shareStore =
    getElement("shareStore");

if (shareStore) {

    shareStore.addEventListener(
        "click",
        async function () {

            const shareData = {

                title:
                    "RBXSTORE.ID",

                text:
                    "Check out RBXSTORE.ID - Premium Game Store Indonesia!",

                url:
                    "https://rbxstoreid.github.io/rbxstoreidn/"
            };

            if (
                navigator.share
            ) {

                try {

                    await navigator.share(
                        shareData
                    );

                } catch (error) {

                    // User membatalkan share
                }

            } else {

                try {

                    await navigator.clipboard.writeText(
                        shareData.url
                    );

                    alert(
                        "Store link copied!"
                    );

                } catch (error) {

                    alert(
                        shareData.url
                    );
                }
            }
        }
    );
}


// ============================================================
// TRANSLATIONS
// ============================================================

const translations = {

    id: {

        subtitle:
            "Premium Game Store Indonesia",

        about:
            "Tentang Kami",

        report:
            "Laporkan Masalah",

        share:
            "Bagikan Toko",

        cart:
            "Keranjang",

        addToCart:
            "Tambah ke Keranjang",

        remove:
            "Hapus",

        yourCart:
            "Keranjang Anda",

        emptyCart:
            "Keranjang Anda kosong",

        price:
            "Harga",

        discount:
            "Diskon",

        total:
            "Total",

        checkoutWA:
            "Checkout via WhatsApp",

        orderConfirmation:
            "Konfirmasi Pesanan",

        confirmOrder:
            "Konfirmasi Pesanan",

        cancel:
            "Batal",

        continueWA:
            "Lanjutkan ke WhatsApp",

        welcome:
            "Selamat Datang di RBXSTORE.ID",

        continueStore:
            "Lanjut ke Toko",

        selectNominal:
            "Pilih Nominal",

        selectProduct:
            "Pilih Produk",

        selectDiamond:
            "Pilih Diamond",

        selectDiamonds:
            "Pilih Diamonds",

        selectFC:
            "Pilih FC Points",

        buyWA:
            "Beli Sekarang via WhatsApp",

        customTitle:
            "Custom Pembelian",

        customDesc1:
            "Tidak menemukan produk yang kamu cari? Kamu dapat mengajukan pembelian item atau kebutuhan game online lainnya melalui RBXSTORE.ID.",

        customDesc2:
            "Hubungi kami untuk mengecek ketersediaan produk dan harga.",

        customButton:
            "Custom Pembelian"
    },

    en: {

        subtitle:
            "Premium Game Store Indonesia",

        about:
            "About Us",

        report:
            "Report an Issue",

        share:
            "Share Store",

        cart:
            "Cart",

        addToCart:
            "Add to Cart",

        remove:
            "Remove",

        yourCart:
            "Your Cart",

        emptyCart:
            "Your cart is empty",

        price:
            "Price",

        discount:
            "Discount",

        total:
            "Total",

        checkoutWA:
            "Checkout via WhatsApp",

        orderConfirmation:
            "Order Confirmation",

        confirmOrder:
            "Confirm Your Order",

        cancel:
            "Cancel",

        continueWA:
            "Continue to WhatsApp",

        welcome:
            "Welcome to RBXSTORE.ID",

        continueStore:
            "Continue to Store",

        selectNominal:
            "Select Amount",

        selectProduct:
            "Select Product",

        selectDiamond:
            "Select Diamond",

        selectDiamonds:
            "Select Diamonds",

        selectFC:
            "Select FC Points",

        buyWA:
            "Buy Now via WhatsApp",

        customTitle:
            "Custom Order",

        customDesc1:
            "Can't find the product you're looking for? You can request other game items or online gaming products through RBXSTORE.ID.",

        customDesc2:
            "Contact us to check product availability and pricing.",

        customButton:
            "Custom Order"
    },

    fil: {

        subtitle:
            "Premium Game Store Indonesia",

        about:
            "Tungkol sa Amin",

        report:
            "Mag-report ng Problema",

        share:
            "Ibahagi ang Store",

        cart:
            "Cart",

        addToCart:
            "Idagdag sa Cart",

        remove:
            "Alisin",

        yourCart:
            "Iyong Cart",

        emptyCart:
            "Walang laman ang iyong cart",

        price:
            "Presyo",

        discount:
            "Diskwento",

        total:
            "Kabuuan",

        checkoutWA:
            "Checkout via WhatsApp",

        orderConfirmation:
            "Kumpirmasyon ng Order",

        confirmOrder:
            "Kumpirmahin ang Order",

        cancel:
            "Kanselahin",

        continueWA:
            "Magpatuloy sa WhatsApp",

        welcome:
            "Maligayang Pagdating sa RBXSTORE.ID",

        continueStore:
            "Magpatuloy sa Store",

        selectNominal:
            "Pumili ng Halaga",

        selectProduct:
            "Pumili ng Produkto",

        selectDiamond:
            "Pumili ng Diamond",

        selectDiamonds:
            "Pumili ng Diamonds",

        selectFC:
            "Pumili ng FC Points",

        buyWA:
            "Bumili sa WhatsApp",

        customTitle:
            "Custom Order",

        customDesc1:
            "Hindi makita ang produktong hinahanap mo? Maaari kang humiling ng iba pang game items sa RBXSTORE.ID.",

        customDesc2:
            "Makipag-ugnayan sa amin upang malaman ang availability at presyo.",

        customButton:
            "Custom Order"
    },

    zh: {

        subtitle:
            "印度尼西亚优质游戏商店",

        about:
            "关于我们",

        report:
            "报告问题",

        share:
            "分享商店",

        cart:
            "购物车",

        addToCart:
            "加入购物车",

        remove:
            "删除",

        yourCart:
            "您的购物车",

        emptyCart:
            "您的购物车是空的",

        price:
            "价格",

        discount:
            "折扣",

        total:
            "总计",

        checkoutWA:
            "通过 WhatsApp 结账",

        orderConfirmation:
            "订单确认",

        confirmOrder:
            "确认订单",

        cancel:
            "取消",

        continueWA:
            "继续使用 WhatsApp",

        welcome:
            "欢迎来到 RBXSTORE.ID",

        continueStore:
            "进入商店",

        selectNominal:
            "选择数量",

        selectProduct:
            "选择商品",

        selectDiamond:
            "选择钻石",

        selectDiamonds:
            "选择钻石",

        selectFC:
            "选择 FC Points",

        buyWA:
            "通过 WhatsApp 购买",

        customTitle:
            "自定义购买",

        customDesc1:
            "找不到您想要的商品？您可以通过 RBXSTORE.ID 咨询其他游戏商品。",

        customDesc2:
            "联系我们以确认商品库存和价格。",

        customButton:
            "自定义购买"
    },

    es: {

        subtitle:
            "Tienda Premium de Videojuegos de Indonesia",

        about:
            "Sobre Nosotros",

        report:
            "Reportar un Problema",

        share:
            "Compartir Tienda",

        cart:
            "Carrito",

        addToCart:
            "Añadir al carrito",

        remove:
            "Eliminar",

        yourCart:
            "Tu carrito",

        emptyCart:
            "Tu carrito está vacío",

        price:
            "Precio",

        discount:
            "Descuento",

        total:
            "Total",

        checkoutWA:
            "Finalizar compra por WhatsApp",

        orderConfirmation:
            "Confirmación del pedido",

        confirmOrder:
            "Confirmar pedido",

        cancel:
            "Cancelar",

        continueWA:
            "Continuar a WhatsApp",

        welcome:
            "Bienvenido a RBXSTORE.ID",

        continueStore:
            "Continuar a la tienda",

        selectNominal:
            "Seleccionar Cantidad",

        selectProduct:
            "Seleccionar Producto",

        selectDiamond:
            "Seleccionar Diamante",

        selectDiamonds:
            "Seleccionar Diamantes",

        selectFC:
            "Seleccionar FC Points",

        buyWA:
            "Comprar por WhatsApp",

        customTitle:
            "Pedido Personalizado",

        customDesc1:
            "¿No encuentras el producto que buscas? Puedes solicitar otros artículos de juegos a través de RBXSTORE.ID.",

        customDesc2:
            "Contáctanos para consultar disponibilidad y precio.",

        customButton:
            "Pedido Personalizado"
    }
};


// ============================================================
// EXTRA TRANSLATIONS
// ============================================================

const extraTranslations = {

    id: {

        howTitle:
            "Cara Pemesanan",

        howSubtitle:
            "Pemesanan Mudah & Sederhana",

        steps: [

            [
                "Pilih Produk",
                "Pilih game, item, atau nominal yang ingin kamu beli."
            ],

            [
                "Pesan via WhatsApp",
                "Tekan tombol WhatsApp dan detail pesanan akan dibuat secara otomatis."
            ],

            [
                "Selesaikan Pembayaran",
                "Ikuti petunjuk pembayaran yang diberikan oleh RBXSTORE.ID."
            ],

            [
                "Pesanan Diproses",
                "Setelah pembayaran dikonfirmasi, pesanan kamu akan diproses."
            ]
        ],

        faqTitle:
            "Pertanyaan yang Sering Diajukan",

        faq: [

            [
                "Berapa lama pesanan diproses?",
                "Waktu proses tergantung pada produk dan ketersediaan saat ini."
            ],

            [
                "Bagaimana cara memesan?",
                "Pilih produk dan nominal, lalu tekan tombol Beli via WhatsApp."
            ],

            [
                "Metode pembayaran apa yang tersedia?",
                "Metode pembayaran yang tersedia akan diberikan melalui WhatsApp saat melakukan pemesanan."
            ],

            [
                "Bagaimana jika produk yang saya cari tidak tersedia di menu?",
                "Gunakan Custom Pembelian, pilih game, lalu masukkan produk atau item yang kamu cari."
            ],

            [
                "Apa yang harus dilakukan jika ada masalah dengan pesanan?",
                "Gunakan Report an Issue atau hubungi RBXSTORE.ID melalui WhatsApp."
            ],

            [
                "Apakah harga dapat berubah?",
                "Ya. Harga dapat berubah tergantung ketersediaan produk dan kondisi pasar."
            ]
        ]
    },

    en: {

        howTitle:
            "HOW TO ORDER",

        howSubtitle:
            "Simple & Easy Ordering",

        steps: [

            [
                "Choose Your Product",
                "Select the game, item, or amount you want to purchase."
            ],

            [
                "Order via WhatsApp",
                "Tap the WhatsApp button and your order details will be prepared automatically."
            ],

            [
                "Complete Payment",
                "Follow the payment instructions provided by RBXSTORE.ID."
            ],

            [
                "Order Processed",
                "After payment is confirmed, your order will be processed."
            ]
        ],

        faqTitle:
            "Frequently Asked Questions",

        faq: [

            [
                "How long does an order take?",
                "Processing time depends on the product and current availability."
            ],

            [
                "How do I place an order?",
                "Choose a product, select the amount, then tap the Buy via WhatsApp button."
            ],

            [
                "What payment methods are available?",
                "Available payment methods will be provided through WhatsApp when you place an order."
            ],

            [
                "What if the product I want isn't listed?",
                "Use Custom Order, select your game, and enter the product or item you are looking for."
            ],

            [
                "What should I do if I have an issue with my order?",
                "Use Report an Issue or contact RBXSTORE.ID through WhatsApp."
            ],

            [
                "Can prices change?",
                "Yes. Prices may change depending on product availability and market conditions."
            ]
        ]
    },

    fil: {

        howTitle:
            "PAANO UMORDER",

        howSubtitle:
            "Simple at Madaling Pag-order",

        steps: [

            [
                "Pumili ng Produkto",
                "Piliin ang game, item, o halaga na gusto mong bilhin."
            ],

            [
                "Umorder sa WhatsApp",
                "Pindutin ang WhatsApp button at awtomatikong ihahanda ang detalye ng order."
            ],

            [
                "Kumpletuhin ang Bayad",
                "Sundin ang payment instructions mula sa RBXSTORE.ID."
            ],

            [
                "Ipoproseso ang Order",
                "Kapag nakumpirma na ang bayad, ipoproseso ang iyong order."
            ]
        ],

        faqTitle:
            "Mga Madalas Itanong",

        faq: [

            [
                "Gaano katagal ang pagproseso ng order?",
                "Depende ito sa produkto at kasalukuyang availability."
            ],

            [
                "Paano ako oorder?",
                "Pumili ng produkto at halaga, pagkatapos pindutin ang WhatsApp button."
            ],

            [
                "Anong payment methods ang available?",
                "Ibibigay sa WhatsApp ang available na payment methods kapag umorder ka."
            ],

            [
                "Paano kung wala sa listahan ang gusto kong produkto?",
                "Gamitin ang Custom Order at ilagay ang game at item na hinahanap mo."
            ],

            [
                "Ano ang gagawin kung may problema sa order?",
                "Gamitin ang Report an Issue o kontakin ang RBXSTORE.ID sa WhatsApp."
            ],

            [
                "Puwede bang magbago ang presyo?",
                "Oo. Maaaring magbago ang presyo depende sa availability at market conditions."
            ]
        ]
    },

    zh: {

        howTitle:
            "购买流程",

        howSubtitle:
            "简单快捷的购买方式",

        steps: [

            [
                "选择商品",
                "选择您想购买的游戏、商品或数量。"
            ],

            [
                "通过 WhatsApp 下单",
                "点击 WhatsApp 按钮，系统会自动准备订单信息。"
            ],

            [
                "完成付款",
                "按照 RBXSTORE.ID 提供的付款说明完成付款。"
            ],

            [
                "处理订单",
                "付款确认后，我们将处理您的订单。"
            ]
        ],

        faqTitle:
            "常见问题",

        faq: [

            [
                "订单需要多长时间处理？",
                "处理时间取决于商品和当前库存情况。"
            ],

            [
                "如何下单？",
                "选择商品和数量，然后点击 WhatsApp 购买按钮。"
            ],

            [
                "有哪些付款方式？",
                "下单后，我们会通过 WhatsApp 告知可用的付款方式。"
            ],

            [
                "如果没有我想要的商品怎么办？",
                "使用自定义购买功能，选择游戏并输入您想要的商品。"
            ],

            [
                "订单出现问题怎么办？",
                "使用问题报告功能或通过 WhatsApp 联系 RBXSTORE.ID。"
            ],

            [
                "价格会变化吗？",
                "会。价格可能根据商品库存和市场情况发生变化。"
            ]
        ]
    },

    es: {

        howTitle:
            "CÓMO COMPRAR",

        howSubtitle:
            "Compra Simple y Fácil",

        steps: [

            [
                "Elige tu Producto",
                "Selecciona el juego, artículo o cantidad que deseas comprar."
            ],

            [
                "Compra por WhatsApp",
                "Pulsa el botón de WhatsApp y los detalles del pedido se prepararán automáticamente."
            ],

            [
                "Completa el Pago",
                "Sigue las instrucciones de pago proporcionadas por RBXSTORE.ID."
            ],

            [
                "Pedido Procesado",
                "Después de confirmar el pago, tu pedido será procesado."
            ]
        ],

        faqTitle:
            "Preguntas Frecuentes",

        faq: [

            [
                "¿Cuánto tarda un pedido?",
                "El tiempo de procesamiento depende del producto y de su disponibilidad."
            ],

            [
                "¿Cómo hago un pedido?",
                "Elige un producto y una cantidad, luego pulsa el botón de WhatsApp."
            ],

            [
                "¿Qué métodos de pago están disponibles?",
                "Los métodos de pago disponibles se proporcionarán por WhatsApp al realizar el pedido."
            ],

            [
                "¿Qué pasa si el producto que quiero no aparece?",
                "Utiliza Pedido Personalizado, selecciona el juego e introduce el artículo que buscas."
            ],

            [
                "¿Qué hago si tengo un problema con mi pedido?",
                "Utiliza Reportar un Problema o contacta con RBXSTORE.ID por WhatsApp."
            ],

            [
                "¿Los precios pueden cambiar?",
                "Sí. Los precios pueden cambiar según la disponibilidad y las condiciones del mercado."
            ]
        ]
    }
};


// ============================================================
// PAGE TRANSLATIONS
// ============================================================

const pageTranslations = {

    id: {

        back:
            "← Kembali ke Toko",

        storyLabel:
            "CERITA KAMI",

        storyTitle:
            "Kisah di Balik RBXSTORE.ID",

        story: [

            "RBXSTORE.ID dimulai pada 30 Juli 2025 dari sebuah ide sederhana yang muncul saat pendirinya sedang berada di sekolah. Ide kecil untuk menjual produk game online kemudian berkembang menjadi sesuatu yang lebih serius.",

            "Pada awalnya, RBXSTORE.ID belum memiliki website atau toko digital. Menu produk pertama dibuat menggunakan kertas ketika toko masih dalam tahap pengembangan.",

            "Seiring berkembangnya ide tersebut, seorang teman bernama Jesslyn membantu membuat menu produk yang lebih baik menggunakan Canva.",

            "Seiring waktu, RBXSTORE.ID terus mengembangkan katalog, menghadirkan promosi dan diskon, serta menambah pilihan produk game untuk pelanggan.",

            "Pada Juli 2026, RBXSTORE.ID mencapai tahap baru ketika pendirinya mulai mengembangkan website sendiri. Proyek ini berkembang dari menu berbasis kertas menjadi toko digital yang dibuat menggunakan HTML, CSS, JavaScript, GitHub, dan GitHub Pages.",

            "Saat ini, RBXSTORE.ID terus beroperasi dan berkembang dengan tujuan memberikan cara yang sederhana dan nyaman bagi pelanggan untuk membeli produk game digital."
        ],

        established:
            "Didirikan 30 Juli 2025.",

        support:
            "DUKUNGAN PELANGGAN",

        reportTitle:
            "Laporkan Masalah",

        reportDesc:
            "Mengalami masalah dengan RBXSTORE.ID? Kirim laporan di bawah ini dan berikan informasi yang cukup agar kami dapat memahami masalah kamu.",

        name:
            "Nama",

        namePlaceholder:
            "Nama kamu",

        category:
            "Kategori Masalah",

        describe:
            "Jelaskan Masalah",

        messagePlaceholder:
            "Jelaskan masalah yang kamu alami...",

        submit:
            "Kirim Laporan",

        reportNote:
            "Laporan dikirim secara pribadi ke RBXSTORE.ID dan tidak memengaruhi rating publik toko.",

        customLabel:
            "PESANAN KHUSUS",

        customTitlePage:
            "Custom Pembelian",

        customIntro:
            "Pilih game dan masukkan produk atau item yang ingin dibeli. Ketersediaan dan harga akan dikonfirmasi melalui WhatsApp.",

        chooseGame:
            "Pilih Game",

        gamePlaceholder:
            "Pilih game",

        gameName:
            "Nama Game",

        gameNamePlaceholder:
            "Masukkan nama game",

        orderName:
            "Nama Pesanan",

        orderPlaceholder:
            "Masukkan nama produk atau item",

        continueWA:
            "Lanjutkan via WhatsApp"
    },

    en: {

        back:
            "← Back to Store",

        storyLabel:
            "OUR STORY",

        storyTitle:
            "The Story Behind RBXSTORE.ID",

        story: [

            "RBXSTORE.ID began on July 30, 2025, from a simple idea that came to its founder during a school day. What started as a small idea about selling online gaming products soon developed into something more serious.",

            "In its earliest days, RBXSTORE.ID did not have a website or digital storefront. The first product menu was organised using paper while the store was still being developed.",

            "As the idea continued to grow, a friend named Jesslyn helped create an improved product menu using Canva.",

            "Over time, RBXSTORE.ID continued to improve its catalogue, introduce promotions and discounts, and expand its selection of gaming products.",

            "In July 2026, RBXSTORE.ID reached another milestone when its founder began developing an independent website using HTML, CSS, JavaScript, GitHub and GitHub Pages.",

            "Today, RBXSTORE.ID continues to operate and develop with the goal of providing a simple and convenient way to purchase digital gaming products."
        ],

        established:
            "Established July 30, 2025.",

        support:
            "CUSTOMER SUPPORT",

        reportTitle:
            "Report an Issue",

        reportDesc:
            "Experiencing an issue with RBXSTORE.ID? Submit a report below and provide enough information so we can understand your concern.",

        name:
            "Name",

        namePlaceholder:
            "Your name",

        category:
            "Issue Category",

        describe:
            "Describe the Issue",

        messagePlaceholder:
            "Please describe the issue...",

        submit:
            "Submit Report",

        reportNote:
            "Reports are sent privately to RBXSTORE.ID and do not affect any public store rating.",

        customLabel:
            "CUSTOM ORDER",

        customTitlePage:
            "Custom Order",

        customIntro:
            "Select a game and enter the product or item you want to purchase. Availability and pricing will be confirmed through WhatsApp.",

        chooseGame:
            "Select Game",

        gamePlaceholder:
            "Select a game",

        gameName:
            "Game Name",

        gameNamePlaceholder:
            "Enter game name",

        orderName:
            "Order Name",

        orderPlaceholder:
            "Enter product or item name",

        continueWA:
            "Continue via WhatsApp"
    },

    fil: {

        back:
            "← Bumalik sa Store",

        storyLabel:
            "ANG AMING KWENTO",

        storyTitle:
            "Ang Kwento ng RBXSTORE.ID",

        story: [

            "Nagsimula ang RBXSTORE.ID noong Hulyo 30, 2025 mula sa isang simpleng ideya ng founder nito habang nasa paaralan.",

            "Noong una, walang website o digital storefront ang RBXSTORE.ID. Ang unang product menu ay ginawa gamit ang papel.",

            "Habang lumalago ang ideya, tumulong ang isang kaibigang nagngangalang Jesslyn sa paggawa ng mas maayos na product menu gamit ang Canva.",

            "Sa paglipas ng panahon, pinalawak ng RBXSTORE.ID ang catalogue nito at nagdagdag ng mga promotion, discount, at gaming products.",

            "Noong Hulyo 2026, nagsimulang gumawa ang founder ng sariling website gamit ang HTML, CSS, JavaScript, GitHub at GitHub Pages.",

            "Patuloy na umuunlad ang RBXSTORE.ID upang magbigay ng simple at convenient na paraan ng pagbili ng digital gaming products."
        ],

        established:
            "Itinatag noong Hulyo 30, 2025.",

        support:
            "CUSTOMER SUPPORT",

        reportTitle:
            "Mag-report ng Problema",

        reportDesc:
            "May problema sa RBXSTORE.ID? Magpadala ng report sa ibaba at ibigay ang kinakailangang impormasyon.",

        name:
            "Pangalan",

        namePlaceholder:
            "Iyong pangalan",

        category:
            "Kategorya ng Problema",

        describe:
            "Ilarawan ang Problema",

        messagePlaceholder:
            "Ilarawan ang problema...",

        submit:
            "Ipadala ang Report",

        reportNote:
            "Pribadong ipinapadala ang mga report sa RBXSTORE.ID at hindi nito naaapektuhan ang public store rating.",

        customLabel:
            "CUSTOM ORDER",

        customTitlePage:
            "Custom Order",

        customIntro:
            "Pumili ng game at ilagay ang produkto o item na gusto mong bilhin. Ang availability at presyo ay kukumpirmahin sa WhatsApp.",

        chooseGame:
            "Pumili ng Game",

        gamePlaceholder:
            "Pumili ng game",

        gameName:
            "Pangalan ng Game",

        gameNamePlaceholder:
            "Ilagay ang pangalan ng game",

        orderName:
            "Pangalan ng Order",

        orderPlaceholder:
            "Ilagay ang produkto o item",

        continueWA:
            "Magpatuloy sa WhatsApp"
    },

    zh: {

        back:
            "← 返回商店",

        storyLabel:
            "我们的故事",

        storyTitle:
            "RBXSTORE.ID 背后的故事",

        story: [

            "RBXSTORE.ID 于 2025 年 7 月 30 日创立，最初的想法来自创始人在学校期间产生的一个简单构想。",

            "在最初阶段，RBXSTORE.ID 还没有网站或数字商店，第一个商品菜单是使用纸张制作的。",

            "随着这个想法不断发展，一位名叫 Jesslyn 的朋友使用 Canva 帮助制作了更加完善的商品菜单。",

            "随着时间推移，RBXSTORE.ID 不断完善商品目录，并推出促销、折扣以及更多游戏商品。",

            "2026 年 7 月，创始人开始使用 HTML、CSS、JavaScript、GitHub 和 GitHub Pages 开发独立网站。",

            "如今，RBXSTORE.ID 继续运营和发展，致力于为顾客提供简单便捷的数字游戏商品购买方式。"
        ],

        established:
            "成立于 2025 年 7 月 30 日。",

        support:
            "客户支持",

        reportTitle:
            "报告问题",

        reportDesc:
            "如果您在使用 RBXSTORE.ID 时遇到问题，请提交以下报告并提供相关信息。",

        name:
            "姓名",

        namePlaceholder:
            "您的姓名",

        category:
            "问题类别",

        describe:
            "描述问题",

        messagePlaceholder:
            "请描述您遇到的问题...",

        submit:
            "提交报告",

        reportNote:
            "报告将私下发送给 RBXSTORE.ID，不会影响商店的公开评分。",

        customLabel:
            "自定义订单",

        customTitlePage:
            "自定义购买",

        customIntro:
            "选择游戏并输入您想购买的商品。库存和价格将通过 WhatsApp 确认。",

        chooseGame:
            "选择游戏",

        gamePlaceholder:
            "选择游戏",

        gameName:
            "游戏名称",

        gameNamePlaceholder:
            "输入游戏名称",

        orderName:
            "商品名称",

        orderPlaceholder:
            "输入商品或物品名称",

        continueWA:
            "通过 WhatsApp 继续"
    },

    es: {

        back:
            "← Volver a la Tienda",

        storyLabel:
            "NUESTRA HISTORIA",

        storyTitle:
            "La Historia de RBXSTORE.ID",

        story: [

            "RBXSTORE.ID comenzó el 30 de julio de 2025 a partir de una idea sencilla que tuvo su fundador durante un día de escuela.",

            "Al principio, RBXSTORE.ID no tenía sitio web ni tienda digital. El primer menú de productos fue creado utilizando papel.",

            "A medida que la idea creció, una amiga llamada Jesslyn ayudó a crear un menú de productos mejorado utilizando Canva.",

            "Con el tiempo, RBXSTORE.ID amplió su catálogo e introdujo promociones, descuentos y más productos de videojuegos.",

            "En julio de 2026, el fundador comenzó a desarrollar un sitio web independiente utilizando HTML, CSS, JavaScript, GitHub y GitHub Pages.",

            "Actualmente, RBXSTORE.ID continúa operando y desarrollándose para ofrecer una forma sencilla y cómoda de comprar productos digitales de videojuegos."
        ],

        established:
            "Fundada el 30 de julio de 2025.",

        support:
            "ATENCIÓN AL CLIENTE",

        reportTitle:
            "Reportar un Problema",

        reportDesc:
            "¿Tienes algún problema con RBXSTORE.ID? Envía un reporte y proporciona información suficiente para que podamos entender el problema.",

        name:
            "Nombre",

        namePlaceholder:
            "Tu nombre",

        category:
            "Categoría del Problema",

        describe:
            "Describe el Problema",

        messagePlaceholder:
            "Describe el problema...",

        submit:
            "Enviar Reporte",

        reportNote:
            "Los reportes se envían de forma privada a RBXSTORE.ID y no afectan ninguna valoración pública de la tienda.",

        customLabel:
            "PEDIDO PERSONALIZADO",

        customTitlePage:
            "Pedido Personalizado",

        customIntro:
            "Selecciona un juego e introduce el producto que deseas comprar. La disponibilidad y el precio se confirmarán por WhatsApp.",

        chooseGame:
            "Seleccionar Juego",

        gamePlaceholder:
            "Selecciona un juego",

        gameName:
            "Nombre del Juego",

        gameNamePlaceholder:
            "Introduce el nombre del juego",

        orderName:
            "Nombre del Pedido",

        orderPlaceholder:
            "Introduce el producto o artículo",

        continueWA:
            "Continuar por WhatsApp"
    }
};


// ============================================================
// LANGUAGE SYSTEM
// ============================================================

const languageSelect =
    getElement("languageSelect");


function changeLanguage(language) {

    const t =
        translations[language];

    const extra =
        extraTranslations[language];

    const pageT =
        pageTranslations[language];

    if (!t || !extra || !pageT) {
        return;
    }

    currentLanguage =
        language;

    document.documentElement.lang =
        language;

    localStorage.setItem(
        "rbxLanguage",
        currentLanguage
    );


    // --------------------------------------------------------
    // HEADER
    // --------------------------------------------------------

    const headerSubtitle =
        document.querySelector(
            "header p"
        );

    if (headerSubtitle) {
        headerSubtitle.textContent =
            t.subtitle;
    }

    const openAbout =
        getElement("openAbout");

    if (openAbout) {
        openAbout.textContent =
            t.about;
    }

    const openReport =
        getElement("openReport");

    if (openReport) {
        openReport.textContent =
            t.report;
    }

    const shareStore =
        getElement("shareStore");

    if (shareStore) {
        shareStore.textContent =
            t.share;
    }


    // --------------------------------------------------------
    // PRODUCT LABELS
    // --------------------------------------------------------

    const cards =
document.querySelectorAll(
        ".game-card"
    );

    const labels = [

        t.selectNominal,
        t.selectProduct,
        t.selectProduct,
        t.selectDiamond,
        t.selectDiamonds,
        t.selectFC,
        t.selectDiamonds

    ];

    cards.forEach(
        function (card, index) {

            const label =
                card.querySelector(
                    "label"
                );

            if (
                label &&
                labels[index]
            ) {

                label.textContent =
                    labels[index];
            }
        }
    );


    // --------------------------------------------------------
    // WHATSAPP BUTTONS
    // --------------------------------------------------------

    const waButtons = [

        "waRobux",
        "waGarden",
        "waTTD",
        "waML",
        "waForest",
        "waFC",
        "waFF"

    ];

    waButtons.forEach(
        function (id) {

            const button =
                getElement(id);

            if (button) {

                button.textContent =
                    t.buyWA;
            }
        }
    );


    // --------------------------------------------------------
    // CUSTOM CARD
    // --------------------------------------------------------

    const customCard =
        document.querySelector(
            ".custom-order-card"
        );

    if (customCard) {

        const title =
            customCard.querySelector(
                "h2"
            );

        if (title) {

            title.textContent =
                t.customTitle;
        }

        const paragraphs =
            customCard.querySelectorAll(
                "p"
            );

        if (paragraphs[0]) {

            paragraphs[0].textContent =
                t.customDesc1;
        }

        if (paragraphs[1]) {

            paragraphs[1].textContent =
                t.customDesc2;
        }
    }

    const customOrder =
        getElement("customOrder");

    if (customOrder) {

        customOrder.textContent =
            t.customButton;
    }


    // --------------------------------------------------------
    // HOW TO ORDER
    // --------------------------------------------------------

    const howLabel =
        document.querySelector(
            ".how-label"
        );

    if (howLabel) {

        howLabel.textContent =
            extra.howTitle;
    }

    const howTitle =
        document.querySelector(
            ".how-to-order > h2"
        );

    if (howTitle) {

        howTitle.textContent =
            extra.howSubtitle;
    }

    const orderSteps =
        document.querySelectorAll(
            ".order-step"
        );

    orderSteps.forEach(
        function (step, index) {

            if (!extra.steps[index]) {
                return;
            }

            const h3 =
                step.querySelector(
                    "h3"
                );

            const p =
                step.querySelector(
                    "p"
                );

            if (h3) {

                h3.textContent =
                    extra.steps[index][0];
            }

            if (p) {

                p.textContent =
                    extra.steps[index][1];
            }
        }
    );


    // --------------------------------------------------------
    // FAQ
    // --------------------------------------------------------

    const faqTitle =
        document.querySelector(
            ".faq-section > h2"
        );

    if (faqTitle) {

        faqTitle.textContent =
            extra.faqTitle;
    }

    const faqLanguageItems =
        document.querySelectorAll(
            ".faq-item"
        );

    faqLanguageItems.forEach(
        function (item, index) {

            if (!extra.faq[index]) {
                return;
            }

            const question =
                item.querySelector(
                    ".faq-question"
                );

            if (question) {

                const plus =
                    question.querySelector(
                        "span"
                    );

                if (plus) {

                    question.childNodes[0]
                        .textContent =
                        extra.faq[index][0] +
                        " ";

                    plus.textContent =
                        "+";

                } else {

                    question.textContent =
                        extra.faq[index][0];
                }
            }

            const answer =
                item.querySelector(
                    ".faq-answer p"
                );

            if (answer) {

                answer.textContent =
                    extra.faq[index][1];
            }
        }
    );


    // --------------------------------------------------------
    // ABOUT PAGE
    // --------------------------------------------------------

    const aboutContent =
        document.querySelector(
            "#aboutPage .info-content"
        );

    if (aboutContent) {

        const closeAboutButton =
            getElement("closeAbout");

        if (closeAboutButton) {

            closeAboutButton.textContent =
                pageT.back;
        }

        const label =
            aboutContent.querySelector(
                ".info-label"
            );

        if (label) {

            label.textContent =
                pageT.storyLabel;
        }

        const title =
            aboutContent.querySelector(
                "h1"
            );

        if (title) {

            title.textContent =
                pageT.storyTitle;
        }

        const aboutParagraphs =
            aboutContent.querySelectorAll(
                "p"
            );

        pageT.story.forEach(
            function (text, index) {

                if (
                    aboutParagraphs[index + 1]
                ) {

                    aboutParagraphs[index + 1]
                        .textContent =
                        text;
                }
            }
        );

        const date =
            aboutContent.querySelector(
                ".about-date"
            );

        if (date) {

            date.textContent =
                pageT.established;
        }
    }


    // --------------------------------------------------------
    // REPORT PAGE
    // --------------------------------------------------------

    const reportContent =
        document.querySelector(
            "#reportPage .info-content"
        );

    if (reportContent) {

        const closeReportButton =
            getElement("closeReport");

        if (closeReportButton) {

            closeReportButton.textContent =
                pageT.back;
        }

        const label =
            reportContent.querySelector(
                ".info-label"
            );

        if (label) {

            label.textContent =
                pageT.support;
        }

        const title =
            reportContent.querySelector(
                "h1"
            );

        if (title) {

            title.textContent =
                pageT.reportTitle;
        }

        const description =
            reportContent.querySelector(
                "h1 + p"
            );

        if (description) {

            description.textContent =
                pageT.reportDesc;
        }

        const reportName =
            getElement("reportName");

        const reportMessage =
            getElement("reportMessage");

        const nameLabel =
            document.querySelector(
                'label[for="reportName"]'
            );

        if (nameLabel) {

            nameLabel.textContent =
                pageT.name;
        }

        if (reportName) {

            reportName.placeholder =
                pageT.namePlaceholder;
        }

        const categoryLabel =
            document.querySelector(
                'label[for="reportCategory"]'
            );

        if (categoryLabel) {

            categoryLabel.textContent =
                pageT.category;
        }

        const messageLabel =
            document.querySelector(
                'label[for="reportMessage"]'
            );

        if (messageLabel) {

            messageLabel.textContent =
                pageT.describe;
        }

        if (reportMessage) {

            reportMessage.placeholder =
                pageT.messagePlaceholder;
        }

        const submitButton =
            reportContent.querySelector(
                '#reportForm button[type="submit"]'
            );

        if (submitButton) {

            submitButton.textContent =
                pageT.submit;
        }

        const reportNote =
            reportContent.querySelector(
                ".report-note"
            );

        if (reportNote) {

            reportNote.textContent =
                pageT.reportNote;
        }
    }


    // --------------------------------------------------------
    // CUSTOM ORDER PAGE
    // --------------------------------------------------------

    const customPage =
        document.querySelector(
            "#customOrderPage .info-content"
        );

    if (customPage) {

        const closeCustom =
            getElement(
                "closeCustomOrder"
            );

        if (closeCustom) {

            closeCustom.textContent =
                pageT.back;
        }

        const label =
            customPage.querySelector(
                ".info-label"
            );

        if (label) {

            label.textContent =
                pageT.customLabel;
        }

        const title =
            customPage.querySelector(
                "h1"
            );

        if (title) {

            title.textContent =
                pageT.customTitlePage;
        }

        const intro =
            customPage.querySelector(
                "h1 + p"
            );

        if (intro) {

            intro.textContent =
                pageT.customIntro;
        }

        const gameLabel =
            document.querySelector(
                'label[for="customGame"]'
            );

        if (gameLabel) {

            gameLabel.textContent =
                pageT.chooseGame;
        }

        const customGameSelect =
            getElement("customGame");

        if (
            customGameSelect &&
            customGameSelect.options.length > 0
        ) {

            customGameSelect.options[0]
                .textContent =
                pageT.gamePlaceholder;
        }

        const otherGameLabel =
            document.querySelector(
                'label[for="otherGame"]'
            );

        if (otherGameLabel) {

            otherGameLabel.textContent =
                pageT.gameName;
        }

        const otherGameInput =
            getElement("otherGame");

        if (otherGameInput) {

            otherGameInput.placeholder =
                pageT.gameNamePlaceholder;
        }

        const itemLabel =
            document.querySelector(
                'label[for="customItem"]'
            );

        if (itemLabel) {

            itemLabel.textContent =
                pageT.orderName;
        }

        const customItemInput =
            getElement("customItem");

        if (customItemInput) {

            customItemInput.placeholder =
                pageT.orderPlaceholder;
        }

        const customSubmit =
            customPage.querySelector(
                '#customOrderForm button[type="submit"]'
            );

        if (customSubmit) {

            customSubmit.textContent =
                pageT.continueWA;
        }
    }


    // --------------------------------------------------------
    // CART
    // --------------------------------------------------------

    const cartButton =
        getElement("openCart");

    if (cartButton) {

        const span =
            cartButton.querySelector(
                "span"
            );

        if (span) {

            span.textContent =
                t.cart;
        }
    }

    const cartTitle =
        document.querySelector(
            "#cartPanel h2"
        );

    if (cartTitle) {

        cartTitle.textContent =
            t.yourCart;
    }

    const checkoutButton =
        getElement("checkoutCart");

    if (checkoutButton) {

        checkoutButton.textContent =
            t.checkoutWA;
    }

    const closeCartButton =
        getElement("closeCart");

    if (closeCartButton) {

        closeCartButton.setAttribute(
            "aria-label",
            t.cancel
        );
    }


    // --------------------------------------------------------
    // ORDER CONFIRMATION
    // --------------------------------------------------------

    const confirmationTitle =
        document.querySelector(
            "#orderConfirm h2"
        );

    if (confirmationTitle) {

        confirmationTitle.textContent =
            t.confirmOrder;
    }

    const cancelButton =
        getElement("cancelOrder");

    if (cancelButton) {

        cancelButton.textContent =
            t.cancel;
    }

    const continueButton =
        getElement("continueOrder");

    if (continueButton) {

        continueButton.textContent =
            t.continueWA;
    }


    // --------------------------------------------------------
    // WELCOME POPUP
    // --------------------------------------------------------

    const welcomeTitle =
        document.querySelector(
            "#welcomePopup h2"
        );

    if (welcomeTitle) {

        welcomeTitle.textContent =
            t.welcome;
    }

    const welcomeButton =
        getElement("welcomeContinue");

    if (welcomeButton) {

        welcomeButton.textContent =
            t.continueStore;
    }

// --------------------------------------------------------
// UPDATE ADD TO CART BUTTONS
// --------------------------------------------------------

document
    .querySelectorAll(".add-cart-button")
    .forEach(function (button) {

        button.textContent =
            translations[
                currentLanguage
            ].addToCart;
    });

    
    // --------------------------------------------------------
    // REFRESH CART
    // --------------------------------------------------------

    if (
        typeof renderCart ===
        "function"
    ) {

        renderCart();
    }
}


// ============================================================
// LANGUAGE SELECT
// ============================================================

if (languageSelect) {

    languageSelect.value =
        currentLanguage;

    languageSelect.addEventListener(
        "change",
        function () {

            changeLanguage(
                this.value
            );
        }
    );
}


// ============================================================
// SHOPPING CART
// ============================================================

let cart = JSON.parse(
    localStorage.getItem(
        "rbxCart"
    ) || "[]"
);


const openCart =
    getElement("openCart");

const closeCart =
    getElement("closeCart");

const cartPanel =
    getElement("cartPanel");

const cartItems =
    getElement("cartItems");

const cartCount =
    getElement("cartCount");

const cartTotal =
    getElement("cartTotal");

const checkoutCart =
    getElement("checkoutCart");


function formatCartPrice(price) {

    return formatHarga(
        price
    );
}


function saveCart() {

    localStorage.setItem(
        "rbxCart",
        JSON.stringify(cart)
    );
}


function renderCart() {

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML =
        "";

    let subtotal = 0;

    cart.forEach(
        function (item, index) {

            subtotal +=
                Number(item.price) || 0;

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "cart-item";

            const product =
                document.createElement(
                    "strong"
                );

            product.textContent =
                item.product;

            const order =
                document.createElement(
                    "small"
                );

            order.textContent =
                item.order;

            const price =
                document.createElement(
                    "small"
                );

            price.textContent =
                formatCartPrice(
                    item.price
                );

            const remove =
                document.createElement(
                    "button"
                );

            remove.className =
                "cart-remove";

            remove.textContent =
                translations[
                    currentLanguage
                ].remove;

            remove.addEventListener(
                "click",
                function () {

                    removeCartItem(
                        index
                    );
                }
            );

            div.appendChild(
                product
            );

            div.appendChild(
                document.createElement(
                    "br"
                )
            );

            div.appendChild(
                order
            );

            div.appendChild(
                document.createElement(
                    "br"
                )
            );

            div.appendChild(
                price
            );

            div.appendChild(
                remove
            );

            cartItems.appendChild(
                div
            );
        }
    );


    // --------------------------------------------------------
    // EMPTY CART
    // --------------------------------------------------------

    if (cart.length === 0) {

        const empty =
            document.createElement(
                "p"
            );

        empty.textContent =
            translations[
                currentLanguage
            ].emptyCart;

        cartItems.appendChild(
            empty
        );
    }


    // --------------------------------------------------------
    // AUTOMATIC DISCOUNT
    // --------------------------------------------------------

    const baseDiscount =
        subtotal > 30000
            ? Math.round(
                subtotal * 0.10
            )
            : 0;


    // --------------------------------------------------------
    // PROMO DISCOUNT
    // --------------------------------------------------------

    const promoDiscount =
        activePromoCode
            ? Math.round(
                subtotal * 0.05
            )
            : 0;

    const totalDiscount =
        baseDiscount +
        promoDiscount;

    const total =
        subtotal -
        totalDiscount;


    // --------------------------------------------------------
    // REMOVE OLD SUMMARY
    // --------------------------------------------------------

    const oldSummary =
        getElement(
            "cartPriceSummary"
        );

    if (oldSummary) {

        oldSummary.remove();
    }


    // --------------------------------------------------------
    // PRICE SUMMARY
    // --------------------------------------------------------

    if (checkoutCart) {

        const summary =
            document.createElement(
                "div"
            );

        summary.id =
            "cartPriceSummary";

        let summaryHTML =
            `
            <div class="cart-price-row">
                <span>
                    ${translations[currentLanguage].price}
                </span>

                <strong>
                    ${formatCartPrice(subtotal)}
                </strong>
            </div>
            `;

        if (baseDiscount > 0) {

            summaryHTML +=
                `
                <div class="cart-price-row discount-row">
                    <span>
                        ${translations[currentLanguage].discount}
                    </span>

                    <strong>
                        -10% (${formatCartPrice(baseDiscount)})
                    </strong>
                </div>
                `;
        }

        if (
            activePromoCode &&
            promoDiscount > 0
        ) {

            summaryHTML +=
                `
                <div class="cart-price-row discount-row">
                    <span>
                        Promo ${activePromoCode}
                    </span>

                    <strong>
                        -5% (${formatCartPrice(promoDiscount)})
                    </strong>
                </div>
                `;
        }

        summaryHTML +=
            `
            <div class="cart-price-total">
                <span>
                    ${translations[currentLanguage].total}
                </span>

                <strong>
                    ${formatCartPrice(total)}
                </strong>
            </div>
            `;

        summary.innerHTML =
            summaryHTML;

        checkoutCart.parentNode.insertBefore(
            summary,
            checkoutCart
        );
    }


    // --------------------------------------------------------
    // CART COUNT
    // --------------------------------------------------------

    if (cartCount) {

        cartCount.textContent =
            cart.length;
    }

    if (cartTotal) {

        cartTotal.textContent =
            formatCartPrice(
                total
            );
    }
}


// ============================================================
// ADD TO CART
// ============================================================

function addToCart(
    product,
    order,
    price
) {

    cart.push({

        product:
            product,

        order:
            order,

        price:
            Number(price)

    });

    saveCart();

    renderCart();

    alert(
        translations[
            currentLanguage
        ].addToCart
    );
}


// ============================================================
// REMOVE CART ITEM
// ============================================================

function removeCartItem(index) {

    if (
        index < 0 ||
        index >= cart.length
    ) {

        return;
    }

    cart.splice(
        index,
        1
    );

    saveCart();

    renderCart();
}


// ============================================================
// OPEN / CLOSE CART
// ============================================================

if (
    openCart &&
    cartPanel
) {

    openCart.addEventListener(
        "click",
        function () {

            cartPanel.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";
        }
    );
}

if (
    closeCart &&
    cartPanel
) {

    closeCart.addEventListener(
        "click",
        function () {

            cartPanel.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";
        }
    );
}


// ============================================================
// CHECKOUT CART
// ============================================================

if (checkoutCart) {

    checkoutCart.addEventListener(
        "click",
        function () {

            if (
                cart.length === 0
            ) {

                alert(
                    translations[
                        currentLanguage
                    ].emptyCart
                );

                return;
            }

            let subtotal = 0;

            let daftarPesanan =
                "";

            cart.forEach(
                function (
                    item,
                    index
                ) {

                    subtotal +=
                        Number(
                            item.price
                        ) || 0;

                    daftarPesanan +=
`${index + 1}. ${item.product}
   Pesanan: ${item.order}
   Harga: ${formatCartPrice(item.price)}

`;
                }
            );

            const baseDiscount =
                subtotal > 30000
                    ? Math.round(
                        subtotal * 0.10
                    )
                    : 0;

            const promoDiscount =
                activePromoCode
                    ? Math.round(
                        subtotal * 0.05
                    )
                    : 0;

            const totalDiscount =
                baseDiscount +
                promoDiscount;

            const total =
                subtotal -
                totalDiscount;

            let pesan =
`Halo RBXSTORE.ID.

Saya ingin memesan beberapa produk:

${daftarPesanan}
Harga: ${formatCartPrice(subtotal)}`;

            if (
                baseDiscount > 0
            ) {

                pesan +=
`
Diskon: -10% (${formatCartPrice(baseDiscount)})`;
            }

            if (
                activePromoCode &&
                promoDiscount > 0
            ) {

                pesan +=
`
Promo Code: ${activePromoCode}
Diskon Promo: -5% (${formatCartPrice(promoDiscount)})`;
            }

            if (
                totalDiscount > 0
            ) {

                pesan +=
`
Total Diskon: -${formatCartPrice(totalDiscount)}
Total: ${formatCartPrice(total)}`;

            } else {

                pesan +=
`
Total: ${formatCartPrice(total)}`;
            }

            pesan +=
`

Mohon diproses pesanannya. Terima kasih.`;

            bukaWhatsApp(
                pesan
            );
        }
    );
}


// ============================================================
// ADD TO CART BUTTONS
// ============================================================

window.addEventListener(
    "load",
    function () {

        document
            .querySelectorAll(
                ".game-card"
            )
            .forEach(
                function (card) {

                    const select =
                        card.querySelector(
                            "select"
                        );

                    if (!select) {
                        return;
                    }

                    const buttons =
                        card.querySelectorAll(
                            "button"
                        );

                    if (!buttons.length) {
                        return;
                    }

                    const buyButton =
                        buttons[
                            buttons.length - 1
                        ];

                    if (
                        card.querySelector(
                            ".add-cart-button"
                        )
                    ) {

                        return;
                    }

                    const addButton =
                        document.createElement(
                            "button"
                        );

                    addButton.className =
                        "add-cart-button";

                    addButton.textContent =
                        translations[
                            currentLanguage
                        ].addToCart;

                    addButton.addEventListener(
                        "click",
                        function () {

                            if (
                                !select.value ||
                                select.value ===
                                "custom"
                            ) {

                                alert(
                                    "Pilih produk terlebih dahulu."
                                );

                                return;
                            }

                            const option =
                                select.options[
                                    select.selectedIndex
                                ];

                            const order =
                                option.text
                                    .split(" - Rp")[0]
                                    .trim();

                            const price =
                                Number(
                                    select.value
                                );

                            if (
                                !price ||
                                price <= 0
                            ) {

                                alert(
                                    "Harga produk tidak valid."
                                );

                                return;
                            }

                            const product =
                                card.querySelector(
                                    "h2"
                                );

                            addToCart(

                                product
                                    ? product.textContent.trim()
                                    : "Product",

                                order,

                                price
                            );
                        }
                    );

                    buyButton.parentNode.insertBefore(
                        addButton,
                        buyButton
                    );
                }
            );
    }
);


// ============================================================
// FLOATING WHATSAPP
// ============================================================

const floatingWhatsApp =
    getElement(
        "floatingWhatsApp"
    );

if (floatingWhatsApp) {

    floatingWhatsApp.addEventListener(
        "click",
        function () {

            const pesan =
                "Halo RBXSTORE.ID. Saya ingin bertanya mengenai produk.";

            const url =
                createWhatsAppURL(
                    pesan
                );

            window.open(
                url,
                "_blank"
            );
        }
    );
}


// ============================================================
// INITIALIZE
// ============================================================

changeLanguage(
    currentLanguage
);

renderCart();


// ============================================================
// END OF RBXSTORE.ID SCRIPT
// ============================================================