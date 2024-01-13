export const products = [
  {
    url: "https://www2.hm.com/fr_fr/productpage.1076691006.html",
    image:
      "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F80%2Fde%2F80de00dd37cb8633245dd6fb8f8406a97a1f4089.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_shoes_boots%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
    name: "Knee-high boots",
    description:
      "Knee-high boots with buckle at the back. Satin lining. Thick outsole with patterned underside. Sole height 5 cm.",
    storeName: "H&M",
  },
  {
    url: "https://elevationstore.fr/en/buttero/5126-kingsley-chelsea-boots-suede-rubber-sole.html",
    image:
      "https://elevationstore.fr/19687-medium_default/kingsley-chelsea-boots-suede-rubber-sole.jpg",
    name: "Suede Chelsea Boots",
    description:
      "Suede ankle boots with elastic side panels and low stacked heel.",
    storeName: "Elevation Store",
  },
  {
    url: "https://www.urbanoutfitters.com/shop/parks-project-california-tee2?category=art-design-tees&color=012&type=REGULAR&quantity=1",
    image:
      "https://images.urbndata.com/is/image/UrbanOutfitters/81283327_012_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=960",
    name: "White graphic T-shirt",
    description:
      "White cotton t-shirt with graphics of Parks Project California",
    storeName: "Urban Outfitters",
  },
];

export type Product = (typeof products)[0];
