import { Request, Response } from "express";
import prisma from "../../../prisma/init";

export const populateRestauarnt = async (req: Request, res: Response) => {
  await prisma.restaurant.deleteMany({});
  await prisma.location.deleteMany({});
  await prisma.menu.deleteMany({});
  await prisma.location.createMany({
    data: [
      //10 random latitudes and longitudes
      {
        address: "123 Main Street",
        latitude: "43.6532",
        longitude: "-79.3832",
      },
      {
        address: "456 King Street",
        latitude: "43.6532",
        longitude: "-79.3832",
      },
      {
        address: "789 Queen Street",
        latitude: "43.6532",
        longitude: "-79.3832",
      },
    ],
  });

  const location = await prisma.location.findMany();
  const sakaLocationId = location[0].id;
  const martosLocationId = location[1].id;
  const sushiLocationId = location[2].id;
  await prisma.restaurant
    .createMany({
      data: [
        {
          name: "Saka Pizza",

          photo:
            "https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg",
          locationId: sakaLocationId,
        },
        {
          name: "Martos Burger",

          photo:
            "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
          locationId: martosLocationId,
        },
        {
          name: "Sushi Sushi",

          photo:
            "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
          locationId: sushiLocationId,
        },
      ],
    })
    .then((e) => {
      console.log(e);
    })
    .catch((e) => {
      console.log(e);
    });
  const restuarant = await prisma.restaurant.findMany();
  const sakaRestaurantId = restuarant[0].id;
  const martosRestaurantId = restuarant[1].id;
  const sushiRestaurantId = restuarant[2].id;
  await prisma.menu.createMany({
    data: [
      {
        name: "Pizza",
        price: 10,
        photo:
          "https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg",
        restaurantId: sakaRestaurantId,
      },
      {
        name: "Burger",
        price: 10,
        photo:
          "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
        restaurantId: martosRestaurantId,
      },
      {
        name: "Sushi",
        price: 10,
        photo:
          "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
        restaurantId: sushiRestaurantId,
      },
    ],
  });
  res.status(200).json({ name: "done" });
};
