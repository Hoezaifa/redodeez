/**
 * Campaign Prompt System & Asset Manager for Deez Prints Catalogue
 * Preserves 100% authentic garment details (artwork, print placement, wash texture, fit)
 * while generating 20+ campaign photography angles across diverse male and female models.
 */

export type PhotographyStyle =
  | "style01_overhead_close_up"
  | "style02_medium_close_up"
  | "style03_birds_eye_walking"
  | "style04_three_quarter_back"
  | "style05_fullbody_centered"
  | "sitting_pose"
  | "crouching_pose"
  | "side_profile"
  | "walking_motion"
  | "looking_over_shoulder"
  | "sleeve_detail"
  | "chest_print_detail"
  | "fabric_texture_macro"
  | "flat_lay"
  | "folded_product"
  | "hanging_product"
  | "ghost_mannequin"
  | "studio_front"
  | "studio_back";

export type ModelAttribute = {
  gender: "male" | "female";
  hair: string;
  accessories?: string;
  pose: string;
  cameraAngle: string;
  lighting: string;
};

export const PHOTOGRAPHY_TEMPLATES: Record<PhotographyStyle, ModelAttribute> = {
  style01_overhead_close_up: {
    gender: "female",
    hair: "slicked back bun",
    accessories: "silver rings and bracelets",
    pose: "Kneeling looking up with hands extended toward camera creating foreground depth",
    cameraAngle: "Extreme overhead close-up looking down at kneeling model",
    lighting: "Blown-out white seamless studio, high contrast commercial lighting",
  },
  style02_medium_close_up: {
    gender: "male",
    hair: "buzz cut",
    accessories: "silver rings and chain",
    pose: "Medium close-up portrait with hands resting naturally over chest area",
    cameraAngle: "Eye-level medium portrait",
    lighting: "Crisp white seamless studio backdrop, strong rim lighting",
  },
  style03_birds_eye_walking: {
    gender: "female",
    hair: "long silver hair",
    accessories: "minimal silver studs",
    pose: "Model walking while holding the back hem of the shirt slightly over head to reveal artwork",
    cameraAngle: "High-angle bird's-eye fashion lookbook angle",
    lighting: "Clean commercial white studio backdrop",
  },
  style04_three_quarter_back: {
    gender: "male",
    hair: "short textured fade",
    accessories: "wrist cuff",
    pose: "Three-quarter back portrait looking over shoulder to emphasize back graphic artwork",
    cameraAngle: "Low-angle back three-quarter portrait",
    lighting: "Dramatic rim lighting, dark studio to white seamless gradient",
  },
  style05_fullbody_centered: {
    gender: "female",
    hair: "braids",
    accessories: "cargo pants and silver rings",
    pose: "Centered full-body standing pose with hands inside wide-leg cargo pockets",
    cameraAngle: "Straight-on full body shot",
    lighting: "Blown-out white seamless background, high contrast studio lighting",
  },
  sitting_pose: {
    gender: "male",
    hair: "curly fade",
    accessories: "leather watch",
    pose: "Seated on studio cube, leaning forward with elbows on knees",
    cameraAngle: "Slight low angle medium full shot",
    lighting: "Soft key light with subtle rim shadow",
  },
  crouching_pose: {
    gender: "female",
    hair: "bob cut",
    accessories: "statement rings",
    pose: "Crouching low in a streetwear lookbook stance",
    cameraAngle: "Low-angle three-quarter portrait",
    lighting: "High-contrast commercial flash studio photography",
  },
  side_profile: {
    gender: "male",
    hair: "short black hair",
    pose: "Side profile standing, showing drop shoulder sleeve drape and side silhouette",
    cameraAngle: "Side profile medium shot",
    lighting: "Soft fill light with sharp edge highlight",
  },
  walking_motion: {
    gender: "female",
    hair: "wavy shoulder length",
    pose: "In motion walking across studio with slight motion blur effect",
    cameraAngle: "Eye-level wide shot",
    lighting: "Bright fashion studio lighting",
  },
  looking_over_shoulder: {
    gender: "male",
    hair: "buzz cut",
    pose: "Turning back toward camera looking over shoulder",
    cameraAngle: "Medium portrait",
    lighting: "Dramatic high contrast rim lighting",
  },
  sleeve_detail: {
    gender: "female",
    hair: "N/A",
    pose: "Close-up shot of heavy cotton sleeve stitching and cuff fit",
    cameraAngle: "Macro close-up",
    lighting: "Studio detail lighting",
  },
  chest_print_detail: {
    gender: "male",
    hair: "N/A",
    pose: "Macro close-up on DTF chest artwork print texture and color saturation",
    cameraAngle: "Direct chest macro shot",
    lighting: "High detail studio photography light",
  },
  fabric_texture_macro: {
    gender: "female",
    hair: "N/A",
    pose: "Close-up macro of 240 GSM heavy cotton weave and vintage acid wash wash pattern",
    cameraAngle: "Macro lens close-up",
    lighting: "Raking side light to reveal fabric depth",
  },
  flat_lay: {
    gender: "male",
    hair: "N/A",
    pose: "Garment laid completely flat on clean white concrete surface with accessories",
    cameraAngle: "90-degree overhead flat lay",
    lighting: "Soft even studio lighting",
  },
  folded_product: {
    gender: "female",
    hair: "N/A",
    pose: "Neatly folded t-shirt showcasing chest artwork badge and woven brand tag",
    cameraAngle: "45-degree angle table shot",
    lighting: "Studio soft box lighting",
  },
  hanging_product: {
    gender: "male",
    hair: "N/A",
    pose: "Garment suspended on industrial stainless steel streetwear hanger",
    cameraAngle: "Eye-level product shot",
    lighting: "White seamless studio photography",
  },
  ghost_mannequin: {
    gender: "female",
    hair: "N/A",
    pose: "3D ghost mannequin product display showing true garment silhouette and drape",
    cameraAngle: "Front product portrait",
    lighting: "Uniform studio lighting",
  },
  studio_front: {
    gender: "male",
    hair: "N/A",
    pose: "Clean commercial studio product front shot",
    cameraAngle: "Front centered",
    lighting: "Ecommerce studio lighting",
  },
  studio_back: {
    gender: "female",
    hair: "N/A",
    pose: "Clean commercial studio product back shot",
    cameraAngle: "Back centered",
    lighting: "Ecommerce studio lighting",
  },
};

/**
 * Generates an automated image generation prompt for any catalogue item & photography style
 */
export function generateCampaignPrompt(
  productTitle: string,
  category: string,
  style: PhotographyStyle,
  garmentReferenceImagePath: string
): { prompt: string; imagePaths: string[] } {
  const tpl = PHOTOGRAPHY_TEMPLATES[style];
  const prompt = `Transform the garment from the reference image into a high-end commercial fashion campaign photograph. The ${tpl.gender} model with ${tpl.hair}${tpl.accessories ? ` wearing ${tpl.accessories}` : ""} is wearing the EXACT ${productTitle} (${category}) from the input image. PRESERVE 100% EXACT: graphic artwork, print placement, color saturation, proportions, wash texture, collar stitching, drop shoulder cut, and fabric drape from the input garment. POSE: ${tpl.pose}. CAMERA ANGLE: ${tpl.cameraAngle}. SETTING: ${tpl.lighting}.`;

  return {
    prompt,
    imagePaths: [garmentReferenceImagePath],
  };
}

/**
 * Returns available campaign assets for a collection
 */
export const COLLECTION_CAMPAIGN_ASSETS: Record<string, string[]> = {
  "drop-shoulder": [
    "/campaign/drop_shoulder_user.jpg",
    "/campaign/style04_back_portrait.png",
    "/campaign/style05_fullbody_cargo.png",
    "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883554/berserkdropf_bed9qx.webp",
    "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773574932/drp_btiwfr.webp",
  ],
  "acid-wash": [
    "/campaign/acid_wash_user.png",
    "/campaign/style05_fullbody_cargo.png",
    "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773086650/spiderAcidF_m4jkna.webp",
    "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773506363/ferari_model_mzzxev.webp",
  ],
  "t-shirts": [
    "/campaign/regular_tees_user.jpg",
    "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773573578/regulars_vtmc2k.webp",
    "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773255816/breakoutvariations_birjvm.webp",
    "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772739461/white_ber_bztrq9.webp",
  ],
};
