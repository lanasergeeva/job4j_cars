var trMap = new Map;
var bodyMap = new Map;
var modelMap = new Map;

$(document).ready(function () {
    getModels();
    getMarks();
    getBodies();
    getTransmission();
});

function getModels() {
    modelMap.clear();
    $('#mod_car').children().not(':first').remove();
    /*  $("#model:not(:first)").remove();*/
    /*ctList.clear();*/
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
    /*ctList.clear();*/
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
    let owners = parseInt($('#own_car').val());
    let price = parseInt($('#price_car').val());
    let year = parseInt($('#ye_car').val());
    let run = parseInt($('#mil_car').val());

    /*let intyear = parseInt(year);
    let intmil = parseInt(run);
    let ow = parseInt(owners);
    let pr = parseInt(price);
    alert(typeof intyear);
    alert(typeof intmil);
    alert(typeof ow);
    alert(typeof pr);*/

    let descr = $('#desc_car').val();
    alert(descr);


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


    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/cars/post.do',
        data: JSON.stringify({
            price: price,
            description: descr,
            year: year,
            mileage: run,
            owners: owners,
            model: model,
            body: body,
            transmission: trans
        }), dataType: 'text'
    }).done(function (data) {
            if (data === "200 OK") {
                window.location.href = "http://localhost:8080/cars/owns.html";
            } else {
                alert("wrong")
                /*document.getElementById('description').value = '';
            getAllItems();*/
            }
        }
    )
}