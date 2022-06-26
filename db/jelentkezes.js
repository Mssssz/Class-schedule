import dbConnection from './connection.js';

export const existsJelentkezes = async (tantargy, felhasznalo) => {
  const query = `SELECT * FROM orarend.Jelentkezes
    WHERE Jelentkezes.TantargyID = ? and Jelentkezes.FelhasznaloID = ?`;
  const jelentkezes = await dbConnection.executeQuery(query, [tantargy, felhasznalo]);
  return jelentkezes.length > 0;
};

export const deleteJelentkezes = async (felhasznalo, tantargy) => {
  console.log('BESZURTAM jelentkezes');
  return dbConnection.executeQuery(`DELETE FROM orarend.Jelentkezes 
  WHERE ? = orarend.Jelentkezes.FelhasznaloId AND ? = orarend.Jelentkezes.TantargyId `, [felhasznalo, tantargy]);
};

export const insertJelentkezes = async (felhasznalo, tantargy) => {
  console.log('BESZURTAM jelentkezes');
  return dbConnection.executeQuery(`INSERT INTO orarend.Jelentkezes VALUES
  (?, ?)`, [tantargy, felhasznalo]);
};

export const getSzerepkor = async (tantargy, felhasznalo) => {
  console.log('Felhasznalo szerepkorenek lekerese az adott tantargyhoz');
  const query = 'SELECT Szerepkor FROM orarend.Jelentkezes WHERE orarend.Jelentkezes.TantargyID = ? AND orarend.Jelentkezes.FelhasznaloID = ?';
  return dbConnection.executeQuery(query, [tantargy, felhasznalo]);
};
