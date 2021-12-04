$(document).ready(function () {
    getOwnAdv()
});

$(document).on("click", "#mn", function () {
    /*  client = null;
      localStorage.removeItem("user");*/
    window.location.href = "http://localhost:8080/cars/index.html";
});

$(document).on("click", "#del_car", function () {
    let id = $(this).parent().attr('id');
    alert(id)
    delAdvt(id);
    window.location.reload();
});

$(document).on("click", ".st-act", function () {
    let id = $(this).attr('id');
    let cl = $(this).closest(".adv").attr('id');
    alert(id);
    alert(cl);
    alert(typeof cl);
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
    }).done(function (data) {
        alert("change status")
    });
}

function delAdvt(id) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/cars/del.do',
        data: id,
        dataType: 'text'
    }).done(function (data) {
        alert("delete done")
    });
}

function getOwnAdv() {
    alert("advtOwn")
    $("#c1").empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cars/own.do',
        dataType: 'json'
    }).done(function (data) {
        for (let ad of data) {
            alert("lana");
            let id = ad.id;
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
            let idAd = (status === true) ? "yes" : "no";
            let st = status === true ? "fa fa-minus-circle " : "fas fa-check";
            $('#c1').append(`<div class="adv" id="${idAd}">`
                + `<div class="f">`
                + `<img src="image/au.jpeg" alt="альтернативный текст">`
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
                + ` <span><b>${mark} ${model}, ${year} года, ${ml} пробег. ${owner} влад. в ПТС</b></span>`
                + `</div>`
                + `  <div class="desc">`
                + ` <span><b>${desc}</b></span>`
                + ` </div>`
                + `</div>`
                + `</div>`
                + `<div class="nav2" id="${id}">`
                + `<div class="us" id="ch_ph"><span><b>Сменить фото</b></span></div>`
                + `<div class="us" id="upd_car"><span><b>Редактировать</b></span></div>`
                + ` <div class="us" id="del_car"><span><b>Удалить</b></span></div>`
                + `</div>`
            );
        }
    });
}

