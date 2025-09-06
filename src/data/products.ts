import { Product } from '../types';

export const products: Product[] = [
  { 
    id: 1, 
    name: "Nordic Pendant Light", 
    price: 299, 
    originalPrice: 349,
    image: "https://images.unsplash.com/photo-1721146378270-1b93839f7ae7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5kYW50JTIwbGlnaHQlMjBtb2Rlcm4lMjBkaW5pbmclMjByb29tfGVufDF8fHx8MTc1Njk3NjIzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", 
    images: [
      "https://images.unsplash.com/photo-1721146378270-1b93839f7ae7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5kYW50JTIwbGlnaHQlMjBtb2Rlcm4lMjBkaW5pbmclMjByb29tfGVufDF8fHx8MTc1Njk3NjIzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmbG9vciUyMGxhbXAlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc1Njk3NjIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    category: "pendant", 
    rating: 4.8, 
    reviews: 124, 
    description: "Minimalist pendant light with natural wood finish. Perfect for modern dining rooms and kitchen islands.", 
    specs: { material: "Oak Wood", height: "30cm", width: "25cm", bulb: "E27 LED" },
    isNew: true,
    discount: 15,
    freeShipping: true,
    stock: 12
  },
  { 
    id: 2, 
    name: "Modern Floor Lamp", 
    price: 399, 
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmbG9vciUyMGxhbXAlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc1Njk3NjIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", 
    images: [
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmbG9vciUyMGxhbXAlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc1Njk3NjIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    category: "floor", 
    rating: 4.6, 
    reviews: 89, 
    description: "Sleek floor lamp perfect for reading corners and ambient lighting", 
    specs: { material: "Metal", height: "150cm", base: "30cm", bulb: "E27 LED" },
    isBestseller: true,
    freeShipping: true,
    stock: 8
  },
  { 
    id: 3, 
    name: "Crystal Chandelier", 
    price: 899, 
    image: "https://images.unsplash.com/photo-1745816698779-4b43418cf432?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlzdGFsJTIwY2hhbmRlbGllciUyMGVsZWdhbnQlMjBkaW5pbmd8ZW58MXx8fHwxNzU2OTc2MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", 
    images: ["https://images.unsplash.com/photo-1745816698779-4b43418cf432?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlzdGFsJTIwY2hhbmRlbGllciUyMGVsZWdhbnQlMjBkaW5pbmd8ZW58MXx8fHwxNzU2OTc2MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
    category: "chandelier", 
    rating: 4.9, 
    reviews: 67, 
    description: "Elegant crystal chandelier for dining rooms", 
    specs: { material: "Crystal & Brass", diameter: "80cm", height: "100cm", bulbs: "8x E14 LED" },
    isPremium: true,
    stock: 3
  },
  { 
    id: 4, 
    name: "Industrial Table Lamp", 
    price: 199, 
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1648083411102-bcac221d3bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwdGFibGUlMjBsYW1wJTIwdmludGFnZXxlbnwxfHx8fDE3NTY5NzYyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", 
    images: ["https://images.unsplash.com/photo-1648083411102-bcac221d3bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwdGFibGUlMjBsYW1wJTIwdmludGFnZXxlbnwxfHx8fDE3NTY5NzYyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
    category: "table", 
    rating: 4.5, 
    reviews: 156, 
    description: "Vintage industrial design table lamp", 
    specs: { material: "Iron", height: "45cm", base: "15cm", bulb: "E27 Edison" },
    discount: 20,
    freeShipping: true,
    stock: 15
  },
  { 
    id: 5, 
    name: "Smart LED Strip", 
    price: 99, 
    image: "https://images.unsplash.com/photo-1528922087877-3f44f53a8f7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMRUQlMjBzdHJpcCUyMGxpZ2h0cyUyMGNvbG9yZnVsJTIwc21hcnR8ZW58MXx8fHwxNzU2OTc2MjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", 
    images: ["https://images.unsplash.com/photo-1528922087877-3f44f53a8f7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMRUQlMjBzdHJpcCUyMGxpZ2h0cyUyMGNvbG9yZnVsJTIwc21hcnR8ZW58MXx8fHwxNzU2OTc2MjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
    category: "led", 
    rating: 4.7, 
    reviews: 203, 
    description: "RGB smart LED strip with app control", 
    specs: { length: "5m", width: "10mm", voltage: "12V", colors: "16M RGB" },
    isSmart: true,
    freeShipping: true,
    stock: 25
  },
  { 
    id: 6, 
    name: "Rustic Wall Sconce", 
    price: 149, 
    image: "https://images.unsplash.com/photo-1738250485776-a1d0974d7064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwc2NvbmNlJTIwcnVzdGljJTIwd29vZCUyMG1ldGFsfGVufDF8fHx8MTc1Njk3NjI0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", 
    images: ["https://images.unsplash.com/photo-1738250485776-a1d0974d7064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwc2NvbmNlJTIwcnVzdGljJTIwd29vZCUyMG1ldGFsfGVufDF8fHx8MTc1Njk3NjI0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
    category: "wall", 
    rating: 4.4, 
    reviews: 78, 
    description: "Rustic wood and metal wall mounted light", 
    specs: { material: "Wood & Metal", width: "20cm", depth: "15cm", bulb: "E14 LED" },
    stock: 6
  }
];

export const featuredProducts = products.slice(0, 3);