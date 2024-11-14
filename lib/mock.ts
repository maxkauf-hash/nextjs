import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const generateMockData = async () => {
  // Génération de produits
  const products = [];
  for (let i = 0; i < 10; i++) {
    const product = await prisma.products.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        photo: faker.image.url(),
        quantity: faker.number.int({ min: 1, max: 100 }),
      },
    });
    products.push(product);
  }

  // Génération d'utilisateurs
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.users.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "user",
        address: faker.address.streetAddress(),
        zip: faker.address.zipCode(),
        city: faker.address.city(),
        phone: faker.phone.number(),
      },
    });
    users.push(user);
  }

  // Génération de commandes et de détails des commandes
  for (const user of users) {
    for (let i = 0; i < 2; i++) {
      const order = await prisma.orders.create({
        data: {
          userId: user.id,
          totalAmount: parseFloat(
            faker.commerce.price({ min: 100, max: 1000 })
          ),
          creationTimestamp: faker.date.recent(),
          status: "not payed",
        },
      });

      // Génération de détails de commande pour chaque commande
      for (let j = 0; j < 3; j++) {
        const randomProduct =
          products[Math.floor(Math.random() * products.length)];
        await prisma.orderDetails.create({
          data: {
            orderId: order.id,
            productId: randomProduct.id,
            quantity: faker.number.int({ min: 1, max: 5 }),
            total: randomProduct.price * faker.number.int({ min: 1, max: 5 }),
          },
        });
      }
    }
  }

  console.log("Mock data generated successfully.");
};

generateMockData()
  .catch((e) => {
    console.error("Error generating mock data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
