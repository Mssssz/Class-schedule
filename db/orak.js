import dbConnection from './connection.js';

export const insertOra = async (
  tantargyID,
  oraTipusa,
  mettol,
  meddig,
  nap,
) => {
  console.log('BESZURTAM Ora');
  console.log(tantargyID);
  return dbConnection.executeQuery(`INSERT INTO orarend.Orak (TantargyID, OraTipus, Mettol, Meddig, Nap) VALUES
  (?, ?, ?, ?, ?)`, [tantargyID, oraTipusa, mettol, meddig, nap]);
};

export const deleteOra = async (oraID) => {
  const query = 'DELETE FROM orarend.Orak WHERE oraID = ?';
  return dbConnection.executeQuery(query, [oraID]);
};

export const findAllOra = async () => {
  console.log('KIIROM Orak');
  const query = `SELECT orarend.Tantargy.TantargyID, orarend.Tantargy.TantargyNev, orarend.Orak.OraID, orarend.Orak.OraTipus, orarend.Orak.Mettol, orarend.Orak.Meddig, orarend.Orak.Nap 
  FROM orarend.Orak 
  JOIN orarend.Tantargy ON orarend.Tantargy.TantargyID = orarend.Orak.TantargyID `;
  return dbConnection.executeQuery(query);
};

export const findOraTanarhoz = async (felhasznaloID) => {
  console.log('KIIROM Tantargyak');
  const query = `SELECT orarend.Tantargy.TantargyNev, orarend.Orak.OraID, orarend.Orak.OraTipus, orarend.Orak.Mettol, orarend.Orak.Meddig, orarend.Orak.Nap 
  FROM orarend.Orak 
  JOIN orarend.Tantargy ON orarend.Tantargy.TantargyID = orarend.Orak.TantargyID 
  JOIN orarend.Jelentkezes ON orarend.Jelentkezes.TantargyID = orarend.Tantargy.TantargyID
  WHERE orarend.Jelentkezes.FelhasznaloID = ?`;
  return dbConnection.executeQuery(query, [felhasznaloID]);
};
