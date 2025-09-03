-- CreateEnum
CREATE TYPE "public"."FriendRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'CANCELED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "public"."ChannelType" AS ENUM ('TEXT', 'DIRECTMESSAGE');

-- CreateEnum
CREATE TYPE "public"."MutedInType" AS ENUM ('SERVER', 'CHANNEl');

-- CreateEnum
CREATE TYPE "public"."MuteType" AS ENUM ('FINITE', 'INFINITE');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "blocked" TEXT[],
    "voiceChatChannelId" TEXT,
    "variables" JSONB NOT NULL DEFAULT '{"channelFontSize": 16, "appFontSize": 36, "defaultZoomFactor": 2, "magnifyingGlassOnPreviews": true, "showUsernamesUnderAvatarsInVoiceChats": false}',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "emojiName" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FriendRequest" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" "public"."FriendRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Server" (
    "id" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "invites" TEXT[],

    CONSTRAINT "Server_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServerInfo" (
    "serverId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "maxUsers" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slogan" TEXT,
    "rules" TEXT[],

    CONSTRAINT "ServerInfo_pkey" PRIMARY KEY ("serverId")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Channel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channelType" "public"."ChannelType" NOT NULL DEFAULT 'TEXT',
    "categoryId" TEXT,
    "index" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChannelInfo" (
    "channelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."ChannelType" NOT NULL,
    "description" TEXT NOT NULL,
    "slowMode" INTEGER NOT NULL DEFAULT 0,
    "readOnly" BOOLEAN NOT NULL DEFAULT false,
    "nsfw" BOOLEAN NOT NULL DEFAULT false,
    "pinnedMessages" TEXT[],

    CONSTRAINT "ChannelInfo_pkey" PRIMARY KEY ("channelId")
);

-- CreateTable
CREATE TABLE "public"."Auth" (
    "userId" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "public"."Messages" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "repliedToId" TEXT,
    "attachments" JSONB,
    "mentions" TEXT[],

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserNote" (
    "userId" TEXT NOT NULL,
    "otherUserId" TEXT NOT NULL,
    "note" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "public"."UserInfo" (
    "userId" TEXT NOT NULL,
    "biography" TEXT NOT NULL,
    "usernameColor" TEXT NOT NULL DEFAULT '#000D1E',
    "mainLink" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."ServerListOrderElement" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "userInfoUserId" TEXT,

    CONSTRAINT "ServerListOrderElement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VoiceChat" (
    "channelId" TEXT NOT NULL,
    "serverId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VoiceChat_pkey" PRIMARY KEY ("channelId")
);

-- CreateTable
CREATE TABLE "public"."UserMute" (
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "mutedIn" TEXT NOT NULL,
    "mutedInType" "public"."MutedInType" NOT NULL,
    "muteType" "public"."MuteType" NOT NULL,

    CONSTRAINT "UserMute_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."_UserFriends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserFriends_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_UserServers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserServers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_UserDirectMsgs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserDirectMsgs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "public"."User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Server_id_key" ON "public"."Server"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ServerInfo_serverId_key" ON "public"."ServerInfo"("serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "public"."Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_id_key" ON "public"."Channel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelInfo_channelId_key" ON "public"."ChannelInfo"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userId_key" ON "public"."Auth"("userId");

-- CreateIndex
CREATE INDEX "Messages_timestamp_idx" ON "public"."Messages"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "UserNote_userId_otherUserId_key" ON "public"."UserNote"("userId", "otherUserId");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_userId_key" ON "public"."UserInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VoiceChat_channelId_key" ON "public"."VoiceChat"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMute_userId_key" ON "public"."UserMute"("userId");

-- CreateIndex
CREATE INDEX "_UserFriends_B_index" ON "public"."_UserFriends"("B");

-- CreateIndex
CREATE INDEX "_UserServers_B_index" ON "public"."_UserServers"("B");

-- CreateIndex
CREATE INDEX "_UserDirectMsgs_B_index" ON "public"."_UserDirectMsgs"("B");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_voiceChatChannelId_fkey" FOREIGN KEY ("voiceChatChannelId") REFERENCES "public"."VoiceChat"("channelId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reaction" ADD CONSTRAINT "Reaction_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."Messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FriendRequest" ADD CONSTRAINT "FriendRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FriendRequest" ADD CONSTRAINT "FriendRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "public"."Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Channel" ADD CONSTRAINT "Channel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Messages" ADD CONSTRAINT "Messages_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Messages" ADD CONSTRAINT "Messages_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "public"."Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Messages" ADD CONSTRAINT "Messages_repliedToId_fkey" FOREIGN KEY ("repliedToId") REFERENCES "public"."Messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServerListOrderElement" ADD CONSTRAINT "ServerListOrderElement_userInfoUserId_fkey" FOREIGN KEY ("userInfoUserId") REFERENCES "public"."UserInfo"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserFriends" ADD CONSTRAINT "_UserFriends_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserFriends" ADD CONSTRAINT "_UserFriends_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserServers" ADD CONSTRAINT "_UserServers_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserServers" ADD CONSTRAINT "_UserServers_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserDirectMsgs" ADD CONSTRAINT "_UserDirectMsgs_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserDirectMsgs" ADD CONSTRAINT "_UserDirectMsgs_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
