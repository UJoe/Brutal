var apic = localStorage.getItem("NewPic");
var aero = Number(localStorage.getItem("NewEro"));
var augy = Number(localStorage.getItem("NewUgy"));
var aesz = Number(localStorage.getItem("NewEsz"));
var aarm = Number(localStorage.getItem("NewArm"));
var aseb = Number(localStorage.getItem("NewSeb"));

var bpic = "img/bbeetle.jpg";
var bero = (aero < 100) ? parseInt(100 - Math.random() * 60) : parseInt(100 + Math.random() * 60);
var bugy = (augy < 100) ? parseInt(100 - Math.random() * 60) : parseInt(100 + Math.random() * 60);
var besz = (aesz < 100) ? parseInt(100 - Math.random() * 60) : parseInt(100 + Math.random() * 60);
var barm = (aarm < 15) ? parseInt(15 - Math.random() * 10) : parseInt(15 + Math.random() * 10);
var bseb = (aseb < 25) ? parseInt(25 - Math.random() * 15) : parseInt(25 + Math.random() * 15);

var timo;

var Char = [
    {
        pic: apic,
        ero: aero,
        ugy: augy,
        esz: aesz,
        arm: aarm,
        seb: aseb,
        pos: 0,
    },
    {
        pic: bpic,
        ero: bero,
        ugy: bugy,
        esz: besz,
        arm: barm,
        seb: bseb,
        pos: 0,
    }];

var pia = (localStorage.getItem("NewPia") == "2") ? true : false;
var koc = (localStorage.getItem("NewKoc") == "2") ? true : false;
var bom = (localStorage.getItem("NewBom") == "2") ? true : false;
var alt = (localStorage.getItem("NewAlt") == "2") ? true : false;
var piaUp = 3;
var kocUp = 2;
var bomUp = 1;
var altUp = 3;

var Fields = [
    ["sima", "./img/grass.jpg"],
    ["sima", "./img/grass.jpg"],
    ["sima", "./img/grass.jpg"],
    ["bogyo", "./img/berries.jpg"],
    ["merleg", "./img/merleg.jpg"],
    ["boxer", "./img/erdei.jpg"],
    ["katapult", "./img/katapult.jpg"],
    ["meglepi", "./img/question.jpg"],
]

var Board = [["start", "./img/start.jpg"]];

initboard();
updateVals();
PrintVals();


function initboard() {
    //pályagenerálás
    for (let i = 1; i < 24; i++) {
        let ii = parseInt(Math.random() * Fields.length);
        Board.push(Fields[ii]);
    }
    Board.push(["bb", "./img/bball.jpg"]);
    //pályarajzolás
    var boardDiv = "";
    for (let i = 0; i < 25; i++) {
        boardDiv = boardDiv + `<img class="mezo" id="mezo${i}" src=${Board[i][1]} title=${Board[i][0]}>`
    };
    document.getElementById("board").innerHTML = boardDiv;
    for (let i = 0; i < 12; i++) { document.getElementById("mezo" + i).style.left = 60 + i * 150 + "px" };
    document.getElementById("mezo12").style.left = 60 + 11 * 150 + "px";
    document.getElementById("mezo12").style.top = "340px";
    for (let i = 13; i < 25; i++) {
        document.getElementById("mezo" + i).style.right = 64 + (i - 13) * 150 + "px";
        document.getElementById("mezo" + i).style.top = "490px";
    }
    //bábuk lerakása
    document.getElementById("CharBabu").innerHTML = `<img id="bab0" src=${Char[0].pic} title='Ne engem bizgass, hanem a tábla alatti tárgyakat!' onclick='message("A bal alsó sarok környékén nézz szét!")'>`
    document.getElementById("BBBabu").innerHTML = `<img id="bab1" src=${Char[1].pic} title='Húzz innen, ha kedves az életed!!!' onclick='message("Ne hergeld fel Battle Beetle-t feleslegesen!")'>`
    document.getElementById("bab0").style.top = "196px";
    document.getElementById("bab1").style.top = "264px";
    document.getElementById("bab0").style.left = "100px";
    document.getElementById("bab1").style.left = "100px";
    //tárgyak
    var objectDiv = "";
    if (pia === true) { objectDiv = objectDiv + "<img class='ObjPic' id='piaP' onclick='UsePálesz()' src='./img/gyógypálesz.jpg'>" };
    if (koc === true) { objectDiv = objectDiv + "<img class='ObjPic' id='kocP' onclick='UseKocka()' src='./img/kocka.jpg'>" };
    if (bom === true) { objectDiv = objectDiv + "<img class='ObjPic' id='bomP' onclick='UseBomba()' src='./img/bomba.jpg'>" };
    if (alt === true) { objectDiv = objectDiv + "<img class='ObjPic' id='altP' onclick='UseAltato()' src='./img/altatópuska.jpg'>" };
    document.getElementById("objects").innerHTML = objectDiv;
    document.getElementById("dice").innerHTML = "<button id='dice-btn' onclick='Dobas()'>Lépés</button>"
}

function updateVals() {
    var updateDiv = "";
    if (pia === true) {
        updateDiv = updateDiv + `<span class='UpNo' id='piaUV'>${piaUp}</span>`
    };
    if (koc === true) {
        updateDiv = updateDiv + `<span class='UpNo' id='kocUV'>${kocUp}</span>`
    };
    if (bom === true) {
        updateDiv = updateDiv + `<span class='UpNo' id='bomUV'>${bomUp}</span>`
    };
    if (alt === true) {
        updateDiv = updateDiv + `<span class='UpNo' id='altUV'>${altUp}</span>`
    };
    document.getElementById("updates").innerHTML = updateDiv;
    if (pia === true && piaUp == 0) { document.getElementById("piaUV").innerHTML = "&#10004;"; document.getElementById("piaP").style = "box-shadow: 0px 0px 20px #FD07FD"; document.getElementById("piaP").style.opacity = 1 };
    if (pia === true && piaUp > 0) { document.getElementById("piaP").style = "box-shadow: 0px 0px"; document.getElementById("piaP").style.opacity = 0.6 };
    if (koc === true && kocUp == 0) { document.getElementById("kocUV").innerHTML = "&#10004;"; document.getElementById("kocP").style = "box-shadow: 0px 0px 20px #FD07FD; "; document.getElementById("kocP").style.opacity = 1 };
    if (koc === true && kocUp > 0) { document.getElementById("kocP").style = "box-shadow: 0px 0px"; document.getElementById("kocP").style.opacity = 0.6 };
    if (bom === true && bomUp == 0) { document.getElementById("bomUV").innerHTML = "&#10004;"; document.getElementById("bomP").style = "box-shadow: 0px 0px 20px #FD07FD"; document.getElementById("bomP").style.opacity = 1 };
    if (bom === true && bomUp > 0) { document.getElementById("bomP").style = "box-shadow: 0px 0px"; document.getElementById("bomP").style.opacity = 0.6 };
    if (alt === true && altUp == 0) { document.getElementById("altUV").innerHTML = "&#10004;"; document.getElementById("altP").style = "box-shadow: 0px 0px 20px #FD07FD"; document.getElementById("altP").style.opacity = 1 };
    if (alt === true && altUp > 0) { document.getElementById("altP").style = "box-shadow: 0px 0px"; document.getElementById("altP").style.opacity = 0.6 };
}

function PrintVals() {
    document.getElementById("values").innerHTML = `<table>
    <tr>
    <th>SAJÁT PONTOK</th>
    <th>BATTLE BEETLE</th>
    </tr>
    <tr>
    <td>Erő: <span class='CharVal' style="width: ${15 + Char[0].ero * 1.5}px;">${Char[0].ero}</span></td>
    <td>Erő: <span class='BBVal' style="width: ${15 + Char[1].ero * 1.5}px;">${Char[1].ero}</span></td>
    </tr>
    <tr>
    <td>Ügyesség: <span class='CharVal' style="width: ${15 + Char[0].ugy * 1.5}px;">${Char[0].ugy}</span></td>
    <td>Ügyesség: <span class='BBVal' style="width: ${15 + Char[1].ugy * 1.5}px;">${Char[1].ugy}</span></td>
    </tr>
    <tr>
    <td>Ész: <span class='CharVal' style="width: ${15 + Char[0].esz * 1.5}px;">${Char[0].esz}</span></td>
    <td>Ész: <span class='BBVal' style="width: ${15 + Char[1].esz * 1.5}px;">${Char[1].esz}</span></td>
    </tr>
    <tr>
    <td>Páncél: <span class='CharVal' style="width: ${15 + Char[0].arm * 1.5}px;">${Char[0].arm}</span></td>
    <td>Páncél: <span class='BBVal' style="width: ${15 + Char[1].arm * 1.5}px;">${Char[1].arm}</span></td>
    </tr>
    <tr>
    <td>Sebzés: <span class='CharVal' style="width: ${15 + Char[0].seb * 1.5}px;">${Char[0].seb}</span></td>
    <td>Sebzés: <span class='BBVal' style="width: ${15 + Char[1].seb * 1.5}px;">${Char[1].seb}</span></td>
    </tr>
    </table>`;
    //document.getElementsByClassName("CharVal").style.transition = "all 2s";
    //document.getElementsByClassName("BBVal").style.transition = "all 2s";
}

function message(text) {
    for (let i = 1; i < 3; i++) {
        if (i == 1) { document.getElementById("message").setAttribute("style", "filter: opacity(1) blur(0)"); continue; }
        else {
            clearTimeout(timo);
            const a = document.getElementById("message");
            a.innerHTML = text;
            timo = setTimeout(function () {
                a.style.filter = "opacity(0) blur(6px)";
                a.style.left = "0%";
                a.style.transition = "all 2s ease-out"
            }, text.length * 70);
        }
    }
}

function Dobas() {
    document.getElementById("dice-btn").disabled = true;
    var d = parseInt(1 + 3 * Math.random())
    Move(0, d, true);
    setTimeout(function () { d = parseInt(1 + 4 * Math.random()); Move(1, d, true) }, 3000);
    setTimeout(function () {
        document.getElementById("dice-btn").disabled = false;
        if (pia === true && piaUp > 0) { piaUp -= 1 };
        if (koc === true && kocUp > 0) { kocUp -= 1 };
        if (bom === true && bomUp > 0) { bomUp -= 1 };
        if (alt === true && altUp > 0) { altUp -= 1 };
        updateVals();
    }, 5000);
}

function Move(pl, num, eff) {
    Char[pl].pos += num;
    message(num + "-t dobtál.");
    var p = Char[pl].pos;
    var x = 0;
    var y = 0;
    var pl2 = (pl == 0) ? 1 : 0;
    if (p < 1) { x = 100; y = 196 + pl * 68; Char[pl].pos = 0 };
    if (p > 0 && p < 12) { x = 100 + p * 150; y = 230 };
    if (p == 12) { x = 1750; y = 380 };
    if (p > 23) { p = 24; Char[pl].pos = 24 }
    if (p > 12) { x = 100 + Math.abs(p - 24) * 150; y = 530 };
    document.getElementById("bab" + pl).style.left = x + "px";
    document.getElementById("bab" + pl).style.top = y + "px";
    document.getElementById("bab" + pl).style.transition = "all 1s";
    CheckFight(pl, pl2);
    if (eff != true) { return };
}

function CheckFight(pl1, pl2) {
    if (Char[pl1].pos == Char[pl2].pos) {
        var x = (Char[pl1].ugy + Char[pl1].ero / 5 + Char[pl1].esz / 10 + Math.random() * 40) - (Char[pl2].ugy + Char[pl2].ero / 5 + Char[pl2].esz / 10 + Math.random() * 40)
        setTimeout(function() {
            if (x > 0) {
            Move(pl2, -1, false);
            var y = parseInt(Char[pl1].seb + Math.random() * x / 2 - Char[pl2].arm);
            if (y < 1) { y = 1 };
            if (Char[pl1].esz < Char[pl2].esz + Char[pl2].arm + Math.random() * 10) {
                message("Sikeres támadás!");
                Char[pl2].ero -= y;
                PrintVals();
                CheckDeath();
            } else {
                message("Kritikus támadás!")
                Char[pl2].ero -= y * 2;
                Char[pl2].ugy -= parseInt(y / 5);
                Char[pl2].esz -= parseInt(y / 10);
                Char[pl2].arm -= 1;
                Char[pl2].seb -= 1;
                PrintVals();
                CheckDeath();
            }
        } else {
            Move(pl1, -1, false);
            message("Sikertelen támadás.")
        }}, 1500);
    }
}

function CheckDeath() {
    return;
}