<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect()->to('/home');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::post('/encrypt-file', [App\Http\Controllers\AjaxController::class, 'encryptFile'])->name('encrypt.file');
Route::post('/decrypt-file', [App\Http\Controllers\AjaxController::class, 'decryptFile'])->name('decrypt.file');

