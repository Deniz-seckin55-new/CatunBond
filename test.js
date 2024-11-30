const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const data = await prisma.user.findFirst({
        where: {
            userId: 'ccc2c28f-54de-4b78-a4d6-c5ecbe041ca5'
        }
    })

    console.log(data)
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })