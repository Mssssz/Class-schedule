import dbConnection from './connection.js';

export const insertTantargy = async (
  tantargyID,
  tantargyNev,
  evfolyam,
  kurzus,
  szeminarium,
  labor,
) => {
  console.log('BESZURTAM tantargy');
  console.log(tantargyID);
  return dbConnection.executeQuery(`INSERT INTO orarend.Tantargy VALUES
  (?, ?, ?, ?, ?, ?)`, [tantargyID, tantargyNev, evfolyam, kurzus, szeminarium, labor]);
};

export const deleteTantargy = async (tantargyID) => {
  const query = 'DELETE FROM orarend.Tantargy WHERE TantargyID = ?';
  return dbConnection.executeQuery(query, [tantargyID]);
};

export const existsTantargy = async (tantargyID) => {
  console.log('EXISTS TANTARGY');
  console.log(tantargyID);
  const query = 'SELECT TantargyID FROM orarend.Tantargy WHERE orarend.Tantargy.TantargyID = ? ';
  const tantargy = await dbConnection.executeQuery(query, [tantargyID]);
  return tantargy.length > 0;
};

export const findAllTantargy = async () => {
  console.log('KIIROM Tantargyak');
  const query = 'SELECT * FROM orarend.Tantargy';
  return dbConnection.executeQuery(query);
};

export const findTantargyTanarhoz = async (felhasznaloID) => {
  console.log('KIIROM Tantargyak');
  const query = `SELECT orarend.Tantargy.TantargyID, orarend.Tantargy.TantargyNev, orarend.Tantargy.Evfolyam, orarend.Tantargy.Kurzus, orarend.Tantargy.Szeminarium, orarend.Tantargy.Labor 
  FROM orarend.Tantargy 
  JOIN orarend.Jelentkezes ON orarend.Jelentkezes.TantargyID = orarend.Tantargy.TantargyID 
  WHERE orarend.Jelentkezes.FelhasznaloID = ?`;
  return dbConnection.executeQuery(query, [felhasznaloID]);
};
