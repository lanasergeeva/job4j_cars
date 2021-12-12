
function addUser() {
    event.preventDefault();
    let name = $('#login').val();
    let email = $('#email').val();
    let pas = $('#password').val();
    let phone = $('#numb').val();
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/cars/us.do',
        data: JSON.stringify({
            name: name,
            phone: phone,
            email: email,
            password: pas,
            phone: phone
        }), dataType: 'text'
    }).done(function (data) {
        if (data === "200 OK") {
            window.location.href = "http://localhost:8080/cars/log.html";
        } else {
            alert("User exist");
            document.getElementById('login').value='';
            document.getElementById('email').value='';
            document.getElementById('password').value='';
            document.getElementById('numb').value='';
        }
    })
}
