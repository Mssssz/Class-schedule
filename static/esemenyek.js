// eslint-disable-next-line
async function getFiles(tantargyID) {
  console.log('Esemeny get file');
  try {
    const show = document.getElementById(`fileok${tantargyID}`).style.display;
    if (show === 'none') {
      const response = await fetch(`/fileok?tantargy=${tantargyID}`);
      const reszletek = await response.json();
      const formatedReszletek = document.createElement('p');
      reszletek.forEach((reszlet) => {
        const link = document.createElement('a');
        link.setAttribute('href', `${reszlet.FilePath}`);
        link.setAttribute('download', `${reszlet.FileNeve}`);
        const valami = document.createTextNode(`${reszlet.FileNeve}`);
        link.appendChild(valami);
        formatedReszletek.appendChild(link);
        const sortores = document.createElement('br');
        formatedReszletek.appendChild(sortores);
      });
      const ide = document.getElementById(`fileok${tantargyID}`);
      ide.appendChild(formatedReszletek);
      document.getElementById(`fileok${tantargyID}`).style.display = 'table-row';
    } else {
      document.getElementById(`fileok${tantargyID}`).style.display = 'none';
    }
  } catch (err) {
    console.log('Esemeny get file catch');
    console.log(err);
    document.getElementById(`fileok${tantargyID}`).innerText = 'Hiba tortent!';
    document.getElementById(`fileok${tantargyID}`).style.display = 'table-row';
    setTimeout(() => { document.getElementById(`fileok${tantargyID}`).style.display = 'none'; }, 2000);
  }
}

// eslint-disable-next-line
async function deleteFile(fileID) {
  await fetch(`/tantargyReszletei/fileok?file=${fileID}`, { method: 'POST' })
    .then((response) => response.json())
    .then((valasz) => {
      document.getElementById(`file${fileID}`).remove();
      if (valasz.status === 500) {
        document.getElementById(`hiba${fileID}`).innerText = 'Hiba tortent!';
      } else {
        document.getElementById(`hiba${fileID}`).innerText = 'Sikeres törlés!';
      }
      setTimeout(() => { document.getElementById(`hiba${fileID}`).style.display = 'none'; }, 2000);
    })
    .catch((err) => {
      console.log('Esemeny delete file catch');
      console.log(err);
      document.getElementById(`hiba${fileID}`).style.display = 'table-row';
      document.getElementById(`hiba${fileID}`).innerText = 'Hiba tortent!';
      setTimeout(() => { document.getElementById(`hiba${fileID}`).style.display = 'none'; }, 2000);
    });
}

// eslint-disable-next-line
async function deleteFelhasznalo(felhasznaloID) {
  await fetch(`/felhasznaloKarbantartas/deleteFelhasznalo?felhasznalo=${felhasznaloID}`, { method: 'POST' })
    .then((response) => response.json())
    .then((valasz) => {
      document.getElementById(`felhasznalo${felhasznaloID}`).remove();
      document.getElementById(`hiba${felhasznaloID}`).style.display = 'table-row';
      if (valasz.status === 500) {
        document.getElementById(`hiba${felhasznaloID}`).innerText = 'Hiba tortent!';
      } else {
        document.getElementById(`hiba${felhasznaloID}`).innerText = 'Sikeres törlés!';
      }
      setTimeout(() => { document.getElementById(`hiba${felhasznaloID}`).style.display = 'none'; }, 2000);
    })
    .catch((err) => {
      console.log('Esemeny delete felhasznalo catch');
      console.log(err);
      document.getElementById(`hiba${felhasznaloID}`).style.display = 'table-row';
      document.getElementById(`hiba${felhasznaloID}`).innerText = 'Hiba tortent!';
      setTimeout(() => { document.getElementById(`hiba${felhasznaloID}`).style.display = 'none'; }, 2000);
    });
}

// eslint-disable-next-line
async function deleteTantargy(tantargyID) {
  await fetch(`/tantargyKarbantartas/deleteTantargy?tantargy=${tantargyID}`, { method: 'POST' })
    .then((response) => response.json())
    .then((valasz) => {
      document.getElementById(`tantargy${tantargyID}`).remove();
      document.getElementById(`fileok${tantargyID}`).remove();
      document.getElementById(`hiba${tantargyID}`).style.display = 'table-row';
      if (valasz.status === 500) {
        document.getElementById(`hiba${tantargyID}`).innerText = 'Hiba tortent!';
      } else {
        document.getElementById(`hiba${tantargyID}`).innerText = 'Sikeres törlés!';
      }
      setTimeout(() => { document.getElementById(`hiba${tantargyID}`).style.display = 'none'; }, 2000);
    })
    .catch((err) => {
      console.log('Esemeny delete tantargy catch');
      console.log(err);
      document.getElementById(`hiba${tantargyID}`).style.display = 'table-row';
      document.getElementById(`hiba${tantargyID}`).innerText = 'Hiba tortent!';
      setTimeout(() => { document.getElementById(`hiba${tantargyID}`).style.display = 'none'; }, 2000);
    });
}

// eslint-disable-next-line
async function orarendFeltoltes(felhasznaloID) {
  console.log(felhasznaloID);
  await fetch(`/sajatOrarend/orakTanarhoz?felhasznalo=${felhasznaloID}`, { method: 'GET' })
    .then((response) => response.json())
    .then((orak) => {
      console.log(orak);
      orak.forEach((ora) => {
        console.log(ora);
        let mettol = parseInt(ora.Mettol, 10);
        const meddig = parseInt(ora.Meddig, 10);
        console.log(`elso ${mettol}`);
        console.log(`as minfdinik ${ora.Nap}${mettol}:00`);
        while (mettol < meddig) {
          const mezo = document.getElementById(`${ora.Nap}${mettol}:00`);
          console.log(mezo.textContent);
          if (mezo.textContent === '') {
            const szovegResz = document.createTextNode(`${ora.TantargyNev}, ${ora.OraTipus}`);
            mezo.appendChild(szovegResz);
            mezo.setAttribute('class', `${ora.OraTipus}`);
          } else {
            const szovegResz = document.createTextNode(` | ${ora.TantargyNev}, ${ora.OraTipus}`);
            mezo.appendChild(szovegResz);
          }
          mettol += 1;
        }
      });
    })
    .catch((err) => {
      console.log('Esemeny orarend feltoltese catch');
      console.log(err);
    });
}

// eslint-disable-next-line
async function orarendFeltoltesAdmin() {
  await fetch('/orakBeosztasa/orak', { method: 'GET' })
    .then((response) => response.json())
    .then((orak) => {
      console.log(orak);
      orak.forEach((ora) => {
        console.log(ora);
        let mettol = parseInt(ora.Mettol, 10);
        const meddig = parseInt(ora.Meddig, 10);
        console.log(`elso ${mettol}`);
        console.log(`as minfdinik ${ora.Nap}${mettol}:00`);
        while (mettol < meddig) {
          const mezo = document.getElementById(`${ora.Nap}${mettol}:00`);
          console.log(mezo.textContent);
          if (mezo.textContent === '+') {
            mezo.setAttribute('class', `${ora.OraTipus}`);
          }
          const szovegResz = document.createTextNode(`${ora.TantargyNev}, ${ora.OraTipus}  `);
          mezo.appendChild(szovegResz);
          const torles = document.createElement('a');
          torles.setAttribute('href', `/orakBeosztasa/deleteOra?ora=${ora.OraID}`);
          torles.appendChild(document.createTextNode('Törlés!'));
          mezo.appendChild(document.createElement('br'));
          mezo.appendChild(torles);
          mezo.appendChild(document.createElement('br'));
          mettol += 1;
        }
      });
    })
    .catch((err) => {
      console.log('Esemeny orarend feltoltese catch');
      console.log(err);
    });
}

function felepitOraHossza(ora) {
  const oraP = parseInt(ora, 10);
  const oraHosszatomb = [];
  if (oraP < 18) {
    oraHosszatomb.push(1);
    oraHosszatomb.push(2);
    oraHosszatomb.push(3);
    oraHosszatomb.push(4);
  } else if (oraP < 19) {
    oraHosszatomb.push(1);
    oraHosszatomb.push(2);
    oraHosszatomb.push(3);
  } else if (oraP < 20) {
    oraHosszatomb.push(1);
    oraHosszatomb.push(2);
  } else {
    oraHosszatomb.push(1);
  }
  return oraHosszatomb;
}

// eslint-disable-next-line
async function oraHozzaadas(nap, ora) {
  console.log(`oraHozzadas ${nap}${ora}`);
  await fetch('/orakBeosztasa/tantargyak', { method: 'GET' })
    .then((response) => response.json())
    .then((tantargyak) => {
      const plusz = document.getElementById(`${nap}${ora}p`);
      console.log(`text: ${plusz.textContent}`);
      if (plusz.textContent === '+') {
        // tanatargy legordulo lista
        const tanargyakLista = document.createElement('select');
        tanargyakLista.setAttribute('name', 'tantargy');
        tanargyakLista.setAttribute('form', `oraBeszuras${nap}${ora}`);
        tantargyak.forEach((tantargy) => {
          const tanargyakOption = document.createElement('option');
          tanargyakOption.setAttribute('value', `${tantargy.TantargyID}`);
          tanargyakOption.appendChild(document.createTextNode(`${tantargy.TantargyNev}`));
          tanargyakLista.appendChild(tanargyakOption);
        });
        // ora tipusa legordulo lista
        const oraTipusok = ['Kurzus', 'Szeminarium', 'Labor'];
        const oraTipusLista = document.createElement('select');
        oraTipusLista.setAttribute('name', 'oraTipus');
        oraTipusLista.setAttribute('form', `oraBeszuras${nap}${ora}`);
        oraTipusok.forEach((oraTipus) => {
          const oraTipusOption = document.createElement('option');
          oraTipusOption.setAttribute('value', `${oraTipus}`);
          oraTipusOption.appendChild(document.createTextNode(`${oraTipus}`));
          oraTipusLista.appendChild(oraTipusOption);
        });
        // ora hossza legordulo lista
        const oraHosszatomb = felepitOraHossza(ora);
        const oraHosszaLista = document.createElement('select');
        oraHosszaLista.setAttribute('name', 'oraHossz');
        oraHosszaLista.setAttribute('form', `oraBeszuras${nap}${ora}`);
        oraHosszatomb.forEach((oraHossz) => {
          const oraHosszaOption = document.createElement('option');
          oraHosszaOption.setAttribute('value', `${oraHossz}`);
          oraHosszaOption.appendChild(document.createTextNode(`${oraHossz}`));
          oraHosszaLista.appendChild(oraHosszaOption);
        });
        const oraHosszaElem = document.createElement('p');
        oraHosszaElem.appendChild(document.createTextNode('Óra hossza:'));
        oraHosszaElem.appendChild(oraHosszaLista);
        // mettol
        const mettol = document.createElement('input');
        mettol.setAttribute('type', 'text');
        mettol.setAttribute('name', 'mettol');
        mettol.setAttribute('value', `${ora}:00`);
        mettol.style.visibility = 'hidden';
        // nap
        const napElem = document.createElement('input');
        napElem.setAttribute('type', 'text');
        napElem.setAttribute('name', 'nap');
        napElem.setAttribute('value', `${nap}`);
        napElem.style.visibility = 'hidden';
        // beszur gomb
        const beszur = document.createElement('input');
        beszur.setAttribute('type', 'submit');
        beszur.setAttribute('value', 'Beszúr!');
        // osszeallit form
        const form = document.createElement('form');
        form.setAttribute('id', `oraBeszuras${nap}${ora}`);
        form.setAttribute('method', 'post');
        form.setAttribute('action', '/orakBeosztasa/ujOra');
        form.appendChild(tanargyakLista);
        form.appendChild(document.createElement('br'));
        form.appendChild(oraTipusLista);
        form.appendChild(oraHosszaElem);
        const p = document.createElement('p');
        p.appendChild(beszur);
        form.appendChild(p);
        form.appendChild(mettol);
        form.appendChild(napElem);
        const mezo = document.getElementById(`${nap}${ora}`);
        mezo.appendChild(form);
        plusz.textContent = '-';
      } else {
        document.getElementById(`oraBeszuras${nap}${ora}`).remove();
        plusz.textContent = '+';
      }
    })
    .catch((err) => {
      console.log('Esemeny orarend feltoltese catch');
      console.log(err);
    });
}

// eslint-disable-next-line
async function deleteKeres(keresID) {
  await fetch(`/sajatOrarend/keresTorles?keres=${keresID}`, { method: 'POST' })
    .then((response) => response.json())
    .then((valasz) => {
      document.getElementById(`keres${keresID}`).remove();
      if (valasz.status === 500) {
        document.getElementById(`hiba${keresID}`).innerText = 'Hiba tortent!';
      } else {
        document.getElementById(`hiba${keresID}`).innerText = 'Sikeres törlés!';
      }
      setTimeout(() => { document.getElementById(`hiba${keresID}`).style.display = 'none'; }, 2000);
    })
    .catch((err) => {
      console.log('Esemeny delete file catch');
      console.log(err);
      document.getElementById(`hiba${keresID}`).style.display = 'table-row';
      document.getElementById(`hiba${keresID}`).innerText = 'Hiba tortent!';
      setTimeout(() => { document.getElementById(`hiba${keresID}`).style.display = 'none'; }, 2000);
    });
}

// eslint-disable-next-line
async function modositKeres(keresID, allapot) {
  console.log(allapot);
  await fetch(`/orakBeosztasa/modositAllapot?keres=${keresID}&allapot=${allapot}`, { method: 'POST' })
    .then((response) => response.json())
    .then((valasz) => {
      if (valasz.status === 500) {
        document.getElementById(`hiba${keresID}`).innerText = 'Hiba tortent!';
        setTimeout(() => { document.getElementById(`hiba${keresID}`).style.display = 'none'; }, 2000);
      } else if (allapot === '1') {
        document.getElementById(`keres${keresID}`).innerText = 'Elfogadva';
        document.getElementById(`keres${keresID}`).setAttribute('class', 'Labor');
      } else {
        document.getElementById(`keres${keresID}`).innerText = 'Visszautasítva';
        document.getElementById(`keres${keresID}`).setAttribute('class', 'Kurzus');
      }
    })
    .catch((err) => {
      console.log('Esemeny delete file catch');
      console.log(err);
      document.getElementById(`hiba${keresID}`).style.display = 'table-row';
      document.getElementById(`hiba${keresID}`).innerText = 'Hiba tortent!';
      setTimeout(() => { document.getElementById(`hiba${keresID}`).style.display = 'none'; }, 2000);
    });
}
