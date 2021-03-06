let bl = false;

$(document).ready(function () {
    getAll();
});

$(document).on("click", "#new_post", function () {
    window.location.href = "http://localhost:8080/cars/new.html";
});

$(document).on("click", "#alp", function () {
    let val = "first";
    localStorage.clear();
    localStorage.setItem('ex', val);
    location.reload();
});

$(document).on("click", "#exit", function () {
    let val = "first";
    localStorage.clear();
    localStorage.setItem('ex', val);
    window.location.href = "http://localhost:8080/cars/log.do";
});

$(document).on("click", "#ow", function () {
    window.location.href = "http://localhost:8080/cars/owns.html";
});


function getModels() {
    $('#model').children().not(':first').remove();
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

function getYears() {
    $('#year1').children().not(':first').remove();
    $('#year2').children().not(':first').remove();
    let y = 0;
    for (let i = 2021; i >= 1950; i--) {
        y++;
        $('#year1').append($('<option>', {
            value: i,
            text: i,
        }));
        $('#year2').append($('<option>', {
            value: i,
            text: i,
        }));
    }
}

function getMil() {
    $('#m1').children().not(':first').remove();
    $('#m2').children().not(':first').remove();
    let y = 0;
    for (let i = 0; i <= 500000; i = i + 10000) {
        y++;
        $('#m1').append($('<option>', {
            value: i,
            text: i,
        }));
        $('#m2').append($('<option>', {
            value: i,
            text: i,
        }));
    }
}

function getOwners() {
    $('#o1').children().not(':first').remove();
    $('#o2').children().not(':first').remove();
    let y = 0;
    for (let i = 1; i <= 20; i++) {
        y++;
        $('#o1').append($('<option>', {
            value: i,
            text: i,
        }));
        $('#o2').append($('<option>', {
            value: i,
            text: i,
        }));
    }
}

function getAll() {
    getForm();
    getMarks();
    getModels();
    getTransmission();
    getBodies();
    getYears();
    getOwners();
    getMil();
    getAdvt();
}


function getA(selectObject) {
    let value = selectObject.value;
    setMark(value);
    getModelsByMark();
}


function setMark(id) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/cars/getmark.do',
        data: id,
        dataType: 'text'
    }).done(function (data) {
        if (data === "200 OK") {
            console.log("???????? ?????????? ????????????????");
        }
    });
}


function getModelsByMark() {
    $('#model').children().not(':first').remove();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cars/getmodels.do',
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

function getSecondYear(selectObject) {
    let value = selectObject.value;
    let y = parseInt(value);
    $('#year2').children().not(':first').remove();
    for (let i = 2021; i >= y; i--) {
        $('#year2').append($('<option>', {
            value: i,
            text: i,
        }));
    }
}

function getSecMil(selectObject) {
    let value = selectObject.value;
    let y = parseInt(value);
    $('#m2').children().not(':first').remove();
    for (let i = y; i <= 500000; i = i + 10000) {
        $('#m2').append($('<option>', {
            value: i,
            text: i,
        }));
    }
}

function getSecOwner(selectObject) {
    let value = selectObject.value;
    let y = parseInt(value);
    $('#o2').children().not(':first').remove();
    for (let i = y; i <= 20; i++) {
        $('#o2').append($('<option>', {
            value: i,
            text: i,
        }));
    }
}

function getForm() {
    $("#ti").empty();
    $('#ti').append(`<form id="find" onsubmit="getFilter()">`
        + `<div class="check">`
        + `<select class="select-css" id="mark" onchange="getA(this)">`
        + ` <option id="mark_f" selected disabled>??????????</option>`
        + ` </select>`
        + `</div>`
        + `<div class="check">`
        + ` <select class="select-css" id="model"><option id="mod_f" selected disabled>????????????</option>`
        + `</select></div>`
        + ` <div class="check" style="width: 250px">`
        + `<select class="select-css" id="year1" onchange="getSecondYear(this)" style="width: 100px">`
        + ` <option id="y_1" selected disabled>?????? ????</option></select>`
        + `<select class="select-css" id="year2" style="width: 100px">`
        + `<option id="y_2" selected disabled>?????? ????</option></select>`
        + `</div>`
        + `<div class="check" style="width: 210px; margin-right: 10px" >`
        + `<select class="select-css" id="m1" onchange="getSecMil(this)" style="width: 100px" >`
        + ` <option id="m_1" selected disabled>???????????? ????</option></select>`
        + `<select class="select-css" id="m2" style="width: 100px">`
        + `<option id="m_2" selected disabled>???????????? ????</option></select>`
        + `</div>`
        + ` <div class="check">
            <select class="select-css" id="trans">`
        + ` <option id="trans_f" selected disabled>??????????????</option>`
        + ` </select></div>`
        + ` <div class="check"><select class="select-css" id="body">`
        + `<option id="body_f" selected disabled>?????? ????????????</option>`
        + `</select></div>`
        + `<div class="check" style="width: 250px">`
        + `<select class="select-css" id="o1" onchange="getSecOwner(this)" style="width: 100px">`
        + ` <option id="o_1" selected disabled>????????????</option></select>`
        + `<select class="select-css" id="o2" style="width: 100px">`
        + `<option id="o_2" selected disabled>????????????</option></select>`
        + `</div>`
        + ` </div>`
        + `<div class="check" style="width: 210px; margin-right: 7px">
                <select class="select-css" id="stat" style="width: 110px">
                    <option id="st_f" selected disabled>????????????</option>
                    <option>????????????????</option>
                    <option>????????????????</option>
                </select>
                <button type="submit" class="save" id="search">??????????</button>
        </div>`
        + `</form>`);

}

function getFilter() {
    localStorage.clear();
    let markValue = $('#mark option:selected').text();
    localStorage.setItem('markV', markValue);
    let modValue = $('#model option:selected').text();
    localStorage.setItem('modelV', modValue);
    let trValue = $('#trans option:selected').text();
    localStorage.setItem('trV', trValue);
    let bValue = $('#body option:selected').text();
    localStorage.setItem('bodyV', bValue);
    let y1Value = $('#year1 option:selected').text();
    localStorage.setItem('yearV1', y1Value);
    let y2Value = $('#year2 option:selected').text();
    localStorage.setItem('yearV2', y2Value);
    let o1Value = $('#o1 option:selected').text();
    localStorage.setItem('oV1', o1Value);
    let o2Value = $('#o2 option:selected').text();
    localStorage.setItem('oV2', o2Value);
    let m1Value = $('#m1 option:selected').text();
    localStorage.setItem('mV1', m1Value);
    let m2Value = $('#m2 option:selected').text();
    localStorage.setItem('mV2', m2Value);
    let statValue = $('#stat option:selected').text();
    localStorage.setItem('st', statValue);
}

function filterAds(mark, model, trans, body, year, ml, owner, status) {
    let m = localStorage.getItem('markV');
    let md = localStorage.getItem('modelV');
    let bo = localStorage.getItem('bodyV');
    let tr = localStorage.getItem('trV');
    let y1 = localStorage.getItem('yearV1');
    let y2 = localStorage.getItem('yearV2');
    let o1 = localStorage.getItem('oV1');
    let o2 = localStorage.getItem('oV2');
    let m1 = localStorage.getItem('mV1');
    let m2 = localStorage.getItem('mV2');
    let stat = localStorage.getItem('st');
    let i = 0;
    if (m !== mark && m !== "??????????") {
        i++;
    }
    if (md !== model && md !== "????????????") {
        i++;
    }
    if (tr !== trans && tr !== "??????????????") {
        i++;
    }
    if (bo !== body && bo !== "?????? ????????????") {
        i++;
    }
    if (y1 !== "?????? ????") {
        if (Number(y1) > year) {
            i++;
        }
    }
    if (y2 !== "?????? ????") {
        if (Number(y2) < year) {
            i++;
        }
    }
    if (o1 !== "????????????") {
        if (Number(o1) > owner) {
            i++;
        }
    }
    if (o2 !== "????????????") {
        if (Number(o2) < owner) {
            i++;
        }
    }
    if (m1 !== "???????????? ????") {
        if (Number(m1) > ml) {
            i++;
        }
    }
    if (m2 !== "???????????? ????") {
        if (Number(m2) < ml) {
            i++;
        }
    }
    if (stat !== status && stat !== "????????????") {
        i++;
    }
    if (i === 0) {
        bl = true;
    }
}

function getAdvt() {
    $("#c1").empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cars/post.do',
        dataType: 'json'
    }).done(function (data) {
        for (let ad of data) {
            let image = "http://localhost:8080/cars/" + "download.do?id=" + ad.id;
            let phone = ad.user.phone;
            let username = ad.user.name;
            let price = ad.price;
            let model = ad.model.name;
            let year = ad.year;
            let ml = ad.mileage;
            let owner = ad.owners;
            let trans = ad.transmission.name;
            let body = ad.body.name;
            let desc = ad.description;
            let mark = ad.model.mark.name;
            let status = ad.status;
            let idAd = (status === true) ? "yes" : "no";
            let st = status === true ? "fa fa-minus-circle " : "fas fa-check";
            let stForFun = status === true ? "????????????????" : "????????????????";
            filterAds(mark, model, trans, body, year, ml, owner, stForFun);
            if (bl === true || localStorage.getItem('ex') === "first") {
                $('#c1').append(`<div class="adv" id="${idAd}" >`
                    + `<div class="f">`
                    + `<img src="${image}" alt="???????????????????????????? ??????????" width="340px" height="220px">`
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
                    + ` <span><b>????????: ${price}</b></span>`
                    + `</div>`
                    + `<div class="st-act">`
                    + `<span><i class="${st}"></i></span>`
                    + `</div>`
                    + ` </div>`
                    + ` <div class="abcar" style="align-content: center">`
                    + ` <span><b>${mark} ${model}, ${year} ????????, ${ml}???? ????????????.</b></span>`
                    + `</div>`
                    + `  <div class="desc">`
                    + ` <span><b>   ?????????????? ${trans}.  ?????? ????????????: ${body}.  ${owner} ??????????????????(????). ?? ??????<br>${desc}</b></span>`
                    + ` </div></div>`);
            }
            bl = false;
        }
    });
}


