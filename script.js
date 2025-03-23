const qr_box = document.querySelector(".qr_box"),
    qrInput = qr_box.querySelector(".form input"),
    generateBtn = qr_box.querySelector(".form button"),
    qrImg = qr_box.querySelector(".qr-code img"),
    errorCorrectionSelect = qr_box.querySelector(".error-correction"),
    margin = qr_box.querySelector("#margin"),
    size = qr_box.querySelector("#size"),
    color = qr_box.querySelector("#color"),
    background = qr_box.querySelector("#background-color");


let preValue;


generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    let errorCorrection = errorCorrectionSelect.value;  // Ottieni il valore della correzione dell'errore
    console.log(color.value);
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";

    // Genera l'URL del QR code con il parametro di correzione dell'errore
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=20000x20000&data=${qrValue}&ecc=${errorCorrection}&margin=${margin.value}&size=${size.value}&color=${color.value.substring(1)}&bgcolor=${background.value.substring(1)}`;

    qrImg.addEventListener("load", () => {
        qr_box.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
});


qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        qr_box.classList.remove("active");
        preValue = "";
    }
});