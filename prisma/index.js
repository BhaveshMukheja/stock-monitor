// Setting up the prisma client 
  
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


module.exports = prisma;