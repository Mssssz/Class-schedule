import express from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import * as filedb from '../db/file.js';
import * as jeletkezesdb from '../db/jelentkezes.js';
import secret from '../config.js';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Reszletek push');
  try {
    // console.log(req.query.tantargy);
    const TantargyID = req.query.tantargy;
    const reszletek = await filedb.findTantargyhozFileok(TantargyID);
    if (res.locals.jwt) {
      const payload = jwt.verify(res.locals.jwt, secret);
      let felhasz = payload.felhasznalo;
      console.log(`felhasznalo: ${felhasz}`);
      if (payload.role === 'tanar') {
        if (!await jeletkezesdb.existsJelentkezes(TantargyID, felhasz)) {
          felhasz = '';
        }
      }
      res.render('tantargyReszletei', { reszletek, TantargyID, felhasz });
    } else {
      const felhasz = '';
      res.render('tantargyReszletei', { reszletek, TantargyID, felhasz });
    }
  } catch (err) {
    console.log(`tantargyReszletek catch ${err}`);
    res.status(500).render('error', { message: `Selection unsuccessful: ${err}` });
  }
});

router.post('/fileFeltoltesForm', async (req, res) => {
  try {
    console.log('Reszletek form');
    await filedb.insertFile(
      req.fields.tantargyID,
      req.files.allomany.name,
      req.files.allomany.path,
    );
    const fel = true;
    console.log('insert utan');
    const TantargyID = req.fields.tantargyID;
    const reszletek = await filedb.findTantargyhozFileok(TantargyID);
    const payload = jwt.verify(res.locals.jwt, secret);
    const felhasz = payload.felhasznalo;
    res.render('tantargyReszletei', {
      reszletek, fel, TantargyID, felhasz,
    });
  } catch (error) {
    console.log(`Reszletek form ${error}`);
    console.error(`Error occurred: ${error.message}`);
    res.status(500).write(error);
  }
});

router.post('/fileok', async (req, res) => {
  console.log('Reszletek delete');
  try {
    const FileID = req.query.file;
    console.log(FileID);
    const path = await filedb.getFilePath(FileID);
    await filedb.deleteFile(FileID);
    fs.unlinkSync(path[0].FilePath);
    const siker = 'File deleted successfully';
    res.json(siker);
  } catch (err) {
    const uzenet = `Sikertelen torles: ${err}`;
    console.log(uzenet);
    res.status(500).json(uzenet);
  }
});

export default router;
