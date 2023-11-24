/*
  Warnings:

  - Added the required column `token_hash` to the `UserToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserToken" ADD COLUMN     "token_hash" TEXT NOT NULL;
