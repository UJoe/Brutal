var Character = [];
var Room = 0;
var XRoom = 0;
var Rooms = [
    ["./img/zombi.png", "Derűs nyugalommal szemléled ezt a brutális világot, amikor hirtelen vad hörgéssel rádtámad egy ránézésre kb. <span>50</span> támadóerejű zombi!", "attack", 50],
    ["./img/zaba.jpg", "- Gyere, zabáljunk! - csalogat kedvesen egy koszos gyorsétteremben terpeszkedő muksó. Bemész?", "eat", 4],
    ["./img/gymdiots.jpg", "Lejutottál végre kedvenc edzőtermedbe. De ott még a szokottnál is hülyébb fazonok gyúrnak és ismerkednek veled.", "madgym", 2],
    ["./img/banya.jpg", "- Már megint hol jártál, Lajos, teeee?! - ordít rád egy maximum <span>20</span> támadóerejű, erősen rövidlátó vén banya és fenyegetően megindul feléd...", "attack", 20],
    ["./img/kut.jpg", "Ahogy sétálsz, egyszer csak egy kútba botlasz bele. Ha akarsz, igyál.", "drink", 4],
    ["./img/okosteszt.jpg", "Felkeresed régi tanárodat. Úgy tűnik, rá nem hatott Battle Beetle varázslata. Tanácsot kérsz tőle, mit tegyél. Jó sok dolgot elmond Neked, de vajon mennyit tudsz belőle felfogni?", "learn", 40],
    ["./img/P-tunder.jpg", "Ahogy sétálgatsz, egyszercsak meglátsz egy lányt a folyópart mellett ülni. Különösen békés teremtésnek tűnik ebben a kaotikus világban. Leülsz mellé és megszólítód. Elmondja, hogy Cedric nevű törpehörcsöge beleesett a folyóba és egy faágba kapaszkodva úszik lefelé. Segítesz neki?", "help", 60],
    ["./img/sadowl.jpg", "Szívszorító hangokat hallasz egy fa koronája közül. Felpillantva meglátsz egy szomorú baglyot. Megpróbálsz neki vicceket mesélni, hátha jobb kedvre derül.", "help", 35],
    ["./img/potion.jpg", "Találsz egy bokorban egy varázsitalt. Megiszod?", "potion", 10],
    ["./img/dwarf.png", "Találkozol egy jóságos öreg törpével. Ha gondolod, kérdezd ki, hátha tud segíteni.", "learn", 15],
    ["./img/bear.jpg", "- Argh...szörcs...brumm! - üdvözöl egy <span>40</span> támadóerejű medve a száját nyalogatva. Valószínűleg meg kell vele küzdened...", "attack", 40],
    ["./img/orchard.jpg", "Ínycsiklandozó gyümölcsfák között vezet az utad. Ha akarsz, egyél!", "drink", 8],
    ["./img/mug.jpg", "Leülsz az útpadkára, hogy megigyál egy bögre kakaót, amikor hirtelen a bögre megelevenedik a kezedben és torz vigyora mögül rekedt sziszegéssel közli, hogy ő a Bög-Rém!!! Nagyon azért nem ijedsz meg tőle - inkább csak bosszant, hogy már a kakaódat sem ihatod meg nyugodtan -, mivel kb. <span>10</span> támadóerejűnek néz ki.", "attack", 10],
    ["./img/csontik.jpg", "Amikor befordulsz egy sarkon, hirtelen több harcos csontvázba botlasz bele. A támadóerejük kb. <span>70</span> lehet, úgyhogy légy óvatos!", "attack", 70],
    ["./img/vial.png", "Találsz a zsebedben egy ampullát. Rejtély, hogy hogy került oda, de ha gondolod, idd meg a tartalmát!", "potion", 5],
    ["./img/verem.jpg", "Jaj ne!!! Beleestél egy sötét verembe, ahol furcsa gázok terjengnek! Minden erődre szükség van, hogy kimássz.", "trap", 6],
    ["./img/spiderweb.jpg", "Nem figyelsz eléggé és belegabalyodsz egy hatalmas, mérgező pókhálóba! Megpróbálsz kijutni.", "trap", 3],
    ["./img/dragon.jpg", "Ahogy fütyörészve sétálgatsz, véletlenül rálépsz valamilyen állatnak a farkára. Pechedre ez egy félelmetes sárkányhoz tartozott, akinek legalább <span>90</span> a támadóereje, basszus!", "attack", 90]
];
var XRooms = [
    ["./img/bigbug-1.jpeg", "Hirtelen a semmiből megjelenik egy Big Bug! Ilyenek Battle Beetle szolgái. Meg kell vele mérkőznöd. De ismered: ez Szunyogh Béla: az esze vág, mint a bugylibicska, de fizikailag igen visszamaradt a fejlődésben.", 1, 2, 3],
    ["./img/bigbug-2.jpg", "Hirtelen megjelenik egy újabb Big Bug! Nincs mese: őt is le kell győznöd, hogy eljuss Battle Beetle-hez. Őt is ismered: Homlokizom Csárli, akinek hatalmas ereje van, de marha ügyetlenül mozog.", 3, 1, 2],
    ["./img/bigbug-3.jpg", "Hirtelen megjelenik a harmadik Big Bug! Érzed, hogy egyre közelebb kerülsz Battle Beetle-hez. Rögtön ráveted magad. Ő Klo Tilda, aki nagyon ügyesen manőverezik a levegőben, viszont tök hülye.", 2, 3, 1]
]
var Steps = 0;
var EnemyVal = 0;

function ChooseStrong() {
    Character = [90, 30, 20];
    localStorage.setItem("NewPic", "img/strong.png");
    NewRoom();
}

function ChooseNinja() {
    Character = [50, 50, 40];
    localStorage.setItem("NewPic", "img/ninjagirl.jpg");
    NewRoom();
}

function ChooseDexter() {
    Character = [30, 40, 70];
    localStorage.setItem("NewPic", "img/smartboy.jpg");
    NewRoom();
}

function ActionBtn() {
    switch (Rooms[Room][2]) {
        case "attack":
            var x = Rooms[Room][3];
            if (x + Math.random() * 50 > Character[0] / 5 + Character[1] + Math.random() * (50-Steps)) {
                let y = parseInt(x / 12 + Math.random() * 5)
                Character[0] -= y;
                PrintValues();
                document.getElementById("other").innerHTML = "Jaj! Az ellenség eltalált! Vesztesz " + y + " Erőt.";
                document.getElementById("other").style.color = "red";
                CheckEnd();
            } else {
                Character[1] += 1 + parseInt(x / 12);
                document.getElementById("other").innerHTML = "Lazán lecsapod! A sikeres testgyakorlásért kaptál " + (1 + parseInt(x / 12)) + " Ügyességet és mész tovább." + "<br><button onclick='next()'>Reszkessetek!</button>";
                document.getElementById("other").style.color = "lightskyblue";
                PrintValues();
                document.getElementById("ActBtn").disabled = true;
                document.getElementById("EscBtn").disabled = true;
            }
            break;

        case "eat":
            var x = Rooms[Room][3];
            var y = parseInt(x * 1.5 + Math.random() * x);
            Character[0] += y;
            Character[1] -= x;
            document.getElementById("other").innerHTML = "Jól megtömöd a pocakod. Nyertél " + y + " Erőt, de mivel lehúz a sok kaja, vesztesz " + x + " Ügyességet." + "<br><button onclick='next()'>Böff!</button>";
            document.getElementById("other").style.color = "fuchsia";
            PrintValues();
            document.getElementById("ActBtn").disabled = true;
            document.getElementById("EscBtn").disabled = true;
            break;

        case "madgym":
            var x = parseInt(Rooms[Room][3] + Math.random() * Rooms[Room][3]);
            Character[0] += x;
            Character[1] += Rooms[Room][3];
            Character[2] -= x;
            PrintValues();
            document.getElementById("other").innerHTML = "A gyúrás miatt ugyan kapsz " + x + " Erőt és " + Rooms[Room][3] + " Ügyességet, de az idióta társaság miatt vesztesz " + x + " Észt.";
            document.getElementById("other").style.color = "fuchsia";
            document.getElementById("ActBtn").disabled = true;
            break;

        case "drink":
            var x = parseInt(Steps/9 + Math.random() * Rooms[Room][3]);
            Character[0] += x;
            PrintValues();
            document.getElementById("other").innerHTML = "Nyersz " + x + " Erőt és felfrissülten továbbgaloppozol.";
            document.getElementById("other").style.color = "lightskyblue";
            document.getElementById("ActBtn").disabled = true;
            break;

        case "learn":
            var x = parseInt((Character[2] - Rooms[Room][3] + Math.random() * (Rooms[Room][3] + Character[2]) / 7) / 5);
            Character[2] += x;
            PrintValues();
            document.getElementById("other").innerHTML = "A tanulás eredményeképpen az Eszed " + x + " ponttal változott.";
            document.getElementById("other").style.color = "fuchsia";
            document.getElementById("ActBtn").disabled = true;
            break;

        case "help":
            var x = parseInt(Rooms[Room][3] / 8 + Math.random() * 3);
            var y = parseInt(x / 2);
            if (Character[1] + Character[2] / 10 > Rooms[Room][3] + Math.random() * 20) {
                for (let i = 0; i < 3; i++) { Character[i] += y };
                PrintValues();
                document.getElementById("other").innerHTML = "Sikeresen segítettél! Jutalomból minden értéked nőtt " + y + " ponttal!" + "<br><button onclick='next()'>Szívesen, máskor is!</button>";
                document.getElementById("other").style.color = "lightskyblue";
            } else {
                for (let i = 0; i < 3; i++) { Character[i] += x };
                PrintValues();
                document.getElementById("other").innerHTML = "Bár nem sikerült segítened, mivel gyenge képességeid ellenére is segítőkész voltál, jutalomból minden értéked nő " + x + " ponttal!" + "<br><button onclick='next()'>Köszönöm és bocs!</button>";
                document.getElementById("other").style.color = "lightskyblue";
            };
            document.getElementById("ActBtn").disabled = true;
            document.getElementById("EscBtn").disabled = true;
            break;

        case "potion":
            var x = parseInt(Rooms[Room][3] + Math.random() * 5);
            var y = 0;
            if (Character[0] + Character[1] + Character[2] > 150) {
                if (Character[1] > Character[0]) {
                    y = 1;
                    if (Character[2] > Character[1]) { y = 2 }
                } else if (Character[2] > Character[0]) { y = 2 };
                Character[y] -= x;
                PrintValues();
                document.getElementById("other").style.color = "red";
                document.getElementById("ActBtn").disabled = true;
                switch (y) {
                    case 0:
                        document.getElementById("other").innerHTML = "Miután megidtad, elgyengülsz, vesztesz " + x + " Erőt!";
                        break;
                    case 1:
                        document.getElementById("other").innerHTML = "Erősen romlik a mozgáskoordinációd, vesztesz " + x + " Ügyességet!";
                        break;
                    case 2:
                        document.getElementById("other").innerHTML = "Tompa köd száll az agyadra, vesztesz " + x + " Észt!";
                        break;
                }
            }
            else {
                if (Character[1] < Character[0]) {
                    y = 1;
                    if (Character[2] < Character[1]) { y = 2 }
                } else if (Character[2] < Character[0]) { y = 2 };
                Character[y] += x;
                PrintValues();
                document.getElementById("other").style.color = "lightskyblue";
                document.getElementById("ActBtn").disabled = true;
                switch (y) {
                    case 0:
                        document.getElementById("other").innerHTML = "Kétszeresére dagadnak az izmaid, nyersz " + x + " Erőt!";
                        break;
                    case 1:
                        document.getElementById("other").innerHTML = "Úgy pattogsz, mint egy ninja, nyersz " + x + " Ügyességet!";
                        break;
                    case 2:
                        document.getElementById("other").innerHTML = "Kitisztul az elméd, nyersz " + x + " Észt!";
                        break;
                }
            }
            break;

        case "trap":
            var x = parseInt(Rooms[Room][3] + Math.random() * 3);
            var y = 0;
            if (Character[1] > Character[0]) {
                y = 1;
                if (Character[2] > Character[1]) { y = 2 }
            } else if (Character[2] > Character[0]) { y = 2 };
            if ((Character[0] + Character[1] + Character[2] > x * 40) || Math.random() > x / 15) {
                Character[y] -= parseInt(x / 3);
                Character[0] -= parseInt(x / 2);
                PrintValues();
                if (Character[0] > 0) {
                    document.getElementById("other").innerHTML = "Megsérülsz ugyan, de sikerül kijutnod! Ha akarsz, visszamászhatsz, de inkább menj tovább.";
                    document.getElementById("other").style.color = "fuchsia";
                };
                document.getElementById("EscBtn").disabled = false;
            } else {
                Character[y] -= x;
                PrintValues();
                document.getElementById("other").innerHTML = "Vesztettél " + x + " pontot legjobb képességedből, és nem sikerült kijutnod!";
                document.getElementById("other").style.color = "red";
                document.getElementById("EscBtn").disabled = true;
            };
            CheckEnd();
            break;
    }
}

function EscapeBtn() {
    switch (Rooms[Room][2]) {
        case "attack":
            let x = parseInt(Rooms[Room][3] / 7);
            Character[0] -= x;
            PrintValues();
            document.getElementById("other").innerHTML = "Menekülés közben az ellenség eltalál. Vesztesz " + x + " Erőt!" + "<br><button onclick='next()'>Hínye!</button>";
            document.getElementById("other").style.color = "red";
            document.getElementById("ActBtn").disabled = true;
            document.getElementById("EscBtn").disabled = true;
            break;

        case "eat":
            Character[0] -= 1;
            PrintValues();
            document.getElementById("other").innerHTML = "Korgó gyomorral botorkálsz tovább. Vesztesz 1 Erőt." + "<br><button onclick='next()'>A böjt nemesít!</button>";
            document.getElementById("other").style.color = "red";
            document.getElementById("ActBtn").disabled = true;
            document.getElementById("EscBtn").disabled = true;
            break;

        case "help":
            let y = parseInt((Rooms[Room][3]+ Math.random()*10) / 10 );
            for (let i = 0; i < 3; i++) { Character[i] -= y };
            PrintValues();
            document.getElementById("other").innerHTML = "Mivel nem segítettél, elszégyelled magad. Minden értéked csökken " + y + " ponttal." + "<br><button onclick='next()'>Kellett volna?</button>";
            document.getElementById("other").style.color = "red";
            document.getElementById("ActBtn").disabled = true;
            document.getElementById("EscBtn").disabled = true;
            break;

        default: next();
            break;
    }
}

//Új szoba
function NewRoom() {
    Steps += 1;
    if (Steps ==1) {
        document.getElementById("zenegep").style="bottom: 0; right: 0; transform: scale(1)";
    }
    if (Steps == 40) {
        document.getElementById("container").innerHTML = "<h1>MEGTALÁLTAD BATTLE BEETLE-T!<img src='./img/bbeetle.jpg' alt='Battle Beetle' style='display: block; margin-top: 20px; margin-left: auto; margin-right: auto; height: 600px;'><button onclick='Finale()'>Jöhet a végső harc!</button></h1>";
        document.getElementById("container").setAttribute("style", "filter: brightness(1); transition: filter 1s; filter: blur(0px); transition: filter 1.5s");
        localStorage.setItem("NewEro", Character[0]);
        localStorage.setItem("NewUgy", Character[1]);
        localStorage.setItem("NewEsz", Character[2]);
    } else if (Steps % 10 == 0) {
        XRoom = parseInt(Steps / 10) - 1;
        EnemyVal = 60 + XRoom * 20;
        document.getElementById("container").innerHTML = "<div id='counter'></div><img id='room-pic' src='' alt='Új szoba'><p id = 'room-desc'></p><p>Minden támadásod után ő is megpróbál varázserejével visszatámadni!</p><p>Erő: <span class='charvalue' id='ero'></span></p><p>Ügyesség: <span class='charvalue' id='ugyes'></span></p><p>Ész: <span class='charvalue' id='esz'></span></p><br><p>Ellenfél támadóereje: <span id='enemy'></span></p><p class='Order'>Hogyan támadsz rá?</p><button id='EroAttack' onclick='EroBtn()'>Nyers erővel</button><button id='UgyAttack' onclick='UgyBtn()'>Taktikusan</button><button id='EszAttack' onclick='EszBtn()'>Furfanggal</button><button id='Flee' onclick='FleeBtn()'>Sehogy</button><div id='other'></div><br><div id='colossus'></div>";
        document.getElementById("counter").innerHTML = Steps;
        document.getElementById("room-pic").src = XRooms[XRoom][0];
        document.getElementById("room-desc").innerHTML = XRooms[XRoom][1];
        document.getElementById("enemy").innerHTML = EnemyVal;
        PrintValues();
        CheckEnd();
        document.getElementById("container").setAttribute("style", "filter: brightness(1); transition: filter 1s; filter: blur(0px); transition: filter 1.5s");
    } else {
        var YRoom = Room;
        Room = parseInt(Math.random() * Rooms.length);
        if (Room == YRoom) {
            Room += 1;
            if (Room == Rooms.length) { Room = 0 };
        };
        document.getElementById("container").innerHTML = "<div id='counter'></div><img id='room-pic' src='' alt='Új szoba'><p id = 'room-desc'></p><p>Erő: <span class='charvalue' id='ero'></span></p><p>Ügyesség: <span class='charvalue' id='ugyes'></span></p><p>Ész: <span class='charvalue' id='esz'></span></p><br><button id='ActBtn' onclick='ActionBtn()'>Akció</button><button id='EscBtn' onclick='EscapeBtn()'>Tovább</button><div id='other'></div><br><div id='colossus'></div>";
        document.getElementById("counter").innerHTML = Steps;
        document.getElementById("room-pic").src = Rooms[Room][0];
        document.getElementById("room-desc").innerHTML = Rooms[Room][1];
        if (Rooms[Room][2] == "trap") { document.getElementById("EscBtn").disabled = true; }
        PrintValues();
        CheckEnd();
        document.getElementById("container").setAttribute("style", "filter: brightness(1); transition: filter 1s; filter: blur(0px); transition: filter 1.5s");
    };
}

function PrintValues() {
    var strength = document.getElementById('ero');
    var skill = document.getElementById('ugyes');
    var iq = document.getElementById('esz');
    var nme = document.getElementById('enemy');
    strength.innerHTML = (Character[0]>0) ? Character[0] : "X";
    strength.style.width = (10 + Character[0] * 3) + "px";
    strength.style.transition = "all 1s";
    if (Character[0] < 20) { strength.style.backgroundColor = "red"; mate(0); }
    else if (Character[0] > 99) { strength.style.backgroundColor = "white" }
    else { strength.style.backgroundColor = "lime" };
    skill.innerHTML = (Character[1]>0) ? Character[1] : "X"; 
    skill.style.width = (10 + Character[1] * 3) + "px";
    skill.style.transition = "all 1s";
    if (Character[1] < 20) { skill.style.backgroundColor = "red"; mate(1); }
    else if (Character[1] > 99) { skill.style.backgroundColor = "white" }
    else { skill.style.backgroundColor = "lime" };
    iq.innerHTML = (Character[2]>0) ? Character[2] : "X";
    iq.style.width = (10 + Character[2] * 3) + "px";
    iq.style.transition = "all 1s";
    if (Character[2] < 20) { iq.style.backgroundColor = "red"; mate(2); }
    else if (Character[2] > 99) { iq.style.backgroundColor = "white" }
    else { iq.style.backgroundColor = "lime" };
    if (Steps % 10 == 0) {
        nme.innerHTML = (EnemyVal>0) ? EnemyVal : "X";
        nme.style.width = (10 + EnemyVal * 3) + "px";
        nme.style.transition = "all 1s";
        if (EnemyVal < 20) { enemy.style.backgroundColor = "black"; }
        else { nme.style.backgroundColor = "purple"; }
    }
}

function CheckEnd() {
    if (Character[0] < 1) { document.getElementById("container").innerHTML = "<h1>MEGHALTÁL!</h1><br><p class='Order'>Nyomd meg az F5-öt az időgép aktiválásához!</p>" };
    if (Character[1] < 1 || Character[2] < 1) { document.getElementById("container").innerHTML = "<h1>Annyira gyökér lettél, hogy nem érdemes tovább folytatni!</h1><br><p class='Order'>Nyomd meg az F5-öt az időgép aktiválásához!</p>" };
    document.getElementById("container").setAttribute("style", "filter: brightness(1); transition: filter 1s; filter: blur(0px);");
}

//Spéci szobák

function EroBtn() {
    var x = Character[0] + Math.random() * 35;
    var y = XRooms[XRoom][2] * 25 + Math.random() * (EnemyVal / 2);
    if (x > y) {
        let z = parseInt((x - y) / 2);
        EnemyVal -= z;
        PrintValues();
        document.getElementById("other").innerHTML = "Agyba-főbe vered. Veszít " + z + " Támadóerőt.";
        document.getElementById("other").style.color = "lightskyblue";
        CheckBBDeath();
    } else {
        let z = parseInt((y - x) / 4);
        Character[0] -= z;
        PrintValues();
        document.getElementById("other").innerHTML ="A Big Bug eltalált! Vesztesz " + z + " Erőt.";
        document.getElementById("other").style.color = "red";
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
        document.getElementById("other").innerHTML = "Sikerül kicselezned. Veszít " + z + " Támadóerőt.";
        document.getElementById("other").style.color = "lightskyblue";
        CheckBBDeath();
    } else {
        let z = parseInt((y - x) / 4);
        Character[1] -= z;
        PrintValues();
        document.getElementById("other").innerHTML = "A Big Bug kritikus támadást vitt be! Vesztesz " + z + " Ügyességet.";
        document.getElementById("other").style.color = "red";
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
        document.getElementById("other").innerHTML = "Sikerült túljárnod az eszén! Veszít " + z + " Támadóerőt.";
        document.getElementById("other").style.color = "lightskyblue";
        CheckBBDeath();
    } else {
        let z = parseInt((y - x) / 4);
        Character[2] -= z;
        PrintValues();
        document.getElementById("other").innerHTML = "A Big Bug túl járt az eszeden. Tök hülyének érzed magad. Vesztesz " + z + " Észt.";
        document.getElementById("other").style.color = "red";
        CheckEnd();
    };
    if (EnemyVal > 0) { bbAttack(); };
}

function FleeBtn() {
    Character[0] -= parseInt(XRooms[XRoom][2] * (1 + Math.random() * EnemyVal / 10));
    Character[1] -= parseInt(XRooms[XRoom][3] * (1 + Math.random() * EnemyVal / 10));
    Character[2] -= parseInt(XRooms[XRoom][4] * (1 + Math.random() * EnemyVal / 10));
    PrintValues();
    document.getElementById("other").innerHTML = "Megpróbálsz elmenekülni, de a Big Bug közben egy iszonyatosat rádsóz! Vesztesz egy rakás pontot! Ne légy gyáva!" + "<br><button onclick='next()'>Ez sok nekem!</button>";
    document.getElementById("other").style.color = "red";
    if (Character[0] < 1 || Character[1] < 1 || Character[2] < 1) {
        document.getElementById("EroAttack").disabled = true;
        document.getElementById("UgyAttack").disabled = true;
        document.getElementById("EszAttack").disabled = true;
        document.getElementById("Flee").disabled = true;
    };
}

function bbAttack() {
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
    x = parseInt(Math.random() * 11);
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
        PrintValues();
        document.getElementById("other").innerHTML = "Legyőzted a Big Bugot! Jutalomból átszállt beléd a maradék ereje." + "<br><button onclick='next()'>Jöhet a többi!</button>";
        document.getElementById("other").style.color = "lightskyblue";
        document.getElementById("EroAttack").disabled = true;
        document.getElementById("UgyAttack").disabled = true;
        document.getElementById("EszAttack").disabled = true;
        document.getElementById("Flee").disabled = true;
    }
}

function next() {
    document.getElementById("container").setAttribute("style", "filter: blur(20px) brightness(0)");
    NewRoom();
}

function Finale() {
    location.replace("shop_UB.html");
}

function mate(n) {
    if (Steps % 10 == 0) {return};
    CheckEnd();
    document.getElementById("colossus").innerHTML = `<img id='Mate' onclick= 'Mateka(${n})' src='./img/Mate.PNG'>`
    let x= parseInt(1+95*Math.random());
    document.getElementById("Mate").style.left = x+"%";
}

function Mateka(x) {
    Character[x] +=20;
    var node = document.createElement("P");
    var textnode = document.createTextNode("- Mivel megtaláltál, segítek áthidalni a nehézségeket! - szól a titokzatos varázsló.");
    node.appendChild(textnode);
    document.getElementById("other").appendChild(node);
    PrintValues();
    document.getElementById("colossus").innerHTML="";
}
