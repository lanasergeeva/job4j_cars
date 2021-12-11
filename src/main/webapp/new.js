let trMap = new Map;
let bodyMap = new Map;
let modelMap = new Map;

$(document).ready(function () {
    getModels();
    getMarks();
    getBodies();
    getTransmission();
    fails();
    setYears();
    setOwners();
});


function getModelsSelect(selectObject) {
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
            console.log("Айди марки передано");
        }
    });
}


function getModelsByMark() {
    $('#mod_car').children().not(':first').remove();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cars/getmodels.do',
        dataType: 'json'
    }).done(function (data) {
        for (let mod of data) {
            $('#mod_car').append($('<option>', {
                value: mod.id,
                text: mod.name,
            }));
        }
    });
}


function fails() {
    alert(localStorage.getItem("fail"));
    if (localStorage.getItem("fail") === "fail") {
        $('#menu').prop("style", "padding-top: 10px").prop("style", "color:red");
        $('#menu').text('Нужно заполнить все поля!');
    }
}

$(document).on("click", "#menu", function () {
    localStorage.removeItem("fail");
    window.location.href = "http://localhost:8080/cars/index.html";
});


function setYears() {
    $('#year1').children().not(':first').remove();
    let y = 0;
    for (let i = 2021; i >= 1950; i--) {
        y++;
        $('#year1').append($('<option>', {
            value: i,
            text: i,
        }));
    }
}


function setOwners() {
    $('#o1').children().not(':first').remove();
    let y = 0;
    for (let i = 1; i <= 20; i++) {
        y++;
        $('#o1').append($('<option>', {
            value: i,
            text: i,
        }));
    }
}

function getModels() {
    modelMap.clear();
    $('#mod_car').children().not(':first').remove();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cars/model.do',
        dataType: 'json'
    }).done(function (data) {
        for (let mod of data) {
            modelMap.set(mod.id, mod);
            $('#mod_car').append($('<option>', {
                value: mod.id,
                text: mod.name,
            }));
        }
    });
}

function getMarks() {
    $('#ma_car').children().not(':first').remove();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cars/mark.do',
        dataType: 'json'
    }).done(function (data) {
        for (let mark of data) {
            $('#ma_car').append($('<option>', {
                value: mark.id,
                text: mark.name,
            }));
        }
    });
}

function getBodies() {
    bodyMap.clear();
    $('#bod_car').children().not(':first').remove();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cars/body.do',
        dataType: 'json'
    }).done(function (data) {
        for (let body of data) {
            bodyMap.set(body.id, body);
            $('#bod_car').append($('<option>', {
                value: body.id,
                text: body.name,
            }));
        }
    });
}

function getTransmission() {
    trMap.clear();
    $('#tr_car').children().not(':first').remove();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cars/trans.do',
        dataType: 'json'
    }).done(function (data) {
        for (let tr of data) {
            trMap.set(tr.id, tr);
            $('#tr_car').append($('<option>', {
                value: tr.id,
                text: tr.name,
            }));
        }
    });
}

function addCar() {
    let mil = parseInt($('#mil_car').val());
    let price = parseInt($('#price_car').val());
    let year = $('#year1 option:selected').text();
    let owners = $('#o1 option:selected').text();

    let descr = $('#desc_car').val();

    let modellist = $('#mod_car')
        .find(":selected")
        .map(function () {
            return $(this).val();
        }).get().map(function (key) {
            return modelMap.get(parseInt(key));
        });
    let model;
    for (let mod of modellist.values()) {
        model = mod;// 500, 350, 50
    }

    let body;
    let bodylist = $('#bod_car')
        .find(":selected")
        .map(function () {
            return $(this).val();
        }).get().map(function (key) {
            return bodyMap.get(parseInt(key));
        });
    for (let mod of bodylist.values()) {
        body = mod;
    }

    let trans;
    let transList = $('#tr_car')
        .find(":selected")
        .map(function () {
            return $(this).val();
        }).get().map(function (key) {
            return trMap.get(parseInt(key));
        });
    for (let mod of transList.values()) {
        trans = mod;
    }

    if (descr.length > 0 && model !== undefined && body !== undefined && trans !== undefined) {
        alert("bef a");
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/cars/post.do',
            data: JSON.stringify({
                price: price,
                description: descr,
                year: year,
                mileage: mil,
                owners: owners,
                model: model,
                body: body,
                transmission: trans
            }), dataType: 'json'
        }).done(function (data) {
            if (data !== "400 Bad Request" || data.id !== 0) {
                alert("должен грузить фото");
                updatePhoto(data.id);
                window.location.href = "http://localhost:8080/cars/owns.html";
                $('#selectPhoto').clear();
                localStorage.removeItem("fail");
            } else {
                alert("else");
                localStorage.setItem("fail", "fail");
            }
        })
    } else {
        localStorage.setItem("fail", "fail");
    }
}


function updatePhoto(id) {
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