import dbConnection from './connection.js';

export const insertFelhasznalo = async (felhasznaloID, jelszo, role) => {
  console.log('BESZURTAM felhasznalo');
  return dbConnection.executeQuery(`INSERT INTO orarend.Felhasznalo VALUES
  (?, ?, ?)`, [felhasznaloID, jelszo, role]);
};

export const existsFelhaszanalo = async (felhasznaloID) => {
  const query = 'SELECT FelhasznaloID FROM orarend.Felhasznalo WHERE orarend.Felhasznalo.FelhasznaloID = ? ';
  const felhasznalo = await dbConnection.executeQuery(query, [felhasznaloID]);
  return felhasznalo.length > 0;
};

export const findAllFelhasznalo = async () => {
  console.log('KIIROM Felhasznalo');
  const query = 'SELECT * FROM orarend.Felhasznalo';
  return dbConnection.executeQuery(query);
};

export const getPasswordAndRole = async (felhasznaloID) => {
  const query = 'SELECT Jelszo, Szerepkor FROM orarend.Felhasznalo WHERE orarend.Felhasznalo.FelhasznaloID = ?';
  return dbConnection.executeQuery(query, [felhasznaloID]);
};

export const deleteFelhasznalo = async (felhasznaloID) => {
  const query = 'DELETE FROM orarend.Felhasznalo WHERE FelhasznaloID = ?';
  return dbConnection.executeQuery(query, [felhasznaloID]);
};
