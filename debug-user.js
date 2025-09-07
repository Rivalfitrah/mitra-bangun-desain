// Debug script untuk melihat data user
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function debugUser() {
  try {
    console.log("=== Debugging User Data ===");

    // Ambil semua user dengan profil
    const users = await prisma.user.findMany({
      include: { profil: true },
    });

    console.log("Total users:", users.length);

    users.forEach((user, index) => {
      console.log(`\n--- User ${index + 1} ---`);
      console.log(`ID: ${user.id}`);
      console.log(`Name: ${user.name}`);
      console.log(`Email: ${user.email}`);
      console.log(`Status: ${user.status}`);
      console.log(`Has Profile: ${!!user.profil}`);
      if (user.profil) {
        console.log(`Profile Role: ${user.profil.role}`);
        console.log(`Profile Phone: ${user.profil.phone}`);
        console.log(`Profile Address: ${user.profil.alamat}`);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

debugUser();
