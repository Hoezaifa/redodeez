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
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770004/deez-prints/acid/aizen-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770002/deez-prints/acid/aizen-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770010/deez-prints/acid/aizen-gre-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770007/deez-prints/acid/aizen-gre-back.jpg"
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
    "title": "BABY ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770019/deez-prints/acid/baby-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770016/deez-prints/acid/baby-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770025/deez-prints/acid/baby-maroon-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770013/deez-prints/acid/baby-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770022/deez-prints/acid/baby-maroon-back.jpg"
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
    "price": 3200,
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
    "title": "BERSERK ACID WASH TEE",
    "price": 3200,
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
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770052/deez-prints/acid/berserk2--black-back.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-berserk-3",
    "title": "BERSERK 3 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770043/deez-prints/acid/berserk-3-maroon-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770040/deez-prints/acid/berserk-3-maroon-back.jpg"
    ],
    "colors": [
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-bleach",
    "title": "BLEACH ACID WASH TEE",
    "price": 3200,
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
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770067/deez-prints/acid/bluelock-maroon-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770061/deez-prints/acid/bluelock-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770064/deez-prints/acid/bluelock-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770070/deez-prints/acid/bluelock-maroon-front.jpg"
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
    "title": "CHAINSAW ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770090/deez-prints/acid/chainsaw-maroon-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770081/deez-prints/acid/chainsaw-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770084/deez-prints/acid/chainsaw-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770087/deez-prints/acid/chainsaw-maroon-back.jpg"
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
    "title": "CHAINSAW 2 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770079/deez-prints/acid/chainsaw-2-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770073/deez-prints/acid/chainsaw-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770075/deez-prints/acid/chainsaw-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770096/deez-prints/acid/chainsaw2-maroon-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770094/deez-prints/acid/chainsaw2-maroon-back.jpg"
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
    "title": "CURSE ACID WASH TEE",
    "price": 3200,
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
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770102/deez-prints/acid/dark-night-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770108/deez-prints/acid/darknight-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770105/deez-prints/acid/dark-night-black-front.jpg"
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
    "title": "DBZ 1 ACID WASH TEE",
    "price": 3200,
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
    "title": "DBZ 2 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770118/deez-prints/acid/dbz-2-blkac-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770121/deez-prints/acid/dbz-2-blkac-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770124/deez-prints/acid/dbz-2-grey-front.jpg"
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
    "title": "DBZ 3 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770136/deez-prints/acid/dbz-3-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770127/deez-prints/acid/dbz-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770130/deez-prints/acid/dbz-3-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770133/deez-prints/acid/dbz-3-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770141/deez-prints/acid/dbz-3-maroon-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770138/deez-prints/acid/dbz-3-maroon-back.jpg"
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
    "title": "DBZ 4 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770154/deez-prints/acid/dbz-4-maroon-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770144/deez-prints/acid/dbz-4-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770147/deez-prints/acid/dbz-4-black-front.jpg",
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
    "title": "DBZ 5 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770163/deez-prints/acid/dbz-5-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770160/deez-prints/acid/dbz-5-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770166/deez-prints/acid/dbz-5-grey-front.jpg"
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
    "title": "DBZ 6 ACID WASH TEE",
    "price": 3200,
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
    "title": "DBZ 7 ACID WASH TEE",
    "price": 3200,
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
    "title": "EVIL ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770186/deez-prints/acid/evil-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770180/deez-prints/acid/evil-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770184/deez-prints/acid/evil-white-back.jpg"
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
    "title": "EYE ACID WASH TEE",
    "price": 3200,
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
    "title": "EYES ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770195/deez-prints/acid/eyes-blackkk-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770198/deez-prints/acid/eyes-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770192/deez-prints/acid/eyes-blackkk-back.jpg"
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
    "title": "FIRE ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770201/deez-prints/acid/fire-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770204/deez-prints/acid/fire-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770207/deez-prints/acid/fire-grey-front.jpg"
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
    "price": 3200,
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
    "title": "HANDS ACID WASH TEE",
    "price": 3200,
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
    "title": "HORNS ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770219/deez-prints/acid/horns-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770222/deez-prints/acid/horns-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770225/deez-prints/acid/horns-grey-front.jpg"
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
    "title": "KAIJIN ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770231/deez-prints/acid/kaijin-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770228/deez-prints/acid/kaijin-grey-back.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-konichiwa",
    "title": "KONICHIWA ACID WASH TEE",
    "price": 3200,
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
    "title": "LUFFY 1 ACID WASH TEE",
    "price": 3200,
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
    "title": "LUFFY 2 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770255/deez-prints/acid/luffy-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770253/deez-prints/acid/luffy-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770258/deez-prints/acid/luffy-2-grey-front.jpg"
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
    "title": "LUFFY 3 ACID WASH TEE",
    "price": 3200,
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
    "title": "LUFFY 4 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770267/deez-prints/acid/luffy-4-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770270/deez-prints/acid/luffy-4-greyt-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770264/deez-prints/acid/luffy-4-black-back.jpg"
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
    "title": "MADARA ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770279/deez-prints/acid/madara-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770276/deez-prints/acid/madara-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770273/deez-prints/acid/madara-black-back.jpg"
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
    "title": "MOBLAND ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770288/deez-prints/acid/mobland-maroon-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770282/deez-prints/acid/mobland-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770285/deez-prints/acid/mobland-maroon-back.jpg"
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
    "title": "NARUTO 1 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770291/deez-prints/acid/naruto-1-b_ack-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770294/deez-prints/acid/naruto-1-b_ack-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770297/deez-prints/acid/naruto-1-grey-front.jpg"
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
    "title": "NARUTO 2 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770300/deez-prints/acid/naruto-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770303/deez-prints/acid/naruto-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770306/deez-prints/acid/naruto-2-grey-front.jpg"
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
    "title": "NARUTO 3 ACID WASH TEE",
    "price": 3200,
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
    "title": "NARUTO 4 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770315/deez-prints/acid/naruto-4-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770322/deez-prints/acid/naruto-4-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770318/deez-prints/acid/naruto-4-black-front.jpg"
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
    "title": "NARUTO 5 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770334/deez-prints/acid/naruto-5-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770325/deez-prints/acid/naruto-5-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770331/deez-prints/acid/naruto-5-grey-back.jpg",
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
    "title": "PETER ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770337/deez-prints/acid/peter-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770340/deez-prints/acid/peter-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770346/deez-prints/acid/peter-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770343/deez-prints/acid/peter-grey-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "cinema-collection"
  },
  {
    "id": "dp-acid-wash-shoot",
    "title": "SHOOT ACID WASH TEE",
    "price": 3200,
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
    "title": "SOLO 1 ACID WASH TEE",
    "price": 3200,
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
    "title": "SOLO 2 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770361/deez-prints/acid/solo-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770358/deez-prints/acid/solo-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770370/deez-prints/acid/solo2--grey-front.jpg"
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
    "title": "SPEED ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770373/deez-prints/acid/speed-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770379/deez-prints/acid/speed-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770376/deez-prints/acid/speed-white-back.jpg"
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
    "title": "SUKUNA ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770352/deez-prints/acid/sakuna-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770382/deez-prints/acid/sukuna-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770349/deez-prints/acid/sakuna-black-back.jpg"
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
    "price": 3200,
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
    "title": "YAMOTO ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770388/deez-prints/acid/yamoto-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770390/deez-prints/acid/yamoto-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770393/deez-prints/acid/yamoto-grey-front.jpg"
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
    "title": "ZORO 1 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770405/deez-prints/acid/zoro-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770397/deez-prints/acid/zoro-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770402/deez-prints/acid/zoro-1-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770400/deez-prints/acid/zoro-1-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-zoro-2",
    "title": "ZORO 2 ACID WASH TEE",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770408/deez-prints/acid/zoro-2-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-zoro-3",
    "title": "ZORO 3 ACID WASH TEE",
    "price": 3200,
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
    "title": "ACE DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769157/deez-prints/drops/ace-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769143/deez-prints/drops/ace-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769146/deez-prints/drops/ace-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769148/deez-prints/drops/ace-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769154/deez-prints/drops/ace-white-back.jpg",
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
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769165/deez-prints/drops/aizen-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769163/deez-prints/drops/aizen-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769160/deez-prints/drops/aizen-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769174/deez-prints/drops/aizen-white-front.jpg",
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
    "title": "ARISE DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769178/deez-prints/drops/arise-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769187/deez-prints/drops/arise-black-front.jpg",
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
    "title": "BABY DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769210/deez-prints/drops/baby-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769196/deez-prints/drops/baby-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769202/deez-prints/drops/baby-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769205/deez-prints/drops/baby-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769193/deez-prints/drops/baby-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769199/deez-prints/drops/baby-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769207/deez-prints/drops/baby-white-back.jpg"
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
    "title": "BATMAN GRYE DROP SHOULDER TEE",
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
    "title": "BERSERK 2 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769216/deez-prints/drops/berserk-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769219/deez-prints/drops/berserk-2-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-berserk-black-1",
    "title": "BERSERK BLACK 1 DROP SHOULDER TEE",
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
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769239/deez-prints/drops/bleach-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769230/deez-prints/drops/bleach-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769227/deez-prints/drops/bleach-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769236/deez-prints/drops/bleach-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769233/deez-prints/drops/bleach-blue-back.jpg",
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
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769245/deez-prints/drops/bluelock-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769255/deez-prints/drops/bluelock-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769248/deez-prints/drops/bluelock-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769252/deez-prints/drops/bluelock-grey-front.jpg",
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
    "title": "CHAINSAW 1 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769273/deez-prints/drops/chainsaw-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769261/deez-prints/drops/chainsaw-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769264/deez-prints/drops/chainsaw-1-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-chainsaw-1-blyue",
    "title": "CHAINSAW 1 BLYUE DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769267/deez-prints/drops/chainsaw-1-blyue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769270/deez-prints/drops/chainsaw-1-blyue-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-chainsaw-2",
    "title": "CHAINSAW 2 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769291/deez-prints/drops/chainsaw2-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769279/deez-prints/drops/chainsaw-2-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769276/deez-prints/drops/chainsaw-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769287/deez-prints/drops/chainsaw-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769283/deez-prints/drops/chainsaw-2-black-back.jpg",
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
    "title": "CURSE DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769300/deez-prints/drops/curse-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769303/deez-prints/drops/curse-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769297/deez-prints/drops/curse-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769306/deez-prints/drops/curse-blue-front.jpg"
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
    "title": "CURSE WHTIE DROP SHOULDER TEE",
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
    "title": "DBZ 1 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769340/deez-prints/drops/dbz-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769344/deez-prints/drops/dbz-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769348/deez-prints/drops/dbz-1-grey-front.jpg"
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
    "title": "DBZ 2 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769369/deez-prints/drops/dbz-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769352/deez-prints/drops/dbz-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769357/deez-prints/drops/dbz-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769364/deez-prints/drops/dbz-2-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769361/deez-prints/drops/dbz-2-blue-back.jpg",
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
    "title": "DBZ 3 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769379/deez-prints/drops/dbz-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769335/deez-prints/drops/dbz--3-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769332/deez-prints/drops/dbz--3-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769372/deez-prints/drops/dbz-3-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769376/deez-prints/drops/dbz-3-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769383/deez-prints/drops/dbz-3-black-front.jpg"
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
    "title": "DBZ 4 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769409/deez-prints/drops/dbz-4-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769386/deez-prints/drops/dbz-4-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769391/deez-prints/drops/dbz-4-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769395/deez-prints/drops/dbz-4-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769406/deez-prints/drops/dbz-4-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769398/deez-prints/drops/dbz-4-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769402/deez-prints/drops/dbz-4-grey-front.jpg"
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
    "title": "DBZ 5 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769421/deez-prints/drops/dbz-5-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769435/deez-prints/drops/dbz-5-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769412/deez-prints/drops/dbz-5-beige-back.jpg",
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
    "title": "DBZ 6 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769455/deez-prints/drops/dbz-6-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769438/deez-prints/drops/dbz-6-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769441/deez-prints/drops/dbz-6-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769449/deez-prints/drops/dbz-6-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769445/deez-prints/drops/dbz-6-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769452/deez-prints/drops/dbz-6-white-back.jpg"
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
    "title": "EVIL DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769470/deez-prints/drops/evil-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769461/deez-prints/drops/evil-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769476/deez-prints/drops/evil-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769479/deez-prints/drops/evil-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769459/deez-prints/drops/evil-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769467/deez-prints/drops/evil-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769473/deez-prints/drops/evil-blue-back.jpg"
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
    "title": "EYE DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769493/deez-prints/drops/eye-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769486/deez-prints/drops/eye-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769483/deez-prints/drops/eye-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769489/deez-prints/drops/eye-white-back.jpg"
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
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769503/deez-prints/drops/fire-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769497/deez-prints/drops/fire-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769500/deez-prints/drops/fire-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769506/deez-prints/drops/fire-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769516/deez-prints/drops/fire-grey-front.jpg"
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
    "title": "FIRE BLEU DROP SHOULDER TEE",
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
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769522/deez-prints/drops/fuckoff-black-front.jpg",
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
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769544/deez-prints/drops/goodfellas-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769531/deez-prints/drops/goodfellas-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769538/deez-prints/drops/goodfellas-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769528/deez-prints/drops/goodfellas-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769534/deez-prints/drops/goodfellas-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769541/deez-prints/drops/goodfellas-white-back.jpg"
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
    "title": "HANDS DROP SHOULDER TEE",
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
    "title": "HEAD DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769559/deez-prints/drops/head-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769555/deez-prints/drops/head-black-back.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-horn",
    "title": "HORN DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769580/deez-prints/drops/horn-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769561/deez-prints/drops/horn-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769567/deez-prints/drops/horn-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769574/deez-prints/drops/horn-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769564/deez-prints/drops/horn-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769570/deez-prints/drops/horn-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769577/deez-prints/drops/horn-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769583/deez-prints/drops/horn-white-front.jpg"
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
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769704/deez-prints/drops/madara-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769708/deez-prints/drops/madara-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769928/deez-prints/drops/tachi-whtie-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769592/deez-prints/drops/itachi-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769716/deez-prints/drops/madara-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769925/deez-prints/drops/tachi-whtie-back.jpg"
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
    "id": "dp-drop-shoulder-kaijin",
    "title": "KAIJIN DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769611/deez-prints/drops/kaijin-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769601/deez-prints/drops/kaijin-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769598/deez-prints/drops/kaijin-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769608/deez-prints/drops/kaijin-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769604/deez-prints/drops/kaijin-blue-back.jpg",
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
    "title": "KONICHIWA DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769630/deez-prints/drops/konichiwa-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769634/deez-prints/drops/konichiwa-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769627/deez-prints/drops/konichiwa-black-back.jpg"
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
    "title": "LUFFY 1 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769668/deez-prints/drops/luffy-1-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769645/deez-prints/drops/luffy-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769651/deez-prints/drops/luffy-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769662/deez-prints/drops/luffy-1-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769648/deez-prints/drops/luffy-1-beige-front.jpg",
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
    "title": "LUFFY 2 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769674/deez-prints/drops/luffy-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769680/deez-prints/drops/luffy-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769677/deez-prints/drops/luffy-2-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769683/deez-prints/drops/luffy-2-white-front.jpg"
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
    "title": "LUFFY 3 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769701/deez-prints/drops/luffy-3-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769689/deez-prints/drops/luffy-3-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769695/deez-prints/drops/luffy-3-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769686/deez-prints/drops/luffy-3-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769692/deez-prints/drops/luffy-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769698/deez-prints/drops/luffy-3-white-back.jpg"
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
    "title": "MADARA DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769710/deez-prints/drops/madara-blackl-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769720/deez-prints/drops/madara-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769713/deez-prints/drops/madara-blackl-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769723/deez-prints/drops/madara-grey-front.jpg"
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
    "id": "dp-drop-shoulder-mobland",
    "title": "MOBLAND DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769743/deez-prints/drops/mobland-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769735/deez-prints/drops/mobland-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769750/deez-prints/drops/mobland-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769732/deez-prints/drops/mobland-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769747/deez-prints/drops/mobland-white-back.jpg"
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
    "title": "NARUTO DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769831/deez-prints/drops/naruto-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769824/deez-prints/drops/naruto-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769827/deez-prints/drops/naruto-beige-front.jpg",
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
    "title": "NARUTO 2 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769781/deez-prints/drops/naruto-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769754/deez-prints/drops/naruto-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769756/deez-prints/drops/naruto-2-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769760/deez-prints/drops/naruto-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769766/deez-prints/drops/naruto-2-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769778/deez-prints/drops/naruto-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769762/deez-prints/drops/naruto-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769769/deez-prints/drops/naruto-2-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769775/deez-prints/drops/naruto-2-grye-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue",
      "Grey",
      "White"
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
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769792/deez-prints/drops/naruto-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769788/deez-prints/drops/naruto-3-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769784/deez-prints/drops/naruto-3-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769795/deez-prints/drops/naruto-3-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769799/deez-prints/drops/naruto-3-grey-front.jpg"
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
    "id": "dp-drop-shoulder-naruto-4",
    "title": "NARUTO 4 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769821/deez-prints/drops/naruto-4-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769802/deez-prints/drops/naruto-4-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769805/deez-prints/drops/naruto-4-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769811/deez-prints/drops/naruto-4-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769808/deez-prints/drops/naruto-4-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769818/deez-prints/drops/naruto-4-white-back.jpg",
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
    "id": "dp-drop-shoulder-peter",
    "title": "PETER DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769845/deez-prints/drops/peter-blyue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769842/deez-prints/drops/peter-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769839/deez-prints/drops/peter-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769848/deez-prints/drops/peter-blyue-front.jpg",
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
    "title": "REGULAR SERIES DROP SHOULDER TEE",
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
    "title": "SHOOT DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769870/deez-prints/drops/shoot-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769873/deez-prints/drops/shoot-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769859/deez-prints/drops/shoot-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769865/deez-prints/drops/shoot-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769862/deez-prints/drops/shoot-beige-front.jpg",
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
    "title": "SOLO 1 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769876/deez-prints/drops/solo-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769882/deez-prints/drops/solo-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769887/deez-prints/drops/solo1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769878/deez-prints/drops/solo-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769884/deez-prints/drops/solo-1-white-front.jpg",
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
    "title": "SPEED DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769910/deez-prints/drops/speed-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769896/deez-prints/drops/speed-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769902/deez-prints/drops/speed-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769908/deez-prints/drops/speed-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769893/deez-prints/drops/speed-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769899/deez-prints/drops/speed-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769905/deez-prints/drops/speed-blue-back.jpg"
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
    "title": "SUKUNA DROP SHOULDER TEE",
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
    "title": "TITAN DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769931/deez-prints/drops/titan-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769936/deez-prints/drops/titan-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769942/deez-prints/drops/titan-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769934/deez-prints/drops/titan-beige-front.jpg",
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
    "title": "YAMOTO DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769965/deez-prints/drops/yamoto-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769956/deez-prints/drops/yamoto-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769948/deez-prints/drops/yamoto-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769953/deez-prints/drops/yamoto-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769959/deez-prints/drops/yamoto-blue-back.jpg",
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
    "title": "ZORO DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769988/deez-prints/drops/zoro-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769985/deez-prints/drops/zoro-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769982/deez-prints/drops/zoro-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769999/deez-prints/drops/zoro-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769996/deez-prints/drops/zoro-white-back.jpg",
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
    "title": "ZORO 2 DROP SHOULDER TEE",
    "price": 2900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769976/deez-prints/drops/zoro-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769971/deez-prints/drops/zoro-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769974/deez-prints/drops/zoro-2-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769979/deez-prints/drops/zoro-2-white-front.jpg"
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
    "title": "ACE 1 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768411/deez-prints/regular/ace-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768422/deez-prints/regular/ace-1-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768420/deez-prints/regular/ace-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768414/deez-prints/regular/ace-1-black-front.jpg",
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
    "title": "AIZEN REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768437/deez-prints/regular/aizen-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768425/deez-prints/regular/aizen-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768434/deez-prints/regular/aizen-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768428/deez-prints/regular/aizen-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768431/deez-prints/regular/aizen-grey-front.jpg"
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
    "title": "ANIME1 REGULAR OVERSIZED TEE",
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
    "title": "ANIMESHOOT REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768465/deez-prints/regular/animeshootwhite-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768457/deez-prints/regular/animeshootbeige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768462/deez-prints/regular/animeshootwhite-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768459/deez-prints/regular/animeshootbeige-front.jpg"
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
    "title": "BABY REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768470/deez-prints/regular/baby-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768476/deez-prints/regular/baby-whiet-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768468/deez-prints/regular/baby-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768473/deez-prints/regular/baby-whiet-back.jpg"
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
    "title": "BATMAN1 REGULAR OVERSIZED TEE",
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
    "title": "BERSERK REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768511/deez-prints/regular/berserkwhte-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768490/deez-prints/regular/berserk-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768505/deez-prints/regular/berserkbeige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768493/deez-prints/regular/berserk-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768502/deez-prints/regular/berserkbeige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768508/deez-prints/regular/berserkwhte-back.jpg"
    ],
    "colors": [
      "Black",
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-berserk-2",
    "title": "BERSERK 2 REGULAR OVERSIZED TEE",
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
    "id": "dp-regular-bleach",
    "title": "BLEACH REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768523/deez-prints/regular/bleach-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768514/deez-prints/regular/bleach-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768517/deez-prints/regular/bleach-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768520/deez-prints/regular/bleach-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768533/deez-prints/regular/bleach-whte-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768529/deez-prints/regular/bleach-whte-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768526/deez-prints/regular/bleach-grey-front.jpg"
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
    "title": "CHAINSAW 1 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768541/deez-prints/regular/chainsaw-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768538/deez-prints/regular/chainsaw-1-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768535/deez-prints/regular/chainsaw-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768544/deez-prints/regular/chainsaw-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768550/deez-prints/regular/chainsaw-1-white-front.jpg",
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
    "title": "CHAINSAW 2 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768558/deez-prints/regular/chainsaw-2-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768553/deez-prints/regular/chainsaw-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768555/deez-prints/regular/chainsaw-2-black-front.jpg"
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
    "title": "CHINESE REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768564/deez-prints/regular/chinese-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768561/deez-prints/regular/chinese-black-back.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-dbz-1",
    "title": "DBZ 1 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768575/deez-prints/regular/dbz-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768567/deez-prints/regular/dbz-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768570/deez-prints/regular/dbz-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768573/deez-prints/regular/dbz-1-grey-front.jpg",
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
    "id": "dp-regular-dbz-2",
    "title": "DBZ 2 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768661/deez-prints/regular/dbz2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768581/deez-prints/regular/dbz-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768584/deez-prints/regular/dbz-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768664/deez-prints/regular/dbz2-black-front.jpg"
    ],
    "colors": [
      "White",
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-dbz-3",
    "title": "DBZ 3 REGULAR OVERSIZED TEE",
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
    "title": "DBZ 4 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768604/deez-prints/regular/dbz-4-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768593/deez-prints/regular/dbz-4-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768595/deez-prints/regular/dbz-4-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768601/deez-prints/regular/dbz-4-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768599/deez-prints/regular/dbz-4-grey-front.jpg"
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
    "title": "DBZ 5 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768612/deez-prints/regular/dbz-5-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768621/deez-prints/regular/dbz-5-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768607/deez-prints/regular/dbz-5-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768618/deez-prints/regular/dbz-5-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768610/deez-prints/regular/dbz-5-beige-front.jpg",
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
    "title": "DBZ 6 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768629/deez-prints/regular/dbz-6-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768624/deez-prints/regular/dbz-6-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768627/deez-prints/regular/dbz-6-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768632/deez-prints/regular/dbz-6-white-front.jpg"
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
    "title": "DBZ 7 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768635/deez-prints/regular/dbz-7-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768644/deez-prints/regular/dbz-7-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768641/deez-prints/regular/dbz-7-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768638/deez-prints/regular/dbz-7-black-front.jpg"
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
    "title": "DBZ 8 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768658/deez-prints/regular/dbz-8-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768647/deez-prints/regular/dbz-8-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768650/deez-prints/regular/dbz-8-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768656/deez-prints/regular/dbz-8-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768653/deez-prints/regular/dbz-8-grey-front.jpg"
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
    "title": "DREAM REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768670/deez-prints/regular/dreamwhite-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768667/deez-prints/regular/dreamwhite-back.jpg"
    ],
    "colors": [
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-eye",
    "title": "EYE REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768676/deez-prints/regular/eye-balck-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768681/deez-prints/regular/eye-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768687/deez-prints/regular/eyewhite-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768673/deez-prints/regular/eye-balck-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768678/deez-prints/regular/eye-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768684/deez-prints/regular/eyewhite-back.jpg"
    ],
    "colors": [
      "Black",
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-fire",
    "title": "FIRE REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768690/deez-prints/regular/fire-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768693/deez-prints/regular/fire-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768696/deez-prints/regular/fire-grey-front.jpg"
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
    "title": "FUCK REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768699/deez-prints/regular/fuckbeige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768705/deez-prints/regular/fuckblack-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768702/deez-prints/regular/fuckbeige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768708/deez-prints/regular/fuckblack-front.jpg",
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
    "title": "GOODFELLAS REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768717/deez-prints/regular/goodfellas-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768723/deez-prints/regular/goodfellasblack-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768726/deez-prints/regular/goodfellasgrey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768714/deez-prints/regular/goodfellas-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768719/deez-prints/regular/goodfellasblack-back.jpg"
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
    "title": "HANDS REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768729/deez-prints/regular/hands-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768734/deez-prints/regular/hands-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768732/deez-prints/regular/hands-black-front.jpg",
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
    "title": "ICHIGO REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768753/deez-prints/regular/Ichigo-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768741/deez-prints/regular/Ichigo-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768747/deez-prints/regular/Ichigo-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768744/deez-prints/regular/Ichigo-beige-front.jpg",
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
    "title": "ISAGI 1 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768761/deez-prints/regular/isagi-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768767/deez-prints/regular/isagi-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768758/deez-prints/regular/isagi-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768764/deez-prints/regular/isagi-1-grey-front.jpg",
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
    "title": "KAIJIN REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768787/deez-prints/regular/kaijin-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768777/deez-prints/regular/kaijin-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768774/deez-prints/regular/kaijin-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768784/deez-prints/regular/kaijin-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768780/deez-prints/regular/kaijin-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768790/deez-prints/regular/kaijin-white-front.jpg"
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
    "title": "KNIGHT REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768801/deez-prints/regular/knight-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768792/deez-prints/regular/knight-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768798/deez-prints/regular/knight-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768805/deez-prints/regular/knight-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768795/deez-prints/regular/knight-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768808/deez-prints/regular/knight-blue-front.jpg",
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
    "title": "LUFFY 1 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768819/deez-prints/regular/luffy-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768822/deez-prints/regular/luffy-1-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768814/deez-prints/regular/luffy-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768816/deez-prints/regular/luffy-1-beige-front.jpg"
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
    "title": "LUFFY 2 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768852/deez-prints/regular/luffy2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768825/deez-prints/regular/luffy-2-grey-front.jpg",
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
    "title": "LUFFY 3 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768834/deez-prints/regular/luffy-3-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768829/deez-prints/regular/luffy-3-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768832/deez-prints/regular/luffy-3-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768837/deez-prints/regular/luffy-3-white-front.jpg"
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
    "title": "LUFFY 4 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768843/deez-prints/regular/luffy-4-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768849/deez-prints/regular/luffy-4-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768840/deez-prints/regular/luffy-4-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768846/deez-prints/regular/luffy-4-white-back.jpg"
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
    "title": "MADARA 1 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768872/deez-prints/regular/madara-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768860/deez-prints/regular/madara-1-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768857/deez-prints/regular/madara-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768866/deez-prints/regular/madara-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768863/deez-prints/regular/madara-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768875/deez-prints/regular/madara-1-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768869/deez-prints/regular/madara-1-grey-front.jpg"
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
    "title": "MOB REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768881/deez-prints/regular/mob-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768886/deez-prints/regular/mob-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768878/deez-prints/regular/mob-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768883/deez-prints/regular/mob-white-back.jpg"
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
    "title": "NARUTO 1 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768896/deez-prints/regular/naruto-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768890/deez-prints/regular/naruto-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768893/deez-prints/regular/naruto-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768899/deez-prints/regular/naruto-1-white-front.jpg"
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
    "title": "NARUTO 2 REGULAR OVERSIZED TEE",
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
    "title": "NARUTO 3 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768919/deez-prints/regular/naruto3-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768911/deez-prints/regular/naruto-3-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768914/deez-prints/regular/naruto-3-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768917/deez-prints/regular/naruto3-white-back.jpg"
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
    "title": "RESPONSIBILITY REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768934/deez-prints/regular/responsibilty-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768931/deez-prints/regular/responsibilitywhite-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768928/deez-prints/regular/responsibilitywhite-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768925/deez-prints/regular/responsibility-black-front.jpg",
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
    "title": "SOLO 1 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768962/deez-prints/regular/solo-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768957/deez-prints/regular/solo-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768981/deez-prints/regular/solo1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768960/deez-prints/regular/solo-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768965/deez-prints/regular/solo-1-white-front.jpg",
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
    "title": "SOLO 2 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768989/deez-prints/regular/solo2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768968/deez-prints/regular/solo-2-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768977/deez-prints/regular/solo-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768974/deez-prints/regular/solo-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768986/deez-prints/regular/solo2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768971/deez-prints/regular/solo-2-blue-front.jpg"
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
    "title": "SPEED REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769000/deez-prints/regular/speed-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768995/deez-prints/regular/speed-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768992/deez-prints/regular/speed-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768998/deez-prints/regular/speed-white-back.jpg"
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
    "title": "SUKUNA REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769003/deez-prints/regular/sukuna-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769012/deez-prints/regular/sukuna-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768939/deez-prints/regular/sakuna-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769009/deez-prints/regular/sukuna-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769006/deez-prints/regular/sukuna-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768942/deez-prints/regular/sakuna-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769015/deez-prints/regular/sukunagrey-front.jpg"
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
    "id": "dp-regular-tujiro",
    "title": "TUJIRO REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769021/deez-prints/regular/tujiro-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769018/deez-prints/regular/tujiro-black-back.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-uchiha-1",
    "title": "UCHIHA 1 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769092/deez-prints/regular/uchiha1white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769080/deez-prints/regular/uchiha1beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769087/deez-prints/regular/uchiha1black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769078/deez-prints/regular/uchiha1beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769083/deez-prints/regular/uchiha1black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769090/deez-prints/regular/uchiha1white-back.jpg"
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
    "title": "UCHIHA 2 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769023/deez-prints/regular/uchiha-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769033/deez-prints/regular/uchiha-2-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769026/deez-prints/regular/uchiha-2-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769030/deez-prints/regular/uchiha-2-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769039/deez-prints/regular/uchiha-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769036/deez-prints/regular/uchiha-2-white-back.jpg"
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
    "title": "UCHIHA 3 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769050/deez-prints/regular/uchiha-3-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769043/deez-prints/regular/uchiha-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769046/deez-prints/regular/uchiha-3-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769053/deez-prints/regular/uchiha-3-white-front.jpg"
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
    "title": "UCHIHA 4 REGULAR OVERSIZED TEE",
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
    "title": "UCHIHA 5 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769075/deez-prints/regular/uchiha-5-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769072/deez-prints/regular/uchiha-5-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769069/deez-prints/regular/uchiha-5-grey-front.jpg"
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
    "title": "YAMOTO 1 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769105/deez-prints/regular/yamoto1-Black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769096/deez-prints/regular/yamoto-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769098/deez-prints/regular/yamoto-1-beige-front.jpg",
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
    "title": "ZORO 1 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769122/deez-prints/regular/zoro-1-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769110/deez-prints/regular/zoro-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769113/deez-prints/regular/zoro-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769119/deez-prints/regular/zoro-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769116/deez-prints/regular/zoro-1-grey-front.jpg"
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
    "title": "ZORO 2 REGULAR OVERSIZED TEE",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769126/deez-prints/regular/zoro-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769137/deez-prints/regular/zoro-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769130/deez-prints/regular/zoro-2-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769133/deez-prints/regular/zoro-2-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769140/deez-prints/regular/zoro-2-white-front.jpg"
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
