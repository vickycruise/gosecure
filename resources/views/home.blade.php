@extends('layouts.footer')
@extends('layouts.app')
@section('body')
@section('content')
    <div class="container">
        <img src="/images/home.png" class="img-fluid animated">
        <h2 class="mt-3">Welcome to <span>Go Secure</span></h2>
        <div class="row ">
            <div class="col-sm-12">

                <h1 class="node__title h2">
                    <div
                        class="field mx-auto field--name-field-header-title field--type-string field--label-hidden field__item">
                        File Encryption</div>
                </h1>
                <div class="lead">
                    <p>A PRIMER ON FILE ENCRYPTION</p>

                    <p>There is no doubt that encrypting sensitive files at rest and in motion is essential to guard against
                        cyberthreats and for compliance with local, national, or industry-standard requirements. Discover
                        the basics of file transfer encryption, how it works, and how to choose the best way to encrypt your
                        files.</p>
                </div>
                <br>
                <div class="lead">
                    <div
                        class="paragraph-list-items paragraph-checklist align-items-stretch justify-content-center flex-wrap row">

                        <div class="list-item col-md-6 border border-start border-success" >
                            <div class="px-4 py-2 bg-7 d-block h-100">
                                <div class="item-content">
                                    <h3 class="item-title">
                                        Algorithm
                                    </h3>

                                    <div
                                        class="clearfix text-formatted field field--name-field-icon-text field--type-text-long field--label-hidden field__item">
                                        <p>Also known as ciphers, algorithms are the rules or instructions for the
                                            encryption process. Triple DES, RSA, and AES are examples of encryption
                                            algorithms, or ciphers.</p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="list-item col-md-6">
                            <div class="px-4 py-2 bg-7 d-block h-100">
                                <div class="item-content">
                                    <h3 class="item-title">
                                        Decryption
                                    </h3>

                                    <div
                                        class="clearfix text-formatted field field--name-field-icon-text field--type-text-long field--label-hidden field__item">
                                        <p>The process of converting the unreadable cipher text that has been encrypted back
                                            to the original, readable information.</p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="list-item col-md-6">
                            <div class="px-4 py-2 bg-7 d-block h-100">
                                <div class="item-content">
                                    <h3 class="item-title">
                                        Key
                                    </h3>

                                    <div
                                        class="clearfix text-formatted field field--name-field-icon-text field--type-text-long field--label-hidden field__item">
                                        <p>A unique, randomized string of bits used to encrypt and/or decrypt data. Common
                                            key lengths are 128 and 256 bits for private keys and 2048 bits for public keys.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div class="col-sm-4"></div>
        </div>
        <div class="row  ">
            <div class=" col-md-6  picker-container ">
                <form id="encryptForm" method="post" enctype="multipart/form-data">
                    @csrf
                    <div class="card glow-on-hover">
                        <div class="card-body text-center" onclick="filePicker('encrypt')">
                            <img class="bodyImage" src="/images/secure-folder.png" alt="File Icon" width="50">
                            <h5 class="card-title">Encrypt File</h5>
                            <p class="card-text" id="en-file-txt">Click the file icon to select a file to encrypt.</p>
                            <input type="file" name="encryptfile" id="encrypt-file-picker" style="display: none;">
                        </div>
                    </div>
                    <button class="btns" type="submit"> Encrypt</button>
                </form>
            </div>
            <div class="col-md-6  picker-container ">
                <form id="decryptForm" method="post" enctype="multipart/form-data">
                    @csrf
                    <div class="card glow-on-hover">
                        <div class="card-body text-center" onclick="filePicker('decrypt')">
                            <img src="/images/secure-folder.png" alt="File Icon" width="50">
                            <h5 class="card-title">Decrypt File</h5>
                            <p class="card-text" id="de-file-txt">Click the file icon to select a file to encrypt.</p>
                            <input type="file" name="decryptfile" id="decrypt-file-picker" style="display: none;">
                        </div>
                    </div>
                    <button class="btns" type="submit"> Decrypt</button>
                </form>
            </div>
        </div>
    </div>
@endsection
@endsection
