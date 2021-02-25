let char = {
  pic: localStorage.getItem("NewPic"),
  ero: Number(localStorage.getItem("NewEro")),
  ugy: Number(localStorage.getItem("NewUgy")),
  esz: Number(localStorage.getItem("NewEsz")),
  arm: 0,
  seb: 0,
};

let xero = char.ero;
let xugy = char.ugy;
let xesz = char.esz;
let timo;

let eroRuhak = [
  {
    num: 0,
    id: "pajzs",
    status: 1,
    desc: "FASZAGYEREKEK PAJZSA&#10;+8 Erő&#10;+5 Páncél",
    price: 20,
    change: [8, 0, 0, 5, 0],
  },
  {
    num: 1,
    id: "sisak",
    status: 1,
    desc: "TELJES AGYVÉDELEM&#10;+10 Erő&#10;+8 Páncél&#10;+3 Ész",
    price: 40,
    change: [10, 0, 3, 8, 0],
  },
  {
    num: 2,
    id: "vascsizma",
    status: 1,
    desc:
      "KEMÉNY CSÁVÓK VASCSIZMÁJA&#10;+20 Erő&#10;+10 Páncél&#10;-2 Ügyesség",
    price: 50,
    change: [20, -2, 0, 10, 0],
  },
  {
    num: 3,
    id: "páncéling",
    status: 1,
    desc: "IZOMPACSIRTÁK INGJE&#10;+40 Erő&#10;+20 Páncél&#10;-4 Ügyesség",
    price: 80,
    change: [40, -4, 0, 20, 0],
  },
];

let ugyRuhak = [
  {
    num: 0,
    id: "csúzli",
    status: 1,
    desc: "ROSSZCSONTOK CSÚZLIJA&#10;+4 Ügyesség&#10;+5 Sebzés",
    price: 10,
    change: [0, 4, 0, 0, 5],
  },
  {
    num: 1,
    id: "kard",
    status: 1,
    desc: "NEMES LOVAGOK KARDJA&#10;+8 Ügyesség&#10;+6 Páncél&#10;+12 Sebzés",
    price: 40,
    change: [0, 8, 0, 6, 12],
  },
  {
    num: 2,
    id: "pisztoly",
    status: 1,
    desc:
      "GENGSZTEREK JÁTÉKPISZTOLYA&#10;+15 Ügyesség&#10;+25 Sebzés&#10;-3 Ész",
    price: 70,
    change: [0, 15, -3, 0, 25],
  },
  {
    num: 3,
    id: "lézerkard",
    status: 1,
    desc:
      "LÉZERKARD&#10;+15 Erő&#10;+5 Páncél&#10;+20 Ügyesség&#10;+6 Ész&#10;+24 Sebzés",
    price: 100,
    change: [15, 20, 6, 5, 24],
  },
];

let eszRuhak = [
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
    desc:
      "ENGEDELMES KOCKA&#10;Meghatározhatod,&#10;mennyit dobsz.&#10;Frissülés: 2 kör",
    price: 50,
  },
  {
    num: 2,
    id: "bomba",
    status: 1,
    desc:
      "HUNCUT KIS BOMBA&#10;Megszivatod BB-t,&#10;ha közel áll.&#10;Frissülés: 1 kör",
    price: 60,
  },
  {
    num: 3,
    id: "altatópuska",
    status: 1,
    desc:
      "ALTATÓPUSKA&#10;Egy időre kivonja a&#10;forgalomból BB-t&#10;Frissülés: 4 kör",
    price: 80,
  },
];

function message(text) {
  clearTimeout(timo);
  const a = document.getElementById("message");
  a.innerHTML = text;
  timo = setTimeout(function () {
    a.style.filter = "opacity(0) blur(6px)";
    a.style.left = "39cm";
    a.style.top = "10cm";
    a.style.transition = "all 2s";
  }, text.length * 80);
}

//Vásárlás

function buyEro(x) {
  let p = eroRuhak[x].price;
  switch (eroRuhak[x].status) {
    case 0:
      document
        .getElementById("message")
        .setAttribute("style", "filter: opacity(1) blur(0)");
      message("Több spenótot kellett volna ehhez enni!");
      break;
    case 1:
      eroRuhak[x].status = 2;
      xero -= p;
      char.ero += eroRuhak[x].change[0];
      char.ugy += eroRuhak[x].change[1];
      char.esz += eroRuhak[x].change[2];
      char.arm += eroRuhak[x].change[3];
      char.seb += eroRuhak[x].change[4];
      document
        .getElementById("message")
        .setAttribute("style", "filter: opacity(1) blur(0)");
      message("Tiéd lett a csodálatos " + eroRuhak[x].id + "!");
      document
        .getElementById(eroRuhak[x].id)
        .setAttribute(
          "style",
          "filter: brightness(1.5) invert(1); transition: all 1s"
        );
      printVals();
      checkObjectOut();
      break;
    case 2:
      eroRuhak[x].status = 1;
      xero += p;
      char.ero -= eroRuhak[x].change[0];
      char.ugy -= eroRuhak[x].change[1];
      char.esz -= eroRuhak[x].change[2];
      char.arm -= eroRuhak[x].change[3];
      char.seb -= eroRuhak[x].change[4];
      document
        .getElementById("message")
        .setAttribute("style", "filter: opacity(1) blur(0)");
      message("Eh, nem is kell ez a vacak " + eroRuhak[x].id + "!");
      document
        .getElementById(eroRuhak[x].id)
        .setAttribute(
          "style",
          "filter: brightness(1) invert(0); transition: all 1s"
        );
      printVals();
      checkObjectOut();
      break;
    default:
      break;
  }
}

function buyUgy(x) {
  let p = ugyRuhak[x].price;
  switch (ugyRuhak[x].status) {
    case 0:
      document
        .getElementById("message")
        .setAttribute("style", "filter: opacity(1) blur(0)");
      message("Lehet róla álmodozni, de kevés vagy ehhez!");
      break;
    case 1:
      ugyRuhak[x].status = 2;
      xugy -= p;
      char.ero += ugyRuhak[x].change[0];
      char.ugy += ugyRuhak[x].change[1];
      char.esz += ugyRuhak[x].change[2];
      char.arm += ugyRuhak[x].change[3];
      char.seb += ugyRuhak[x].change[4];
      document
        .getElementById("message")
        .setAttribute("style", "filter: opacity(1) blur(0)");
      message("Egy " + ugyRuhak[x].id + " boldog tulajdonosa lettél!");
      document
        .getElementById(ugyRuhak[x].id)
        .setAttribute(
          "style",
          "filter: brightness(1.5) invert(1); transition: all 1s"
        );
      printVals();
      checkObjectOut();
      break;
    case 2:
      ugyRuhak[x].status = 1;
      xugy += p;
      char.ero -= ugyRuhak[x].change[0];
      char.ugy -= ugyRuhak[x].change[1];
      char.esz -= ugyRuhak[x].change[2];
      char.arm -= ugyRuhak[x].change[3];
      char.seb -= ugyRuhak[x].change[4];
      document
        .getElementById("message")
        .setAttribute("style", "filter: opacity(1) blur(0)");
      message("Egy " + ugyRuhak[x].id + " nélkül nagyobb a kihívás!");
      document
        .getElementById(ugyRuhak[x].id)
        .setAttribute(
          "style",
          "filter: brightness(1) invert(0); transition: all 1s"
        );
      printVals();
      checkObjectOut();
      break;
    default:
      break;
  }
}

function buyEsz(x) {
  let p = eszRuhak[x].price;
  switch (eszRuhak[x].status) {
    case 0:
      document
        .getElementById("message")
        .setAttribute("style", "filter: opacity(1) blur(0)");
      message("Kevés az IQ-d, hogy ezt használd!");
      break;
    case 1:
      eszRuhak[x].status = 2;
      xesz -= p;
      document
        .getElementById("message")
        .setAttribute("style", "filter: opacity(1) blur(0)");
      message("Biztos jól fog majd jönni egy jó kis " + eszRuhak[x].id + "!");
      document
        .getElementById(eszRuhak[x].id)
        .setAttribute(
          "style",
          "filter: brightness(1.5) invert(1); transition: all 1s"
        );
      printVals();
      checkObjectOut();
      break;
    case 2:
      eszRuhak[x].status = 1;
      xesz += p;
      document
        .getElementById("message")
        .setAttribute("style", "filter: opacity(1) blur(0)");
      message("Talán mégsem kell ez a fura " + eszRuhak[x].id + "...");
      document
        .getElementById(eszRuhak[x].id)
        .setAttribute(
          "style",
          "filter: brightness(1) invert(0); transition: all 1s"
        );
      printVals();
      checkObjectOut();
      break;
    default:
      break;
  }
}

function cart() {
  localStorage.setItem("NewEro", char.ero);
  localStorage.setItem("NewUgy", char.ugy);
  localStorage.setItem("NewEsz", char.esz);
  localStorage.setItem("NewArm", char.arm);
  localStorage.setItem("NewSeb", char.seb);
  localStorage.setItem("NewPic", char.pic);
  localStorage.setItem("NewPia", eszRuhak[0].status);
  localStorage.setItem("NewKoc", eszRuhak[1].status);
  localStorage.setItem("NewBom", eszRuhak[2].status);
  localStorage.setItem("NewAlt", eszRuhak[3].status);
  location.replace("final.html");
}

function printObjects() {
  //Erőtárgyak
  let eroList = "";
  let eroListPrice = "";
  for (let ruha of eroRuhak) {
    eroList =
      eroList +
      `
        <td>
        <img class="ruha" id="${ruha.id}" title="${ruha.desc}" src="img/${ruha.id}.jpg" onclick="buyEro(${ruha.num})" alt="${ruha.id}"
        </td>`;
  }
  eroList =
    eroList +
    `<td>
        <div class="charvalue">Végső Erő:<br><span id="Sero">${char.ero}</span></div>
        <div class="charvalue">Páncél:<br><span id="Sarm">${char.arm}</span></div>
        </td>
    `;
  document.getElementById("eroPics").innerHTML = eroList;
  for (let ruhap of eroRuhak) {
    eroListPrice =
      eroListPrice +
      `
        <td class="price">${ruhap.price}</td>`;
  }
  document.getElementById("eroPrices").innerHTML = eroListPrice;
  //Ügyestárgyak
  let ugyList = "";
  let ugyListPrice = "";
  for (let ruha of ugyRuhak) {
    ugyList =
      ugyList +
      `
        <td>
        <img class="ruha" id="${ruha.id}" title="${ruha.desc}" src="img/${ruha.id}.jpg" onclick="buyUgy(${ruha.num})" alt="${ruha.id}"
        </td>`;
  }
  ugyList =
    ugyList +
    `<td>
        <div class="charvalue">Végső Ügyesség:<br><span id="Sugy">${char.ugy}</span></div>
        <div class="charvalue">Sebzés:<br><span id="Sseb">${char.seb}</span></div>
        </td>
    `;
  document.getElementById("ugyPics").innerHTML = ugyList;
  for (let ruhap of ugyRuhak) {
    ugyListPrice =
      ugyListPrice +
      `
        <td class="price">${ruhap.price}</td>`;
  }
  document.getElementById("ugyPrices").innerHTML = ugyListPrice;
  //Észtárgyak
  let eszList = "";
  let eszListPrice = "";
  for (let ruha of eszRuhak) {
    eszList =
      eszList +
      `
        <td>
        <img class="ruha" id="${ruha.id}" title="${ruha.desc}" src="img/${ruha.id}.jpg" onclick="buyEsz(${ruha.num})" alt="${ruha.id}"
        </td>`;
  }
  eszList =
    eszList +
    `<td>
        <div class="charvalue">Végső Ész:<br><span id="Sesz">${char.esz}</span></div>
        </td>
    `;
  document.getElementById("eszPics").innerHTML = eszList;
  for (let ruhap of eszRuhak) {
    eszListPrice =
      eszListPrice +
      `
        <td class="price">${ruhap.price}</td>`;
  }
  document.getElementById("eszPrices").innerHTML = eszListPrice;
}

function printVals() {
  document.getElementById("Sero").innerHTML = char.ero;
  document.getElementById("Sxero").innerHTML = xero;
  document.getElementById("Sugy").innerHTML = char.ugy;
  document.getElementById("Sxugy").innerHTML = xugy;
  document.getElementById("Sesz").innerHTML = char.esz;
  document.getElementById("Sxesz").innerHTML = xesz;
  document.getElementById("Sarm").innerHTML = char.arm;
  document.getElementById("Sseb").innerHTML = char.seb;
}

function checkObjectOut() {
  for (let r of eroRuhak) {
    if (r.status != 2) {
      if (xero < r.price) {
        r.status = 0;
        document
          .getElementById(r.id)
          .setAttribute(
            "style",
            "filter: opacity(0.2); brightness(0.2); transition: filter 1s"
          );
      }
      if (xero >= r.price && r.status == 0) {
        r.status = 1;
        document
          .getElementById(r.id)
          .setAttribute(
            "style",
            "filter: opacity(1); brightness(1); transition: filter 1s"
          );
      }
    }
  }
  for (let r of ugyRuhak) {
    if (r.status != 2) {
      if (xugy < r.price) {
        r.status = 0;
        document
          .getElementById(r.id)
          .setAttribute(
            "style",
            "filter: opacity(0.2); brightness(0.2); transition: filter 1s"
          );
      }
      if (xugy >= r.price && r.status == 0) {
        r.status = 1;
        document
          .getElementById(r.id)
          .setAttribute(
            "style",
            "filter: opacity(1); brightness(1); transition: filter 1s"
          );
      }
    }
  }
  for (let r of eszRuhak) {
    if (r.status != 2) {
      if (xesz < r.price) {
        r.status = 0;
        document
          .getElementById(r.id)
          .setAttribute(
            "style",
            "filter: opacity(0.2); brightness(0.2); transition: filter 1s"
          );
      }
      if (xesz >= r.price && r.status == 0) {
        r.status = 1;
        document
          .getElementById(r.id)
          .setAttribute(
            "style",
            "filter: opacity(1); brightness(1); transition: filter 1s"
          );
      }
    }
  }
}

printObjects();
printVals();
checkObjectOut();
message("Nyomj rá arra, amit meg tudsz venni!");
