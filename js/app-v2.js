/*
Játék szabályok:

- A játék 2 szereplős és körökre osztott
- Minden egyes körben az adott játékos dob a kockával, ahányszor csak szeretne. A dobások eredménye hozzáadódik a játékos adott körben
  elért pontszámához, ami értelem szerűen minden körben nulláról indul.
- Ha az aktuális játékos 1-et dob, akkor az összes addigi pontja elveszik, és átadja a dobás jogát a következő játékosnak.
- A játékos választhatja a 'Megtartom' gombot is. Ebben az esetben az adott körben elért pontok száma, hozzáadódik a játékos összes
  pontszámához. Majd a dobás joga a másik játékosra száll.
- Az a játékos nyer, aki előbb eléri a 100 pontot.

Új játékszabályok!!!:

- Ha egy játékos 2x 6-ost dob egymás után, akkor az összes eddigi pontját eéveszíti és a dobás joga a másik játékosra száll
- Adjunk a programhoz egy lehetőséget, hogy a felhasználói felületen meg lehessen adni, hogy a győztesnek hány pontot kelljen elérni.
- Legyen még egy kocka. Ha az egyik kockával egyest dob, veszítse el a körben elért pontszámát.

*/

var pontszam1 = 0; // Létrehozom az egyik játékosnak a pontszámát. Értelemszerűen a kiindulási pont 0.
var pontszam2 = 0; // Létrehozom az egyik játékosnak a pontszámát. Értelemszerűen a kiindulási pont 0.

// Ez is elfogadott lenne, de szebb és menőbb, ha tö,bbel írjuk fel:

var pontszamok, korPontszam, aktivJatekos, jatekFolyamatban, elozoDobas; // Létrehozzuk a változókat

// pontszamok = [0,0]; // Ez a tömb tartalmazza a játékosok pontszámait (Mint ahogy fent is)
// korPontszam = 0; // Itt definiáljuk azt, hogy minde kör végén 0 ponttal kezd a játékos
//aktivJatekos = 0; // Az éppen dobó játékos kezdő értéke

// A FENTI HÁROM DECINIÁLÁS HELYETT INIT FÜGGVÉNYT ALKALMAZUNK:

init();

//kocka = Math.floor(Math.random() * 6) + 1; // Dobókockát definiáljuk. A "Math.random();" parancs egy random, tizedestörtekből álló számot kapunk vissza

// Itt a lefelé kerekítést használjuk. A számot azért szorozzuk meg 6-al, mert így 0-6 közötti random számot kapunk, mint ahogy a dobókockán. A +1 szám pedig azért kell,. hogy kizárjuk a 0-át.



// Dobás gomb kezelője

document.querySelector('.btn-roll').addEventListener('click', function() { // a gomb függvényt itt hívjuk meg, ismeretlen függvényként. Azért nem a szokásos hívást használjuk "gomb();", mert akkor egyből meghívná a függvényt a program, mi pedig gombnyomásra szeretnénk. Ezt nevezik Colback függvénynek.

  if(jatekFolyamatban) { // Ha a játék folyamatban van, akkor lehessen dobni. Itt nincs "else" ág, azt később írjuk ki. Ez csak hivatkozásnak kellett.
    // kell egy véletlen szám
    var kocka1 = Math.floor(Math.random() * 6) + 1; // Átmásoljuk a fenti elkészített random szám generátort. A "var" kifejezést kell, mivel most hívjuk meg élesbe???
    var kocka2 = Math.floor(Math.random() * 6) + 1; // Átmásoljuk a fenti elkészített random szám generátort. A "var" kifejezést kell, mivel most hívjuk meg élesbe???

    // eredmény megjelenítése
    document.getElementById('dice-1').src ='img/dice-' + kocka1 + '.png'; // Definiáljuk a második kockát
    document.getElementById('dice-2').src ='img/dice-' + kocka2 + '.png'; // Definiáljuk a második kockát
    
    kockaKiBeKapcsolas('be'); // Itt visszatesszük az elején elhide-olt png-t
    // másodikkénk hivatkozunk a kocka változóra (hogy milyen számot adott nekünk 1-6-ig), madj harmadikkénk a fájl kiterjesztésének a nevét ('png')
    
    if (kocka1 !== 1 && kocka2 !== 2) { // körben elért pontszám frissítése, ha nem egyet dobunk
      // Ha a "kocka" változó értéke nem egyenlő eggyel,
      korPontszam += kocka1 + kocka2; // "korPontszam" változó értékéhez hozzáadjuk a dobott számot ( a kocka változót adjuk hozzá)
      document.querySelector('#current-' + aktivJatekos).textContent = korPontszam; // Itt kötjük be az index.html-t, a "#current-" részt a html-ből hozzuk, az "aktivJatekos", változó az egy körben lévő össz pontszámra utal.
      // A ".textContent" segítségével átírhatjuk a "querySelector"-ban található hivatkozáshoz tartozó értéket.    
    } else {
      kovezketoJatekos();  // 82-es sorban definiálva!!!
    }

    /* if (kocka === 6 && elozoDobas === 6) { // Ha az aktív játékosnak az aktuális dobása és az előző dobása is 6-os volt, akkor
      // A játékos elveszíti az összes pontszámát
      pontszamok[aktivJatekos] = 0; // Az akív játékos elveszíti a pontszámait.
      // Összes pontszám frissítése a felületen (UI):
      document.querySelector('#score-' + aktivJatekos).textContent = 0; // A megtartott pontszámai is lenullázódnak
      // Következő játékos
      kovezketoJatekos();  

    } else if (kocka !== 1) { // körben elért pontszám frissítése, ha nem egyet dobunk
      // Ha a "kocka" változó értéke nem egyenlő eggyel,
      korPontszam += kocka; // "korPontszam" változó értékéhez hozzáadjuk a dobott számot ( a kocka változót adjuk hozzá)
      document.querySelector('#current-' + aktivJatekos).textContent = korPontszam; // Itt kötjük be az index.html-t, a "#current-" részt a html-ből hozzuk, az "aktivJatekos", változó az egy körben lévő össz pontszámra utal.
      // A ".textContent" segítségével átírhatjuk a "querySelector"-ban található hivatkozáshoz tartozó értéket.    
    } else {
      kovezketoJatekos();  // 82-es sorban definiálva!!!
    }
    elozoDobas = kocka; // NEM ÉRTEM 28. VIDEÓ 4:30 */
  }


}); 

// Megtartom gomb esemény kezelője

document.querySelector('.btn-hold').addEventListener('click', function(){ // a gomb függvényt itt hívjuk meg, ismeretlen függvényként. Azért nem a szokásos hívást használjuk "gomb();", mert akkor egyből meghívná a függvényt a program, mi pedig gombnyomásra szeretnénk. Ezt nevezik Colback függvénynek.

  if(jatekFolyamatban) { // Mivel a "Megtartom" gomb megszakítja az addigi folyamatot, és a másik játákosnak adja át a dobási lehetőséget (tehát egy másik esemény van folyamatban) ezért kell ide is egy "if (jatekfolyamatban)"
    // Összes pontszám frissítése a kódban:
    pontszamok[aktivJatekos] += korPontszam;

    // Összes pontszám frissítése a felületen (UI):
    document.querySelector('#score-' + aktivJatekos).textContent = pontszamok[aktivJatekos];

    var elerendoPontszam = document.querySelector('.elerendo-pontszam').value;

    if (!elerendoPontszam || isNaN(elerendoPontszam)){ // A "!elerendoPontszam" változóval vizsgáljuk az "elerendoPontszam" ellentettjét, tehát azt akarjuk vizsgálti, hogy a feltétel hamis-e. Az ÉS (||) az "isNaN" segítségével pedig kiszűrjük a betűket. Azaz, hogy csak számot fogadjon el a cella.
      elerendoPontszam = 15; // Ha nem értelmezhető számot írunk be, akkor a megadott 100 lesz az elérendő eredmény
    }

    // Nyert a játékos (ha 100 pontja van):
    if (pontszamok[aktivJatekos] >= elerendoPontszam) { // Azért vizsgáljuk nagyobb vagy egyenlő 100-al, mert lehet, hogy nem kerek 100 a pontszáma, hanem több
      document.querySelector('#name-' + aktivJatekos).textContent = 'Ön Nyert!';
      document.querySelector('.player-' + aktivJatekos + '-panel').classList.add('winner');
      document.querySelector('.player-' + aktivJatekos + '-panel').classList.remove('active');
      jatekFolyamatban = false; // Ide kerül a "jatekFolyamatban" else ága. Itt állítjuk meg a játékot, innentől korlátozzuk be a gombok használatát.
    } else {
    // Következő játékos
    kovezketoJatekos();  // 82-es sorban definiálva!!!
    }
  }
});

// Következő játékos
function kovezketoJatekos(){
  // Következő játékos, ha 1-es a dobás
  aktivJatekos === 0 ? aktivJatekos = 1 : aktivJatekos = 0; // Itt egy "if" függvényt készítünk, hogy Ha az "aktivJatekos" = 0, akkor váltsa át 1-re, és vissza.

  korPontszam = 0; // Ha az aktiális játékos egyet dob, akkor az ő dobása a következő fordulóban 0-ról induljon
  
  document.getElementById('current-0').textContent = '0'; // "document.getElementById" segítségével átírjuk az index.html-ben lévő #current-0 összpontszámot 0-ra 
  document.getElementById('current-1').textContent = '0'; // "document.getElementById" segítségével átírjuk az index.html-ben lévő #current-1 összpontszámot 0-ra
      
  document.querySelector('.player-0-panel').classList.toggle('active'); // Ezzel a "querySelector" segítségével a ".player-0-panel" class-ból kitöröljük az "active" class-t
  document.querySelector('.player-1-panel').classList.toggle('active'); // Itt pedig hozzáadjuk az egy másik játékoshoz, ha a másik játékos 1-est dobott
  // Azért "toggle" és nem "remove és "add", mert akkor plusz "if" függvényt kellene írni rá, ami felesleges lenne
  
  kockaKiBeKapcsolas('ki'); // Itt kikapcsoljuk az elején elhide-olt png-t
}

// új játék indítása
document.querySelector('.btn-new').addEventListener('click', init); // Az "Új játék" gombra tesszük az "init" függvényt

// inicializáló függvény (init függvény)

function init(){
  pontszamok = [0, 0]; // Mind a két játékosnak beállítjuk a 0 kezdőértéket
  aktivJatekos = 0; // Az aktív játékost is default-ra állítjuk
  korPontszam = 0; // A attuális kör pontszámait is lenullázzuk
  jatekFolyamatban = true; // Tart-e a játék? "True" értéke van ha igen, "false" értéke ha befejeződött
  elozoDobas = 0;

  kockaKiBeKapcsolas('ki'); // Itt kikapcsoljuk az elején elhide-olt png-t
  document.getElementById('score-0').textContent = '0';  // Bekötöttük ide ként ponthoz a JS-t
  document.getElementById('current-0').textContent = '0'; // Bekötöttük ide ként ponthoz a JS-t
  document.getElementById('score-1').textContent = '0'; // Bekötöttük ide ként ponthoz a JS-t
  document.getElementById('current-1').textContent = '0'; // Bekötöttük ide ként ponthoz a JS-t

  document.getElementById('name-0').textContent = 'Jani'; // Levesszük mindkét játékosról az "Ön Nyert" nevet
  document.getElementById('name-1').textContent = 'Pali'; // Levesszük mindkét játékosról az "Ön Nyert" nevet
  document.querySelector('.player-0-panel').classList.remove('winner'); // Levesszük mindkét játékosról a "winner" class-t
  document.querySelector('.player-1-panel').classList.remove('winner'); // Levesszük mindkét játékosról a "winner" class-t
  document.querySelector('.player-0-panel').classList.remove('active'); // Levesszük mindkét játékosról a "active" class-t
  document.querySelector('.player-1-panel').classList.remove('active'); // Levesszük mindkét játékosról a "active" class-t
  document.querySelector('.player-0-panel').classList.add('active'); // Janihoz hozzáadjuk az "active" class-t (Ő a default beállítás)
}

function kockaKiBeKapcsolas(funkcio) { // Függvényt hoztunk létre a kockák eltüntetésére és mutatására
  // funkcio = Ki, Be
  if (funkcio === 'ki'){
    document.getElementById('dice-1').style.display = 'none'; // Itt kikapcsoljuk az elején elhide-olt png-t
    document.getElementById('dice-2').style.display = 'none'; // Itt kikapcsoljuk az elején elhide-olt png-t
  } else if (funkcio === 'be') {
    document.getElementById('dice-1').style.display = 'block'; // Itt visszatesszük az elején elhide-olt png-t
    document.getElementById('dice-2').style.display = 'block'; // Itt visszatesszük az elején elhide-olt png-t
  }
}