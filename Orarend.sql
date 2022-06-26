drop database if exists orarend;
create database if not exists orarend;

USE orarend;
-- CREATE user 'orarend'@'localhost' IDENTIFIED BY 'NagyonErosKod123';
-- GRANT ALL PRIVILEGES ON *.* TO 'orarend'@'localhost';

create table if not exists Tantargy
(
	TantargyID int not null unique,
    TantargyNev varchar(300) not null,
    Evfolyam int not null,
    Kurzus int not null,
    Szeminarium int not null,
    Labor int not null,
    primary key (TantargyID)
);

create table if not exists Felhasznalo
(
	FelhasznaloID int not null unique,
    Jelszo varchar(300) not null,
    Szerepkor varchar(50) not null,
    primary key (FelhasznaloID)
);

create table if not exists Jelentkezes
(
	TantargyID int not null,
    FelhasznaloID int not null,
    primary key (TantargyID, FelhasznaloID),
    foreign key (TantargyID) references Tantargy(TantargyID) ON DELETE CASCADE,
    foreign key (FelhasznaloID) references Felhasznalo(FelhasznaloID) ON DELETE CASCADE
);

create table if not exists Fileok
(
	FileID int not null unique AUTO_INCREMENT,
    TantargyID int not null,
    FileNeve varchar(300) not null,
    FilePath VARCHAR(500) NOT NULL,
    primary key (FileID),
    foreign key (TantargyID) references Tantargy(TantargyID) ON DELETE CASCADE
);

create table if not exists Orak
(
	OraID INT NOT NULL UNIQUE AUTO_INCREMENT,
    TantargyID INT NOT NULL,
    OraTipus VARCHAR(30) NOT NULL,
    Mettol TIME NOT NULL,
    Meddig TIME NOT NULL,
    Nap INT NOT NULL,
    primary key (OraID),
    foreign key (TantargyID) references Tantargy(TantargyID) ON DELETE CASCADE
);

create table if not exists Keresek
(
	KeresID INT NOT NULL UNIQUE AUTO_INCREMENT,
    TantargyNev VARCHAR(300) NOT NULL,
    FelhasznaloID INT NOT NULL,
    Legyen INT NOT NULL,
    Mettol TIME NOT NULL,
    Meddig TIME NOT NULL,
    Nap INT NOT NULL,
    Allapot INT NOT NULL,
    primary key (KeresID),
    foreign key (FelhasznaloID) references Felhasznalo(FelhasznaloID) ON DELETE CASCADE
);
