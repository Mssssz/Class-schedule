/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
const eredmenyLista = [];
let csnev = '';
let knev = '';
let becenev = '';
let penz = 0;
let gepPenz = 0;

let jatekos = 0;
let gepe = 0;

function lementAdat() {
  new URLSearchParams(window.location.search).forEach((value) => {
    eredmenyLista.push(value);
  });
  csnev = eredmenyLista[0];
  knev = eredmenyLista[1];
  becenev = eredmenyLista[5];
  penz = parseInt(eredmenyLista[6], 10);
  console.log(`csnev: ${csnev} knev: ${knev} becenev: ${becenev} penz: ${penz}`);

  // nehany beallitas az elejen
  document.getElementById('jatek').style.visibility = 'hidden';
  document.getElementById('ujra').style.visibility = 'hidden';

  // gep penzenek generalasa
  gepPenz = Math.floor(Math.random() * 1500) + 501;
}

function jatek() {
  if (penz <= 0 || gepPenz <= 0) {
    document.getElementById('jatek').style.visibility = 'hidden';
    document.getElementById('ko-gep').style.visibility = 'hidden';
    document.getElementById('papir-gep').style.visibility = 'hidden';
    document.getElementById('ollo-gep').style.visibility = 'hidden';
    document.getElementById('kerdojel').style.visibility = 'hidden';
    document.getElementById('ko-jat').style.visibility = 'hidden';
    document.getElementById('papir-jat').style.visibility = 'hidden';
    document.getElementById('ollo-jat').style.visibility = 'hidden';
    document.getElementById('ujra').style.visibility = 'hidden';
    document.getElementById('ered').style.visibility = 'hidden';
    if (penz <= 0) {
      document.getElementById('vege').innerHTML = `<h2>Sajnálom, a gép nyert, mert elfogyott a pénzed ${becenev}!</h2>`;
    } else {
      document.getElementById('vege').innerHTML = `<h2>Gratulálok nyertél ${becenev}!</h2>`;
    }
  } else {
    document.getElementById('jatek').style.visibility = 'visible';
    document.getElementById('start').style.visibility = 'hidden';
    document.getElementById('jatekos').innerHTML = `<p>Játékos neve: ${csnev} ${knev}</p> <p>Beceneve: ${becenev} </p> <p>Rendelkezésére álló pénz: ${penz}</p> <p>Gép pénze: ${gepPenz}</p>`;

    document.getElementById('ko-gep').style.visibility = 'hidden';
    document.getElementById('papir-gep').style.visibility = 'hidden';
    document.getElementById('ollo-gep').style.visibility = 'hidden';
    document.getElementById('kerdojel').style.visibility = 'visible';

    document.getElementById('ko-jat').style.visibility = 'visible';
    document.getElementById('papir-jat').style.visibility = 'visible';
    document.getElementById('ollo-jat').style.visibility = 'visible';

    document.getElementById('ered').style.visibility = 'hidden';
    document.getElementById('ujra').style.visibility = 'visible';
  }
}

function helyzet() {
  if (gepe === 1) {
    // gep ko jatekos papir -> nyer jatekos
    if (jatekos === 2) return 1;
    // gep ko jatekos ollo -> nyer gep
    return 2;
  }
  // gep papir jatekos ko -> nyer gep
  if (gepe === 2) {
    if (jatekos === 1) return 2;
    // gep papir jatekos ollo -> nyer jatekos
    return 1;
  }
  // gep ollo jatekos ko -> nyer jatekos
  if (gepe === 3 && jatekos === 1) return 1;
  // gep ollo jatekos papir -> nyer gep
  return 2;
}

function nyertes() {
  let e = 0;
  // ha ugyan azt mutattak dontetlen
  if (gepe === jatekos) {
    e = 0;
  // ha kulonbozot mutattak
  } else {
    e = helyzet();
  }
  // jatekos nyert
  if (e === 1) {
    gepPenz -= 50;
    penz += 50;
    document.getElementById('ered').innerHTML = `<p>Nyertes: ${becenev}</p>`;
  // gep nyert
  } else if (e === 2) {
    gepPenz += 50;
    penz -= 50;
    document.getElementById('ered').innerHTML = '<p>Nyertes: GÉP</p>';
  } else {
    document.getElementById('ered').innerHTML = '<p>Döntetlen</p>';
  }
  document.getElementById('ered').style.visibility = 'visible';
}

function gep() {
  gepe = Math.floor(Math.random() * 3) + 1;
  document.getElementById('kerdojel').style.visibility = 'hidden';
  if (gepe === 1) {
    document.getElementById('ko-gep').style.visibility = 'visible';
  } else if (gepe === 2) {
    document.getElementById('papir-gep').style.visibility = 'visible';
  } else {
    document.getElementById('ollo-gep').style.visibility = 'visible';
  }
  nyertes();
}

function ko() {
  jatekos = 1;
  document.getElementById('ko-jat').style.visibility = 'visible';
  document.getElementById('papir-jat').style.visibility = 'hidden';
  document.getElementById('ollo-jat').style.visibility = 'hidden';
  gep();
}

function papir() {
  jatekos = 2;
  document.getElementById('ko-jat').style.visibility = 'hidden';
  document.getElementById('papir-jat').style.visibility = 'visible';
  document.getElementById('ollo-jat').style.visibility = 'hidden';
  gep();
}

function ollo() {
  jatekos = 3;
  document.getElementById('ko-jat').style.visibility = 'hidden';
  document.getElementById('papir-jat').style.visibility = 'hidden';
  document.getElementById('ollo-jat').style.visibility = 'visible';
  gep();
}
