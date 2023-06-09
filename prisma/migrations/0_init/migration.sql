-- CreateTable
CREATE TABLE `PRODUKT` (
    `id_produktu` INTEGER NOT NULL AUTO_INCREMENT,
    `nazwa` VARCHAR(100) NOT NULL,
    `opis` MEDIUMTEXT NULL,
    `producent` VARCHAR(100) NOT NULL,
    `sklad` MEDIUMTEXT NULL,
    `cena` FLOAT NOT NULL,

    PRIMARY KEY (`id_produktu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RECENZJE` (
    `id_recenzji` INTEGER NOT NULL AUTO_INCREMENT,
    `recenzja` VARCHAR(500) NOT NULL,
    `ocena_ogolna` INTEGER NOT NULL,
    `id_produktu` INTEGER NOT NULL,
    `id_usera` INTEGER NOT NULL,

    PRIMARY KEY (`id_recenzji`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `USER` (
    `id_usera` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(50) NOT NULL,
    `haslo` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `imie` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `USER_email_key`(`email`),
    PRIMARY KEY (`id_usera`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

