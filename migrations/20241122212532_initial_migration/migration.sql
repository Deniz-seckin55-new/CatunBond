-- CreateTable
CREATE TABLE "User" (
    "userId" STRING NOT NULL,
    "username" STRING NOT NULL,
    "avatarUrl" STRING NOT NULL,
    "serverIds" INT4[],
    "friends" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Servers" (
    "serverId" INT4 NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Servers_serverId_key" ON "Servers"("serverId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_serverIds_fkey" FOREIGN KEY ("serverIds") REFERENCES "Servers"("serverId") ON DELETE RESTRICT ON UPDATE CASCADE;
