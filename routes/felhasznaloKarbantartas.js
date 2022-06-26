import express from 'express';
import bcrypt from 'bcrypt';
import * as tantargydb from '../db/tantargy.js';
import * as felhasznalodb from '../db/felhasznalo.js';
import * as jelentkezesdb from '../db/jelentkezes.js';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('bekilepes oldal');
  try {
    const felhasznalok = await felhasznalodb.findAllFelhasznalo();
    const tantargyak = await tantargydb.findAllTantargy();
    res.render('felhasznaloKarbantartas', { felhasznalok, tantargyak });
  } catch (err) {
    console.log(`bekilepes catch ${err}`);
    res.status(500).render('error', { message: `Selection unsuccessful: ${err}` });
  }
  console.log('bekilepes vege');
});

router.post('/regisztraciForm', async (req, res) => {
  try {
    let hiba;
    if (req.body.jelszo.length < 8) {
      const jelszo = true;
      res.render('felhasznaloKarbantartas', { jelszo });
    }
    if (!await felhasznalodb.existsFelhaszanalo(req.body.diakID)) {
      const password = await bcrypt.hash(req.body.jelszo, 10);
      console.log(password);
      console.log(`hashWithSalt: ${password}`);
      await felhasznalodb.insertFelhasznalo(req.body.diakID, password, req.body.role);
      hiba = false;
    } else {
      hiba = true;
    }
    const felhasznalok = await felhasznalodb.findAllFelhasznalo();
    const tantargyak = await tantargydb.findAllTantargy();
    res.render('felhasznaloKarbantartas', { felhasznalok, tantargyak, hiba });
  } catch (error) {
    console.log(`regisztracio catch ${error}`);
    console.error(`Error occurred: ${error.message}`);
    res.status(500).write(error);
  }
});

router.post('/bekijeletkezesForm', async (req, res) => {
  try {
    // ha igaz kilepni szeretne, ha hamis belepni
    const kiLepes = Boolean(req.body.beLepes);
    console.log('bekilepes form');
    const jelentkezes = await jelentkezesdb.existsJelentkezes(
      req.body.tantargy,
      req.body.felhasznalo,
    );
    let torol = false;
    let hibas = false;
    if (kiLepes) {
      torol = true;
      if (!jelentkezes) {
        // hiba nem tud kilepni ha nincs bent
        hibas = true;
      } else {
        // kilep
        await jelentkezesdb.deleteJelentkezes(req.body.felhasznalo, req.body.tantargy);
      }
    } else if (!jelentkezes) {
      // belep
      await jelentkezesdb.insertJelentkezes(req.body.felhasznalo, req.body.tantargy);
    } else {
      // hiba nem tud belepni ha bent van mar
      hibas = true;
    }
    const felhasznalok = await felhasznalodb.findAllFelhasznalo();
    const tantargyak = await tantargydb.findAllTantargy();
    res.render('felhasznaloKarbantartas', {
      felhasznalok, tantargyak, torol, hibas,
    });
  } catch (error) {
    console.log(`bekijelentkezes catch ${error}`);
    console.error(`Error occurred: ${error.message}`);
    res.status(500).write(error);
  }
});

router.post('/deleteFelhasznalo', async (req, res) => {
  console.log('Reszletek delete');
  try {
    const felhasznaloID = req.query.felhasznalo;
    console.log(felhasznaloID);
    await felhasznalodb.deleteFelhasznalo(felhasznaloID);
    const siker = 'Felhasznalo deleted successfully';
    res.json(siker);
  } catch (err) {
    const uzenet = `Sikertelen torles: ${err}`;
    console.log(uzenet);
    res.status(500).json(uzenet);
  }
});

export default router;
