/*
  Warnings:

  - You are about to drop the column `additional_text` on the `cartitem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cartitem` DROP COLUMN `additional_text`,
    ADD COLUMN `additional` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `additional` VARCHAR(191) NULL;
