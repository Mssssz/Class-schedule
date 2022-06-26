import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as felhasznalodb from '../db/felhasznalo.js';
import secret from '../config.js';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Login');
  res.render('login');
});

router.post('/loginForm', async (req, res) => {
  try {
    let hiba;
    const felhasznalo = req.body.diakID;
    const jelszo = await felhasznalodb.getPasswordAndRole(req.body.diakID);
    if (jelszo.length > 0) {
      if (bcrypt.compare(req.body.jelszo, jelszo[0].Jelszo)) {
        const role = jelszo[0].Szerepkor;
        const cookie = jwt.sign({ felhasznalo, role }, secret);
        res.cookie('suti', cookie, { httpOnly: true, sameSite: 'strict' });
        hiba = false;
      } else {
        hiba = true;
        console.log('Passwords do not match');
      }
    } else {
      hiba = true;
    }
    res.render('login', { hiba });
  } catch (error) {
    console.log(`loginform catch ${error}`);
    console.error(`Error occurred: ${error.message}`);
    res.status(500).write(error);
  }
});

router.use('/logout', (req, res) => {
  if (req.cookies.suti) {
    res.clearCookie('suti');
  }
  res.redirect('/');
});

export default router;
