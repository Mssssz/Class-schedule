import express from 'express';
import * as orakdb from '../db/orak.js';
import * as tantargydb from '../db/tantargy.js';
import * as keresekdb from '../db/keresek.js';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Sajat orearend oldal');
  try {
    const keresek = await keresekdb.findKeresTanarhoz(res.locals.payload.felhasznalo);
    const orak = await orakdb.findOraTanarhoz(res.locals.payload.felhasznalo);
    const tantargyak = await tantargydb.findTantargyTanarhoz(res.locals.payload.felhasznalo);
    res.render('sajatOrarend', {
      orak, tantargyak, keresek,
    });
  } catch (err) {
    console.log(`Sajat orearend oldal catch ${err}`);
    res.status(500).render('error', { message: `Selection unsuccessful: ${err}` });
  }
});

router.get('/orakTanarhoz', async (req, res) => {
  console.log('Orak tanarhoz');
  try {
    const felhasznaloID = req.query.felhasznalo;
    console.log(felhasznaloID);
    const path = await orakdb.findOraTanarhoz(felhasznaloID);
    res.json(path);
  } catch (err) {
    const uzenet = `Sikertelen lekerdezes: ${err}`;
    console.log(uzenet);
    res.status(500).json(uzenet);
  }
});

router.post('/keres', async (req, res) => {
  console.log('Keres beszurasa oldal');
  try {
    const mettolp = parseInt(req.body.mettol, 10);
    const meddigp = parseInt(req.body.meddig, 10);
    let hiba = true;
    if (mettolp < meddigp) {
      hiba = false;
      const legyenbool = Boolean(req.body.legyen);
      let legyen = 0;
      if (legyenbool) {
        legyen = 1;
      }
      await keresekdb.insertKeres(
        req.body.tantargy,
        req.body.felhasznaloID,
        legyen,
        req.body.mettol,
        req.body.meddig,
        req.body.nap,
        2,
      );
    }
    const keresek = await keresekdb.findKeresTanarhoz(res.locals.payload.felhasznalo);
    const orak = await orakdb.findOraTanarhoz(res.locals.payload.felhasznalo);
    const tantargyak = await tantargydb.findTantargyTanarhoz(res.locals.payload.felhasznalo);
    res.render('sajatOrarend', {
      orak, tantargyak, keresek, hiba,
    });
  } catch (err) {
    console.log(`Keres beszurasa catch ${err}`);
    res.status(500).render('error', { message: `Selection unsuccessful: ${err}` });
  }
});

router.post('/keresTorles', async (req, res) => {
  console.log('Keres delete');
  try {
    const KeresID = req.query.keres;
    console.log(KeresID);
    await keresekdb.deleteKeres(KeresID);
    const siker = 'File deleted successfully';
    res.json(siker);
  } catch (err) {
    const uzenet = `Sikertelen torles: ${err}`;
    console.log(uzenet);
    res.status(500).json(uzenet);
  }
});

export default router;
