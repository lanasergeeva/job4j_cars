function upd() {
    let id = localStorage.getItem('id');
    let input = $('#selectPhoto').prop('files');
    if (input.length > 0) {
        alert("foto");
        let formData = new FormData();
        formData.append("file", input[0]);
        fetch('http://localhost:8080/cars/up.do?id=' + id, {
            method: 'POST',
            body: formData
        });
    }
}

$(document).on("click", "#final", function () {
    localStorage.removeItem('id');
    window.location.href = "http://localhost:8080/cars/owns.html"
});