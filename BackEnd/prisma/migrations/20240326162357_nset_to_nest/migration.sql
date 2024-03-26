/*
  Warnings:

  - You are about to drop the `Nset` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Nset";

-- CreateTable
CREATE TABLE "Nest" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "long" DOUBLE PRECISION,
    "bedroom" INTEGER NOT NULL,
    "bathroom" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "rent" DOUBLE PRECISION NOT NULL,
    "bachelor" BOOLEAN NOT NULL,
    "furnished" BOOLEAN,
    "ac" BOOLEAN,
    "oven" BOOLEAN,
    "fridge" BOOLEAN,
    "heater" BOOLEAN,
    "geyser" BOOLEAN,
    "petDog" BOOLEAN,
    "petCat" BOOLEAN,
    "gas" "GasType" NOT NULL,
    "electricity" BOOLEAN,
    "water" BOOLEAN,
    "securityDeposit" DOUBLE PRECISION,
    "otherRestrictions" TEXT,
    "lift" BOOLEAN,
    "serviceCharge" INTEGER NOT NULL,

    CONSTRAINT "Nest_pkey" PRIMARY KEY ("id")
);
