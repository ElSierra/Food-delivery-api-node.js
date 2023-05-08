import { Request, Response } from "express";
import prisma from "../../../../lib/prisma/init";
import { getPlaiceholder } from "plaiceholder";
import slugify from "slugify";

const restaurantsImage = [
  "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1064136/pexels-photo-1064136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1115251/pexels-photo-1115251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2104568/pexels-photo-2104568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1064136/pexels-photo-1064136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1115251/pexels-photo-1115251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2104568/pexels-photo-2104568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1064136/pexels-photo-1064136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1115251/pexels-photo-1115251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2104568/pexels-photo-2104568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1064136/pexels-photo-1064136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1115251/pexels-photo-1115251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2104568/pexels-photo-2104568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1064136/pexels-photo-1064136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1115251/pexels-photo-1115251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2104568/pexels-photo-2104568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];
const restaurantsName = [
  "The Cheesecake Factory",
  "Olive Garden",
  "Red Lobster",
  "Outback Steakhouse",
  "Applebee's",
  "Chili's",
  "TGI Fridays",
  "Buffalo Wild Wings",
  "P.F. Chang's",
  "Maggiano's Little Italy",
  "Texas Roadhouse",
  "Longhorn Steakhouse",
  "Carrabba's Italian Grill",
  "Famous Dave's",
  "Cracker Barrel",
  "Denny's",
  "IHOP",
  "Perkins Restaurant & Bakery",
  "Bob Evans",
  "Golden Corral",
  "The Capital Grille",
  "Ruth's Chris Steak House",
  "Fogo de Chão",
  "Morton's The Steakhouse",
  "The Melting Pot",
  "Benihana",
  "Sushi Roku",
  "Nobu",
  "P.F. Chang's",
  "Mastro's Restaurants",
  "Roka Akor",
  "Fleming's Prime Steakhouse & Wine Bar",
  "Eddie V's Prime Seafood",
  "McCormick & Schmick's",
  "Bonefish Grill",
  "Bahama Breeze",
  "Yard House",
  "The Cheesecake Factory",
  "Bubba Gump Shrimp Co.",
  "Rainforest Cafe",
  "Hard Rock Cafe",
  "Planet Hollywood",
  "Gordon Ramsay Steak",
  "Bobby Flay Steak",
  "Emeril's New Orleans Fish House",
  "Guy Fieri's Vegas Kitchen & Bar",
  "Giada",
  "Joel Robuchon",
  "Robuchon au Dôme",
  "Le Louis XV",
  "Le Jules Verne",
  "L'Atelier de Joel Robuchon",
  "Nusr-Et Steakhouse",
  "Zuma",
  "Nobu",
  "Matsuhisa",
  "Sushisamba",
  "Uchi",
  "Momofuku Ko",
  "Eleven Madison Park",
  "Alinea",
  "The French Laundry",
  "Osteria Francescana",
  "El Celler de Can Roca",
  "Mirazur",
];

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
      {
        address: "111 Yonge Street",
        latitude: "43.6492",
        longitude: "-79.3767",
      },
      {
        address: "222 Bay Street",
        latitude: "43.6472",
        longitude: "-79.3802",
      },
      {
        address: "333 University Avenue",
        latitude: "43.6548",
        longitude: "-79.3871",
      },
      {
        address: "444 Adelaide Street",
        latitude: "43.6484",
        longitude: "-79.3955",
      },
      {
        address: "555 Richmond Street",
        latitude: "43.6497",
        longitude: "-79.3945",
      },
      {
        address: "666 College Street",
        latitude: "43.6542",
        longitude: "-79.4205",
      },
      {
        address: "777 Bloor Street",
        latitude: "43.6626",
        longitude: "-79.4107",
      },
      {
        address: "888 Spadina Avenue",
        latitude: "43.6676",
        longitude: "-79.4037",
      },
      {
        address: "999 Bathurst Street",
        latitude: "43.6681",
        longitude: "-79.4147",
      },
      {
        address: "1001 Lakeshore Road",
        latitude: "43.5112",
        longitude: "-79.6183",
      },
      {
        address: "2002 Dundas Street",
        latitude: "43.6628",
        longitude: "-79.4325",
      },
      {
        address: "3003 Danforth Avenue",
        latitude: "43.6848",
        longitude: "-79.3184",
      },
      {
        address: "4004 Eglinton Avenue",
        latitude: "43.7293",
        longitude: "-79.2674",
      },
      {
        address: "5005 Lawrence Avenue",
        latitude: "43.7718",
        longitude: "-79.2334",
      },
      {
        address: "6006 Finch Avenue",
        latitude: "43.7818",
        longitude: "-79.4462",
      },
      {
        address: "7007 Steeles Avenue",
        latitude: "43.8108",
        longitude: "-79.2647",
      },
      {
        address: "8008 Markham Road",
        latitude: "43.8408",
        longitude: "-79.2583",
      },
      {
        address: "9009 Kennedy Road",
        latitude: "43.8648",
        longitude: "-79.3035",
      },
      {
        address: "1010 Sheppard Avenue",
        latitude: "43.7672",
        longitude: "-79.4133",
      },
      {
        address: "1111 Bayview Avenue",
        latitude: "43.7031",
        longitude: "-79.3754",
      },
      {
        address: "1212 Mount Pleasant Road",
        latitude: "43.7121",
      },
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
      {
        address: "111 Yonge Street",
        latitude: "43.6492",
        longitude: "-79.3767",
      },
      {
        address: "222 Bay Street",
        latitude: "43.6472",
        longitude: "-79.3802",
      },
      {
        address: "333 University Avenue",
        latitude: "43.6548",
        longitude: "-79.3871",
      },
      {
        address: "444 Adelaide Street",
        latitude: "43.6484",
        longitude: "-79.3955",
      },
      {
        address: "555 Richmond Street",
        latitude: "43.6497",
        longitude: "-79.3945",
      },
      {
        address: "666 College Street",
        latitude: "43.6542",
        longitude: "-79.4205",
      },
      {
        address: "777 Bloor Street",
        latitude: "43.6626",
        longitude: "-79.4107",
      },
      {
        address: "888 Spadina Avenue",
        latitude: "43.6676",
        longitude: "-79.4037",
      },
      {
        address: "999 Bathurst Street",
        latitude: "43.6681",
        longitude: "-79.4147",
      },
      {
        address: "1001 Lakeshore Road",
        latitude: "43.5112",
        longitude: "-79.6183",
      },
      {
        address: "2002 Dundas Street",
        latitude: "43.6628",
        longitude: "-79.4325",
      },
      {
        address: "3003 Danforth Avenue",
        latitude: "43.6848",
        longitude: "-79.3184",
      },
      {
        address: "4004 Eglinton Avenue",
        latitude: "43.7293",
        longitude: "-79.2674",
      },
      {
        address: "5005 Lawrence Avenue",
        latitude: "43.7718",
        longitude: "-79.2334",
      },
      {
        address: "6006 Finch Avenue",
        latitude: "43.7818",
        longitude: "-79.4462",
      },
      {
        address: "7007 Steeles Avenue",
        latitude: "43.8108",
        longitude: "-79.2647",
      },
      {
        address: "8008 Markham Road",
        latitude: "43.8408",
        longitude: "-79.2583",
      },
      {
        address: "9009 Kennedy Road",
        latitude: "43.8648",
        longitude: "-79.3035",
      },
      {
        address: "1010 Sheppard Avenue",
        latitude: "43.7672",
        longitude: "-79.4133",
      },
      {
        address: "1111 Bayview Avenue",
        latitude: "43.7031",
        longitude: "-79.3754",
      },
      {
        address: "1212 Mount Pleasant Road",
        latitude: "43.7121",
      },
      {
        address: "1001 Lakeshore Road",
        latitude: "43.5112",
        longitude: "-79.6183",
      },
      {
        address: "2002 Dundas Street",
        latitude: "43.6628",
        longitude: "-79.4325",
      },
      {
        address: "3003 Danforth Avenue",
        latitude: "43.6848",
        longitude: "-79.3184",
      },
      {
        address: "4004 Eglinton Avenue",
        latitude: "43.7293",
        longitude: "-79.2674",
      },
      {
        address: "5005 Lawrence Avenue",
        latitude: "43.7718",
        longitude: "-79.2334",
      },
      {
        address: "6006 Finch Avenue",
        latitude: "43.7818",
        longitude: "-79.4462",
      },
      {
        address: "7007 Steeles Avenue",
        latitude: "43.8108",
        longitude: "-79.2647",
      },
      {
        address: "8008 Markham Road",
        latitude: "43.8408",
        longitude: "-79.2583",
      },
      {
        address: "9009 Kennedy Road",
        latitude: "43.8648",
        longitude: "-79.3035",
      },
      {
        address: "1010 Sheppard Avenue",
        latitude: "43.7672",
        longitude: "-79.4133",
      },
      {
        address: "1111 Bayview Avenue",
        latitude: "43.7031",
        longitude: "-79.3754",
      },
      {
        address: "1212 Mount Pleasant Road",
        latitude: "43.7121",
      },
      {
        address: "8008 Markham Road",
        latitude: "43.8408",
        longitude: "-79.2583",
      },
      {
        address: "9009 Kennedy Road",
        latitude: "43.8648",
        longitude: "-79.3035",
      },
      {
        address: "1010 Sheppard Avenue",
        latitude: "43.7672",
        longitude: "-79.4133",
      },
      {
        address: "1111 Bayview Avenue",
        latitude: "43.7031",
        longitude: "-79.3754",
      },
      {
        address: "1212 Mount Pleasant Road",
        latitude: "43.7121",
      },
    ],
  });

  const location = await prisma.location.findMany();
  const sakaLocationId = location[0].id;
  const martosLocationId = location[1].id;
  const sushiLocationId = location[2].id;

  // create an array of restaurant objects with the desired properties
  const restaurants = [];
  for (let i = 0; i < 10; i++) {
    const loadImage = (await getPlaiceholder(restaurantsImage[39+i])).base64;
    if (loadImage) {
      const restaurant = {
        name: restaurantsName[39+i],
        loadingImage: loadImage,
        slug: slugify(restaurantsName[39+i]),
        photo: restaurantsImage[39+i],
        locationId: location[39+i].id,
      };
      restaurants.push(restaurant);
    }
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
  const restaurantIds = restuarant.map((r) => r.id);

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
