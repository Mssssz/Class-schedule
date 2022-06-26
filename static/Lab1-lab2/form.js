/* eslint-disable no-unused-vars */
function emailEll() {
  const email = document.getElementById('email').value;
  const reg = '^[A-Za-z0-9*+-_.]+@(yahoo|gmail)(.com)$';
  if (email.match(reg)) {
    console.log('helyes email');
    document.getElementById('hiba-email').style.visibility = 'hidden';
    return false;
  }

  console.log('helytelen email');
  document.getElementById('hiba-email').style.visibility = 'visible';
  return true;
}

function urlEll() {
  const url = document.getElementById('weboldal').value;
  const regex = 'www.[A-Za-z0-9@:%._+~#=-]{2,256}.[a-z]{2,6}';
  if (url.match(regex)) {
    console.log('helyes url');
    document.getElementById('hiba-weboldal').style.visibility = 'hidden';
    return false;
  }

  console.log('helytelen url');
  document.getElementById('hiba-weboldal').style.visibility = 'visible';
  return true;
}

function load() {
  document.getElementById('leadas').disabled = true;
  document.getElementById('hiba-csaladnev').style.visibility = 'hidden';
  document.getElementById('hiba-keresztnev').style.visibility = 'hidden';
  document.getElementById('hiba-datum').style.visibility = 'hidden';
  document.getElementById('hiba-weboldal').style.visibility = 'hidden';
  document.getElementById('hiba-email').style.visibility = 'hidden';
  document.getElementById('hiba-becenev').style.visibility = 'hidden';
  document.getElementById('hiba-penz').style.visibility = 'hidden';
  document.getElementById('fot').innerText = document.lastModified;
}

function csnevEll() {
  if (!document.getElementById('csnev').checkValidity()) {
    document.getElementById('hiba-csaladnev').style.visibility = 'visible';
  } else {
    document.getElementById('hiba-csaladnev').style.visibility = 'hidden';
  }
}

function knevEll() {
  if (!document.getElementById('knev').checkValidity()) {
    document.getElementById('hiba-keresztnev').style.visibility = 'visible';
  } else {
    document.getElementById('hiba-keresztnev').style.visibility = 'hidden';
  }
}

function datumEll() {
  if (!document.getElementById('datum').checkValidity()) {
    document.getElementById('hiba-datum').style.visibility = 'visible';
  } else {
    document.getElementById('hiba-datum').style.visibility = 'hidden';
  }
}

function becenevEll() {
  if (document.getElementById('becenev').value === '') {
    document.getElementById('hiba-becenev').style.visibility = 'visible';
  } else {
    document.getElementById('hiba-becenev').style.visibility = 'hidden';
  }
}

function penzEll() {
  if (document.getElementById('penz').value === '') {
    document.getElementById('hiba-penz').style.visibility = 'visible';
  } else {
    document.getElementById('hiba-penz').style.visibility = 'hidden';
  }
}

function lead() {
  csnevEll();
  knevEll();
  datumEll();
  emailEll();
  urlEll();
  becenevEll();
  penzEll();
  if (!document.getElementById('csnev').checkValidity() || !document.getElementById('knev').checkValidity() || !document.getElementById('datum').checkValidity() || document.getElementById('becenev').value === '' || document.getElementById('penz').value === '' || emailEll() || urlEll()) {
    document.getElementById('leadas').disabled = true;
  } else {
    document.getElementById('leadas').disabled = false;
  }
  document.getElementById('fot').innerText = document.lastModified;
}
