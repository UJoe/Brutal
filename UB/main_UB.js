var Character = [0, 0, 0];
var Room = 0;
var XRoom = 0;
var Rooms = [
    ["./img/zombi.png", "Derűs nyugalommal szemléled ezt a brutális világot, amikor hirtelen vad hörgéssel rádtámad egy ránézésre kb. <span>50</span> támadóerejű zombi!", "attack", 50],
    ["./img/zaba.jpg", "- Gyere, zabáljunk! - csalogat kedvesen egy koszos gyorsétteremben terpeszkedő muksó. Bemész?", "eat", 4],
    ["./img/gymdiots.jpg", "Lejutottál végre kedvenc edzőtermedbe. De ott még a szokottnál is hülyébb fazonok gyúrnak és ismerkednek veled.", "madgym", 2],
    ["./img/banya.jpg", "- Már megint hol jártál, Lajos, teeee?! - ordít rád egy maximum <span>20</span> támadóerejű, erősen rövidlátó vén banya és fenyegetően megindul feléd...", "attack", 20],
    ["./img/kut.jpg", "Ahogy sétálsz, egyszer csak egy kútba botlasz bele. Ha akarsz, igyál.", "drink", 4],
    ["./img/okosteszt.jpg", "Felkeresed régi tanárodat. Úgy tűnik, rá nem hatott Battle Beetle varázslata. Tanácsot kérsz tőle, mit tegyél. Jó sok dolgot elmond Neked, de vajon mennyit tudsz belőle felfogni?", "learn", 40],
    ["./img/P-tunder.jpg", "Ahogy sétálgatsz, egyszercsak meglátsz egy lányt a folyópart mellett ülni. Különösen békés teremtésnek tűnik ebben a kaotikus világban. Leülsz mellé és megszólítód. Elmondja, hogy Cedric nevű törpehörcsöge beleesett a folyóba és egy faágba kapaszkodva úszik lefelé. Segítesz neki?", "help", 50],
    ["./img/sadowl.jpg", "Szívszorító hangokat hallasz egy fa koronája közül. Felpillantva meglátsz egy szomorú baglyot. Megpróbálsz neki vicceket mesélni, hátha jobb kedvre derül.", "help", 20],
    ["./img/potion.jpg", "Találsz egy bokorban egy varázsitalt. Megiszod?", "potion", 10],
    ["./img/dwarf.png", "Találkozol egy jóságos öreg törpével. Ha gondolod, kérdezd ki, hátha tud segíteni.", "learn", 15],
    ["./img/bear.jpg", "- Argh...szörcs...brumm! - üdvözöl egy <span>40</span> támadóerejű medve a száját nyalogatva. Valószínűleg meg kell vele küzdened...", "attack", 40],
    ["./img/orchard.jpg", "Ínycsiklandozó gyümölcsfák között vezet az utad. Ha akarsz, egyél!", "drink", 8],
    ["./img/csontik.jpg", "Amikor befordulsz egy sarkon, hirtelen több harcos csontvázba botlasz bele. A támadóerejük kb. <span>70</span> lehet, úgyhogy légy óvatos!", "attack", 70],
    ["./img/vial.png", "Találsz a zsebedben egy ampullát. Rejtély, hogy hogy került oda, de ha gondolod, idd meg a tartalmát!", "potion", 5],
    ["./img/verem.jpg", "Jaj ne!!! Beleestél egy sötét verembe, ahol furcsa gázok terjengnek! Minden erődre szükség van, hogy kimássz.", "trap", 6],
    ["./img/spiderweb.jpg", "Nem figyelsz eléggé és belegabalyodsz egy hatalmas, mérgező pókhálóba! Megpróbálsz kijutni.", "trap", 3],
    ["./img/dragon.jpg", "Ahogy fütyörészve sétálgatsz, véletlenül rálépsz valamilyen állatnak a farkára. Pechedre ez egy félelmetes sárkányhoz tartozott, akinek legalább <span>90</span> a támadóereje, basszus!", "attack", 90]
];
var XRooms = [
    ["./img/bigbug-1.jpeg", "Hirtelen a semmiből megjelenik egy Big Bug! Ilyenek Battle Beetle szolgái. Meg kell vele mérkőznöd. De ismered: ez Szunyogh Béla: az esze vág, mint a villám, de fizikailag nagyon béna.", 1, 2, 3],
    ["./img/bigbug-2.jpg", "Hirtelen a semmiből megjelenik egy újabb Big Bug! Nincs mese: őt is le kell győznöd, hogy eljuss Battle Beetle-hez. Őt is ismered: Homlokizom Csárli, akinek brutális ereje van, de baromi ügyetlenül mozog.", 3, 1, 2],
    ["./img/bigbug-3.jpg", "Hirtelen a semmiből megjelenik a harmadik Big Bug! Érzed, hogy egyre közelebb kerülsz Battle Beetle-hez. Rögtön ráveted magad. Ő Klo Tilda, aki nagyon ügyesen manőverezik a levegőben, viszont tök hülye.", 2, 3, 1]
]
var Steps = 0;
var EnemyVal = 0;

function ChooseStrong() {
    Character = [90, 30, 20];
    NewRoom();
}

function ChooseNinja() {
    Character = [50, 50, 40];
    NewRoom();
}

function ChooseDexter() {
    Character = [30, 40, 70];
    NewRoom();
}

function ActionBtn() {
    switch (Rooms[Room][2]) {
        case "attack":
            var x = Rooms[Room][3];
            if (x + Math.random() * 50 > Character[0] / 5 + Character[1] + Math.random() * 30) {
                let y = parseInt(x / 12 + Math.random() * 5)
                Character[0] -= y;
                PrintValues();
                alert("Jaj! Az ellenség eltalált! Vesztesz " + y + " Erőt.");
                CheckEnd();
            } else {
                Character[1] += parseInt(x / 12);
                alert("Lazán lecsapod! A sikeres testgyakorlásért kaptál " + parseInt(x / 12) + " Ügyességet és mész tovább.");
                document.body.setAttribute("style", "filter: blur(20px) brightness(0)");
                NewRoom();
            }
            break;

        case "eat":
            var x = Rooms[Room][3];
            var y = parseInt(x * 1.5 + Math.random() * x);
            Character[0] += y;
            Character[1] -= x;
            alert("Jól megtömöd a pocakod. Nyertél " + y + " Erőt, de mivel lehúz a sok kaja, vesztesz " + x + " Ügyességet.");
            document.body.setAttribute("style", "filter: blur(20px) brightness(0)");
            NewRoom();
            break;

        case "madgym":
            var x = parseInt(Rooms[Room][3] + Math.random() * Rooms[Room][3]);
            Character[0] += x;
            Character[1] += Rooms[Room][3];
            Character[2] -= x;
            alert("A gyúrás miatt ugyan kapsz " + x + " Erőt és " + Rooms[Room][3] + " Ügyességet, de az idióta társaság miatt vesztesz " + x + " Észt.");
            document.body.setAttribute("style", "filter: blur(20px) brightness(0)");
            NewRoom();
            break;

        case "drink":
            var x = parseInt(1 + Math.random() * Rooms[Room][3]);
            Character[0] += x;
            alert("Nyersz " + x + " Erőt és felfrissülten továbbgaloppozol.");
            document.body.setAttribute("style", "filter: blur(20px) brightness(0)");
            NewRoom();
            break;

        case "learn":
            var x = parseInt((Character[2] - Rooms[Room][3] + Math.random() * (Rooms[Room][3] + Character[2]) / 7) / 5);
            Character[2] += x;
            alert("A tanulás eredményeképpen az Eszed " + x + " ponttal változott.");
            document.body.setAttribute("style", "filter: blur(20px) brightness(0)");
            NewRoom();
            break;

        case "help":
            var x = parseInt(Rooms[Room][3] / 8 + Math.random() * 3);
            var y = parseInt(x / 2.5);
            if (Character[1] + Character[2] / 10 > Rooms[Room][3] + Math.random() * 10) {
                for (let i = 0; i < 3; i++) { Character[i] += x };
                alert("Sikeresen segítettél! Jutalomból minden értéked nőtt " + x + " ponttal!")
            } else {
                for (let i = 0; i < 3; i++) { Character[i] -= y };
                alert("Nem sikerült segítened, amiben teljesen összetörsz. Minden értéked csökken " + y + " ponttal!")
            };
            document.body.setAttribute("style", "filter: blur(20px) brightness(0)");
            NewRoom();
            break;

        case "potion":
            var x = parseInt(Rooms[Room][3] + Math.random() * 5);
            var y = 0;
            if (Character[0] + Character[1] + Character[2] > 150) {
                if (Character[1] > Character[0]) {
                    y = 1;
                    if (Character[2] > Character[1]) { y = 2 }
                } else if (Character[2] > Character[0]) { y = 2 };
                switch (y) {
                    case 0:
                        alert("Miután megidtad, elgyengülsz, vesztesz " + x + " Erőt!")
                        break;
                    case 1:
                        alert("Erősen romlik a mozgáskoordinációd, vesztesz " + x + " Ügyességet!")
                        break;
                    case 2:
                        alert("Tompa köd száll az agyadra, vesztesz " + x + " Észt!")
                        break;
                }
                Character[y] -= x;
            }
            else {
                if (Character[1] < Character[0]) {
                    y = 1;
                    if (Character[2] < Character[1]) { y = 2 }
                } else if (Character[2] < Character[0]) { y = 2 };
                switch (y) {
                    case 0:
                        alert("Kétszeresére dagadnak az izmaid, nyersz " + x + " Erőt!")
                        break;
                    case 1:
                        alert("Úgy pattogsz, mint egy ninja, nyersz " + x + " Ügyességet!")
                        break;
                    case 2:
                        alert("Kitisztul az elméd, nyersz " + x + " Észt!")
                        break;
                }
                Character[y] += x;
            }
            document.body.setAttribute("style", "filter: blur(20px) brightness(0)");
            NewRoom();
            break;

        case "trap":
            var x = parseInt(Rooms[Room][3] + Math.random() * 5);
            var y = 0;
            if (Character[1] > Character[0]) {
                y = 1;
                if (Character[2] > Character[1]) { y = 2 }
            } else if (Character[2] > Character[0]) { y = 2 };
            if ((Character[0] + Character[1] + Character[2] > x * 45) || Math.random() > x / 15) {
                Character[y] -= parseInt(x/3); 
                Character[0] -= parseInt(x/2);
                if (Character[0]>0) {alert("Megsérülsz ugyan, de sikerül kijutnod! Ha akarsz, visszamászhatsz, de inkább menj tovább.")};
                document.getElementById("EscBtn").disabled = false;
            } else {
                alert("Vesztettél " + x + " pontot legjobb képességedből, és nem sikerült kijutnod!");
                Character[y] -= x;
                document.getElementById("EscBtn").disabled = true;
            };
            PrintValues();
            CheckEnd();
            break;

        default:
            document.getElementById("ActBtn").disabled = true;
            alert("Under construction!");
            break;
    }
}

function EscapeBtn() {
    switch (Rooms[Room][2]) {
        case "attack":
            let x = parseInt(Rooms[Room][3] / 7);
            Character[0] -= x;
            alert("Menekülés közben az ellenség eltalál. Vesztesz " + x + " Erőt!");
            break;

        case "eat":
            Character[0] -= 1;
            alert("Korgó gyomorral botorkálsz tovább. Vesztesz 1 Erőt.");
            break;

        case "help":
            let y = parseInt(Rooms[Room][3] / 10);
            for (let i = 0; i < 3; i++) { Character[i] -= y };
            alert("Mivel nem segítettél, elszégyelled magad. Minden értéked csökken " + y + " ponttal.");
            break;

        default: console.log("Under construction!");
            break;
    }
    document.body.setAttribute("style", "filter: blur(20px) brightness(0)")
    NewRoom();
}

function NewRoom() {
    Steps += 1;
    if (Steps == 40) {
        document.body.innerHTML = "<img src='./img/bbeetle.jpg' style='display: block; margin-left: auto; margin-right: auto'>";
        document.body.setAttribute("style", "filter: brightness(1); transition: filter 1s; filter: blur(0px); transition: filter 1.5s");
        alert("BATTLE BEETLE!");
    } else if (Steps % 10 == 0) {
        XRoom = parseInt(Steps / 10) - 1;
        EnemyVal = 60 + XRoom * 20;
        document.body.innerHTML = "<div id='counter'></div><img id='room-pic' src='' alt='Új szoba'><p id = 'room-desc'></p><p>Erő: <span class='charvalue' id='ero'></span><span class='changing' id='ero-ch'></span></p><p>Ügyesség: <span class='charvalue' id='ugyes'></span><span class='changing' id='ugyes-ch'></span></p><p>Ész: <span class='charvalue' id='esz'></span><span class='changing' id='esz-ch'></span></p><br><p>Ellenfél támadóereje: <span id='enemy'></span><span id='nme-ch'></span></p><p class='Order'>Hogyan támadsz rá?</p><button id='EroAttack' onclick='EroBtn()'>Nyers erővel</button><button id='UgyAttack' onclick='UgyBtn()'>Taktikusan</button><button id='EszAttack' onclick='EszBtn()'>Furfanggal</button><button id='Flee' onclick='FleeBtn()'>Sehogy</button><div id='other'></div>";
        document.getElementById("counter").innerHTML = Steps;
        document.getElementById("room-pic").src = XRooms[XRoom][0];
        document.getElementById("room-desc").innerHTML = XRooms[XRoom][1];
        document.getElementById("enemy").innerHTML = EnemyVal;
    } else {
        var YRoom = Room;
        Room = parseInt(Math.random() * Rooms.length);
        if (Room == YRoom) {
            Room += 1;
            if (Room == Rooms.length) {Room=0};
        };
        document.body.innerHTML = "<div id='counter'></div><img id='room-pic' src='' alt='Új szoba'><p id = 'room-desc'></p><p>Erő: <span class='charvalue' id='ero'></span><span class='changing' id='ero-ch'></span></p><p>Ügyesség: <span class='charvalue' id='ugyes'></span><span class='changing' id='ugyes-ch'></span></p><p>Ész: <span class='charvalue' id='esz'></span><span class='changing' id='esz-ch'></span></p><br><button id='ActBtn' onclick='ActionBtn()'>Akció</button><button id='EscBtn' onclick='EscapeBtn()'>Tovább</button><div id='other'></div>";
        document.getElementById("counter").innerHTML = Steps;
        document.getElementById("room-pic").src = Rooms[Room][0];
        document.getElementById("room-desc").innerHTML = Rooms[Room][1];
        if (Rooms[Room][2] == "trap") { document.getElementById("EscBtn").disabled = true; }
    };
    PrintValues();
    CheckEnd();
    document.body.setAttribute("style", "filter: brightness(1); transition: filter 1s; filter: blur(0px); transition: filter 1.5s");
}

function PrintValues() {
    var strength = document.getElementById('ero');
    var skill = document.getElementById('ugyes');
    var iq = document.getElementById('esz');
    var nme = document.getElementById('enemy');
    strength.innerHTML = Character[0];
    strength.style.width = (10 + Character[0] * 3) + "px";
    if (Character[0] < 20) { strength.style.backgroundColor = "red" };
    if (Character[0] > 100) { strength.style.backgroundColor = "white" };
    skill.innerHTML = Character[1];
    skill.style.width = (10 + Character[1] * 3) + "px";
    if (Character[1] < 20) { skill.style.backgroundColor = "red" };
    if (Character[1] > 100) { skill.style.backgroundColor = "white" };
    iq.innerHTML = Character[2];
    iq.style.width = (10 + Character[2] * 3) + "px";
    if (Character[2] < 20) { iq.style.backgroundColor = "red" };
    if (Character[2] > 100) { iq.style.backgroundColor = "white" };
    if (EnemyVal > 0) {
        enemy.innerHTML = EnemyVal;
        enemy.style.width = (10 + EnemyVal * 3) + "px";
        if (EnemyVal < 20) { enemy.style.backgroundColor = "black"; }
        else { enemy.style.backgroundColor = "purple"; }
    }
}

function CheckEnd() {
    if (Character[0] < 1) { document.body.innerHTML = "<h1>MEGHALTÁL!</h1>" };
    if (Character[1] < 1 || Character[2] < 1) { document.body.innerHTML = "<h1>Annyira gyökér lettél, hogy nem érdemes tovább folytatni!</h1>" };
}

//Spéci szobák

function EroBtn() {
    var x = Character[0] + Math.random() * 35;
    var y = XRooms[XRoom][2] * 25 + Math.random() * (EnemyVal / 2);
    if (x > y) {
        let z = parseInt((x - y) / 2);
        EnemyVal -= z;
        PrintValues();
        alert("Agyba-főbe vered. Veszít " + z + " Támadóerőt.");
        CheckBBDeath();
    } else {
        let z = parseInt((y - x) / 4);
        Character[0] -= z;
        PrintValues();
        alert("A Big Bug eltalált! Vesztesz " + z + " Erőt.");
        CheckEnd();
    };
    if (EnemyVal > 0) { bbAttack(); };
}
function UgyBtn() {
    var x = Character[1] + Math.random() * 35;
    var y = XRooms[XRoom][3] * 25 + Math.random() * (EnemyVal / 2);
    if (x > y) {
        let z = parseInt((x - y) / 2);
        EnemyVal -= z;
        PrintValues();
        alert("Sikerül kicselezned. Veszít " + z + " Támadóerőt.");
        CheckBBDeath();
    } else {
        let z = parseInt((y - x) / 4);
        Character[1] -= z;
        PrintValues();
        alert("A Big Bug kritikus támadást vitt be! Vesztesz " + z + " Ügyességet.");
        CheckEnd();
    };
    if (EnemyVal > 0) { bbAttack(); };
}
function EszBtn() {
    var x = Character[2] + Math.random() * 35;
    var y = XRooms[XRoom][4] * 25 + Math.random() * (EnemyVal / 2);
    if (x > y) {
        let z = parseInt((x - y) / 2);
        EnemyVal -= z;
        PrintValues();
        alert("Sikerült túljárnod az eszén! Veszít " + z + " Támadóerőt.");
        CheckBBDeath();
    } else {
        let z = parseInt((y - x) / 4);
        Character[2] -= z;
        PrintValues();
        alert("A Big Bug túl járt az eszeden. Tök hülyének érzed magad. Vesztesz " + z + " Észt.");
        CheckEnd();
    };
    if (EnemyVal > 0) { bbAttack(); };
}

function FleeBtn() {
    Character[0] -= parseInt(XRooms[XRoom][2] * (1 + Math.random() * EnemyVal / 10));
    Character[1] -= parseInt(XRooms[XRoom][3] * (1 + Math.random() * EnemyVal / 10));
    Character[2] -= parseInt(XRooms[XRoom][4] * (1 + Math.random() * EnemyVal / 10));
    alert("Menekülés közben az ellenfél egy iszonyatosat rádsóz! Vesztesz egy rakás pontot!");
    document.body.setAttribute("style", "filter: blur(20px) brightness(0)")
    EnemyVal = 0;
    NewRoom();
}

function bbAttack() {
    alert("A Big Bug megpróbálja varázserejét használni ellened!");
    var x = parseInt(Math.random() * 3);
    if (XRooms[XRoom][2 + x] == 1) {
        switch (x) {
            case 0: document.getElementById("EroAttack").disabled = true;
                break;
            case 1: document.getElementById("UgyAttack").disabled = true;
                break;
            case 2: document.getElementById("EszAttack").disabled = true;
                break;
            default:
                break;
        }
    } else if (Math.random() < EnemyVal / 120) {
        document.getElementById("Flee").disabled = true;
    };
    x = parseInt(Math.random() * 12);
    switch (x) {
        case 0: document.getElementById("EroAttack").disabled = false;
            break;
        case 1: document.getElementById("UgyAttack").disabled = false;
            break;
        case 2: document.getElementById("EszAttack").disabled = false;
            break;
        case 3: document.getElementById("Flee").disabled = false;
            break;
        case 4:
            document.getElementById("Flee").disabled = false;
            let y = parseInt(Math.random() * 3)
            Character[0] -= parseInt(XRooms[XRoom][2 + y] * (1 + Math.random() * EnemyVal / 20));
            CheckEnd();
            break;
        case 5:
            Character[0] -= parseInt(XRooms[XRoom][2] * (1 + Math.random() * EnemyVal / 25));
            EnemyVal += parseInt(XRooms[XRoom][2] * (1 + Math.random() * EnemyVal / 30))
            CheckEnd();
            break;
        case 6:
            Character[1] -= parseInt(XRooms[XRoom][3] * (1 + Math.random() * EnemyVal / 25));
            EnemyVal += parseInt(XRooms[XRoom][3] * (1 + Math.random() * EnemyVal / 30));
            CheckEnd();
            break;
        case 7:
            Character[2] -= parseInt(XRooms[XRoom][4] * (1 + Math.random() * EnemyVal / 25));
            EnemyVal += parseInt(XRooms[XRoom][4] * (1 + Math.random() * EnemyVal / 30));
            CheckEnd();
            break;
        case 8:
            document.getElementById("EroAttack").disabled = false;
            document.getElementById("UgyAttack").disabled = false;
            document.getElementById("EszAttack").disabled = false;
            document.getElementById("Flee").disabled = false;
        default:
            break;
    }
    PrintValues();
}

function CheckBBDeath() {
    if (EnemyVal < 1) {
        for (i = 0; i < 3; i++) {
            Character[i] += XRooms[XRoom][2 + i] * 5;
        }
        alert("Legyőzted a Big Bugot! Jutalomból átszállt beléd a maradék ereje.");
        document.body.setAttribute("style", "filter: blur(20px) brightness(0)")
        NewRoom();
    }
}
