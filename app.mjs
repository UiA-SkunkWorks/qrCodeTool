import { readBarcodes, writeBarcode } from "zxing-wasm";

const options = { format: "QRCode", scale: 15, EcLevel: "L" };
const input = document.getElementById("input");
const generateBt = document.getElementById("generateBt");
const downloadBT = document.getElementById("downloadBt");
const output = document.getElementById("output");

let qrCode = null;


generateBt.onclick = async (e) => {
    qrCode = await writeBarcode(input.value, options)
    output.setAttribute("src", URL.createObjectURL(qrCode.image));
    downloadBT.removeAttribute("disabled")
}

downloadBT.onclick = async (e) => {
    console.log("wtf");
    let a = document.createElement("a");
    a.href = "data:image/png;base64," + await blobToBase64(qrCode.image);
    a.download = "qr.png";
    a.click();
}

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };

        reader.onerror = reject;

        reader.readAsDataURL(blob);
    });
}

