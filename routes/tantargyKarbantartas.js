import express from 'express';
import fs from 'fs';
import * as tantargydb from '../db/tantargy.js';
import * as jelentkezesdb from '../db/jelentkezes.js';
import * as filedb from '../db/file.js';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Tantargy hozzaadasa oldal');
  try {
    res.render('tantargyKarbantartas');
  } catch (err) {
    console.log(`tantargyHozzadas catch ${err}`);
    res.status(500).render('error', { message: `Selection unsuccessful: ${err}` });
  }
});

router.post('/tantargyHozzadasForm', async (request, response) => {
  try {
    let hiba = false;
    if (!await tantargydb.existsTantargy(request.body.tantargyID)) {
      await tantargydb.insertTantargy(
        request.body.tantargyID,
        request.body.tantargyNev,
        request.body.evfolyam,
        request.body.kurzus,
        request.body.szeminarium,
        request.body.labor,
      );
      const szerepkor = 'admin';
      await jelentkezesdb.insertJelentkezes(
        request.body.felhasznaloID,
        request.body.tantargyID,
        szerepkor,
      );
      response.redirect('/index');
    } else {
      hiba = true;
      response.render('tantargyKarbantartas', { hiba });
    }
  } catch (error) {
    console.log(`tantargyHozzadasForm catch ${error}`);
    console.error(`Error occurred: ${error.message}`);
    response.status(500).write(error);
  }
});

router.post('/deleteTantargy', async (req, res) => {
  console.log('Reszletek delete');
  try {
    const tantargyID = req.query.tantargy;
    console.log(tantargyID);
    // tolom a tantargyhoz tartozo fileokat az uploadDirbol
    // a jeletkezes es file cascadeel van lekezelve
    const fileok = await filedb.findTantargyhozFileok(tantargyID);
    if (fileok.length > 0) {
      fileok.forEach((file) => {
        console.log(file.FilePath);
        fs.unlinkSync(file.FilePath);
      });
    }
    await tantargydb.deleteTantargy(tantargyID);
    const siker = 'Tantargy deleted successfully';
    res.json(siker);
  } catch (err) {
    const uzenet = `Sikertelen torles: ${err}`;
    console.log(uzenet);
    res.status(500).json(uzenet);
  }
});

export default router;
