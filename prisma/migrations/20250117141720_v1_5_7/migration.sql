-- CreateTable
CREATE TABLE `orderscreenedimages` (
    `screened_image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `screened_image_url` VARCHAR(191) NULL,
    `orderItemId` INTEGER NULL,

    INDEX `OrderScreenedImage_orderItemId_fkey`(`orderItemId`),
    PRIMARY KEY (`screened_image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orderscreenedimages` ADD CONSTRAINT `OrderScreenedImage_orderItemId_fkey` FOREIGN KEY (`orderItemId`) REFERENCES `orderitem`(`order_item_id`) ON DELETE CASCADE ON UPDATE CASCADE;
