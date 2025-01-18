-- CreateTable
CREATE TABLE `_productcategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_productcategory_AB_unique`(`A`, `B`),
    INDEX `_productcategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_productcategory` ADD CONSTRAINT `_productcategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `category`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_productcategory` ADD CONSTRAINT `_productcategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;
