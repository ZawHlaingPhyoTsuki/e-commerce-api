import { hashPassword } from "./../src/utils/auth.utils";
import { prisma } from "./../src/utils/prisma.server";
import { faker } from "@faker-js/faker";

async function main() {
  console.log("🌱 Seeding database...");

  // Create Categories
  const categories = await Promise.all(
    Array.from({ length: 5 }).map(() => {
      return prisma.category.create({
        data: {
          name: faker.commerce.department(),
          description: faker.lorem.sentence(),
        },
      });
    })
  );

  // Create Users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const password = "admin";
      const hashedPassword = await hashPassword(password);
      return prisma.user.create({
        data: {
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: hashedPassword,
          role: faker.helpers.arrayElement(["USER", "ADMIN"]),
        },
      });
    })
  );

  // Create Products
  const products = await Promise.all(
    Array.from({ length: 20 }).map(() => {
      return prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price()),
          stock: faker.number.int({ min: 10, max: 100 }),
          images: [faker.image.url(), faker.image.url()],
          categoryId: faker.helpers.arrayElement(categories).id,
        },
      });
    })
  );

  // Create Orders
  const orders = await Promise.all(
    users.map((user) => {
      return prisma.order.create({
        data: {
          userId: user.id,
          totalAmount: 0,
          status: "PENDING",
        },
      });
    })
  );

  // Create Order Items
  for (const order of orders) {
    let totalAmount = 0;
    const orderItems = await Promise.all(
      Array.from({ length: 3 }).map(() => {
        const product = faker.helpers.arrayElement(products);
        const quantity = faker.number.int({ min: 1, max: 5 });
        const price = product.price * quantity;
        totalAmount += price;

        return prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: product.id,
            quantity,
            price,
          },
        });
      })
    );

    // Update total order amount
    await prisma.order.update({
      where: { id: order.id },
      data: { totalAmount },
    });
  }

  // Create Cart Items
  await Promise.all(
    users.map((user) => {
      return prisma.cartItem.create({
        data: {
          userId: user.id,
          productId: faker.helpers.arrayElement(products).id,
          quantity: faker.number.int({ min: 1, max: 5 }),
        },
      });
    })
  );

  // Create Wishlist Items
  await Promise.all(
    users.map((user) => {
      return prisma.wishlistItem.create({
        data: {
          userId: user.id,
          productId: faker.helpers.arrayElement(products).id,
        },
      });
    })
  );

  // Create Reviews
  await Promise.all(
    Array.from({ length: 15 }).map(() => {
      return prisma.review.create({
        data: {
          userId: faker.helpers.arrayElement(users).id,
          productId: faker.helpers.arrayElement(products).id,
          rating: faker.number.int({ min: 1, max: 5 }),
          comment: faker.lorem.sentence(),
        },
      });
    })
  );

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
