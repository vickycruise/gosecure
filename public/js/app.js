$(document).ready(function () {
    toastr.options = {
        "debug": false,
    "positionClass": "toast-top-center", // Adjust position to start from the top
    "onclick": null,
    "closeButton": true,
    "progressBar": true,
    "fadeIn": 500,
    "fadeOut": 1000,
    "timeOut": 2500,
    };

    $("#encryptForm").submit(function (event) {
        event.preventDefault();

        var formData = new FormData(this);

        encryptFile(formData);
    });
    $("#decryptForm").submit(function (event) {
        event.preventDefault();

        var formData = new FormData(this);

        decryptFile(formData);
    });
});
// decrypt-file
function encryptFile(formData) {
    $.ajax({
        url: "/encrypt-file",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            response=JSON.parse(response);
            if (response.success) {
                toastr.success(response.message);
                downloadFile(response);
                
            } else {
                toastr.error("test");
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
            toastr.error("An error occurred. Please try again.");
        },
    });
}
function decryptFile(formData) {
    $.ajax({
        url: "/decrypt-file",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(typeof response);
            response=JSON.parse(response);

            if (response.success) {
                toastr.success(response.message);
                // Download decrypted file
                downloadFile(response);
            } else {
                toastr.error("testssss");
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
            toastr.error("An error occurred. Please try again.");
        },
    });
}
function downloadFile(response) {
    // Convert decrypted content (base64 encoded) to Blob\
    var content=response.content;
    var filename=response.filename;
    var blob = new Blob([content], { type: 'application/octet-stream' });
    var url = window.URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    console.log(filename);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename??'sample.txt'; // Specify the default filename
    document.body.appendChild(a);
    a.click();
    // Remove the temporary anchor element
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
filePicker = (action) => {
    let filename = document.getElementById(action=="encrypt"?"en-file-txt":"de-file-txt");

    let filePickerElement = document.getElementById(action=="encrypt"?"encrypt-file-picker":"decrypt-file-picker");
    filePickerElement.click();
    filePickerElement.addEventListener("change", (event) => {
        if (action === "encrypt") {
            filename.innerText = event.target.files[0]?.name || "Click the file icon to select a file to encrypt";
        } else if (action === "decrypt"){
            filename.innerText = event.target.files[0]?.name || "Click the file icon to select a file to decrypt";
        }
    });
};
