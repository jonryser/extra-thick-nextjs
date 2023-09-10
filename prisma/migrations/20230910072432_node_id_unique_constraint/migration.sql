/*
  Warnings:

  - You are about to drop the column `nodeId` on the `EventRecordId` table. All the data in the column will be lost.
  - You are about to drop the column `nodeId` on the `TodoDataType` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[node_id]` on the table `EventRecordId` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[node_id]` on the table `TodoDataType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `node_id` to the `EventRecordId` table without a default value. This is not possible if the table is not empty.
  - Added the required column `node_id` to the `TodoDataType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Account` MODIFY `refresh_token` TEXT NULL,
    MODIFY `access_token` TEXT NULL,
    MODIFY `id_token` TEXT NULL;

-- AlterTable
ALTER TABLE `EventRecordId` DROP COLUMN `nodeId`,
    ADD COLUMN `node_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `TodoDataType` DROP COLUMN `nodeId`,
    ADD COLUMN `node_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `EventRecordId_node_id_key` ON `EventRecordId`(`node_id`);

-- CreateIndex
CREATE UNIQUE INDEX `TodoDataType_node_id_key` ON `TodoDataType`(`node_id`);

-- AddForeignKey
ALTER TABLE `TodoDataType` ADD CONSTRAINT `TodoDataType_node_id_fkey` FOREIGN KEY (`node_id`) REFERENCES `Todo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventRecordId` ADD CONSTRAINT `EventRecordId_node_id_fkey` FOREIGN KEY (`node_id`) REFERENCES `EventLog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
