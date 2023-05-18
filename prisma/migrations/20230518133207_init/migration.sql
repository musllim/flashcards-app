/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Card` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_creatorId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "creatorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
