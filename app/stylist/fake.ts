export const fake = process.env["FAKE"] === "true";

export const fakeDescription = `
The clothing item in the image is a denim jacket with the following properties:

- Material: Denim
- Color: Dark blue
- Closure: Button-up front
- Collar: Classic turn-down, sherpa-lined
- Sleeves: Long sleeves with buttoned cuffs
- Pockets: Flap pockets on the chest with button closures
- Fit: Standard, non-stretch
- Additional: It includes badges or pins on one of the pockets.
`;

export const fakeOutfit = {
  mainItem: {
    name: "Denim jacket",
    description:
      "Dark blue button-up denim jacket with sherpa-lined collar and chest pockets with badges or pins.",
  },
  outfits: [
    {
      styleName: "Casual",
      outfitDescription:
        "Perfect for a weekend outing or a casual day at work.",
      outfitItems: [
        {
          name: "White graphic t-shirt",
          description: "Cotton t-shirt with a fun print or slogan.",
        },
        {
          name: "Black skinny jeans",
          description: "Stretchy, high-rise jeans in a classic black color.",
        },
        {
          name: "White sneakers",
          description: "Canvas sneakers with rubber sole and lace-up closure.",
        },
        {
          name: "Beanie hat",
          description: "Warm, knitted beanie hat in a neutral color.",
        },
      ],
    },
    {
      styleName: "Smart casual",
      outfitDescription:
        "Suitable for a casual office setting or a dressy day out.",
      outfitItems: [
        {
          name: "Striped button-up shirt",
          description:
            "Cotton long sleeve shirt with vertical stripes in light blue and white.",
        },
        {
          name: "Khaki chinos",
          description: "Slim-fit, cotton trousers in a versatile khaki color.",
        },
        {
          name: "Brown leather loafers",
          description:
            "Genuine leather slip-on shoes with a low heel and decorative tassel detail.",
        },
        {
          name: "Aviator sunglasses",
          description:
            "Classic aviator sunglasses with tinted lenses and metal frame.",
        },
      ],
    },
    {
      styleName: "Edgy",
      outfitDescription: "For a bold and fashionable statement.",
      outfitItems: [
        {
          name: "Band t-shirt",
          description: "Cotton t-shirt with a vintage band design or logo.",
        },
        {
          name: "Ripped black skinny jeans",
          description:
            "Distressed, black denim pants with frayed edges and multiple rips.",
        },
        {
          name: "Motorcycle boots",
          description:
            "Black leather boots with buckle straps and chunky sole.",
        },
        {
          name: "Studded belt",
          description: "Leather belt with metal studs and buckle closure.",
        },
      ],
    },
    {
      styleName: "Layered professional",
      outfitDescription: "Great for a creative or casual work environment.",
      outfitItems: [
        {
          name: "Black turtleneck sweater",
          description: "Ribbed knit turtleneck in a soft and stretchy fabric.",
        },
        {
          name: "Tailored trousers",
          description:
            "Straight-leg, ankle-length pants in a neutral color like gray or navy.",
        },
        {
          name: "Suede Chelsea boots",
          description:
            "Suede ankle boots with elastic side panels and low stacked heel.",
        },
        {
          name: "Crossbody messenger bag",
          description:
            "Leather messenger bag with multiple compartments and adjustable shoulder strap.",
        },
      ],
    },
  ],
};

export const fakeOutfitUrl = (name: string) => {
  if (name === "Casual") {
    return "/fake_casual.png";
  }
  if (name === "Smart casual") {
    return "/fake_smart_casual.png";
  }
  if (name === "Edgy") {
    return "/fake_edgy.png";
  }
  if (name === "Layered professional") {
    return "/fake_layered_professional.png";
  }
  throw new Error(`Unknown outfit: ${name}`);
};

interface DisplayedItem {
  name: string;
  description: string;
  imageUrl: string;
  sponsored: {
    url: string;
    storeName: string;
  } | null;
  mine?: boolean;
}

export const fakeItem = (name: string): DisplayedItem => {
  if (name === "White graphic t-shirt") {
    return {
      imageUrl:
        "https://images.urbndata.com/is/image/UrbanOutfitters/81283327_012_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=960",
      name: "White graphic T-shirt",
      description:
        "White cotton t-shirt with graphics of Parks Project California",
      sponsored: {
        url: "https://www.urbanoutfitters.com/shop/parks-project-california-tee2?category=art-design-tees&color=012&type=REGULAR&quantity=1",
        storeName: "Urban Outfitters",
      },
    };
  }
  if (name === "Black skinny jeans") {
    return {
      name: "Black skinny jeans",
      description: "Stretchy, high-rise jeans in a classic black color.",
      imageUrl: "/fake_jeans.png",
      sponsored: null,
    };
  }
  if (name === "White sneakers") {
    return {
      name: "White sneakers",
      description: "Canvas sneakers with rubber sole and lace-up closure.",
      imageUrl: "/my_shoes.jpg",
      sponsored: null,
      mine: true,
    };
  }
  if (name === "Beanie hat") {
    return {
      name: "Beanie hat",
      description: "Warm, knitted beanie hat in a neutral color.",
      imageUrl: "/fake_beanie.png",
      sponsored: null,
    };
  }

  throw new Error(`Unknown item: ${name}`);
};
