/*
  Warnings:

  - You are about to drop the column `name` on the `category` table. All the data in the column will be lost.
  - You are about to drop the `_producttocategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `producttocategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_name` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_producttocategory` DROP FOREIGN KEY `_producttocategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_producttocategory` DROP FOREIGN KEY `_producttocategory_B_fkey`;

-- DropForeignKey
ALTER TABLE `productcolor` DROP FOREIGN KEY `ProductColor_productId_fkey`;

-- DropForeignKey
ALTER TABLE `productsize` DROP FOREIGN KEY `ProductSize_productId_fkey`;

-- DropForeignKey
ALTER TABLE `producttocategory` DROP FOREIGN KEY `ProductToCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `producttocategory` DROP FOREIGN KEY `ProductToCategory_productId_fkey`;

-- DropIndex
DROP INDEX `Category_name_key` ON `category`;

-- DropIndex
DROP INDEX `ProductColor_color_name_key` ON `productcolor`;

-- DropIndex
DROP INDEX `ProductColor_productId_fkey` ON `productcolor`;

-- DropIndex
DROP INDEX `ProductSize_productId_fkey` ON `productsize`;

-- DropIndex
DROP INDEX `ProductSize_size_name_key` ON `productsize`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `name`,
    ADD COLUMN `category_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `_producttocategory`;

-- DropTable
DROP TABLE `producttocategory`;

-- CreateTable
CREATE TABLE `productcategory` (
    `productId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ProductCategory_categoryId_fkey`(`categoryId`),
    PRIMARY KEY (`productId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productcategory` ADD CONSTRAINT `ProductCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productcategory` ADD CONSTRAINT `ProductCategory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;
