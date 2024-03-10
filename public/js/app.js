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
    $("#encryptForm").submit(async function (event) {
        event.preventDefault();
        
        // Check if file input is empty
        var fileInput = $("#encrypt-file-picker")[0]; // Assuming your file input field has an id of "encrypt-file-picker"
        if (fileInput.files.length === 0) {
            Swal.fire({
                title: "Warning",
                text: "Please select a file",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return; // Stop further execution
        }
    
        const { value: password, dismiss: action } = await Swal.fire({
            title: "Enter your password",
            input: "password",
            inputLabel: "Password",
            inputPlaceholder: "Enter your password",
            inputAttributes: {
                maxlength: "10",
                autocapitalize: "off",
                autocorrect: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            cancelButtonText: "Cancel"
        });
    
        if (action === Swal.DismissReason.cancel) {
            // Handle cancel action
         return;
        } else if (password) {
            // Append password to the form data
            var formData = new FormData(this);
            formData.append("password", password);
    
            // Proceed with encrypting the file after a delay of 2000 milliseconds (2 seconds)
            setTimeout(() => {
                encryptFile(formData);
            }, 2000);
        }
    });
    
    $("#decryptForm").submit(async function (event) {
        event.preventDefault();
        var fileInput = $("#decrypt-file-picker")[0]; // Assuming your file input field has an id of "encrypt-file-picker"
        if (fileInput.files.length === 0) {
            Swal.fire({
                title: "Warning",
                text: "Please select a file",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return; // Stop further execution
        }
    
        const { value: password, dismiss: action } = await Swal.fire({
            title: "Enter your password",
            input: "password",
            inputLabel: "Password",
            inputPlaceholder: "Enter your password",
            inputAttributes: {
                maxlength: "10",
                autocapitalize: "off",
                autocorrect: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            cancelButtonText: "Cancel"
        });
    
        if (action === Swal.DismissReason.cancel) {
            // Handle cancel action
          return;
        } else if (password) {
            // Append password to the form data
            var formData = new FormData(this);
            formData.append("password", password);
    
            // Proceed with encrypting the file after a delay of 2000 milliseconds (2 seconds)
            setTimeout(() => {
                decryptFile(formData);
            }, 2000);
        }
  

    });
});
// decrypt-file
async function  encryptFile (formData)  {
    var loader = $('<div class="loader">Uploading: <span class="progress">0%</span></div>');
    $('body').append(loader);

    $.ajax({
        url: "/encrypt-file",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,  
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = (evt.loaded / evt.total) * 100;
                    console.log(percentComplete);
                    $('.progress').text(percentComplete.toFixed(2) + "%");
                }
            }, false);
            return xhr;
        },

        success: function (response) {
            loader.remove();
            response=JSON.parse(response);
            if (response.success) {
                Swal.fire({
                    title: 'success!',
                    text: 'File has been encrypted successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  });
                downloadFile(response);
                
            } else if(response.message) {
                Swal.fire({
                    title: 'error!',
                    text: response.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });            }
        },
        error: function (xhr, status, error) {
            console.error(error);
            toastr.error("An error occurred. Please try again.");
            loader.remove();
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
                Swal.fire({
                    title: 'success!',
                    text: 'File has been encrypted successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  });
                downloadFile(response);
                
            } else if(response.message) {
                Swal.fire({
                    title: 'error!',
                    text: response.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });            }
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
        let pickedFile= event.target.files[0];
        if (action === "encrypt") {
            filename.innerText =pickedFile?.name || "Click the file icon to select a file to encrypt";
        } else if (action === "decrypt"){
            filename.innerText = pickedFile?.name || "Click the file icon to select a file to decrypt";
        }
    });
};
