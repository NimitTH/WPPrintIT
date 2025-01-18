-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `additional_text` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `received_date` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `screenedimages` (
    `screened_image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `screened_image_url` VARCHAR(191) NULL,
    `cartitemId` INTEGER NULL,

    PRIMARY KEY (`screened_image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `screenedimages` ADD CONSTRAINT `ScreenedImage_cartitemId_fkey` FOREIGN KEY (`cartitemId`) REFERENCES `cartitem`(`cart_item_id`) ON DELETE CASCADE ON UPDATE CASCADE;
