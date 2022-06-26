// Márton Szilárd-Attila, 523/1, 08
import cookieParser from 'cookie-parser';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import { existsSync, mkdirSync } from 'fs';
import formidable from 'express-formidable-v2';
import errorMiddleware from './middleware/error.js';
import fooldalRoutes from './routes/fooldal.js';
import logRoutes from './routes/log.js';
import tantargyKarbantartasRoutes from './routes/tantargyKarbantartas.js';
import felhasznaloKarbantartasRoutesRoutes from './routes/felhasznaloKarbantartas.js';
import reszletekRoutes from './routes/reszletek.js';
import sajatTantargyakRoutes from './routes/sajatTantargyak.js';
import sajatOrarendRoutes from './routes/sajatOrarend.js';
import orakBeosztasaRoutes from './routes/orakBeosztasa.js';
import * as admin from './db/admin.js';
import { checkJwtCookie, validateJwtCookie, validateJwtCookieAdmin } from './middleware/validate.js';

const uploadDir = path.join(process.cwd(), 'uploadDir');
const staticDir = path.join(process.cwd(), 'static');

// feltöltési mappa elkészítése
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}

const app = express();

// a static mappából adjuk a HTML állományokat
app.use(express.static(staticDir));
// standard kérésfeldolgozással kapjuk a body tartalmát
app.use(express.urlencoded({ extended: true }));
// formidable-lel dolgozzuk fel a kéréseket
app.use(formidable({ uploadDir, keepExtensions: true }));

app.use(cookieParser());
app.use('/', checkJwtCookie);

// beállítjuk az EJS-t, mint sablonmotor
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
// naplózás (globális)
app.use(morgan('tiny'));
// kössük be a külső modulban megírt route-okat
app.use('/', fooldalRoutes);
app.use('/tantargyReszletei', reszletekRoutes);

app.use('/sajat', validateJwtCookie);
app.use('/sajat', sajatTantargyakRoutes);
app.use('/sajatOrarend', validateJwtCookie);
app.use('/sajatOrarend', sajatOrarendRoutes);
app.use('/login', logRoutes);
app.use('/tantargyKarbantartas', validateJwtCookieAdmin);
app.use('/tantargyKarbantartas', tantargyKarbantartasRoutes);
app.use('/felhasznaloKarbantartas', validateJwtCookieAdmin);
app.use('/felhasznaloKarbantartas', felhasznaloKarbantartasRoutesRoutes);
app.use('/orakBeosztasa', validateJwtCookieAdmin);
app.use('/orakBeosztasa', orakBeosztasaRoutes);

// utolsóként kössük be a hibaoldalkezelőt globálisan
app.use(errorMiddleware);

admin.insertAdmin().then(() => {
  app.listen(8080, () => { console.log('Server listening on http://localhost:8080/ ...'); });
});
