import { Request, Response } from "express";
import prisma from "../../../../lib/prisma/init";

export const populateRestaurant = async (req: Request, res: Response) => {
 
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

  // create an array of restaurant objects with the desired properties
  const restaurants = [];
  for (let i = 0; i < 4000; i++) {
    const restaurant = {
      name: `Restaurant ${i + 1}`,
      photo:
        "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
      locationId: i % 3 === 0 ? sakaLocationId : i % 3 === 1 ? martosLocationId : sushiLocationId,
    };
    restaurants.push(restaurant);
  }

  await prisma.restaurant
    .createMany({
      data: restaurants,
    })
    .then((e) => {
      console.log(e);
    })
    .catch((e) => {
      console.log(e);
    });

  const restuarant = await prisma.restaurant.findMany();
  const restaurantIds = restuarant.map(r => r.id);

  // create an array of menu objects with the desired properties
  const menus = [];
  for (let i = 0; i < restaurantIds.length; i++) {
    const menu = {
      name: `Menu ${i + 1}`,
      price: 10,
      photo:
        "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
      restaurantId: restaurantIds[i],
    };
    menus.push(menu);
  }

  await prisma.menu.createMany({
    data: menus,
  });

  res.status(200).json({ message: "done" });
};
