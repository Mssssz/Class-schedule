import dbConnection from './connection.js';

export const insertAdmin = async () => {
  console.log('BESZURTAM admin');
  await dbConnection.executeQuery(`INSERT IGNORE INTO orarend.Felhasznalo VALUES
  ('1','$2b$10$LhT5jiamo.rNbEqwSWoRc.FzRbF3i7.z2xKGwGX9O1VaObjwiZ7Rm','admin')`);
};

export default insertAdmin;
