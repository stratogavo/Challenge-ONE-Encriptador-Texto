// Función que es llamada desde el evento onclick del botón de encriptar
function getEncryptedText() {
    let outputText = document.getElementById('output-text');
    let isValidInput = validateInputText(inputText.value);
    if (inputText.value != "" && isValidInput) {
        showOutputArea(true);
        outputText.value = encrypt(inputText.value);
    }
    else {
        showOutputArea(false);
    }
}
// Función para encriptar texto por sustitución de las llaves definidas por el usuario
function encrypt(message) {
    let encryptedMsg = message;
    for (const key in encryptedKeys) {
        encryptedMsg = encryptedMsg.replaceAll(key, encryptedKeys[key]);
    }
    return encryptedMsg;
}
// Función que es llamada desde el evento onclick del botón desencriptar
function getDecryptedText() {
    let outputText = document.getElementById('output-text');
    let isValidInput = validateInputText(inputText.value);
    if (inputText.value != "" && isValidInput) {
        showOutputArea(true);
        outputText.value = decrypt(inputText.value);
    }
    else {
        showOutputArea(false);
    }
}
// Función para desencriptar texto por sustitución de las llaves definidas por el usuario
function decrypt(message) {
    let encryptedMsg = message;
    for (const key in encryptedKeys) {
        encryptedMsg = encryptedMsg.replaceAll(encryptedKeys[key], key);
    }
    return encryptedMsg;
}
// Función para validar que el texto de entrada sólo contenga caracteres validos
function validateInputText(message) {
    let validInputPattern = /^[a-zñ¡¿°¬\n\u0020-\u0040\u005B-\u0060\u007B-\u00A0]*$/;
    if (validInputPattern.test(message)) {
        return true;
    }
    else{
        showModalContent("Texto no válido", 
            "No se permiten mayúsculas, acentos, diéresis ni caracteres especiales de otros idiomas");
        return false;
    }
}
// Función para inicializar elementos
function initEncrypter() {
    document.getElementById('input-text').value = "";
    document.getElementById('open-modal').checked = false;
    
}
//Función para mostrar / ocultar el panel de texto de salida y el panel de "Ningún mensaje encontrado"
function showOutputArea(visible) {
    let outputArea = document.getElementById('output-area');
    let noOutput = document.getElementById('no-output');
    if(visible) {
        outputArea.classList.remove('hidden-block')
        noOutput.classList.add('hidden-block');
    } else {
        outputArea.classList.add('hidden-block')
        noOutput.classList.remove('hidden-block');
    }
}
// Función para cambiar el estilo CSS de un boton dependiendo de si se encuentra habilidado o no
function enableInputButtons() {
    if(inputText.value != "") {
        encryptButton.classList.add('alura-btn-enabled');
        decryptButton.classList.remove('light-blue-btn');
        decryptButton.classList.add('alura-btn-enabled');
    } 
    else {
        decryptButton.classList.add('light-blue-btn');
        encryptButton.classList.remove('alura-btn-enabled');
        decryptButton.classList.remove('alura-btn-enabled');
    }
}
// Función para copiar al clipboard el texto de salida
function copyToClipboard() {
    let outputText = document.getElementById('output-text');
    navigator.clipboard.writeText(outputText.value);
    showModalContent("Texto copiado", 
            "El texto de salida se ha copiado al portapapeles");
}
// Función para cargar automáticamente el año actual en el footer
function getFooterYear() {
    let footerYear = document.getElementById('current-year');
    let dateObject = new Date();
    footerYear.textContent = dateObject.getFullYear();
}
// Función para modificar el título y contenido del diálogo modal
function showModalContent(title, content) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-content').textContent = content;
    document.getElementById('open-modal').checked = true;
}
// Declaración de llaves de encriptación
const encryptedKeys = { 
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u:"ufat" 
};
// Variables de los elementos de la UI
let encryptButton   = document.getElementById('encrypt-button');
let decryptButton   = document.getElementById('decrypt-button');
let copyButton      = document.getElementById('copy-button');
let inputText       = document.getElementById('input-text');
// Se inicalizan elementos de encriptador
initEncrypter();
// Se carga en año actual en footer para copyright
getFooterYear();
// Eventos de los elementos de la UI
encryptButton.onclick   = getEncryptedText;
decryptButton.onclick   = getDecryptedText;
copyButton.onclick      = copyToClipboard;
inputText.oninput       = enableInputButtons;