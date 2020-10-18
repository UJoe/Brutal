var Char = {
    pic: localStorage.getItem("NewPic"),
    ero: Number(localStorage.getItem("NewEro")),
    ugy: Number(localStorage.getItem("NewUgy")),
    esz: Number(localStorage.getItem("NewEsz")),
    arm: 0,
    seb: 0
};

var xero = Char.ero;
var xugy = Char.ugy;
var xesz = Char.esz;
var timo;

var EroRuhak = [
    {
        num: 0,
        id: "pajzs",
        status: 1,
        desc: "FASZAGYEREKEK PAJZSA&#10;+8 Erő&#10;+5 Páncél",
        price: 20,
        change: [8, 0, 0, 5, 0]
    },
    {
        num: 1,
        id: "sisak",
        status: 1,
        desc: "TELJES AGYVÉDELEM&#10;+10 Erő&#10;+8 Páncél&#10;+3 Ész",
        price: 40,
        change: [10, 0, 3, 8, 0]
    },
    {
        num: 2,
        id: "vascsizma",
        status: 1,
        desc: "KEMÉNY CSÁVÓK VASCSIZMÁJA&#10;+20 Erő&#10;+10 Páncél&#10;-2 Ügyesség",
        price: 50,
        change: [20, -2, 0, 10, 0]
    },
    {
        num: 3,
        id: "páncéling",
        status: 1,
        desc: "IZOMPACSIRTÁK INGJE&#10;+40 Erő&#10;+20 Páncél&#10;-4 Ügyesség",
        price: 80,
        change: [40, -4, 0, 20, 0]
    }];

var UgyRuhak = [
    {
        num: 0,
        id: "csúzli",
        status: 1,
        desc: "ROSSZCSONTOK CSÚZLIJA&#10;+4 Ügyesség&#10;+5 Sebzés",
        price: 10,
        change: [0, 4, 0, 0, 5]
    },
    {
        num: 1,
        id: "kard",
        status: 1,
        desc: "NEMES LOVAGOK KARDJA&#10;+8 Ügyesség&#10;+6 Páncél&#10;+12 Sebzés",
        price: 40,
        change: [0, 8, 0, 6, 12]
    },
    {
        num: 2,
        id: "pisztoly",
        status: 1,
        desc: "GENGSZTEREK JÁTÉKPISZTOLYA&#10;+15 Ügyesség&#10;+25 Sebzés&#10;-3 Ész",
        price: 70,
        change: [0, 15, -3, 0, 25]
    },
    {
        num: 3,
        id: "lézerkard",
        status: 1,
        desc: "LÉZERKARD&#10;+15 Erő&#10;+5 Páncél&#10;+20 Ügyesség&#10;+6 Ész&#10;+24 Sebzés",
        price: 100,
        change: [15, 20, 6, 5, 24]
    }];

var EszRuhak = [
    {
        num: 0,
        id: "gyógypálesz",
        status: 1,
        desc: "DUGIPIÁS FLASKA&#10;Jobb, mint a dopping.&#10;Frissülés: 3 kör",
        price: 30,
    },
    {
        num: 1,
        id: "kocka",
        status: 1,
        desc: "ENGEDELMES KOCKA&#10;Meghatározhatod,&#10;mennyit dobsz.&#10;Frissülés: 2 kör",
        price: 40,
    },
    {
        num: 2,
        id: "bomba",
        status: 1,
        desc: "HUNCUT KIS BOMBA&#10;Megszivatod BB-t,&#10;ha melletted áll.&#10;Frissülés: 1 kör",
        price: 60,
    },
    {
        num: 3,
        id: "altatópuska",
        status: 1,
        desc: "ALTATÓPUSKA&#10;Egy időre kivonja a&#10;forgalomból BB-t&#10;Frissülés: 4 kör",
        price: 90,
    }];

PrintObjects();
PrintVals();
CheckObjectOut();
message("Nyomj rá arra, amit meg tudsz venni!");

function PrintObjects() {
    //Erőtárgyak
    var EroList = "";
    var EroListPrice = "";
    for (var ruha of EroRuhak) {
        EroList = EroList + `
        <td>
        <img class="ruha" id="${ruha.id}" title="${ruha.desc}" src="img/${ruha.id}.jpg" onclick="BuyEro(${ruha.num})" alt="${ruha.id}"
        </td>`;
    };
    EroList = EroList + `<td>
        <div class="charvalue">Végső Erő:<br><span id="Sero">${Char.ero}</span></div>
        <div class="charvalue">Páncél:<br><span id="Sarm">${Char.arm}</span></div>
        </td>
    `;
    document.getElementById("EroPics").innerHTML = EroList;
    for (var ruhap of EroRuhak) {
        EroListPrice = EroListPrice + `
        <td class="price">${ruhap.price}</td>`;
    };
    document.getElementById("EroPrices").innerHTML = EroListPrice;
    //Ügyestárgyak
    var UgyList = "";
    var UgyListPrice = "";
    for (var ruha of UgyRuhak) {
        UgyList = UgyList + `
        <td>
        <img class="ruha" id="${ruha.id}" title="${ruha.desc}" src="img/${ruha.id}.jpg" onclick="BuyUgy(${ruha.num})" alt="${ruha.id}"
        </td>`;
    };
    UgyList = UgyList + `<td>
        <div class="charvalue">Végső Ügyesség:<br><span id="Sugy">${Char.ugy}</span></div>
        <div class="charvalue">Sebzés:<br><span id="Sseb">${Char.seb}</span></div>
        </td>
    `;
    document.getElementById("UgyPics").innerHTML = UgyList;
    for (var ruhap of UgyRuhak) {
        UgyListPrice = UgyListPrice + `
        <td class="price">${ruhap.price}</td>`;
    };
    document.getElementById("UgyPrices").innerHTML = UgyListPrice;
    //Észtárgyak
    var EszList = "";
    var EszListPrice = "";
    for (var ruha of EszRuhak) {
        EszList = EszList + `
        <td>
        <img class="ruha" id="${ruha.id}" title="${ruha.desc}" src="img/${ruha.id}.jpg" onclick="BuyEsz(${ruha.num})" alt="${ruha.id}"
        </td>`;
    };
    EszList = EszList + `<td>
        <div class="charvalue">Végső Ész:<br><span id="Sesz">${Char.esz}</span></div>
        </td>
    `;
    document.getElementById("EszPics").innerHTML = EszList;
    for (var ruhap of EszRuhak) {
        EszListPrice = EszListPrice + `
        <td class="price">${ruhap.price}</td>`;
    };
    document.getElementById("EszPrices").innerHTML = EszListPrice;
};

function PrintVals() {
    document.getElementById('Sero').innerHTML = Char.ero;
    document.getElementById('Sxero').innerHTML = xero;
    document.getElementById('Sugy').innerHTML = Char.ugy;
    document.getElementById('Sxugy').innerHTML = xugy;
    document.getElementById('Sesz').innerHTML = Char.esz;
    document.getElementById('Sxesz').innerHTML = xesz;
    document.getElementById('Sarm').innerHTML = Char.arm;
    document.getElementById('Sseb').innerHTML = Char.seb;
}

function CheckObjectOut() {
    for (var r of EroRuhak) {
        if (r.status != 2) {
            if (xero < r.price) {
                r.status = 0;
                document.getElementById(r.id).setAttribute("style", "filter: opacity(0.2); brightness(0.2); transition: filter 1s");
            }
            if (xero >= r.price && r.status == 0) {
                r.status = 1;
                document.getElementById(r.id).setAttribute("style", "filter: opacity(1); brightness(1); transition: filter 1s");
            }
        }
    };
    for (var r of UgyRuhak) {
        if (r.status != 2) {
            if (xugy < r.price) {
                r.status = 0;
                document.getElementById(r.id).setAttribute("style", "filter: opacity(0.2); brightness(0.2); transition: filter 1s");
            }
            if (xugy >= r.price && r.status == 0) {
                r.status = 1;
                document.getElementById(r.id).setAttribute("style", "filter: opacity(1); brightness(1); transition: filter 1s");
            }
        }
    };
    for (var r of EszRuhak) {
        if (r.status != 2) {
            if (xesz < r.price) {
                r.status = 0;
                document.getElementById(r.id).setAttribute("style", "filter: opacity(0.2); brightness(0.2); transition: filter 1s");
            }
            if (xesz >= r.price && r.status == 0) {
                r.status = 1;
                document.getElementById(r.id).setAttribute("style", "filter: opacity(1); brightness(1); transition: filter 1s");
            }
        }
    }
}

function message(text) {
    clearTimeout(timo);
    const a = document.getElementById("message");
    a.innerHTML = text;
    timo = setTimeout(function () {
        a.style.filter = "opacity(0) blur(6px)"; 
        a.style.left = "39cm"; 
        a.style.top = "10cm"; 
        a.style.transition = "all 2s"}, text.length * 80)
};

//Vásárlás

function BuyEro(x) {
    var p = EroRuhak[x].price;
    switch (EroRuhak[x].status) {
        case 0:
            document.getElementById("message").setAttribute("style", "filter: opacity(1) blur(0)");
            message("Több spenótot kellett volna ehhez enni!");
            break;
        case 1:
            EroRuhak[x].status = 2;
            xero -= p;
            Char.ero += EroRuhak[x].change[0];
            Char.ugy += EroRuhak[x].change[1];
            Char.esz += EroRuhak[x].change[2];
            Char.arm += EroRuhak[x].change[3];
            Char.seb += EroRuhak[x].change[4];
            document.getElementById("message").setAttribute("style", "filter: opacity(1) blur(0)");
            message("Tiéd lett a csodálatos " + EroRuhak[x].id + "!");
            document.getElementById(EroRuhak[x].id).setAttribute("style", "filter: brightness(1.5) invert(1); transition: all 1s");
            PrintVals();
            CheckObjectOut();
            break;
        case 2:
            EroRuhak[x].status = 1;
            xero += p;
            Char.ero -= EroRuhak[x].change[0];
            Char.ugy -= EroRuhak[x].change[1];
            Char.esz -= EroRuhak[x].change[2];
            Char.arm -= EroRuhak[x].change[3];
            Char.seb -= EroRuhak[x].change[4];
            document.getElementById("message").setAttribute("style", "filter: opacity(1) blur(0)");
            message("Eh, nem is kell ez a vacak " + EroRuhak[x].id + "!");
            document.getElementById(EroRuhak[x].id).setAttribute("style", "filter: brightness(1) invert(0); transition: all 1s");
            PrintVals();
            CheckObjectOut();
            break;
        default:
            break;
    }
}

function BuyUgy(x) {
    var p = UgyRuhak[x].price;
    switch (UgyRuhak[x].status) {
        case 0:
            document.getElementById("message").setAttribute("style", "filter: opacity(1) blur(0)");
            message("Lehet róla álmodozni, de kevés vagy ehhez!");
            break;
        case 1:
            UgyRuhak[x].status = 2;
            xugy -= p;
            Char.ero += UgyRuhak[x].change[0];
            Char.ugy += UgyRuhak[x].change[1];
            Char.esz += UgyRuhak[x].change[2];
            Char.arm += UgyRuhak[x].change[3];
            Char.seb += UgyRuhak[x].change[4];
            document.getElementById("message").setAttribute("style", "filter: opacity(1) blur(0)");
            message("Egy " + UgyRuhak[x].id + " boldog tulajdonosa lettél!");
            document.getElementById(UgyRuhak[x].id).setAttribute("style", "filter: brightness(1.5) invert(1); transition: all 1s");
            PrintVals();
            CheckObjectOut();
            break;
        case 2:
            UgyRuhak[x].status = 1;
            xugy += p;
            Char.ero -= UgyRuhak[x].change[0];
            Char.ugy -= UgyRuhak[x].change[1];
            Char.esz -= UgyRuhak[x].change[2];
            Char.arm -= UgyRuhak[x].change[3];
            Char.seb -= UgyRuhak[x].change[4];
            document.getElementById("message").setAttribute("style", "filter: opacity(1) blur(0)");
            message("Egy " + UgyRuhak[x].id + " nélkül nagyobb a kihívás!");
            document.getElementById(UgyRuhak[x].id).setAttribute("style", "filter: brightness(1) invert(0); transition: all 1s");
            PrintVals();
            CheckObjectOut();
            break;
        default:
            break;
    }
}

function BuyEsz(x) {
    var p = EszRuhak[x].price;
    switch (EszRuhak[x].status) {
        case 0:
            document.getElementById("message").setAttribute("style", "filter: opacity(1) blur(0)");
            message("Kevés az IQ-d, hogy ezt használd!");
            break;
        case 1:
            EszRuhak[x].status = 2;
            xesz -= p;
            document.getElementById("message").setAttribute("style", "filter: opacity(1) blur(0)");
            message("Biztos jól fog majd jönni egy jó kis " + EszRuhak[x].id + "!");
            document.getElementById(EszRuhak[x].id).setAttribute("style", "filter: brightness(1.5) invert(1); transition: all 1s");
            PrintVals();
            CheckObjectOut();
            break;
        case 2:
            EszRuhak[x].status = 1;
            xesz += p;
            document.getElementById("message").setAttribute("style", "filter: opacity(1) blur(0)");
            message("Talán mégsem kell ez a fura " + EszRuhak[x].id + "...");
            document.getElementById(EszRuhak[x].id).setAttribute("style", "filter: brightness(1) invert(0); transition: all 1s");
            PrintVals();
            CheckObjectOut();
            break;
        default:
            break;
    }
}

function cart() {
    localStorage.setItem("NewEro", Char.ero);
    localStorage.setItem("NewUgy", Char.ugy);
    localStorage.setItem("NewEsz", Char.esz);
    localStorage.setItem("NewArm", Char.arm);
    localStorage.setItem("NewSeb", Char.seb);
    localStorage.setItem("NewPic", Char.pic);
    localStorage.setItem("NewPia", EszRuhak[0].status);
    localStorage.setItem("NewKoc", EszRuhak[1].status);
    localStorage.setItem("NewBom", EszRuhak[2].status);
    localStorage.setItem("NewAlt", EszRuhak[3].status);
    location.replace("final.html");
}

