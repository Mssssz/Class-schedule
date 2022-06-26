import dbConnection from './connection.js';

export const insertKeres = async (
  tantargyNev,
  felhasznaloID,
  legyen,
  mettol,
  meddig,
  nap,
  allapot,
) => {
  console.log('BESZURTAM Keres');
  console.log(felhasznaloID);
  return dbConnection.executeQuery(`INSERT INTO orarend.Keresek (TantargyNev, FelhasznaloID, Legyen, Mettol, Meddig, Nap, Allapot) VALUES
  (?, ?, ?, ?, ?, ?, ?)`, [tantargyNev, felhasznaloID, legyen, mettol, meddig, nap, allapot]);
};

export const deleteKeres = async (keresID) => {
  const query = 'DELETE FROM orarend.Keresek WHERE KeresID = ?';
  return dbConnection.executeQuery(query, [keresID]);
};

export const findAllKeres = async () => {
  console.log('KIIROM Keres');
  const query = 'SELECT * FROM orarend.Keresek';
  return dbConnection.executeQuery(query);
};

export const findKeresTanarhoz = async (felhasznaloID) => {
  console.log('KIIROM Keres');
  const query = 'SELECT * FROM orarend.Keresek WHERE orarend.Keresek.FelhasznaloID = ?';
  return dbConnection.executeQuery(query, [felhasznaloID]);
};

export const updateKeresAllapot = async (felhasznaloID, allapot) => {
  console.log('Update Keres');
  const query = 'UPDATE orarend.Keresek SET Allapot = ? WHERE KeresID = ?';
  return dbConnection.executeQuery(query, [allapot, felhasznaloID]);
};
