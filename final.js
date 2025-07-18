window.apic = localStorage.getItem("NewPic");
window.aero = Number(localStorage.getItem("NewEro"));
window.augy = Number(localStorage.getItem("NewUgy"));
window.aesz = Number(localStorage.getItem("NewEsz"));
window.aarm = Number(localStorage.getItem("NewArm"));
window.aseb = Number(localStorage.getItem("NewSeb"));

window.bpic = "img/bbeetle.jpg";
window.bero =
  aero < 100
    ? parseInt(100 - Math.random() * 40)
    : parseInt(100 + Math.random() * 80);
window.bugy =
  augy < 100
    ? parseInt(100 - Math.random() * 60)
    : parseInt(100 + Math.random() * 60);
window.besz =
  aesz < 100
    ? parseInt(100 - Math.random() * 60)
    : parseInt(100 + Math.random() * 60);
window.barm =
  aarm < 15
    ? parseInt(15 - Math.random() * 10)
    : parseInt(15 + Math.random() * 10);
window.bseb =
  aseb < 25
    ? parseInt(25 - Math.random() * 15)
    : parseInt(25 + Math.random() * 15);

let timo;

window.Char = [
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
  },
];

window.pia = localStorage.getItem("NewPia") == "2" ? true : false;
window.koc = localStorage.getItem("NewKoc") == "2" ? true : false;
window.bom = localStorage.getItem("NewBom") == "2" ? true : false;
window.alt = localStorage.getItem("NewAlt") == "2" ? true : false;
window.piaUp = 3;
window.kocUp = 2;
window.bomUp = 1;
window.altUp = 4;
window.sleep = 0;

function message(text) {
  for (let i = 1; i < 3; i++) {
    if (i == 1) {
      document
        .getElementById("message")
        .setAttribute("style", "filter: opacity(1) blur(0)");
      continue;
    } else {
      clearTimeout(timo);
      const a = document.getElementById("message");
      a.innerHTML = text;
      timo = setTimeout(function () {
        a.style.filter = "opacity(0) blur(6px)";
        a.style.left = "0%";
        a.style.transition = "all 2s ease-out";
      }, text.length * 70);
    }
  }
}

window.fields = [
  ["sima", "./img/grass.jpg"],
  ["sima", "./img/grass.jpg"],
  ["sima", "./img/grass.jpg"],
  ["bogyo", "./img/berries.jpg"],
  ["fa", "./img/beast-fa.jpg"],
  ["manti", "./img/beast-manti.jpg"],
  ["bika", "./img/beast-bika.jpg"],
  ["boxer", "./img/erdei.jpg"],
  ["katapult", "./img/katapult.jpg"],
  ["meglepi", "./img/question.jpg"],
  ["meglepi", "./img/question.jpg"],
];

window.board = [["start", "./img/start.jpg"]];

function initBoard() {
  //pályagenerálás
  for (let i = 1; i < 24; i++) {
    let ii = parseInt(Math.random() * fields.length);
    board.push(fields[ii]);
  }
  board.push(["bb", "./img/bball.jpg"]);
  //pályarajzolás
  var boardDiv = "";
  for (let i = 0; i < 25; i++) {
    boardDiv =
      boardDiv +
      `<img class="mezo" id="mezo${i}" src=${board[i][1]} title=${board[i][0]}>`;
  }
  document.getElementById("board").innerHTML = boardDiv;
  for (let i = 0; i < 12; i++) {
    document.getElementById("mezo" + i).style.left = 60 + i * 150 + "px";
  }
  document.getElementById("mezo12").style.left = 60 + 11 * 150 + "px";
  document.getElementById("mezo12").style.top = "340px";
  for (let i = 13; i < 25; i++) {
    document.getElementById("mezo" + i).style.left =
      60 + Math.abs(i - 24) * 150 + "px";
    document.getElementById("mezo" + i).style.top = "490px";
  }
  //bábuk lerakása
  document.getElementById(
    "CharBabu"
  ).innerHTML = `<img id="bab0" src=${Char[0].pic} title='Ne engem bizgass, hanem a tábla alatti tárgyakat!' onclick='message("A bal alsó sarok környékén nézz szét!")'>`;
  document.getElementById(
    "BBBabu"
  ).innerHTML = `<img id="bab1" src=${Char[1].pic} title='Húzz innen, ha kedves az életed!!!' onclick='message("Ne hergeld fel Battle Beetle-t feleslegesen!")'>`;
  document.getElementById("bab0").style.top = "196px";
  document.getElementById("bab1").style.top = "264px";
  document.getElementById("bab0").style.left = "100px";
  document.getElementById("bab1").style.left = "100px";
  //tárgyak
  var objectDiv = "";
  if (pia === true) {
    objectDiv =
      objectDiv +
      "<img class='ObjPic' id='piaP' onclick='usePalesz()' src='./img/gyógypálesz.jpg'>";
  }
  if (koc === true) {
    objectDiv =
      objectDiv +
      "<img class='ObjPic' id='kocP' onclick='useKocka()' src='./img/kocka.jpg'>";
  }
  if (bom === true) {
    objectDiv =
      objectDiv +
      "<img class='ObjPic' id='bomP' onclick='useBomba()' src='./img/bomba.jpg'>";
  }
  if (alt === true) {
    objectDiv =
      objectDiv +
      "<img class='ObjPic' id='altP' onclick='useAltato()' src='./img/altatópuska.jpg'>";
  }
  document.getElementById("objects").innerHTML = objectDiv;
  document.getElementById("dice").innerHTML =
    "<button id='dice-btn' onclick='dobas(0)'>Lépés</button>";
}
initBoard();

function updateVals() {
  var updateDiv = "";
  if (pia === true) {
    updateDiv = updateDiv + `<span class='UpNo' id='piaUV'>${piaUp}</span>`;
  }
  if (koc === true) {
    updateDiv = updateDiv + `<span class='UpNo' id='kocUV'>${kocUp}</span>`;
  }
  if (bom === true) {
    updateDiv = updateDiv + `<span class='UpNo' id='bomUV'>${bomUp}</span>`;
  }
  if (alt === true) {
    updateDiv = updateDiv + `<span class='UpNo' id='altUV'>${altUp}</span>`;
  }
  document.getElementById("updates").innerHTML = updateDiv;
  if (pia === true && piaUp == 0) {
    document.getElementById("piaUV").innerHTML = "&#10004;";
    document.getElementById("piaP").style = "box-shadow: 0px 0px 20px #FD07FD";
    document.getElementById("piaP").style.opacity = 1;
  }
  if (pia === true && piaUp > 0) {
    document.getElementById("piaP").style = "box-shadow: 0px 0px";
    document.getElementById("piaP").style.opacity = 0.5;
  }
  if (koc === true && kocUp == 0) {
    document.getElementById("kocUV").innerHTML = "&#10004;";
    document.getElementById("kocP").style =
      "box-shadow: 0px 0px 20px #FD07FD; ";
    document.getElementById("kocP").style.opacity = 1;
  }
  if (koc === true && kocUp > 0) {
    document.getElementById("kocP").style = "box-shadow: 0px 0px";
    document.getElementById("kocP").style.opacity = 0.5;
  }
  if (bom === true && bomUp == 0) {
    document.getElementById("bomUV").innerHTML = "&#10004;";
    document.getElementById("bomP").style = "box-shadow: 0px 0px 20px #FD07FD";
    document.getElementById("bomP").style.opacity = 1;
  }
  if (bom === true && bomUp > 0) {
    document.getElementById("bomP").style = "box-shadow: 0px 0px";
    document.getElementById("bomP").style.opacity = 0.5;
  }
  if (alt === true && altUp == 0) {
    document.getElementById("altUV").innerHTML = "&#10004;";
    document.getElementById("altP").style = "box-shadow: 0px 0px 20px #FD07FD";
    document.getElementById("altP").style.opacity = 1;
  }
  if (alt === true && altUp > 0) {
    document.getElementById("altP").style = "box-shadow: 0px 0px";
    document.getElementById("altP").style.opacity = 0.5;
  }
}
updateVals();

function printVals() {
  document.getElementById("values").innerHTML = `<table>
    <tr>
    <th>SAJÁT PONTOK</th>
    <th>BATTLE BEETLE</th>
    </tr>
    <tr>
    <td>Erő: <span class='CharVal' id='val_0_1' style="width: ${15 + Char[0].ero * 1.5
    }px;">${Char[0].ero}</span></td>
    <td>Erő: <span class='BBVal' id='val_1_1' style="width: ${15 + Char[1].ero * 1.5
    }px;">${Char[1].ero}</span></td>
    </tr>
    <tr>
    <td>Ügyesség: <span class='CharVal' id='val_0_2' style="width: ${15 + Char[0].ugy * 1.5
    }px;">${Char[0].ugy}</span></td>
    <td>Ügyesség: <span class='BBVal' id='val_1_2' style="width: ${15 + Char[1].ugy * 1.5
    }px;">${Char[1].ugy}</span></td>
    </tr>
    <tr>
    <td>Ész: <span class='CharVal' id='val_0_3' style="width: ${15 + Char[0].esz * 1.5
    }px;">${Char[0].esz}</span></td>
    <td>Ész: <span class='BBVal' id='val_1_3' style="width: ${15 + Char[1].esz * 1.5
    }px;">${Char[1].esz}</span></td>
    </tr>
    <tr>
    <td>Páncél: <span class='CharVal' id='val_0_4' style="width: ${15 + Char[0].arm * 1.5
    }px;">${Char[0].arm}</span></td>
    <td>Páncél: <span class='BBVal' id='val_1_4' style="width: ${15 + Char[1].arm * 1.5
    }px;">${Char[1].arm}</span></td>
    </tr>
    <tr>
    <td>Sebzés: <span class='CharVal' id='val_0_5' style="width: ${15 + Char[0].seb * 1.5
    }px;">${Char[0].seb}</span></td>
    <td>Sebzés: <span class='BBVal' id='val_1_5' style="width: ${15 + Char[1].seb * 1.5
    }px;">${Char[1].seb}</span></td>
    </tr>
    </table>`;
}
printVals();

function dobas(d) {
  document.getElementById("dice-btn").disabled = true;
  document.getElementById("other").innerHTML = "";
  if (d == 0) {
    d = parseInt(1 + 3 * Math.random());
  }
  move(0, d);
  if (sleep > 0) {
    sleep -= 1;
    if (sleep == 0) {
      document.getElementById("bab1").style.filter = "opacity(1) brightness(1)";
    }
  }
  if (sleep == 0) {
    setTimeout(function () {
      d = parseInt(1 + 4 * Math.random());
      move(1, d);
    }, 2000);
  }
  setTimeout(function () {
    track(0);
  }, 4000);
  if (sleep == 0) {
    setTimeout(function () {
      track(1);
    }, 6000);
  }
  setTimeout(function () {
    document.getElementById("dice-btn").disabled = false;
    if (pia === true && piaUp > 0) {
      piaUp -= 1;
    }
    if (koc === true && kocUp > 0) {
      kocUp -= 1;
    }
    if (bom === true && bomUp > 0) {
      bomUp -= 1;
    }
    if (alt === true && altUp > 0) {
      altUp -= 1;
    }
    updateVals();
  }, 6500);
}

function usePalesz() {
  if (piaUp > 0) {
    message("Még " + piaUp + " kört kell erre várnod!");
    return;
  }
  var x = parseInt(10 + Math.random() * 5);
  var y = 0;
  if (Char[0].ugy < Char[0].ero) {
    y = 1;
    if (Char[0].esz < Char[0].ugy) {
      y = 2;
    }
  } else if (Char[0].esz < Char[0].ero) {
    y = 2;
  }
  switch (y) {
    case 0:
      message("Kétszeresére dagadnak az izmaid, nyersz " + x + " Erőt!");
      Char[0].ero += x;
      changeVal(0, 1, Char[0].ero);
      break;
    case 1:
      message("Úgy pattogsz, mint egy ninja, nyersz " + x + " Ügyességet!");
      Char[0].ugy += x;
      changeVal(0, 2, Char[0].ugy);
      break;
    case 2:
      message("Kitisztul az elméd, nyersz " + x + " Észt!");
      Char[0].esz += x;
      changeVal(0, 3, Char[0].esz);
      break;
  }
  piaUp = 4;
  updateVals();
}

function useKocka() {
  if (kocUp > 0) {
    message("Még " + kocUp + " kört kell erre várnod!");
    return;
  }
  document.getElementById("other").innerHTML = `
    <img class='kocPic' onclick='dobas(1)' src='./img/kocka-1.png' style='left: 50px'>
    <img class='kocPic' onclick='dobas(2)' src='./img/kocka-2.png' style='left: 120px'>
    <img class='kocPic' onclick='dobas(3)' src='./img/kocka-3.png' style='left: 190px'>
    <img class='kocPic' onclick='dobas(4)' src='./img/kocka-4.png' style='left: 260px'>`;
  document.getElementById("dice-btn").disabled = true;
  kocUp = 3;
  updateVals();
}

function useBomba() {
  if (bomUp > 0) {
    message("Még " + bomUp + " kört kell erre várnod!");
    return;
  }
  var x = 1 + Math.round(Char[0].ero / 100 + Char[0].ugy / 150);
  if (Math.abs(Char[0].pos - Char[1].pos) > x) {
    message(
      "Túl messze van Battle Beetle, legfeljebb " + x + " mezőre tudsz dobni!"
    );
    return;
  }
  var x = parseInt(10 + Math.random() * 5);
  var y = 0;
  if (Char[1].ugy > Char[1].ero) {
    y = 1;
    if (Char[1].esz > Char[1].ugy) {
      y = 2;
    }
  } else if (Char[1].esz > Char[1].ero) {
    y = 2;
  }
  switch (y) {
    case 0:
      message(
        "A bomba Battle Beetle mellkasának csapódik. Veszít " + x + " Erőt!"
      );
      Char[1].ero -= x;
      changeVal(1, 1, Char[1].ero);
      break;
    case 1:
      message(
        "A bomba Battle Beetle egyik lábát találja el. Veszít " +
        x +
        " Ügyességet!"
      );
      Char[1].ugy -= x;
      changeVal(1, 2, Char[1].ugy);
      break;
    case 2:
      message("A bomba Battle Beetle fejénél robban. Veszít " + x + " Észt!");
      Char[1].esz -= x;
      changeVal(1, 3, Char[1].esz);
      break;
  }
  checkDeath();
  bomUp = 2;
  updateVals();
}

function useAltato() {
  if (altUp > 0) {
    message("Még " + altUp + " kört kell erre várnod!");
    return;
  }
  x = parseInt(1 + (Math.random() * Char[1].pos) / 8);
  message("Battle Beetle-t " + x + " körre kivontad a forgalomból!");
  sleep = x + 1;
  document.getElementById("bab1").style.filter = "opacity(0.5) brightness(0.7)";
  altUp = 5;
  updateVals();
}

function move(pl, num) {
  Char[pl].pos += num;
  var p = Char[pl].pos;
  var x = 0;
  var y = 0;
  var pl2 = pl == 0 ? 1 : 0;
  if (p < 1) {
    x = 100;
    y = 196 + pl * 68;
    Char[pl].pos = 0;
  }
  if (p > 0 && p < 12) {
    x = 100 + p * 150;
    y = 230;
  }
  if (p == 12) {
    x = 1750;
    y = 380;
  }
  if (p > 23) {
    p = 24;
    Char[pl].pos = 24;
  }
  if (p > 12) {
    x = 100 + Math.abs(p - 24) * 150;
    y = 530;
  }
  document.getElementById("bab" + pl).style.left = x + "px";
  document.getElementById("bab" + pl).style.top = y + "px";
  document.getElementById("bab" + pl).style.transition = "all 1s";
  checkFight(pl, pl2);
}

function checkFight(pl1, pl2) {
  if (Char[pl1].pos == Char[pl2].pos) {
    var x =
      Char[pl1].ugy +
      Char[pl1].ero / 5 +
      Char[pl1].esz / 10 +
      Math.random() * 40 -
      (Char[pl2].ugy +
        Char[pl2].ero / 5 +
        Char[pl2].esz / 10 +
        Math.random() * 40);
    setTimeout(function () {
      if (x > 0 || (pl1 == 0 && sleep > 0)) {
        move(pl2, -1);
        var y = parseInt(
          Char[pl1].seb + Char[pl1].ero / 10 + Math.random() * x - Char[pl2].arm
        );
        if (y < 1) {
          y = 1;
        }
        if (
          Char[pl1].esz > Char[pl2].esz + Char[pl2].arm + Math.random() * 10 ||
          (pl1 == 0 && sleep > 0)
        ) {
          message("Kritikus támadás!");
          Char[pl2].ero -= y * 2;
          changeVal(pl2, 1, Char[pl2].ero);
          Char[pl2].ugy -= Math.round(y / 5);
          changeVal(pl2, 2, Char[pl2].ugy);
          Char[pl2].esz -= Math.round(y / 10);
          changeVal(pl2, 3, Char[pl2].esz);
          Char[pl2].arm -= 1;
          changeVal(pl2, 4, Char[pl2].arm);
          Char[pl2].seb -= 1;
          changeVal(pl2, 5, Char[pl2].seb);
          checkDeath();
        } else {
          message("Sikeres támadás!");
          Char[pl2].ero -= y;
          changeVal(pl2, 1, Char[pl2].ero);
          checkDeath();
        }
      } else {
        move(pl1, -1);
        message("Sikertelen támadás.");
      }
    }, 1000);
  }
}

function track(pl) {
  switch (board[Char[pl].pos][0]) {
    case "bogyo":
      var x = parseInt(5 + Math.random() * Char[pl].pos) * 2;
      Char[pl].ero += x;
      if (pl == 0) {
        message("Jót eszel a gyümölcsből, kapsz " + x + " Erőt.");
      } else {
        message("Battle Beetle megtömi a pocakját. Kap " + x + " Erőt.");
      }
      changeVal(pl, 1, Char[pl].ero);
      break;

    case "fa":
      if (
        Char[pl].ugy + Char[pl].ero / 5 + Char[pl].esz / 10 >
        30 + Math.random() * 40
      ) {
        Char[pl].ugy += 5;
        changeVal(pl, 2, Char[pl].ugy);
        if (pl == 0) {
          message("Rád támadt egy gonosz fa, de pozdorját csináltál belőle.");
        } else {
          message("Battle Beetle-re támadt egy fa, de ellátta a baját.");
        }
      } else {
        var x = parseInt(10 + Math.random() * 10 - Char[pl].arm);
        if (x < 1) {
          x = 1;
        }
        Char[pl].ero -= x;
        changeVal(pl, 1, Char[pl].ero);
        if (pl == 0) {
          message("Rád támadt egy gonosz fa! Vesztesz " + x + " Erőt!");
        } else {
          message(
            "Végre Battle Beetle-re támadt az egyik fa! Veszít " + x + " Erőt."
          );
        }
        checkDeath();
      }
      break;

    case "manti":
      if (
        Char[pl].ugy + Char[pl].ero / 5 + Char[pl].esz / 10 >
        60 + Math.random() * 70
      ) {
        Char[pl].ugy += 10;
        changeVal(pl, 2, Char[pl].ugy);
        if (pl == 0) {
          message("Rád támadt egy manticore, de szőnyeget csináltál belőle.");
        } else {
          message("Battle Beetle-re támadt egy manticore, de sajnos BB nyert.");
        }
      } else {
        var x = parseInt(20 + Math.random() * 20 - Char[pl].arm);
        if (x < 1) {
          x = 2;
        }
        Char[pl].ero -= x;
        changeVal(pl, 1, Char[pl].ero);
        if (pl == 0) {
          message("Egy alattomos manticore " + x + " Erőt sebzett rajtad!");
        } else {
          message("Egy jó fej manticore ellátta Battle Beetle baját.");
        }
        checkDeath();
      }
      break;

    case "bika":
      if (
        Char[pl].ugy + Char[pl].ero / 5 + Char[pl].esz / 10 >
        90 + Math.random() * 100
      ) {
        Char[pl].ugy += 15;
        changeVal(pl, 2, Char[pl].ugy);
        if (pl == 0) {
          message(
            "Rád támadt egy böszme szörny, de sikerült móresre tanítanod."
          );
        } else {
          message(
            "Battle Beetle-re támadt egy kedves szörny, mire ő hidegvérrel lemészárolta."
          );
        }
      } else {
        var x = parseInt(30 + Math.random() * 30 - Char[pl].arm);
        if (x < 1) {
          x = 3;
        }
        Char[pl].ero -= x;
        changeVal(pl, 1, Char[pl].ero);
        if (pl == 0) {
          message("Karjába zárt egy vérengző nyörny. Vesztesz " + x + " Erőt!");
        } else {
          message(
            "Másnak is elege lett Battle Beetle-ből és agyba-főbe verte."
          );
        }
        checkDeath();
      }
      break;

    case "boxer":
      var x = parseInt(1 + pl + Math.random() * 4);
      Char[pl].ero -= x * 10;
      changeVal(pl, 1, Char[pl].ero);
      move(pl, -x);
      if (pl == 0) {
        message(
          "Hirtelen előugrik egy erdei boxoló és egy irtózatosat bemos Neked."
        );
      } else {
        message("Egy erdei boxoló iszonyatosan hókon nyomja Battle Beetle-t.");
      }
      checkDeath();
      break;

    case "katapult":
      var x = parseInt(1 - pl + Math.random() * 3);
      Char[pl].ero -= x * 3;
      changeVal(pl, 1, Char[pl].ero);
      Char[pl].arm -= 1;
      changeVal(pl, 4, Char[pl].arm);
      move(pl, x);
      if (pl == 0) {
        message(
          "Beülsz a katapultba, ami előrerepít, bár kissé rázós a landolás."
        );
      } else {
        message(
          "Battle Beetle beül a hájas valagával a katapultba és megpróbálja kilőni magát."
        );
      }
      checkDeath();
      break;

    case "meglepi":
      var x = parseInt(1 + 6 * Math.random());
      switch (x) {
        case 1:
          var pl2 = pl == 0 ? 1 : 0;
          move(pl, Char[pl2].pos - Char[pl].pos);
          message("TELEPORT ATTACK!");
          break;

        case 2:
          piaUp = parseInt(7 * Math.random());
          kocUp = parseInt(7 * Math.random());
          bomUp = parseInt(7 * Math.random());
          altUp = parseInt(7 * Math.random());
          message("Zavar adódott a spéci tárgyakban");
          updateVals();
          break;

        case 3:
          Char[pl].arm += parseInt(2 + 5 * Math.random());
          changeVal(pl, 4, Char[pl].arm);
          if (pl == 0) {
            message("Találsz egy deszkát, ami jó lesz védekezésre.");
          } else {
            message(
              "Battle Beetle befeszíti az izmait, amitől nő a páncélzata."
            );
          }
          break;

        case 4:
          Char[pl].arm -= parseInt(2 + 5 * Math.random());
          changeVal(pl, 4, Char[pl].arm);
          if (pl == 0) {
            message("Rádömlik valami sav, ami tönkreteszi a felszerelésed.");
          } else {
            message(
              "Battle Beetle elernyeszti az izmait. Csökken a páncélzata."
            );
          }
          checkDeath();
          break;

        case 5:
          Char[pl].seb += parseInt(2 + 5 * Math.random());
          changeVal(pl, 5, Char[pl].seb);
          if (pl == 0) {
            message("Találsz egy Rambo-kést, ami jó lesz fegyvernek.");
          } else {
            message("Battle Beetle edzi a csápjait. Nő a sebzése.");
          }
          break;

        case 6:
          Char[pl].seb -= parseInt(2 + 5 * Math.random());
          changeVal(pl, 5, Char[pl].seb);
          if (pl == 0) {
            message("Megsérül a fegyvered (ha volt).");
          } else {
            message("Battle Beetle lereszelte a körmeit. Csökken a sebzése.");
          }
          checkDeath();
          break;
        default:
          break;
      }
      break;

    case "bb":
      if (pl == 0) {
        document.body.style =
          "filter: opacity(0) brightness(0.1) blur(20px); transition: all 5s";
        setTimeout(function () {
          document.body.innerHTML = `<h1>TE NYERTÉL!</h1><br>
            <p>A távolból hallod Battle Beetle ordítását, amikor észrevette, hogy megtaláltad a Brutal Ballt, de már túl késő...</p>
            <p>A konzolhoz ugrasz és első körben Battle Beetle-t törlöd a programból. Hirtelen örökre elnémul az ordítása. Ezután gyorsan átírod a programot és újraindítod. A jószág megnyugtatóan felbúg és érzed, ahogy szétárad az energiája. A hónod alá csapod és elindulsz vissza a városba.</p>
            <p>Megkönnyebbülve látod, hogy a szokott emberek és épületek fogadnak. Még a bagoly sem szomorú többé.</p>
            <p>Megköszönöd:<p>
            <ul>
            <li>Utry Máténak, hogy hasznos észrevételeivel jobbá tette ezt a világot,</li>          
            <li>Panninak, Boginak és Marcinak, hogy folyamatosan elkísértek utadon és rámutattak bizonyos hibákra,</li>
            <li>a ZapSplat-nek a fülbemászó zenéket és</li>
            <li>Utri Gergelynek az egész világ megalkotását és kódolását.</li>
            </ul>
            <br>
            <button class="btn"><a href="https://ujoe.github.io/Brutal2/">Jöjjön a 2. rész!</a></button>`;
          document.body.style =
            "filter: opacity(1) brightness(1) blur(0); transition: all 1s";
        }, 5001);
      } else {
        document.body.style =
          "filter: opacity(0) brightness(0.1) blur(20px); transition: all 5s";
        setTimeout(function () {
          document.body.innerHTML =
            "<h1>BATTLE BEETLE NYERT!</h1><br><p>Battle Beetle elérte a Brutal Ballt és kárörvendő kacajjal közli, hogy véglegesíti a programot. Olyan bazibrutál marad a világ, amilyenné ő tette. Csak Téged töröl ki belőle!</p><p>Nem tehetsz ellene semmit. Hacsak nem aktiválod gyorsan a legerősebb varázslatot az F5 billentyűvel!";
          document.body.style =
            "filter: opacity(1) brightness(1) blur(0); transition: all 1s";
        }, 5001);
      }
    default:
      break;
  }
}

function checkDeath() {
  for (let i = 0; i < 2; i++) {
    if (Char[i].arm < 1) {
      Char[i].arm = 0;
      changeVal(i, 4, Char[i].arm);
    }
    if (Char[i].seb < 1) {
      Char[i].seb = 0;
      changeVal(i, 5, Char[i].seb);
    }
    if (Char[i].ugy < 1) {
      Char[i].ugy = 0;
      changeVal(i, 2, Char[i].ugy);
    }
    if (Char[i].esz < 1) {
      Char[i].esz = 0;
      changeVal(i, 3, Char[i].esz);
    }
    if (Char[i].ero < 1) {
      Char[i].ero = 0;
      changeVal(i, 1, Char[i].ero);
    }
  }
  if (Char[0].ero == 0) {
    document.body.style =
      "filter: opacity(0) brightness(0.1) blur(20px); transition: all 5s";
    setTimeout(function () {
      document.body.innerHTML =
        "<h1>MEGHALTÁL!</h1><br><p>Minden igyekezeted ellenére nem sikerült helyreállítanod a világ rendjét.</p><p>De még mindig maradt egy reménysugár: megtudod, hogy mi, ha lenyomod az F5-öt.";
      document.body.style =
        "filter: opacity(1) brightness(1) blur(0); transition: all 1s";
    }, 5001);
  }
  if (Char[1].ero == 0) {
    document.body.style =
      "filter: opacity(0) brightness(0.1) blur(20px); transition: all 5s";
    setTimeout(function () {
      document.body.innerHTML = `<h1>MEGHALT BATTLE BEETLE!</h1><br>
            <p>Vidám kurjantással arréb rúgod a hulláját és fütyörészve elsétálsz a Brutal Ballhoz...</p>
            <p>Amikor megtalálod, gyorsan átírod a konzolon a programot, aztán újraindítod. A jószág megnyugtatóan felbúg és érzed, ahogy szétárad az energiája. A hónod alá csapod és elindulsz vissza a városba.</p>
            <p>Megkönnyebbülve látod, hogy a szokott emberek és épületek fogadnak. Még a bagoly sem szomorú többé.</p>
            <p>Megköszönöd:<p>
            <ul>
            <li>Utry Máténak, hogy hasznos észrevételeivel jobbá tette ezt a világot,</li>          
            <li>Panninak, Boginak és Marcinak, hogy folyamatosan elkísértek utadon és rámutattak bizonyos hibákra,</li>
            <li>a ZapSplat-nek a fülbemászó zenéket és</li>
            <li>Utri Gergelynek az egész világ megalkotását és kódolását.</li>
            </ul>
            <br>
            <button class="btn"><a href="https://ujoe.github.io/Brutal2/">Jöjjön a 2. rész!</a></button>`;
      document.body.style =
        "filter: opacity(1) brightness(1) blur(0); transition: all 1s";
    }, 5001);
  }
}

function changeVal(x, y, z) {
  document.getElementById("val_" + x + "_" + y).innerHTML = z;
  document.getElementById("val_" + x + "_" + y).style =
    "width: " + (15 + z * 1.5) + "px";
}
