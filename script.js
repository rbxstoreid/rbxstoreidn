const robux = document.getElementById("robux");
const hargaRobux = document.getElementById("hargaRobux");
const customBox = document.getElementById("customRobuxBox");

robux.addEventListener("change", function(){

    if(this.value=="custom"){
        customBox.style.display="block";
        hargaRobux.innerHTML="Harga : Menunggu Konfirmasi";
    }else{
        customBox.style.display="none";

        let harga=Number(this.value);

        hargaRobux.innerHTML="Rp "+harga.toLocaleString("id-ID");
    }

});