/**
 * OUR WORK gallery images.
 *
 * Real production photos from Deez Prints workshop in Karachi.
 * To update the gallery, add/remove/reorder entries below.
 * Each entry needs:
 *   - `src`  – path to the image (relative to /public, or a full Cloudinary URL)
 *   - `alt`  – descriptive alt text for accessibility and SEO
 *
 * Images are displayed in the order listed.
 * The first row loads eagerly; the rest are lazy-loaded.
 */
export interface GalleryImage {
  src: string;
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  /* ── Featured Top Row Picks ───────────────────────────── */
  {
    src: "/assets/gallery/our-work-01.webp",
    alt: "Vintage black acid wash t-shirt with Berserk red and white chest lettering",
  },
  {
    src: "/assets/gallery/our-work-02.webp",
    alt: "Black streetwear tee with intricate silver chrome cyber spine back illustration",
  },
  {
    src: "/assets/gallery/our-work-03.webp",
    alt: "White oversized t-shirt with parody Michelangelo Creation of Adam graphic",
  },
  {
    src: "/assets/gallery/our-work-04.webp",
    alt: "Black athletic heavyweight tee with Gymshark bold red vertical typography",
  },
  {
    src: "/assets/gallery/our-work-05.webp",
    alt: "Pair of olive green streetwear tees with Roman numeral and samurai warrior prints",
  },
  {
    src: "/assets/gallery/our-work-06.webp",
    alt: "Custom Real Madrid dragon concept football jersey with Fly Emirates print",
  },
  {
    src: "/assets/gallery/our-work-07.webp",
    alt: "Black 14th August Pakistan Independence Day commemorative graphic tee",
  },
  {
    src: "/assets/gallery/our-work-08.webp",
    alt: "Black oversized tee with Spider-Man Brand New Day battle back print",
  },

  /* ── Production Gallery Archive ────────────────────────── */
  {
    src: "/assets/gallery/our-work-09.webp",
    alt: "Custom oversized white t-shirts flat lay with illustrated bird pattern and morse code typography",
  },
  {
    src: "/assets/gallery/our-work-10.webp",
    alt: "Olive green Smells Like Teen Spirit Nirvana grunge graphic print oversized t-shirt",
  },
  {
    src: "/assets/gallery/our-work-11.webp",
    alt: "Trio of custom streetwear graphic tees featuring Authentic, Dope, and Japanese skeleton print",
  },
  {
    src: "/assets/gallery/our-work-12.webp",
    alt: "Charcoal black custom streetwear hoodie back print with barbed wire heart graphic",
  },
  {
    src: "/assets/gallery/our-work-13.webp",
    alt: "Black heavyweight streetwear hoodie with RASTAA chest print and flame sleeve detail",
  },
  {
    src: "/assets/gallery/our-work-14.webp",
    alt: "Curated streetwear collection featuring lilac, olive green, and black graphic prints",
  },
  {
    src: "/assets/gallery/our-work-15.webp",
    alt: "Black and white graphic streetwear t-shirts with Japanese ronin warrior battle print",
  },
  {
    src: "/assets/gallery/our-work-16.webp",
    alt: "Sand beige drop shoulder oversized tee with Berserk cursed eye chest print and sleeve brand",
  },
  {
    src: "/assets/gallery/our-work-17.webp",
    alt: "Navy blue drop shoulder t-shirt with ornate gold frame and Urdu calligraphy print",
  },
  {
    src: "/assets/gallery/our-work-18.webp",
    alt: "Charcoal black streetwear tee with Japanese warrior and red sunset mountain illustration",
  },
  {
    src: "/assets/gallery/our-work-19.webp",
    alt: "Crisp white drop shoulder tee with Japanese samurai clash and red smoke artwork",
  },
  {
    src: "/assets/gallery/our-work-20.webp",
    alt: "Freshly printed and packaged Deez Prints customer orders ready for dispatch",
  },
  {
    src: "/assets/gallery/our-work-21.webp",
    alt: "Black drop shoulder t-shirt with Monkey D Luffy Freedom is My Treasure graphic",
  },
  {
    src: "/assets/gallery/our-work-22.webp",
    alt: "Spider-Man graphic tees fan layout across grey acid wash, black, and mocha brown colorways",
  },
  {
    src: "/assets/gallery/our-work-23.webp",
    alt: "Vintage grey acid wash t-shirt featuring Nicolas Cage Spider Noir crouching illustration",
  },
  {
    src: "/assets/gallery/our-work-24.webp",
    alt: "Mocha brown mineral acid wash t-shirt with Spider-Man wireframe mask chest graphic",
  },
  {
    src: "/assets/gallery/our-work-25.webp",
    alt: "Mocha brown mineral acid wash t-shirt with large Spider-Man web-slinger sketch back print",
  },
  {
    src: "/assets/gallery/our-work-26.webp",
    alt: "Vintage washed grey acid wash tee with Spider Noir blood moon front graphic",
  },
  {
    src: "/assets/gallery/our-work-27.webp",
    alt: "Black gym streetwear tee with Irongear Strength Department barbell graphic",
  },
  {
    src: "/assets/gallery/our-work-28.webp",
    alt: "Vintage black acid wash t-shirt with Guts Berserk Brand of Sacrifice back artwork",
  },
  {
    src: "/assets/gallery/our-work-29.webp",
    alt: "Layered black streetwear hoodie with custom chest iconography over white tee",
  },
  {
    src: "/assets/gallery/our-work-30.webp",
    alt: "Black Scuderia Ferrari motorsport racing streetwear t-shirt with sponsor logos",
  },
  {
    src: "/assets/gallery/our-work-31.webp",
    alt: "Custom sublimated athletic jerseys with personalized number and name print",
  },
  {
    src: "/assets/gallery/our-work-32.webp",
    alt: "Sand beige drop shoulder tee with Berserk manga panels and Brand of Sacrifice back print",
  },
  {
    src: "/assets/gallery/our-work-33.webp",
    alt: "Sand beige drop shoulder tee with Guts Berserk cursed rage eye chest print",
  },
  {
    src: "/assets/gallery/our-work-34.webp",
    alt: "Crimson red streetwear tee with concert crowd silhouette and live stage graphics",
  },
  {
    src: "/assets/gallery/our-work-35.webp",
    alt: "Crimson red streetwear tee with Japanese oni mask, yin-yang, and crossed katanas artwork",
  },
  {
    src: "/assets/gallery/our-work-36.webp",
    alt: "Black drop shoulder tee with bold sky-window KARACHI streetwear typography",
  },
  {
    src: "/assets/gallery/our-work-37.webp",
    alt: "Black streetwear tee with KRANK blood-splatter figure typography print",
  },
  {
    src: "/assets/gallery/our-work-38.webp",
    alt: "Lavender oversized tee with Arthur Morgan Red Dead Redemption western mountain graphic",
  },
  {
    src: "/assets/gallery/our-work-39.webp",
    alt: "Dual streetwear tees featuring olive Rastaa and black tarot cards graphics",
  },
  {
    src: "/assets/gallery/our-work-40.webp",
    alt: "Charcoal black drop shoulder tee with cybernetic biomechanical spine back artwork",
  },
  {
    src: "/assets/gallery/our-work-41.webp",
    alt: "Deep maroon oversized tee with You Laugh You Lose PewDiePie gaming meme graphics",
  },
  {
    src: "/assets/gallery/our-work-42.webp",
    alt: "Sand beige streetwear tee with celestial moon and black craft graphic back print",
  },
  {
    src: "/assets/gallery/our-work-43.webp",
    alt: "Sand beige streetwear tee with minimalist front chest anime warrior graphic",
  },
  {
    src: "/assets/gallery/our-work-44.webp",
    alt: "Heather grey custom hoodie with Ouija board goodbye print and Japanese sleeve text",
  },
  {
    src: "/assets/gallery/our-work-45.webp",
    alt: "Black heavyweight streetwear hoodie with demon wings chest artwork and moon phases on sleeves",
  },
  {
    src: "/assets/gallery/our-work-46.webp",
    alt: "Sand beige oversized tee with vibrant red mohawk Punks Not Dead graphic print",
  },
  {
    src: "/assets/gallery/our-work-47.webp",
    alt: "Matching pair of black hoodies with Take Me Back to the Night We Met typography and moon graphics",
  },
  {
    src: "/assets/gallery/our-work-48.webp",
    alt: "Two-tone camel brown and black hoodie with vintage portrait print",
  },
  {
    src: "/assets/gallery/our-work-49.webp",
    alt: "Navy blue streetwear hoodie with YNGSTNR chest graphic",
  },
  {
    src: "/assets/gallery/our-work-50.webp",
    alt: "Black heavyweight hoodie with Vincent van Gogh Starry Night back panel print",
  },
  {
    src: "/assets/gallery/our-work-51.webp",
    alt: "Packaged streetwear collection with Channel Orange and Nirvana graphic tees",
  },
  {
    src: "/assets/gallery/our-work-52.webp",
    alt: "Folded colorway stack of Nirvana and Channel Orange streetwear tees",
  },
  {
    src: "/assets/gallery/our-work-53.webp",
    alt: "Midnight navy tee with vibrant Japanese fantasy nature and creature back graphic",
  },
];
