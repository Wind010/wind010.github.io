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
        }
        $('#result').text(newVal);
    }

});


 