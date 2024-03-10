@extends('layouts.footer')
@extends('layouts.app')
@section('body')
@section('content')
    <div class="container">
        <img src="/images/home.png" class="img-fluid animated">
        <h2>Welcome to <span>HeroBiz</span></h2>
        <p class="test">Et voluptate esse accusantium accusamus natus reiciendis quidem voluptates similique aut.</p>
        <div class="row  ">
            <div class=" col-md-6  picker-container ">
                <form  id="encryptForm" method="post" enctype="multipart/form-data">
                    @csrf
                    <div class="card glow-on-hover">
                        <div class="card-body text-center" onclick="filePicker('encrypt')">
                            <img class="bodyImage" src="/images/secure-folder.png" alt="File Icon" width="50">
                            <h5 class="card-title">Encrypt File</h5>
                            <p class="card-text" id="en-file-txt">Click the file icon to select a file to encrypt.</p>
                            <input type="file" name="encryptfile" id="encrypt-file-picker" style="display: none;">
                        </div>
                    </div>
                    <button class="btns" type="submit" > Encrypt</button>
                </form>
            </div>
            <div class="col-md-6  picker-container ">
                <form  id="decryptForm" method="post" enctype="multipart/form-data">
                    @csrf
                    <div class="card glow-on-hover">
                        <div class="card-body text-center" onclick="filePicker('decrypt')">
                            <img src="/images/secure-folder.png" alt="File Icon" width="50">
                            <h5 class="card-title">Decrypt File</h5>
                            <p class="card-text" id="de-file-txt">Click the file icon to select a file to encrypt.</p>
                            <input type="file"  name="decryptfile" id="decrypt-file-picker"  style="display: none;">
                        </div>
                    </div>
                    <button class="btns" type="submit" > Decrypt</button>
                </form>
            </div>
        </div>
    </div>
@endsection
@endsection
