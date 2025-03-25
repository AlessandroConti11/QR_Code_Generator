const
    qr_box = document.querySelector(".container"),
    qr_input = document.querySelector("#qr-input"),
    error_correction = document.querySelector("#error-correction"),
    generated_image = document.querySelector("#generated-image"),
    customize = document.querySelector(".customize"),
    margin = document.querySelector("#margin"),
    size = document.querySelector("#size"),
    color = document.querySelector("#color"),
    background_color = document.querySelector("#background-color"),
    download_button = document.querySelector("#download-button");


qr_input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        generate_qr();
    }
});



async function generate_qr() {
    let qr_value = qr_input.value.trim();


    if (!qr_value) {
        alert("Please enter string.");
        return
    }


    let url = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qr_value}&ecc=${error_correction.value}&margin=${margin.value}&size=${size.value}&color=${color.value.substring(1)}&bgcolor=${background_color.value.substring(1)}`;
    let response = await fetch(url);

    if(!response.ok) {
        alert(`Error: Unable to create QR code.`);
        return;
    }


    generated_image.src = url;

    generated_image.addEventListener("load", () => {
        qr_box.classList.add("active");
        generated_image.style.display = "block";
        download_button.style.display = "block";
    });


    download_button.addEventListener("click", function () {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                let link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = qr_value + "_QR_code.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(() => alert("Error in downloading the image."));
    });


    //Hide the customize options container
    if (customize.classList.contains("expanded")){
        toggle_customize_qr_options();
    }
}



/**
 * Function that shows or hides the customize options.
 */
function toggle_customize_qr_options() {
    customize.classList.toggle("expanded");
}