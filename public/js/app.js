
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
   
                encryptFile(formData);
           
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
           
                decryptFile(formData);
          
        }
  

    });
});
// decrypt-file
async function  encryptFile (formData)  {
    $('body').animate({ scrollTop: 0 }, 'slow');
   $(".overlay").removeClass('hidden');
   $('body').css('overflow', 'hidden');
    $.ajax({
        url: "/encrypt-file",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,  
    
        success: function (response) {
            setTimeout(()=>{
                downloadFile(response);
            },5000);
        },
        error: function (xhr, status, error) {
            $(".overlay").addClass('hidden');   
            $('body').css('overflow', 'auto');
        
            console.error(error);
            toastr.error("An error occurred. Please try again.");
         
        },
    });
}
function decryptFile(formData) {
    $('body').animate({ scrollTop: 0 }, 'slow');
    $(".overlay").removeClass('hidden');
    $('body').css('overflow', 'hidden');
    $.ajax({
        url: "/decrypt-file",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) { 
            setTimeout(()=>{
                downloadFile(response);
            },5000);
        },
        error: function (xhr, status, error) {
            $(".overlay").addClass('hidden');   
            $('body').css('overflow', 'auto');
            console.error(error);
            toastr.error("An error occurred. Please try again.");
        },
    });
}
function downloadFile(response) {
    // Convert decrypted content (base64 encoded) to Blob
    $(".overlay").addClass('hidden');   
    $('body').css('overflow', 'auto');

     response=JSON.parse(response);
    if (response.success) {
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
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        Swal.fire({
            title: 'success!',
            text: response.message??'operation successfully completed',
            icon: 'success',
            confirmButtonText: 'OK'
          });
    } else if(response.message) {
        Swal.fire({
            title: 'error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });            }
 
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
