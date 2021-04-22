/*
Játék szabályok:

- A játék 2 szereplős és körökre osztott
- Minden egyes körben az adott játékos dob a kockával, ahányszor csak szeretne. A dobások eredménye hozzáadódik a játékos adott körben
  elért pontszámához, ami értelem szerűen minden körben nulláról indul.
- Ha az aktuális játékos 1-et dob, akkor az összes addigi pontja elveszik, és átadja a dobás jogát a következő játékosnak.
- A játékos választhatja a 'Megtartom' gombot is. Ebben az esetben az adott körben elért pontok száma, hozzáadódik a játékos összes
  pontszámához. Majd a dobás joga a másik játékosra száll.
- Az a játékos nyer, aki előbb eléri a 100 pontot.  

*/

var pontszam1 = 0; // Létrehozom az egyik játékosnak a pontszámát. Értelemszerűen a kiindulási pont 0.
var pontszam2 = 0; // Létrehozom az egyik játékosnak a pontszámát. Értelemszerűen a kiindulási pont 0.

// Ez is elfogadott lenne, de szebb és menőbb, ha tö,bbel írjuk fel:

var pontszamok, korPontszam, aktivJatekos, jatekFolyamatban; // Létrehozzuk a változókat

// pontszamok = [0,0]; // Ez a tömb tartalmazza a játékosok pontszámait (Mint ahogy fent is)
// korPontszam = 0; // Itt definiáljuk azt, hogy minde kör végén 0 ponttal kezd a játékos
//aktivJatekos = 0; // Az éppen dobó játékos kezdő értéke

// A FENTI HÁROM DECINIÁLÁS HELYETT INIT FÜGGVÉNYT ALKALMAZUNK:

init();

//kocka = Math.floor(Math.random() * 6) + 1; // Dobókockát definiáljuk. A "Math.random();" parancs egy random, tizedestörtekből álló számot kapunk vissza

// Itt a lefelé kerekítést használjuk. A számot azért szorozzuk meg 6-al, mert így 0-6 közötti random számot kapunk, mint ahogy a dobókockán. A +1 szám pedig azért kell,. hogy kizárjuk a 0-át.



// Dobás gopmb kezelője

document.querySelector('.btn-roll').addEventListener('click', function() { // a gomb függvényt itt hívjuk meg, ismeretlen függvényként. Azért nem a szokásos hívást használjuk "gomb();", mert akkor egyből meghívná a függvényt a program, mi pedig gombnyomásra szeretnénk. Ezt nevezik Colback függvénynek.

  if(jatekFolyamatban) { // Ha a játék folyamatban van, akkor lehessen dobni. Itt nincs "else" ág, azt később írjuk ki. Ez csak hivatkozásnak kellett.
    // kell egy véletlen szám
    var kocka = Math.floor(Math.random() * 6) + 1; // Átmásoljuk a fenti elkészített random szám generátort. A "var" kifejezést kell, mivel most hívjuk meg élesbe???

    // eredmény megjelenítése
    var kockaDOM = document.querySelector('.dice'); // Ezt a változót azért hoztuk létre, hogy ne kelljen mindig külön, többször meghívni/leírni a
    kockaDOM.style.display = 'block'; // Itt visszatesszük az elején elhide-olt png-t
    kockaDOM.src = 'img/dice-' + kocka + '.png'; // Itt hivatkozunk az index.html 38. sorára, azt módosítjuk. Mivel van 1-6-ig mindegyik számból egy dobókocka png, ezért az elején hivatkozunk ahol vannak a képek plusz a kép nevének az eleje, ('img/dice-'),
    // másodikkénk hivatkozunk a kocka változóra (hogy milyen számot adott nekünk 1-6-ig), madj harmadikkénk a fájl kiterjesztésének a nevét ('png')
    

    // körben elért pontszám frissítése, ha nem egyet dobunk
    if (kocka !== 1) { // Ha a "kocka" változó értéke nem egyenlő eggyel,
      korPontszam += kocka; // "korPontszam" változó értékéhez hozzáadjuk a dobott számot ( a kocka változót adjuk hozzá)
      document.querySelector('#current-' + aktivJatekos).textContent = korPontszam; // Itt kötjük be az index.html-t, a "#current-" részt a html-ből hozzuk, az "aktivJatekos", változó az egy körben lévő össz pontszámra utal.
      // A ".textContent" segítségével átírhatjuk a "querySelector"-ban található hivatkozáshoz tartozó értéket.    
    } else {
      kovezketoJatekos();  // 82-es sorban definiálva!!!
    }

  }


}); 

// Megtartom gomb esemény kezelője

document.querySelector('.btn-hold').addEventListener('click', function(){ // a gomb függvényt itt hívjuk meg, ismeretlen függvényként. Azért nem a szokásos hívást használjuk "gomb();", mert akkor egyből meghívná a függvényt a program, mi pedig gombnyomásra szeretnénk. Ezt nevezik Colback függvénynek.

  if(jatekFolyamatban) { // Mivel a "Megtartom" gomb megszakítja az addigi folyamatot, és a másik játákosnak adja át a dobási lehetőséget (tehát egy másik esemény van folyamatban) ezért kell ide is egy "if (jatekfolyamatban)"
    // Összes pontszám frissítése a kódban:
    pontszamok[aktivJatekos] += korPontszam;

    // Összes pontszám frissítése a felületen (UI):
    document.querySelector('#score-' + aktivJatekos).textContent = pontszamok[aktivJatekos];

    // Nyert a játékos (ha 100 pontja van):
    if (pontszamok[aktivJatekos] >= 100) { // Azért vizsgáljuk nagyobb vagy egyenlő 100-al, mert lehet, hogy nem kerek 100 a pontszáma, hanem több
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
  
  document.querySelector('.dice').style.display = 'none'; // Ha 1-est dobunk, akkor a kocka (.dice) el van hidolva
}

// új játék indítása
document.querySelector('.btn-new').addEventListener('click', init); // Az "Új játék" gombra tesszük az "init" függvényt

// inicializáló függvény (init függvény)

function init(){
  pontszamok = [0, 0]; // Mind a két játékosnak beállítjuk a 0 kezdőértéket
  aktivJatekos = 0; // Az aktív játékost is default-ra állítjuk
  korPontszam = 0; // A attuális kör pontszámait is lenullázzuk
  jatekFolyamatban = true; // Tart-e a játék? "True" értéke van ha igen, "false" értéke ha befejeződött

  document.querySelector('.dice').style.display = 'none'; // Eltüntetjük a dice class-t
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