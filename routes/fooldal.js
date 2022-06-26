import express from 'express';
import jwt from 'jsonwebtoken';
import * as tantargydb from '../db/tantargy.js';
import * as filedb from '../db/file.js';
import secret from '../config.js';

const router = express.Router();

router.get(['/', '/index'], async (req, res) => {
  console.log('Alap oldal');
  try {
    if (res.locals.jwt) {
      const payload = jwt.verify(res.locals.jwt, secret);
      const felhasz = payload.felhasznalo;
      const szerepkor = payload.role;
      const tantargyak = await tantargydb.findAllTantargy();
      res.render('tantargyak', { tantargyak, felhasz, szerepkor });
    } else {
      const felhasz = '';
      const szerepkor = '';
      const tantargyak = await tantargydb.findAllTantargy();
      res.render('tantargyak', { tantargyak, felhasz, szerepkor });
    }
  } catch (err) {
    console.log(`Alap oldal catch ${err}`);
    res.status(500).render('error', { message: `Selection unsuccessful: ${err}` });
  }
});

router.get('/fileok', async (req, res) => {
  console.log('Filok alap oldal');
  try {
    const TantargyID = req.query.tantargy;
    const reszletek = await filedb.findTantargyhozFileok(TantargyID);
    res.send(reszletek);
  } catch (err) {
    const uzenet = `Sikertelen select: ${err}`;
    console.log(uzenet);
    res.status(500).json(uzenet);
  }
});

export default router;
