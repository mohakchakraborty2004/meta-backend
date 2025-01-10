/*
  Warnings:

  - You are about to drop the column `height` on the `spaceElements` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `spaceElements` table. All the data in the column will be lost.
  - Added the required column `x` to the `spaceElements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `spaceElements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "spaceElements" DROP COLUMN "height",
DROP COLUMN "width",
ADD COLUMN     "x" INTEGER NOT NULL,
ADD COLUMN     "y" INTEGER NOT NULL;
