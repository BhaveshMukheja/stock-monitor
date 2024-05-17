// declare global {
//     var prisma: PrismaClient; // This must be a `var` and not a `let / const`
//   }
  
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


module.exports = prisma;