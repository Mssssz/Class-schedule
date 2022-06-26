import dbConnection from './connection.js';

export const insertFile = async (tantargyID, name, path) => {
  console.log('BESZURTAM file');
  return dbConnection.executeQuery(`INSERT INTO orarend.Fileok (TantargyID, FileNeve, FilePath) VALUES
  (?, ?, ?)`, [tantargyID, name, path]);
};

export const findTantargyhozFileok = async (tantargyID) => {
  const query = `SELECT orarend.Fileok.TantargyID, orarend.Fileok.FileID, orarend.Fileok.FileNeve, orarend.Fileok.FilePath, orarend.Fileok.FileID FROM orarend.Fileok
    join Tantargy on Fileok.TantargyID = Tantargy.TantargyID
    WHERE orarend.Tantargy.TantargyID = ?`;
  return dbConnection.executeQuery(query, [tantargyID]);
};

export const deleteFile = async (FileID) => {
  const query = 'DELETE FROM orarend.Fileok WHERE ? = orarend.Fileok.FileID';
  return dbConnection.executeQuery(query, [FileID]);
};

export const getFilePath = async (FileID) => {
  const query = 'SELECT orarend.Fileok.FilePath FROM orarend.Fileok WHERE ? = orarend.Fileok.FileID';
  return dbConnection.executeQuery(query, [FileID]);
};
