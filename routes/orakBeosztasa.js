import express from 'express';
import * as orakdb from '../db/orak.js';
import * as tanatrgydb from '../db/tantargy.js';
import * as keresekdb from '../db/keresek.js';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Ora beosztas oldal');
  try {
    const keresek = await keresekdb.findAllKeres();
    const orak = await orakdb.findAllOra();
    res.render('orakBeosztasa', { orak, keresek });
  } catch (err) {
    console.log(`Ora beosztas catch ${err}`);
    res.status(500).render('error', { message: `Selection unsuccessful: ${err}` });
  }
});

router.get('/tantargyak', async (req, res) => {
  console.log('Find all tantargy');
  try {
    const tanargyak = await tanatrgydb.findAllTantargy();
    res.json(tanargyak);
  } catch (err) {
    const uzenet = `Sikertelen lekerdezes: ${err}`;
    console.log(uzenet);
    res.status(500).json(uzenet);
  }
});

router.get('/orak', async (req, res) => {
  console.log('Find all ora');
  try {
    const orak = await orakdb.findAllOra();
    res.json(orak);
  } catch (err) {
    const uzenet = `Sikertelen lekerdezes: ${err}`;
    console.log(uzenet);
    res.status(500).json(uzenet);
  }
});

router.post('/ujOra', async (req, res) => {
  console.log('Ora beszuras oldal');
  try {
    let mettolp = parseInt(req.body.mettol, 10);
    mettolp += parseInt(req.body.oraHossz, 10);
    const meddig = `${mettolp}:00:00`;
    await orakdb.insertOra(
      req.body.tantargy,
      req.body.oraTipus,
      req.body.mettol,
      meddig,
      req.body.nap,
    );
    const keresek = await keresekdb.findAllKeres();
    const orak = await orakdb.findAllOra();
    res.render('orakBeosztasa', { orak, keresek });
  } catch (err) {
    console.log(`Ora beszuras catch ${err}`);
    res.status(500).render('error', { message: `Selection unsuccessful: ${err}` });
  }
});

router.post('/modositAllapot', async (req, res) => {
  console.log('Keres update');
  try {
    const KeresID = req.query.keres;
    console.log(KeresID);
    await keresekdb.updateKeresAllapot(KeresID, req.query.allapot);
    const siker = 'File deleted successfully';
    res.json(siker);
  } catch (err) {
    const uzenet = `Sikertelen torles: ${err}`;
    console.log(uzenet);
    res.status(500).json(uzenet);
  }
});

export default router;
