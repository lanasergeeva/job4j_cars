$(document).ready(function () {
    getAll();
});

$(document).on("click", "#new_post", function () {
    /*  client = null;
      localStorage.removeItem("user");*/
    window.location.href = "http://localhost:8080/cars/new.html";
});

$(document).on("click", "#exit", function () {
    /*  client = null;
      localStorage.removeItem("user");*/
    window.location.href = "http://localhost:8080/cars/log.do";
});

$(document).on("click", "#ow", function () {
    /*  client = null;
      localStorage.removeItem("user");*/
    window.location.href = "http://localhost:8080/cars/owns.html";
});

function getModels() {
    $('#model').children().not(':first').remove();
    /*  $("#model:not(:first)").remove();*/
    /*ctList.clear();*/
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cars/model.do',
        dataType: 'json'
    }).done(function (data) {
        for (let mod of data) {
            $('#model').append($('<option>', {
                value: mod.id,
                text: mod.name,
            }));
        }
    });
}

function getMarks() {
    $('#mark').children().not(':first').remove();
    /*ctList.clear();*/
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cars/mark.do',
        dataType: 'json'
    }).done(function (data) {
        for (let mark of data) {
            $('#mark').append($('<option>', {
                value: mark.id,
                text: mark.name,
            }));
        }
    });
}

function getBodies() {
    $('#body').children().not(':first').remove();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cars/body.do',
        dataType: 'json'
    }).done(function (data) {
        for (let body of data) {
            $('#body').append($('<option>', {
                value: body.id,
                text: body.name,
            }));
        }
    });
}

function getTransmission() {
    $('#trans').children().not(':first').remove();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cars/trans.do',
        dataType: 'json'
    }).done(function (data) {
        for (let tr of data) {
            $('#trans').append($('<option>', {
                value: tr.id,
                text: tr.name,
            }));
        }
    });
}

function getAll() {
    getForm();
    getMarks();
    getModels();
    getTransmission();
    getBodies();
    getAdvt();
}

function getForm() {
    $("#ti").empty();
    $('#ti').append(`<form id="find" onsubmit="addItem(event)">`
        + `<div class="check">`
        + `<select class="select-css" id="mark">`
        + ` <option id="mark_f" selected disabled>Марка</option>`
        + ` </select>`
        + `</div>`
        + `<div class="check">`
        + ` <select class="select-css" id="model"><option id="mod_f" selected disabled>Модель</option>`
        + `</select></div>`
        + ` <div class="check" style="width: 210px">
            <input id="y1" type="text" autocomplete="off" placeholder="Год от"/>
            <input id="y2" type="text" autocomplete="off" placeholder="Год до"/>
        </div>`
        + `<div class="check" style="width: 210px; margin-right: 10px" >
            <input id="m1" type="text" autocomplete="off" placeholder="Пробег от"/>
            <input id="m2" type="text" autocomplete="off" placeholder="Пробег до"/>
        </div>`
        + ` <div class="check">
            <select class="select-css" id="trans">`
        + ` <option id="trans_f" selected disabled>Коробка</option>`
        + ` </select></div>`
        + ` <div class="check">
                <select class="select-css" id="body">
                    <option id="body_f" selected disabled>Тип кузова</option>`
        + `</select></div>`
        + `  <div class="check" style="width: 210px">
                <div class="check" style="width: 210px">
                    <input id="o1" type="text" autocomplete="off" placeholder="Владельцы от"/>
                    <input id="o2" type="text" autocomplete="off" placeholder="Владельцы до"/>
                </div>
            </div>`
        + `<div class="check" style="width: 210px; margin-right: 7px">
                <select class="select-css" id="stat" style="width: 105px">
                    <option id="st_f" selected disabled>Статус</option>
                    <option>Активные</option>
                    <option>Закрытые</option>
                </select>
                <button type="submit" class="save" id="search">Поиск</button>
        </div>`
        + `</form>`);

};


function getAdvt() {
    let index = 0;
    $("#c1").empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cars/post.do',
        dataType: 'json'
    }).done(function (data) {
        for (var ad of data) {
            index++;
            alert("lana");
            let name = ad.name;
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
                + `<div class="st-act">`
                + `<span><i class="${st}"></i></span>`
                + `</div>`
                + ` </div>`
                + ` <div class="abcar" style="align-content: center">`
                + ` <span><b>${mark} ${model}, ${year} года, ${ml} пробег. ${owner} влад. в ПТС</b></span>`
                + `</div>`
                + `  <div class="desc">`
                + ` <span><b>${desc}</b></span>`
                + ` </div></div>`);
        }
    });
}