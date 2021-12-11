
function validate() {
    let rsl = true;
    if ($('#email').val() === '') {
        alert($('#email').attr('title'));
        rsl = false;
    }
    if ($('#password').val() === '') {
        alert($('#password').attr('title'));
        rsl = false;
    }
    return rsl;
}

function checkUser() {
    event.preventDefault();
    let name = $('#email').val();
    let pas = $('#password').val();
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/cars/auth.do',
        data: JSON.stringify({
            email: name,
            password: pas,
        }), dataType: 'text'
    }).done(function (data) {
        if (data !== "400 Bad Request") {
            localStorage.clear();
            let val = "first";
            localStorage.setItem('ex', val);
            window.location.href = "http://localhost:8080/cars/index.html";
        } else {
            alert("You entered incorrect email or password");
            document.getElementById('email').value='';
            document.getElementById('password').value='';
        }
    })
}