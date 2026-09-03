export interface Product {
  id: string;
  title: string;
  price: number;
  category: "t-shirts" | "accessories" | "hoodies" | "jerseys";
  subcategory: "regular" | "graphic" | "drop-shoulder" | "acid-wash" | "mugs" | "flags" | "tapestries" | "wristbands" | "badges" | "wallet-cards" | "keychains" | "magnets" | "notebooks" | "gift-boxes" | "hoodies" | "jerseys";
  images: string[];
  sizes?: string[];
  colors?: string[];
  description?: string;
  rating?: number;
  aesthetic?: string;
}

export interface ProductOverrideData {
  title?: string;
  price?: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
  aesthetic?: string;
}

export const products: Product[] = [
  {
    "id": "dp-acid-wash-aizen",
    "title": "AIZEN ACID WASH TEE",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770007/deez-prints/acid/aizen-gre-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770002/deez-prints/acid/aizen-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770004/deez-prints/acid/aizen-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770010/deez-prints/acid/aizen-gre-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-baby",
    "title": "Cupid Vintage Acid Wash Tee",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770019/deez-prints/acid/baby-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770016/deez-prints/acid/baby-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-acid-wash-batman",
    "title": "BATMAN ACID WASH TEE",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770028/deez-prints/acid/batman-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770031/deez-prints/acid/batman-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-acid-wash-berserk",
    "title": "Guts Brand of Sacrifice Acid Wash Tee",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770046/deez-prints/acid/berserk-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770049/deez-prints/acid/berserk-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-berserk-2",
    "title": "BERSERK 2 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770055/deez-prints/acid/berserk2--black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770043/deez-prints/acid/berserk-3-maroon-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-bleach",
    "title": "BLEACH ACID WASH TEE",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770058/deez-prints/acid/bleach-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-bluelock",
    "title": "BLUELOCK ACID WASH TEE",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770067/deez-prints/acid/bluelock-maroon-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770061/deez-prints/acid/bluelock-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770070/deez-prints/acid/bluelock-maroon-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770064/deez-prints/acid/bluelock-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-chainsaw",
    "title": "Denji Chainsawman Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770087/deez-prints/acid/chainsaw-maroon-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770081/deez-prints/acid/chainsaw-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770090/deez-prints/acid/chainsaw-maroon-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770084/deez-prints/acid/chainsaw-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-chainsaw-2",
    "title": "Chainsawman Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770079/deez-prints/acid/chainsaw-2-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770075/deez-prints/acid/chainsaw-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770094/deez-prints/acid/chainsaw2-maroon-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770073/deez-prints/acid/chainsaw-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770096/deez-prints/acid/chainsaw2-maroon-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-curse",
    "title": "Choso Bloodline Acid Wash Tee",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770099/deez-prints/acid/curse-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-dark-knight",
    "title": "DARK KNIGHT ACID WASH TEE",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770108/deez-prints/acid/darknight-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770105/deez-prints/acid/dark-night-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770102/deez-prints/acid/dark-night-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-acid-wash-dbz-1",
    "title": "Majin Vegeta Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770111/deez-prints/acid/dbz-1-maroon-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770115/deez-prints/acid/dbz-1-maroon-front.jpg"
    ],
    "colors": [
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-dbz-2",
    "title": "Vegeta Super Saiyan Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770118/deez-prints/acid/dbz-2-blkac-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770124/deez-prints/acid/dbz-2-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770121/deez-prints/acid/dbz-2-blkac-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-dbz-3",
    "title": "Majin Vegeta 2.0 Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770130/deez-prints/acid/dbz-3-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770136/deez-prints/acid/dbz-3-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770127/deez-prints/acid/dbz-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770133/deez-prints/acid/dbz-3-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770138/deez-prints/acid/dbz-3-maroon-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770141/deez-prints/acid/dbz-3-maroon-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-dbz-4",
    "title": "DBZ Goku Rage Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770154/deez-prints/acid/dbz-4-maroon-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770147/deez-prints/acid/dbz-4-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770144/deez-prints/acid/dbz-4-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770150/deez-prints/acid/dbz-4-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770157/deez-prints/acid/dbz-4-maroon-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-dbz-5",
    "title": "Goku Shenron Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770166/deez-prints/acid/dbz-5-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770163/deez-prints/acid/dbz-5-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770160/deez-prints/acid/dbz-5-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-dbz-6",
    "title": "Goku Ronin Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770174/deez-prints/acid/dbz-6-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770169/deez-prints/acid/dbz-6-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770171/deez-prints/acid/dbz-6-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-dbz-7",
    "title": "Goku Black Rebellion Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770178/deez-prints/acid/dbz-7-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-evil",
    "title": "See No Evil Acid Wash Tee",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770186/deez-prints/acid/evil-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770180/deez-prints/acid/evil-grey-front.jpg"
    ],
    "colors": [
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-acid-wash-eye",
    "title": "Living the Dream Acid Wash Tee",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770189/deez-prints/acid/eye-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-eyes",
    "title": "Gojo Satoru Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770195/deez-prints/acid/eyes-blackkk-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770192/deez-prints/acid/eyes-blackkk-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770198/deez-prints/acid/eyes-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-fire",
    "title": "Maki Oze Firepower Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770207/deez-prints/acid/fire-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770204/deez-prints/acid/fire-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770201/deez-prints/acid/fire-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-acid-wash-goodfellas",
    "title": "GOODFELLAS ACID WASH TEE",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770210/deez-prints/acid/goodfellas-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "cinema-collection"
  },
  {
    "id": "dp-acid-wash-hands",
    "title": "Kurapika Rage Acid Wash Tee",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770213/deez-prints/acid/hands-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770216/deez-prints/acid/hands-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-acid-wash-horns",
    "title": "Ichigo Hollow Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770225/deez-prints/acid/horns-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770219/deez-prints/acid/horns-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770222/deez-prints/acid/horns-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-acid-wash-kaijin",
    "title": "Garou Kaijin Acid Wash Tee",
    "price": 2800,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770228/deez-prints/acid/kaijin-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770231/deez-prints/acid/kaijin-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-konichiwa",
    "title": "Rockstar Tokyo Acid Wash Tee",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770237/deez-prints/acid/konichiwa-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770234/deez-prints/acid/konichiwa-black-back.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-luffy-1",
    "title": "Luffy Gear 5 Acid Wash Tee",
    "price": 2300,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770246/deez-prints/acid/luffy-1-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770243/deez-prints/acid/luffy-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770240/deez-prints/acid/luffy-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770249/deez-prints/acid/luffy-1-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-luffy-2",
    "title": "Luffy Gear 5 2.0 Acid Wash Tee",
    "price": 2300,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770258/deez-prints/acid/luffy-2-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770253/deez-prints/acid/luffy-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770255/deez-prints/acid/luffy-2-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-luffy-3",
    "title": "Luffy Straw Hat Acid Wash Tee",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770261/deez-prints/acid/luffy-3-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-luffy-4",
    "title": "Luffy Freedom Acid Wash Tee",
    "price": 2100,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770267/deez-prints/acid/luffy-4-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770264/deez-prints/acid/luffy-4-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770270/deez-prints/acid/luffy-4-greyt-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-madara",
    "title": "Madara Uchiha Acid Wash Tee",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770276/deez-prints/acid/madara-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770279/deez-prints/acid/madara-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-mobland",
    "title": "Outlaw Acid Wash Tee",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770288/deez-prints/acid/mobland-maroon-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770282/deez-prints/acid/mobland-grey-front.jpg"
    ],
    "colors": [
      "Grey",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-naruto-1",
    "title": "Naruto Eyes Acid Wash Tee",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770297/deez-prints/acid/naruto-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770294/deez-prints/acid/naruto-1-b_ack-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770291/deez-prints/acid/naruto-1-b_ack-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-naruto-2",
    "title": "Madara 1 Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770306/deez-prints/acid/naruto-2-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770303/deez-prints/acid/naruto-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770300/deez-prints/acid/naruto-2-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-naruto-3",
    "title": "Itachi Uchiha Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770312/deez-prints/acid/naruto-3-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770309/deez-prints/acid/naruto-3-grey-back.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-naruto-4",
    "title": "Itachi Eclipse Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770322/deez-prints/acid/naruto-4-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770318/deez-prints/acid/naruto-4-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770315/deez-prints/acid/naruto-4-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-naruto-5",
    "title": "Naruto 3 Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770331/deez-prints/acid/naruto-5-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770325/deez-prints/acid/naruto-5-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770334/deez-prints/acid/naruto-5-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770328/deez-prints/acid/naruto-5-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-peter",
    "title": "Peter Parker Great Power Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770346/deez-prints/acid/peter-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770340/deez-prints/acid/peter-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770343/deez-prints/acid/peter-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770337/deez-prints/acid/peter-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "cinema-collection"
  },
  {
    "id": "dp-acid-wash-sakuna",
    "title": "Sukuna Cursed Acid Wash Tee",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770352/deez-prints/acid/sakuna-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-shoot",
    "title": "Kaneki Reaper Acid Wash Tee",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770355/deez-prints/acid/shoot-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-solo-1",
    "title": "Solo Leveling Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770364/deez-prints/acid/solo1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770367/deez-prints/acid/solo1-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-solo-2",
    "title": "Arise Solo Leveling Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770370/deez-prints/acid/solo2--grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770361/deez-prints/acid/solo-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770358/deez-prints/acid/solo-2-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-speed",
    "title": "Formula Speed Drop Shoulder Tee",
    "price": 2100,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770379/deez-prints/acid/speed-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770376/deez-prints/acid/speed-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770373/deez-prints/acid/speed-grey-front.jpg"
    ],
    "colors": [
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-acid-wash-sukuna",
    "title": "Sukuna Cursed Acid Wash Tee",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770382/deez-prints/acid/sukuna-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-titan",
    "title": "TITAN ACID WASH TEE",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770385/deez-prints/acid/titan-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-yamoto",
    "title": "Yamoto Inferno Acid Wash Tee",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770393/deez-prints/acid/yamoto-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770390/deez-prints/acid/yamoto-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770388/deez-prints/acid/yamoto-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-zoro-1",
    "title": "Zoro Ronin Acid Wash Tee",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770402/deez-prints/acid/zoro-1-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770397/deez-prints/acid/zoro-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770400/deez-prints/acid/zoro-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770405/deez-prints/acid/zoro-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770408/deez-prints/acid/zoro-2-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-zoro-3",
    "title": "Fire Fist Ace Acid Wash Tee",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770412/deez-prints/acid/zoro-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770418/deez-prints/acid/zoro-3-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770415/deez-prints/acid/zoro-3-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-ace",
    "title": "Fire Fist Ace Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769148/deez-prints/drops/ace-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769146/deez-prints/drops/ace-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769143/deez-prints/drops/ace-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769154/deez-prints/drops/ace-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769157/deez-prints/drops/ace-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769151/deez-prints/drops/ace-black-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-aizen",
    "title": "AIZEN DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769174/deez-prints/drops/aizen-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769160/deez-prints/drops/aizen-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769163/deez-prints/drops/aizen-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769165/deez-prints/drops/aizen-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769171/deez-prints/drops/aizen-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769168/deez-prints/drops/aizen-black-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-arise",
    "title": "Solo Leveling Arise Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769187/deez-prints/drops/arise-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769178/deez-prints/drops/arise-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769184/deez-prints/drops/arise-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769181/deez-prints/drops/arise-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769190/deez-prints/drops/arise-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-baby",
    "title": "Cupid Vintage Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769196/deez-prints/drops/baby-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769202/deez-prints/drops/baby-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769205/deez-prints/drops/baby-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769210/deez-prints/drops/baby-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-batman-grye",
    "title": "Batman Noir Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769213/deez-prints/drops/batman-grye-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-drop-shoulder-berserk-2",
    "title": "Guts Brand of Sacrifice Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769219/deez-prints/drops/berserk-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769216/deez-prints/drops/berserk-2-black-back.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-berserk-black-1",
    "title": "Guts Berserker Armor Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769225/deez-prints/drops/berserk-black-1-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769222/deez-prints/drops/berserk-black-1-back.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-bleach",
    "title": "BLEACH DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769233/deez-prints/drops/bleach-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769230/deez-prints/drops/bleach-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769227/deez-prints/drops/bleach-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769236/deez-prints/drops/bleach-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769239/deez-prints/drops/bleach-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769242/deez-prints/drops/bleach-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-bluelock",
    "title": "BLUELOCK DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769252/deez-prints/drops/bluelock-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769245/deez-prints/drops/bluelock-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769255/deez-prints/drops/bluelock-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769248/deez-prints/drops/bluelock-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769258/deez-prints/drops/bluelock-white-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-chainsaw-1",
    "title": "Denji Chainsaw Man Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769261/deez-prints/drops/chainsaw-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769264/deez-prints/drops/chainsaw-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769273/deez-prints/drops/chainsaw-1-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-chainsaw-2",
    "title": "Chainsawman Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769283/deez-prints/drops/chainsaw-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769279/deez-prints/drops/chainsaw-2-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769276/deez-prints/drops/chainsaw-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769287/deez-prints/drops/chainsaw-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769291/deez-prints/drops/chainsaw2-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769294/deez-prints/drops/chainsaw2-blue-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-curse",
    "title": "Choso Bloodline Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769306/deez-prints/drops/curse-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769297/deez-prints/drops/curse-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769300/deez-prints/drops/curse-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769303/deez-prints/drops/curse-blue-back.jpg"
    ],
    "colors": [
      "Beige",
      "Blue"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-curse-whtie",
    "title": "Sukuna Cursed Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769310/deez-prints/drops/curse-whtie-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769313/deez-prints/drops/curse-whtie-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-dark-knight",
    "title": "DARK KNIGHT DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769320/deez-prints/drops/dark-knight-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769323/deez-prints/drops/dark-knight-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769316/deez-prints/drops/dark-knight-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769326/deez-prints/drops/dark-knight-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769329/deez-prints/drops/dark-knight-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-drop-shoulder-dbz-1",
    "title": "Vegeta Super Saiyan Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769348/deez-prints/drops/dbz-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769340/deez-prints/drops/dbz-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769344/deez-prints/drops/dbz-1-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-dbz-2",
    "title": "Majin Vegeta 1.0 Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769369/deez-prints/drops/dbz-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769352/deez-prints/drops/dbz-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769357/deez-prints/drops/dbz-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769361/deez-prints/drops/dbz-2-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769364/deez-prints/drops/dbz-2-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769367/deez-prints/drops/dbz-2-white-back.jpg"
    ],
    "colors": [
      "Black",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-dbz-3",
    "title": "Goku Rage Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769332/deez-prints/drops/dbz--3-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769383/deez-prints/drops/dbz-3-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769335/deez-prints/drops/dbz--3-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769372/deez-prints/drops/dbz-3-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769379/deez-prints/drops/dbz-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769376/deez-prints/drops/dbz-3-beige-front.jpg"
    ],
    "colors": [
      "White",
      "Beige",
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-dbz-4",
    "title": "Goku Shenron Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769402/deez-prints/drops/dbz-4-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769386/deez-prints/drops/dbz-4-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769391/deez-prints/drops/dbz-4-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769395/deez-prints/drops/dbz-4-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769406/deez-prints/drops/dbz-4-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769409/deez-prints/drops/dbz-4-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769398/deez-prints/drops/dbz-4-blue-front.jpg"
    ],
    "colors": [
      "Black",
      "Blue",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-dbz-5",
    "title": "Goku Ronin Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769412/deez-prints/drops/dbz-5-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769435/deez-prints/drops/dbz-5-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769421/deez-prints/drops/dbz-5-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769424/deez-prints/drops/dbz-5-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769431/deez-prints/drops/dbz-5-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769416/deez-prints/drops/dbz-5-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769428/deez-prints/drops/dbz-5-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-dbz-6",
    "title": "Goku Black Rebellion Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769438/deez-prints/drops/dbz-6-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769449/deez-prints/drops/dbz-6-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769441/deez-prints/drops/dbz-6-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769445/deez-prints/drops/dbz-6-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769452/deez-prints/drops/dbz-6-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769455/deez-prints/drops/dbz-6-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-evil",
    "title": "See No Evil Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769470/deez-prints/drops/evil-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769461/deez-prints/drops/evil-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769476/deez-prints/drops/evil-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769479/deez-prints/drops/evil-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-eye",
    "title": "Living the Dream Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769486/deez-prints/drops/eye-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769493/deez-prints/drops/eye-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-fire",
    "title": "FIRE DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769516/deez-prints/drops/fire-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769497/deez-prints/drops/fire-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769503/deez-prints/drops/fire-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769500/deez-prints/drops/fire-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769506/deez-prints/drops/fire-black-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-fire-bleu",
    "title": "Maki Oze Firepower Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769509/deez-prints/drops/fire-bleu-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769512/deez-prints/drops/fire-bleu-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-fuckoff",
    "title": "FUCKOFF DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769519/deez-prints/drops/fuckoff-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769525/deez-prints/drops/fuckoff-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-goodfellas",
    "title": "GOODFELLAS DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769531/deez-prints/drops/goodfellas-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769538/deez-prints/drops/goodfellas-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769544/deez-prints/drops/goodfellas-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "cinema-collection"
  },
  {
    "id": "dp-drop-shoulder-hands",
    "title": "Kurapika Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769547/deez-prints/drops/hands-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769551/deez-prints/drops/hands-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-head",
    "title": "Tanjiro Kamado Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769559/deez-prints/drops/head-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-horn",
    "title": "Ichigo Hollow Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769561/deez-prints/drops/horn-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769583/deez-prints/drops/horn-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769567/deez-prints/drops/horn-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769574/deez-prints/drops/horn-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769580/deez-prints/drops/horn-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769564/deez-prints/drops/horn-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769570/deez-prints/drops/horn-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769577/deez-prints/drops/horn-blue-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-drop-shoulder-itachi",
    "title": "ITACHI DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769595/deez-prints/drops/itachi-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769590/deez-prints/drops/itachi-beige-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-itachi-2",
    "title": "Itachi Eclipse Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769710/deez-prints/drops/madara-blackl-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769708/deez-prints/drops/madara-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769704/deez-prints/drops/madara-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769713/deez-prints/drops/madara-blackl-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769723/deez-prints/drops/madara-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769925/deez-prints/drops/tachi-whtie-back.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-kaijin",
    "title": "Garou Kaijin Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769598/deez-prints/drops/kaijin-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769608/deez-prints/drops/kaijin-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769601/deez-prints/drops/kaijin-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769604/deez-prints/drops/kaijin-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769611/deez-prints/drops/kaijin-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769614/deez-prints/drops/kaijin-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-konichiwa",
    "title": "Rockstar Tokyo Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769630/deez-prints/drops/konichiwa-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769634/deez-prints/drops/konichiwa-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-luffy-1",
    "title": "Luffy Gear 5 Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769651/deez-prints/drops/luffy-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769648/deez-prints/drops/luffy-1-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769645/deez-prints/drops/luffy-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769662/deez-prints/drops/luffy-1-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769668/deez-prints/drops/luffy-1-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769654/deez-prints/drops/luffy-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769665/deez-prints/drops/luffy-1-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769671/deez-prints/drops/luffy-1-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-luffy-2",
    "title": "Luffy Straw Hat Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769683/deez-prints/drops/luffy-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769674/deez-prints/drops/luffy-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769680/deez-prints/drops/luffy-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769677/deez-prints/drops/luffy-2-beige-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-luffy-3",
    "title": "Luffy Freedom Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769695/deez-prints/drops/luffy-3-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769689/deez-prints/drops/luffy-3-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769701/deez-prints/drops/luffy-3-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-madara",
    "title": "Madara Uchiha Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769720/deez-prints/drops/madara-blue-front.jpg"
    ],
    "colors": [
      "Blue"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-mobland",
    "title": "Outlaw Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769735/deez-prints/drops/mobland-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769747/deez-prints/drops/mobland-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769743/deez-prints/drops/mobland-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769750/deez-prints/drops/mobland-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769732/deez-prints/drops/mobland-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-naruto",
    "title": "Naruto Eyes Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769831/deez-prints/drops/naruto-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769827/deez-prints/drops/naruto-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769824/deez-prints/drops/naruto-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769833/deez-prints/drops/naruto-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769836/deez-prints/drops/naruto-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-naruto-2",
    "title": "Madara 1 Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769775/deez-prints/drops/naruto-2-grye-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769760/deez-prints/drops/naruto-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769766/deez-prints/drops/naruto-2-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769762/deez-prints/drops/naruto-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769769/deez-prints/drops/naruto-2-blue-front.jpg"
    ],
    "colors": [
      "Black",
      "Blue",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-naruto-3",
    "title": "NARUTO 3 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769795/deez-prints/drops/naruto-3-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769792/deez-prints/drops/naruto-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769799/deez-prints/drops/naruto-3-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-naruto-4",
    "title": "Itachi Uchiha Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769805/deez-prints/drops/naruto-4-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769808/deez-prints/drops/naruto-4-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769802/deez-prints/drops/naruto-4-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769811/deez-prints/drops/naruto-4-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769818/deez-prints/drops/naruto-4-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769821/deez-prints/drops/naruto-4-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769815/deez-prints/drops/naruto-4-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-naruto-5",
    "title": "Itachi Akatsuki Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769781/deez-prints/drops/naruto-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769754/deez-prints/drops/naruto-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769756/deez-prints/drops/naruto-2-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769778/deez-prints/drops/naruto-2-white-back.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-naruto-6",
    "title": "Itachi Akatsuki Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769788/deez-prints/drops/naruto-3-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769784/deez-prints/drops/naruto-3-beige-back.jpg"
    ],
    "colors": [
      "Beige"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-peter",
    "title": "PETER DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769848/deez-prints/drops/peter-blyue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769839/deez-prints/drops/peter-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769845/deez-prints/drops/peter-blyue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769842/deez-prints/drops/peter-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769851/deez-prints/drops/peter-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Blue",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "cinema-collection"
  },
  {
    "id": "dp-drop-shoulder-regular-series",
    "title": "Garou Kaijin Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769856/deez-prints/drops/regularssss-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769854/deez-prints/drops/regularssss-back.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-shoot",
    "title": "Kaneki Reaper Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769862/deez-prints/drops/shoot-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769865/deez-prints/drops/shoot-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769859/deez-prints/drops/shoot-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769870/deez-prints/drops/shoot-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769873/deez-prints/drops/shoot-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769867/deez-prints/drops/shoot-blue-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-solo-1",
    "title": "Solo Leveling Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769876/deez-prints/drops/solo-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769884/deez-prints/drops/solo-1-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769882/deez-prints/drops/solo-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769887/deez-prints/drops/solo1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769878/deez-prints/drops/solo-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769890/deez-prints/drops/solo1-beige-front.jpg"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-speed",
    "title": "Formula Speed Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769908/deez-prints/drops/speed-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769896/deez-prints/drops/speed-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769902/deez-prints/drops/speed-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769910/deez-prints/drops/speed-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-sukuna",
    "title": "Sukuna Cursed Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769914/deez-prints/drops/sukuna-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769922/deez-prints/drops/sukuna-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769917/deez-prints/drops/sukuna-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769919/deez-prints/drops/sukuna-white-back.jpg"
    ],
    "colors": [
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-titan",
    "title": "Sukuna Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769936/deez-prints/drops/titan-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769934/deez-prints/drops/titan-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769931/deez-prints/drops/titan-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769942/deez-prints/drops/titan-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769939/deez-prints/drops/titan-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769945/deez-prints/drops/titan-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-yamoto",
    "title": "Yamoto Inferno Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769948/deez-prints/drops/yamoto-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769956/deez-prints/drops/yamoto-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769953/deez-prints/drops/yamoto-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769959/deez-prints/drops/yamoto-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769965/deez-prints/drops/yamoto-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769950/deez-prints/drops/yamoto-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769962/deez-prints/drops/yamoto-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769968/deez-prints/drops/yamoto-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-zoro",
    "title": "Zoro Ronin Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769985/deez-prints/drops/zoro-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769988/deez-prints/drops/zoro-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769982/deez-prints/drops/zoro-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769996/deez-prints/drops/zoro-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769999/deez-prints/drops/zoro-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769990/deez-prints/drops/zoro-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769993/deez-prints/drops/zoro-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-zoro-2",
    "title": "Zoro Bushido Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769971/deez-prints/drops/zoro-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769979/deez-prints/drops/zoro-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769976/deez-prints/drops/zoro-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769974/deez-prints/drops/zoro-2-beige-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-ace-1",
    "title": "FIRE FIST ACE REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768420/deez-prints/regular/ace-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768414/deez-prints/regular/ace-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768411/deez-prints/regular/ace-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768422/deez-prints/regular/ace-1-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768417/deez-prints/regular/ace-1-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-aizen",
    "title": "AIZEN REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768431/deez-prints/regular/aizen-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768425/deez-prints/regular/aizen-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768434/deez-prints/regular/aizen-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768437/deez-prints/regular/aizen-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768428/deez-prints/regular/aizen-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-anime1",
    "title": "CHOSO BLOODLINE REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768439/deez-prints/regular/anime1beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768454/deez-prints/regular/anime1white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768442/deez-prints/regular/anime1beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768445/deez-prints/regular/anime1blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768451/deez-prints/regular/anime1white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768448/deez-prints/regular/anime1blue-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-animeshoot",
    "title": "KANEKI REAPER REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768462/deez-prints/regular/animeshootwhite-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768459/deez-prints/regular/animeshootbeige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768457/deez-prints/regular/animeshootbeige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768465/deez-prints/regular/animeshootwhite-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-baby",
    "title": "CUPID VINTAGE REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768470/deez-prints/regular/baby-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768476/deez-prints/regular/baby-whiet-front.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-batman1",
    "title": "BATMAN NOIR REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768484/deez-prints/regular/batman1white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768482/deez-prints/regular/batman1beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768479/deez-prints/regular/batman1beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768487/deez-prints/regular/batman1white-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-regular-berserk",
    "title": "GUTS BRAND OF SACRIFICE REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768490/deez-prints/regular/berserk-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768493/deez-prints/regular/berserk-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-berserk-2",
    "title": "GUTS BERSERKER ARMOR REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768496/deez-prints/regular/berserk2black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768499/deez-prints/regular/berserk2black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-berserk-3",
    "title": "GUTS BERSERKER REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768511/deez-prints/regular/berserkwhte-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768505/deez-prints/regular/berserkbeige-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-bleach",
    "title": "BLEACH REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768529/deez-prints/regular/bleach-whte-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768514/deez-prints/regular/bleach-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768526/deez-prints/regular/bleach-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768517/deez-prints/regular/bleach-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768520/deez-prints/regular/bleach-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768523/deez-prints/regular/bleach-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768533/deez-prints/regular/bleach-whte-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-chainsaw-1",
    "title": "CHAINSAW MAN REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768535/deez-prints/regular/chainsaw-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768550/deez-prints/regular/chainsaw-1-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768538/deez-prints/regular/chainsaw-1-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768541/deez-prints/regular/chainsaw-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768544/deez-prints/regular/chainsaw-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768547/deez-prints/regular/chainsaw-1-white-back.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-chainsaw-2",
    "title": "DENJI CHAINSAW REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768553/deez-prints/regular/chainsaw-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768555/deez-prints/regular/chainsaw-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768558/deez-prints/regular/chainsaw-2-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-chinese",
    "title": "ROCKSTAR TOKYO REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768564/deez-prints/regular/chinese-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-dbz-1",
    "title": "MAJIN VEGETA REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768573/deez-prints/regular/dbz-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768567/deez-prints/regular/dbz-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768575/deez-prints/regular/dbz-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768570/deez-prints/regular/dbz-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768579/deez-prints/regular/dbz-1-white-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-dbz-3",
    "title": "VEGETA SUPER SAIYAN REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768587/deez-prints/regular/dbz-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768590/deez-prints/regular/dbz-3-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-dbz-4",
    "title": "MAJIN VEGETA RAGE REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768599/deez-prints/regular/dbz-4-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768593/deez-prints/regular/dbz-4-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768595/deez-prints/regular/dbz-4-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768601/deez-prints/regular/dbz-4-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768604/deez-prints/regular/dbz-4-white-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-dbz-5",
    "title": "GOKU RAGE REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768612/deez-prints/regular/dbz-5-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768610/deez-prints/regular/dbz-5-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768607/deez-prints/regular/dbz-5-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768618/deez-prints/regular/dbz-5-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768621/deez-prints/regular/dbz-5-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768615/deez-prints/regular/dbz-5-black-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-dbz-6",
    "title": "GOKU SHENRON REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768624/deez-prints/regular/dbz-6-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768632/deez-prints/regular/dbz-6-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768629/deez-prints/regular/dbz-6-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768627/deez-prints/regular/dbz-6-black-front.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-dbz-7",
    "title": "GOKU RONIN REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768641/deez-prints/regular/dbz-7-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768638/deez-prints/regular/dbz-7-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768635/deez-prints/regular/dbz-7-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768644/deez-prints/regular/dbz-7-white-front.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-dbz-8",
    "title": "GOKU BLACK REBELLION REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768653/deez-prints/regular/dbz-8-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768647/deez-prints/regular/dbz-8-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768650/deez-prints/regular/dbz-8-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768656/deez-prints/regular/dbz-8-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768658/deez-prints/regular/dbz-8-white-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-dream",
    "title": "LIVE THE DREAM REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768670/deez-prints/regular/dreamwhite-front.jpg"
    ],
    "colors": [
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-eye-2",
    "title": "GOJO SATORU REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768681/deez-prints/regular/eye-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768687/deez-prints/regular/eyewhite-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-fire",
    "title": "MAKI OZE FIREPOWER REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768696/deez-prints/regular/fire-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768690/deez-prints/regular/fire-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768693/deez-prints/regular/fire-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-fuck",
    "title": "FUCK OFF REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768699/deez-prints/regular/fuckbeige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768705/deez-prints/regular/fuckblack-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768711/deez-prints/regular/fuckgrey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-goodfellas",
    "title": "GOODFELLAS REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768717/deez-prints/regular/goodfellas-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768723/deez-prints/regular/goodfellasblack-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768726/deez-prints/regular/goodfellasgrey-front.jpg"
    ],
    "colors": [
      "White",
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "cinema-collection"
  },
  {
    "id": "dp-regular-hands",
    "title": "KURAPIKA RAGE REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768734/deez-prints/regular/hands-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768732/deez-prints/regular/hands-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768729/deez-prints/regular/hands-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768738/deez-prints/regular/hands-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-ichigo",
    "title": "ICHIGO HOLLOW REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768747/deez-prints/regular/Ichigo-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768744/deez-prints/regular/Ichigo-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768741/deez-prints/regular/Ichigo-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768753/deez-prints/regular/Ichigo-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768749/deez-prints/regular/Ichigo-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768755/deez-prints/regular/Ichigo-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-isagi-1",
    "title": "ISAGI YOICHI REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768764/deez-prints/regular/isagi-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768758/deez-prints/regular/isagi-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768761/deez-prints/regular/isagi-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768767/deez-prints/regular/isagi-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768770/deez-prints/regular/isagi-1-white-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-kaijin",
    "title": "GAROU KAIJIN REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768774/deez-prints/regular/kaijin-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768790/deez-prints/regular/kaijin-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768777/deez-prints/regular/kaijin-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768780/deez-prints/regular/kaijin-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768784/deez-prints/regular/kaijin-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768787/deez-prints/regular/kaijin-white-back.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-knight",
    "title": "KNIGHT REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768798/deez-prints/regular/knight-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768792/deez-prints/regular/knight-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768808/deez-prints/regular/knight-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768801/deez-prints/regular/knight-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768805/deez-prints/regular/knight-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768795/deez-prints/regular/knight-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768811/deez-prints/regular/knight-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-luffy-1",
    "title": "LUFFY GEAR 5 REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768816/deez-prints/regular/luffy-1-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768819/deez-prints/regular/luffy-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768814/deez-prints/regular/luffy-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768822/deez-prints/regular/luffy-1-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-luffy-2",
    "title": "LUFFY GEAR 5 REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768825/deez-prints/regular/luffy-2-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768852/deez-prints/regular/luffy2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768854/deez-prints/regular/luffy2-black-front.jpg"
    ],
    "colors": [
      "Grey",
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-luffy-3",
    "title": "LUFFY STRAW HAT REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768829/deez-prints/regular/luffy-3-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768837/deez-prints/regular/luffy-3-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768834/deez-prints/regular/luffy-3-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768832/deez-prints/regular/luffy-3-beige-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-luffy-4",
    "title": "LUFFY FREEDOM REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768843/deez-prints/regular/luffy-4-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768849/deez-prints/regular/luffy-4-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-madara-1",
    "title": "MADARA 1 REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768869/deez-prints/regular/madara-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768857/deez-prints/regular/madara-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768860/deez-prints/regular/madara-1-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768863/deez-prints/regular/madara-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768866/deez-prints/regular/madara-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768872/deez-prints/regular/madara-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768875/deez-prints/regular/madara-1-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-mob",
    "title": "OUTLAW REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768881/deez-prints/regular/mob-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768886/deez-prints/regular/mob-white-front.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-naruto-1",
    "title": "NARUTO EYES REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768890/deez-prints/regular/naruto-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768899/deez-prints/regular/naruto-1-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768896/deez-prints/regular/naruto-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768893/deez-prints/regular/naruto-1-black-front.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-naruto-2",
    "title": "NARUTO SHADOW REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768902/deez-prints/regular/naruto-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768905/deez-prints/regular/naruto-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768908/deez-prints/regular/naruto-2-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-naruto-3",
    "title": "ITACHI AKATSUKI REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768917/deez-prints/regular/naruto3-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768914/deez-prints/regular/naruto-3-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768911/deez-prints/regular/naruto-3-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768919/deez-prints/regular/naruto3-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-responsibility",
    "title": "PETER PARKER GREAT POWER REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768925/deez-prints/regular/responsibility-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768931/deez-prints/regular/responsibilitywhite-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768934/deez-prints/regular/responsibilty-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768922/deez-prints/regular/responsibility-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768937/deez-prints/regular/responsibilty-beige-front.jpg"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-solo-1",
    "title": "SOLO LEVELING SHADOW REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768957/deez-prints/regular/solo-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768965/deez-prints/regular/solo-1-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768962/deez-prints/regular/solo-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768981/deez-prints/regular/solo1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768960/deez-prints/regular/solo-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768983/deez-prints/regular/solo1-beige-front.jpg"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-solo-2",
    "title": "SOLO LEVELING ARISE REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768974/deez-prints/regular/solo-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768971/deez-prints/regular/solo-2-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768968/deez-prints/regular/solo-2-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768977/deez-prints/regular/solo-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768986/deez-prints/regular/solo2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768989/deez-prints/regular/solo2-black-front.jpg"
    ],
    "colors": [
      "Blue",
      "White",
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-speed",
    "title": "FORMULA SPEED REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768995/deez-prints/regular/speed-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769000/deez-prints/regular/speed-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-sukuna",
    "title": "SUKUNA REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768939/deez-prints/regular/sakuna-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768945/deez-prints/regular/sakuna-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768951/deez-prints/regular/sakunga-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768942/deez-prints/regular/sakuna-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768948/deez-prints/regular/sakuna-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768954/deez-prints/regular/sakunga-beige-front.jpg"
    ],
    "colors": [
      "Blue",
      "White",
      "Beige",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-sukuna-2",
    "title": "SUKUNA CURSED REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769003/deez-prints/regular/sukuna-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769012/deez-prints/regular/sukuna-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769006/deez-prints/regular/sukuna-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769009/deez-prints/regular/sukuna-white-back.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-tujiro",
    "title": "TANJIRO KAMADO REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769021/deez-prints/regular/tujiro-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-uchiha-1",
    "title": "MADARA UCHIHA REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769080/deez-prints/regular/uchiha1beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769087/deez-prints/regular/uchiha1black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769092/deez-prints/regular/uchiha1white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-uchiha-2",
    "title": "ITACHI UCHIHA REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769033/deez-prints/regular/uchiha-2-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769023/deez-prints/regular/uchiha-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769026/deez-prints/regular/uchiha-2-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769030/deez-prints/regular/uchiha-2-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769036/deez-prints/regular/uchiha-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769039/deez-prints/regular/uchiha-2-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-uchiha-3",
    "title": "ITACHI AKATSUKI REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769050/deez-prints/regular/uchiha-3-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769043/deez-prints/regular/uchiha-3-black-back.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-uchiha-4",
    "title": "ITACHI ECLIPSE REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769056/deez-prints/regular/uchiha-4-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769066/deez-prints/regular/uchiha-4-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769063/deez-prints/regular/uchiha-4-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769060/deez-prints/regular/uchiha-4-black-front.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-uchiha-5",
    "title": "ITACHI AKATSUKI REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769069/deez-prints/regular/uchiha-5-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769072/deez-prints/regular/uchiha-5-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769075/deez-prints/regular/uchiha-5-white-front.jpg"
    ],
    "colors": [
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-yamoto-1",
    "title": "YAMAMOTO INFERNO REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769105/deez-prints/regular/yamoto1-Black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769098/deez-prints/regular/yamoto-1-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769096/deez-prints/regular/yamoto-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769101/deez-prints/regular/yamoto-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769108/deez-prints/regular/yamoto1-Black-front.jpg"
    ],
    "colors": [
      "Beige",
      "Grey",
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-zoro-1",
    "title": "ZORO RONIN REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769116/deez-prints/regular/zoro-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769110/deez-prints/regular/zoro-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769113/deez-prints/regular/zoro-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769119/deez-prints/regular/zoro-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769122/deez-prints/regular/zoro-1-white-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-zoro-2",
    "title": "ZORO BUSHIDO REGULAR TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769126/deez-prints/regular/zoro-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769140/deez-prints/regular/zoro-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769137/deez-prints/regular/zoro-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769130/deez-prints/regular/zoro-2-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769133/deez-prints/regular/zoro-2-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "mug-white",
    "title": "SKULL CERAMIC MUG",
    "price": 600,
    "category": "accessories",
    "subcategory": "mugs",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772897480/mug_sample_sfu1kd.webp"
    ],
    "colors": [
      "White"
    ],
    "rating": 5
  },
  {
    "id": "mug-colored",
    "title": "SUBLIMATION MUG (INNER + HANDLE COLORED)",
    "price": 1200,
    "category": "accessories",
    "subcategory": "mugs",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773596802/mug_collection_gntc3f.webp"
    ],
    "colors": [
      "Red",
      "Green",
      "Black",
      "Blue"
    ],
    "rating": 5
  },
  {
    "id": "mug-manga-panel",
    "title": "MANGA PANEL MUG",
    "price": 2000,
    "category": "accessories",
    "subcategory": "mugs",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773596802/mug_collection_gntc3f.webp"
    ],
    "colors": [
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "tapestry-berserk-eclipse",
    "title": "BERSERK ECLIPSE TAPESTRY",
    "price": 1000,
    "category": "accessories",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/berserk_eclipse_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "tapestry-cyber-city",
    "title": "CYBER CITY NIGHT TAPESTRY",
    "price": 2000,
    "category": "accessories",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/cyber_city_night_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "art-drop"
  },
  {
    "id": "tapestry-manga-panel",
    "title": "ITACHI MANGA PANEL TAPESTRY",
    "price": 2100,
    "category": "accessories",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/itachi_manga_panel_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "tapestry-rick-and-morty",
    "title": "RICK & MORTY TAPESTRY",
    "price": 2000,
    "category": "accessories",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/rick_and_morty_tapestry.webp"
    ],
    "colors": [],
    "rating": 5
  },
  {
    "id": "tapestry-vagabond",
    "title": "VAGABOND TAPESTRY",
    "price": 2100,
    "category": "accessories",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/vagabond_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "kanye-yeezus-shirt",
    "title": "SCARLET BLOOM TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "graphic",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772652301/Gemini_Generated_Image_ox19ckox19ckox19_sfssfg.png",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772651794/rose1_fg88h0.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772651795/backrose1_iqatfb.webp"
    ],
    "colors": [],
    "rating": 5
  },
  {
    "id": "breakout-tee",
    "title": "BREAKOUT TEE",
    "price": 1500,
    "category": "t-shirts",
    "subcategory": "graphic",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773255816/breakoutvariations_birjvm.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772738506/breakb_zkkch0.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772738506/break2_bnjlfy.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773255816/breakoutvariations_birjvm.webp"
    ],
    "colors": [],
    "rating": 5
  },
  {
    "id": "berserk-tee",
    "title": "BERSERK TEE",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "graphic",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772739461/bersk_B_yzgt10.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772739461/berserk_Bb_dsrns9.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772739462/whtieb_mewjvg.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772739461/white_ber_bztrq9.webp"
    ],
    "colors": [],
    "rating": 4
  },
  {
    "id": "tshirt-reg-5",
    "title": "SPIDERVERSE TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772737932/sppiderf_aqsefr.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772737932/sppiderb_srlaq3.webp"
    ],
    "colors": [
      "Black",
      "White",
      "Olive",
      "Sand"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-reg-2",
    "title": "DIVINE TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772738656/divin_en7ejg.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772738656/div_uzioib.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 4
  },
  {
    "id": "tshirt-reg-3",
    "title": "LCNST TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883234/lcsntregF_g3cnas.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 4
  },
  {
    "id": "tshirt-reg-4",
    "title": "SNAKE TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883233/snakeREGF_ezwmpp.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772909295/whitesnakeREGF_qczni7.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 4
  },
  {
    "id": "tshirt-reg-6",
    "title": "ABSTRACT WINGS TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772737955/calligraphyf_i50rtp.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772737946/wingsback_ojdcgx.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 4
  },
  {
    "id": "tshirt-reg-7",
    "title": "FERRARI TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772908159/regferrariFblack_kpig1e.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772908160/regferrariBblack_wgsjpf.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 4
  },
  {
    "id": "tshirt-acid-9",
    "title": "SPIDERVERSE ACID WASH TEE",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085749/spiderAcidBack_dlpk7d.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773086650/spiderAcidF_m4jkna.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-acid-1",
    "title": "BERSERK WARRIOR ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085749/AcidBerB_hlqkml.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085750/AcidBerF_csztus.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-acid-2",
    "title": "DIVINE ACID WASH TEE",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085749/DivineAcidF_xi1lrp.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085749/DivineAcidB_k4xqvo.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-acid-3",
    "title": "PUNK IS DEAD ACID WASH TEE",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085749/PunkAcidF_rz3omv.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-acid-4",
    "title": "BERSERK SKULL BLADE ACID WASH TEE",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085750/AcidBerserkEmbossF_izdjez.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-acid-5",
    "title": "FERRARI ACID WASH TEE",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085750/AcidFerrariF_wlx5yi.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085750/AcidFerrariB_oechir.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773506363/ferari_model_mzzxev.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-acid-6",
    "title": "KNIGHTFALL ACID WASH TEE",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085757/AcidKnioghtF_smiizk.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-acid-7",
    "title": "ABSTRACT WINGS ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773086408/acidwingsB_kejkg1.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085757/AcidWingsF_nb80ux.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-acid-8",
    "title": "BERSERK ACID WASH TEE",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085752/BerserkAcidB_pow8mm.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085749/BerserkAcidF_x9zx9m.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-acid-10",
    "title": "BREAKOUT ACID WASH TEE",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773086685/breakoutAcid_dp04ei.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-drop-1",
    "title": "Berserk Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772898857/berserkdropwF_kacpml.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772898857/berserkdropwb_ap83rw.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883554/berserkdropf_bed9qx.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883553/berserkdropb_ktediz.webp"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-drop-2",
    "title": "DIVINE DRP SHLDR",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883558/divinedropf_rdsrbr.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883558/divinedropb_gr0u8g.webp"
    ],
    "colors": [
      "Black",
      "beige",
      "White"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-drop-3",
    "title": "PUNK IS DEAD DRP SHLDR",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883545/punkdropf_wrggcm.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772884578/punkdropfWHITE_o74ukj.webp"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-drop-4",
    "title": "LCNST DRP SHLDR",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772884869/LCNSTWHITE_gully7.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883562/lcsntDropF_tlpen9.webp"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-drop-5",
    "title": "TBSM CALM DRP SHLDR",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904108/tbsmcalmDropf_l9ue5n.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904108/tbsmcalmb_iycg6e.webp"
    ],
    "colors": [
      "White"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-drop-6",
    "title": "TBSM ENCORE DRP SHLDR",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904108/tbsmencoreDropf_zg7rey.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904108/tbsmencoreb_qb39e5.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-drop-7",
    "title": "Punish Drop Shoulder Tee",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904108/whiteskulldropf_wvd5fg.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904109/whiteskulldropb_vubnr2.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904108/blackskulldropf_flp7ma.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904109/blackskulldropb_yq9f2b.webp"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-drop-8",
    "title": "FERRARI DRP SHLDR",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772908159/ferrariFblack_vnhkw1.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772908160/ferrariBblack_ofgzyq.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-drop-9",
    "title": "TBSM DRP SHLDR",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772908159/whitesmdropF_tfl5vw.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-drop-10",
    "title": "ABSTRACT WINGS DRP SHLDR",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773255990/wingsdropF_shnexu.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773255989/wingsdropb_uzek1d.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773255893/wingsvariations_u6b8p5.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5
  },
  {
    "id": "tshirt-drop-11",
    "title": "SNAKE DRP SHLDR",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772909295/whitesnakeDropF_choivf.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883546/snakeDropF_t9bwzi.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773256442/snakevariations_f1h87f.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5
  }
];

// ─── Product Override Merge ────────────────────────────────────────────────────

/**
 * Merge a map of database overrides onto the static products array.
 * Returns a new array — does NOT mutate the original.
 */
export function mergeOverrides(
  base: Product[],
  overrides: Record<string, ProductOverrideData>
): Product[] {
  if (!overrides || Object.keys(overrides).length === 0) return base;
  return base.map((p) => {
    const ov = overrides[p.id];
    if (!ov) return p;
    return {
      ...p,
      ...(ov.title !== undefined && { title: ov.title }),
      ...(ov.price !== undefined && { price: ov.price }),
      ...(ov.description !== undefined && { description: ov.description }),
      ...(ov.sizes !== undefined && { sizes: ov.sizes }),
      ...(ov.colors !== undefined && { colors: ov.colors }),
      ...(ov.aesthetic !== undefined && { aesthetic: ov.aesthetic }),
    };
  });
}

import { getProductOverridesFn } from "@/lib/productFunctions";

/**
 * Fetch product overrides from the DB.
 * Works from both client-side and during SSR.
 * Returns a record keyed by product ID.
 */
export async function fetchProductOverrides(): Promise<Record<string, ProductOverrideData>> {
  try {
    const overrides = await getProductOverridesFn();
    if (overrides && typeof overrides === "object") {
      return overrides;
    }
  } catch (err) {
    console.warn("getProductOverridesFn error, trying fallback:", err);
  }

  try {
    if (typeof window === "undefined") {
      const { getProductOverridesFromDb } = await import("@/lib/dbService");
      return await getProductOverridesFromDb();
    }
    const res = await fetch("/api/products");
    if (!res.ok) return {};
    const json = await res.json();
    return json.ok ? json.overrides : {};
  } catch {
    return {};
  }
}

/**
 * Get the full product list with DB overrides applied.
 * This is the primary function all product-consuming code should use.
 */
export async function getProducts(): Promise<Product[]> {
  const overrides = await fetchProductOverrides();
  return mergeOverrides(products, overrides);
}

export type ProductWithTimestamp = Product & {
  lastmod: string;
};

/**
 * Get products with accurate update timestamps (lastmod) for sitemap generation.
 */
export async function getProductsWithTimestamps(): Promise<ProductWithTimestamp[]> {
  let dbMetadata: Record<string, { data: ProductOverrideData; updatedAt?: string }> = {};

  try {
    if (typeof window === "undefined") {
      const { getProductOverridesWithMetadataFromDb } = await import("@/lib/dbService");
      dbMetadata = await getProductOverridesWithMetadataFromDb();
    }
  } catch (err) {
    console.warn("Failed to fetch product overrides with metadata:", err);
  }

  let baseCatalogLastMod = new Date().toISOString();
  if (typeof window === "undefined") {
    try {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const filePath = path.resolve(process.cwd(), "src/data/products.ts");
      if (fs.existsSync(filePath)) {
        baseCatalogLastMod = fs.statSync(filePath).mtime.toISOString();
      }
    } catch {
      /* fallback */
    }
  }

  const overridesMap: Record<string, ProductOverrideData> = {};
  for (const [id, meta] of Object.entries(dbMetadata)) {
    if (meta && meta.data) {
      overridesMap[id] = meta.data;
    }
  }

  const merged = mergeOverrides(products, overridesMap);

  return merged.map((p) => {
    const meta = dbMetadata[p.id];
    const lastmod = meta?.updatedAt || baseCatalogLastMod;
    return {
      ...p,
      lastmod,
    };
  });
}
