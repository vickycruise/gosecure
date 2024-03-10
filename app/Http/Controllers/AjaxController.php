<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use App\Models\FilesCrypt; 
class AjaxController extends Controller
{
    
   public function __construct()
   {
       $this->middleware('auth');
   }

   /**
    * Show the application dashboard.
    *
    * @return \Illuminate\Contracts\Support\Renderable
    */
   public function index()
   {
       return view('home');
   }
    public function encryptFile(Request $request)
    {
        $file = $request->file('encryptfile');
            
        if (!$file) {
            return response()->json([
                'success' => false,
                'message' => 'No file provided.'
            ]);
        }
        $passphrase = $request->input('password');

        $fileName = $file->getClientOriginalName();
        // Generate a random initialization vector (IV)
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
    
        // Generate a key from the passphrase
        $key = openssl_pbkdf2($passphrase, 'salt', 32, 1000, 'sha256');
    
        // Encrypt the file
        $encryptedData = openssl_encrypt(file_get_contents($file), 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
    
        // Concatenate file name with encrypted data using a separator
        $fileNameEncryptedData = $file->getClientOriginalName() . ':' . $iv . $encryptedData;
    
        // Base64 encode the concatenated string
        $fileNameEncryptedData = base64_encode($fileNameEncryptedData);
    
        return response()->json([
            'success' => true,
            'message' => 'File encrypted successfully.',
            'filename'=>$fileName,
            'content' => $fileNameEncryptedData,
        ]);
    }
    
    public function decryptFile(Request $request)
    {
        try {
            $file = $request->file('decryptfile');
    
            if (!$file) {
                return response()->json([
                    'success' => false,
                    'message' => 'No file provided.'
                ]);
            }
    
            $content = file_get_contents($file->path());
            $fileData = base64_decode($content);
    
            // Extract file name and encrypted data using the separator ':'
            $parts = explode(':', $fileData, 2);
            if (count($parts) != 2) {
                return response()->json([
                    'success' => false,
                    'message' => 'Please select correct file'
                ]);
            }
                $fileName = $parts[0];
            $encryptedData = $parts[1];
    
            $passphrase = $request->input('password');
    
            // Extract the initialization vector (IV) from the encrypted data
            $iv = substr($encryptedData, 0, openssl_cipher_iv_length('aes-256-cbc'));
    
            // Generate a key from the passphrase
            $key = openssl_pbkdf2($passphrase, 'salt', 32, 1000, 'sha256');
    
            // Decrypt the data
            $decryptedData = openssl_decrypt(substr($encryptedData, openssl_cipher_iv_length('aes-256-cbc')), 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
            
            if (!$decryptedData) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to decrypt file.',
                ]);
            }
    
            return response()->json([
                'success' => true,
                'content' => $decryptedData,
                'filename' => $fileName,
                'message' => 'File decrypted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred: ' . $e->getMessage(),
            ]);
        }
    }
    

    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
?>  