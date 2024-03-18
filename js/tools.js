var textPlaceholder = 'Type input here, or drag file here for base64 file conversion';
var filePlaceholder = 'Drop file here to convert to Base64 string';


$(document).ready(function () {

    $('#user_input').attr('placeholder', textPlaceholder);

    $('#user_input').keyup(function () {
        processChange();
    });

    $('#process').change(function () {
        processChange();
    });

    $('#user_input').on('dragover', function (e) {
        currentText = $('#user_input').text();
        $('#user_input').css('background', '#eee');
        $('#user_input').attr('placeholder', filePlaceholder);
    });

    $('#user_input').on('dragleave', function (e) {
        $('#user_input').text(currentText);
        $('#user_input').css('background', '#fff');
        $('#user_input').attr('placeholder', textPlaceholder);
    });

    $('#user_input').on('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var file = e.originalEvent.dataTransfer.files[0];
        var r = new FileReader();
        r.onload = function (f) {
            var contents = f.target.result;
            $('#user_input').css('background', '#fff');
            $('#user_input').attr('placeholder', textPlaceholder);
            $('#result').text(contents);
        }
        r.readAsDataURL(file);
    });

    $('#copy_text').click(function () {
        $('#result').select();
        let result = $('#result').text();
        try {
            //var success = document.execCommand('copy');
            var success = navigator.clipboard.writeText(result);
            if (!success)
                throw 'WTF';
        } catch (e) {
            window.prompt('Your browser doesn\'t support auto-copying, please copy the preselected text below:', result);
        }
    });

    function processChange() {
        var newVal = '';
        var inputVal = $('#user_input').val();
        switch ($('#process').val()) {
            case 'url_encode':
                newVal = encodeURIComponent(inputVal);
                break;
            case 'url_decode':
                newVal = decodeURIComponent(inputVal);
                break;
            case 'base64_encode':
                newVal = window.btoa(inputVal);
                break;
            case 'base64_decode':
                newVal = window.atob(inputVal);
                break;
            case 'remove_whitespace':
                newVal = inputVal.replace(/\s/g, '');
                break;
            case 'md5':
                newVal = CryptoJS.MD5(inputVal);
                break;
            case 'sha128':
                newVal = CryptoJS.SHA1(inputVal);
                break;
            case 'sha224':
                newVal = CryptoJS.SHA224(inputVal).toString();
                break;
            case 'sha256':
                newVal = CryptoJS.SHA256(inputVal).toString();
                break;
            case 'sha384':
                newVal = CryptoJS.SHA384(inputVal).toString();
                break;
            case 'sha512':
                newVal = CryptoJS.SHA512(inputVal).toString();
                break;
            case 'ripemd160':
                newVal = CryptoJS.RIPEMD160(inputVal).toString();
                break;
        }
        $('#result').text(newVal);
    }

});


function toggleView() {
    var wrapper = document.getElementById('div_wrapper');
    var icon = document.getElementById('icon_button_div');
    var div_input = document.getElementById('div_input');
    var div_output = document.getElementById('div_output');

    if (wrapper.style.flexDirection == 'column') {
        wrapper.style.flexDirection = 'row';
        icon.classList.add("fa-rotate-90");

        div_input.classList.remove("div_full")
        div_output.classList.remove("div_full")

        div_input.classList.add("div_half")
        div_output.classList.add("div_half")

    }
    else {
        wrapper.style.flexDirection = 'column';
        icon.classList.remove("fa-rotate-90");


        
        div_input.classList.remove("div_half")
        div_output.classList.remove("div_half")

        div_input.classList.add("div_full")
        div_output.classList.add("div_full")

    }

    // var wrapper = $('#div_wrapper')
    // if (wrapper.css('flex-direction') == 'column') {
    //     wrapper.css('flex-direction', 'row');
    //     icon.addClass("fa-rotate-90");
    // }
    // else {
    //     wrapper.css('flex-direction', 'column');
    //     icon.removeClass("fa-rotate-90");
    // }
  }
