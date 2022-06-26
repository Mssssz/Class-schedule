import jwt from 'jsonwebtoken';
import secret from '../config.js';

export function checkJwtCookie(req, res, next) {
  console.log('checkJwt');
  if (req.cookies.suti) {
    res.locals.jwt = req.cookies.suti;
  }
  next();
}

export function validateJwtCookie(req, res, next) {
  console.log('vlidateJwtCookie');
  if (!res.locals.jwt) {
    res.status(401);
    res.render('nemVagyBejelentkezve');
    return;
  }

  try {
    const payload = jwt.verify(res.locals.jwt, secret);
    res.locals.payload = payload;
    next();
  } catch (err) {
    res.clearCookie('suti');
    res.status(401);
    res.send('no');
  }
}

export function validateJwtCookieAdmin(req, res, next) {
  console.log('vlidateJwtCookie');
  if (!res.locals.jwt) {
    res.status(401);
    res.render('nemVagyBejelentkezve');
    return;
  }

  try {
    const payload = jwt.verify(res.locals.jwt, secret);
    res.locals.payload = payload;
    if (payload.role === 'admin') {
      next();
    } else {
      res.status(401);
      res.render('nincsJogod');
    }
  } catch (err) {
    res.clearCookie('suti');
    res.status(401);
    res.send('no');
  }
}
