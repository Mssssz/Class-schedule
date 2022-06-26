import express from 'express';
import * as tantargydb from '../db/tantargy.js';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Sajat tantargyak oldal');
  try {
    console.log(res.locals.payload.felhasznalo);
    const tantargyak = await tantargydb.findTantargyTanarhoz(res.locals.payload.felhasznalo);
    res.render('sajatTantargyak', { tantargyak });
  } catch (err) {
    console.log(`Sajat tantargyak oldal catch ${err}`);
    res.status(500).render('error', { message: `Selection unsuccessful: ${err}` });
  }
});

export default router;
