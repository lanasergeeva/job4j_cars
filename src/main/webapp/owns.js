$(document).ready(function () {
    getOwnAdv()
});

$(document).on("click", "#exit", function () {
    window.location.href = "http://localhost:8080/cars/log.do";
});

$(document).on("click", "#del_ph", function () {
    let id = $(this).parent().attr('id');
    alert(id);
    deletePhoto(id);
    location.reload();
});

function deletePhoto(id) {
    alert("in delete");
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/cars/deletephoto.do',
        data: id,
        dataType: 'text'
    }).done(function (data) {
        if (data === "200 OK") {
            console.log("Фото удалено");
        }
    })
    location.reload();
}

$(document).on("click", "#del_car", function () {
    let id = $(this).parent().attr('id');
    delAdvt(id);
    window.location.reload();
});

$(document).on("click", "#mn", function () {
    localStorage.clear();
    let val = "first";
    localStorage.setItem('ex', val);
    window.location.href = "http://localhost:8080/cars/index.html";
});

$(document).on("click", "#del_car", function () {
    let id = $(this).parent().attr('id');
    delAdvt(id);
    window.location.reload();
});

$(document).on("click", "#ch_ph", function () {
    let id = $(this).parent().attr('id');
    localStorage.setItem('id', id);
    window.location.href = "http://localhost:8080/cars/photo.html";
});

$(document).on("click", "#new_p", function () {
    let id = $(this).parent().attr('id');
    localStorage.setItem('id', id);
    window.location.href = "http://localhost:8080/cars/new.html";
});

$(document).on("click", ".st-act", function () {
    let id = $(this).attr('id');
    let cl = $(this).closest(".adv").attr('id');
    let url = (cl === "no") ? 'http://localhost:8080/cars/done.do' : 'http://localhost:8080/cars/notdone.do';
    setStatus(id, url);
    window.location.reload();
});

function setStatus(id, url) {
    $.ajax({
        type: 'POST',
        url: url,
        data: id,
        dataType: 'text'
    });
}

function delAdvt(id) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/cars/del.do',
        data: id,
        dataType: 'text'
    });
}


function getOwnAdv() {
    $("#c1").empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cars/own.do',
        dataType: 'json'
    }).done(function (data) {
        for (let ad of data) {
            let id = ad.id;
            let image = "http://localhost:8080/cars/" + "download.do?id=" + ad.id;
            let phone = ad.user.phone;
            let username = ad.user.name;
            let price = ad.price;
            let model = ad.model.name;
            let year = ad.year;
            let ml = ad.mileage;
            let owner = ad.owners;
            let desc = ad.description;
            let mark = ad.model.mark.name;
            let status = ad.status;
            let trans = ad.transmission.name;
            let body = ad.body.name;
            let idAd = (status === true) ? "yes" : "no";
            let st = status === true ? "fa fa-minus-circle " : "fas fa-check";
            $('#c1').append(`<div class="adv" id="${idAd}">`
                + `<div class="f">`
                + `<img src="${image}" alt="альтернативный текст" width="340px" height="220px">`
                + `  </div>`
                + `<div class="inf">`
                + `  <div class="us-info">`
                + `<div class="us">`
                + `<span><b>${phone}</b></span>`
                + ` </div>`
                + `<div class="us">`
                + ` <span><b>${username}</b></span>`
                + `</div>`
                + `<div class="price">`
                + ` <span><b>Цена: ${price}</b></span>`
                + `</div>`
                + `<div class="st-act" id="${id}">`
                + `<span><i class="${st}"></i></span>`
                + `</div>`
                + ` </div>`
                + ` <div class="abcar" style="align-content: center">`
                + ` <span><b>${mark} ${model}, ${year} года, ${ml}км пробег.</b></span>`
                + `</div>`
                + `  <div class="desc">`
                + ` <span><b>   Коробка ${trans}.  Тип кузова: ${body}.  ${owner} владельца(ев). в ПТС<br>${desc}</b></span>`
                + ` </div>`
                + `</div>`
                + `</div>`
                + `<div class="nav2" id="${id}">`
                + `<div class="us" id="del_ph"><span><b>Удалить фото</b></span></div>`
                + `<div class="us" id="ch_ph"><span><b>Сменить фото</b></span></div>`
                + ` <div class="us" id="del_car"><span><b>Удалить</b></span></div>`
                + `</div>`
            );
        }
    });
}

