const product = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB Natural Titanium",
    brand: "Apple",
    price: "₹1,34,900",
    originalPrice: "₹1,49,900",
    discount: "10% off",
    rating: 4.5,
    reviews: 2847,
    badge: "Bestseller",
    category: "Electronics",
    inStock: true,
    stockCount: 12,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"
    ],
    description: "Experience the next level of smartphone technology with the iPhone 15 Pro Max.",
    features: [
      "6.7-inch Super Retina XDR display",
      "A17 Pro chip",
      "48MP Main camera",
      "5x Telephoto camera",
      "USB-C connector",
      "Up to 29 hours video playback"
    ],
    specifications: {
      "Display": "6.7-inch OLED",
      "Processor": "A17 Pro chip",
      "Storage": "256GB",
      "RAM": "8GB",
      "Camera": "48MP + 12MP + 12MP",
      "Battery": "4441 mAh",
      "OS": "iOS 17",
      "Color": "Natural Titanium"
    },
    offers: [
      { title: "Bank Offer", description: "10% instant discount on HDFC Bank Credit Cards", savings: "Save ₹13,490" }
    ],
    deliveryInfo: {
      pincode: "462001",
      deliveryDate: "Tomorrow, June 23",
      deliveryCharge: "Free",
      codAvailable: true
    },
    seller: {
      name: "RetailNet",
      rating: 4.3,
      reviews: 1200,
      returnPolicy: "7 days return policy"
    },
    variants: [
      { storage: "128GB", price: "₹1,19,900", originalPrice: "₹1,34,900" },
      { storage: "256GB", price: "₹1,34,900", originalPrice: "₹1,49,900", selected: true }
    ],
    colors: [
      { name: "Natural Titanium", color: "#F5F5DC", selected: true },
      { name: "Blue Titanium", color: "#4169E1" }
    ]
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 512GB Phantom Black",
    brand: "Samsung",
    price: "₹1,29,999",
    originalPrice: "₹1,49,999",
    discount: "13% off",
    rating: 4.7,
    reviews: 3210,
    badge: "Trending",
    category: "Electronics",
    inStock: true,
    stockCount: 8,
    images: [
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=600&h=600&fit=crop"
    ],
    description: "The Samsung Galaxy S24 Ultra offers a stunning 200MP camera and sleek design.",
    features: [
      "6.8-inch AMOLED display",
      "Snapdragon 8 Gen 3 processor",
      "200MP quad camera",
      "S Pen included"
    ],
    specifications: {
      "Display": "6.8-inch AMOLED",
      "Processor": "Snapdragon 8 Gen 3",
      "Storage": "512GB",
      "RAM": "12GB",
      "Camera": "200MP + 12MP + 10MP + 10MP",
      "Battery": "5000 mAh",
      "OS": "Android 14",
      "Color": "Phantom Black"
    },
    offers: [
      { title: "Bank Offer", description: "10% off on ICICI Credit Cards", savings: "Save ₹13,000" }
    ],
    deliveryInfo: {
      pincode: "462001",
      deliveryDate: "Tomorrow, June 23",
      deliveryCharge: "Free",
      codAvailable: true
    },
    seller: {
      name: "Samsung Store",
      rating: 4.6,
      reviews: 2500,
      returnPolicy: "7 days return policy"
    },
    variants: [
      { storage: "256GB", price: "₹1,14,999", originalPrice: "₹1,34,999" },
      { storage: "512GB", price: "₹1,29,999", originalPrice: "₹1,49,999", selected: true }
    ],
    colors: [
      { name: "Phantom Black", color: "#1C1C1C", selected: true },
      { name: "Green", color: "#228B22" }
    ]
  },
  {
    id: 3,
    name: "OnePlus 12 5G 256GB Flowy Emerald",
    brand: "OnePlus",
    price: "₹64,999",
    originalPrice: "₹69,999",
    discount: "7% off",
    rating: 4.4,
    reviews: 1840,
    badge: "Bestseller",
    category: "Electronics",
    inStock: true,
    stockCount: 15,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop"
    ],
    description: "OnePlus 12 with Snapdragon 8 Gen 3 and 50MP triple camera system.",
    features: [
      "6.82-inch AMOLED Display",
      "Snapdragon 8 Gen 3",
      "50MP Triple Camera",
      "5400 mAh Battery",
      "80W Fast Charging"
    ],
    specifications: {
      "Display": "6.82-inch AMOLED",
      "Processor": "Snapdragon 8 Gen 3",
      "Storage": "256GB",
      "RAM": "12GB",
      "Camera": "50MP + 48MP + 64MP",
      "Battery": "5400 mAh",
      "OS": "OxygenOS 14",
      "Color": "Flowy Emerald"
    },
    offers: [
      { title: "Exchange Offer", description: "Up to ₹15,000 off on exchange", savings: "Save up to ₹15,000" }
    ],
    deliveryInfo: {
      pincode: "462001",
      deliveryDate: "Tomorrow, June 23",
      deliveryCharge: "Free",
      codAvailable: true
    },
    seller: {
      name: "OnePlus Official",
      rating: 4.5,
      reviews: 800,
      returnPolicy: "7 days return policy"
    },
    variants: [
      { storage: "128GB", price: "₹59,999", originalPrice: "₹64,999" },
      { storage: "256GB", price: "₹64,999", originalPrice: "₹69,999", selected: true }
    ],
    colors: [
      { name: "Flowy Emerald", color: "#50C878", selected: true },
      { name: "Silky Black", color: "#000000" }
    ]
  },
  {
    id: 4,
    name: "Apple MacBook Air M2 13-inch Midnight",
    brand: "Apple",
    price: "₹1,14,900",
    originalPrice: "₹1,19,900",
    discount: "4% off",
    rating: 4.8,
    reviews: 954,
    badge: "Bestseller",
    category: "Electronics",
    inStock: true,
    stockCount: 5,
    images: [
      "https://images.unsplash.com/photo-1587614382346-ac8f8a6d76b4?w=600&h=600&fit=crop"
    ],
    description: "Powerful M2 chip, ultra-thin design, up to 18 hours battery life.",
    features: [
      "13.6-inch Liquid Retina display",
      "Apple M2 chip",
      "8GB RAM",
      "256GB SSD",
      "MagSafe Charging"
    ],
    specifications: {
      "Display": "13.6-inch Retina",
      "Processor": "Apple M2",
      "Storage": "256GB SSD",
      "RAM": "8GB",
      "Camera": "1080p FaceTime HD",
      "Battery": "Up to 18 hours",
      "OS": "macOS",
      "Color": "Midnight"
    },
    offers: [
      { title: "Bank Offer", description: "₹7,000 instant discount with HDFC Cards", savings: "Save ₹7,000" }
    ],
    deliveryInfo: {
      pincode: "462001",
      deliveryDate: "Tomorrow, June 23",
      deliveryCharge: "Free",
      codAvailable: false
    },
    seller: {
      name: "Apple Store",
      rating: 4.9,
      reviews: 500,
      returnPolicy: "7 days return policy"
    },
    variants: [
      { storage: "256GB", price: "₹1,14,900", originalPrice: "₹1,19,900", selected: true },
      { storage: "512GB", price: "₹1,34,900", originalPrice: "₹1,49,900" }
    ],
    colors: [
      { name: "Midnight", color: "#191970", selected: true },
      { name: "Silver", color: "#C0C0C0" }
    ]
  },
  {
    id: 5,
    name: "Sony WH-1000XM5 Wireless Headphones",
    brand: "Sony",
    price: "₹29,990",
    originalPrice: "₹34,990",
    discount: "14% off",
    rating: 4.6,
    reviews: 2000,
    badge: "Bestseller",
    category: "Electronics",
    inStock: true,
    stockCount: 25,
    images: [
      "https://images.unsplash.com/photo-1596477602103-8583e3d99b8a?w=600&h=600&fit=crop"
    ],
    description: "Industry-leading noise cancellation with superb sound quality.",
    features: [
      "Active Noise Cancellation",
      "30 hours Battery Life",
      "Touch Controls",
      "Bluetooth 5.2"
    ],
    specifications: {
      "Type": "Over-Ear",
      "Battery": "30 hours",
      "Connectivity": "Bluetooth 5.2",
      "Color": "Black"
    },
    offers: [
      { title: "Bank Offer", description: "₹3,000 off on HDFC Cards", savings: "Save ₹3,000" }
    ],
    deliveryInfo: {
      pincode: "462001",
      deliveryDate: "Tomorrow, June 23",
      deliveryCharge: "Free",
      codAvailable: true
    },
    seller: {
      name: "Sony Center",
      rating: 4.7,
      reviews: 1500,
      returnPolicy: "7 days return policy"
    },
    variants: [
      { storage: "Standard", price: "₹29,990", originalPrice: "₹34,990", selected: true }
    ],
    colors: [
      { name: "Black", color: "#000000", selected: true },
      { name: "Silver", color: "#D3D3D3" }
    ]
  },

    {
    id: 6,
    name: "Dell XPS 13 Plus Laptop 512GB SSD",
    brand: "Dell",
    price: "₹1,49,900",
    originalPrice: "₹1,69,900",
    discount: "12% off",
    rating: 4.4,
    reviews: 870,
    badge: "Premium",
    category: "Electronics",
    inStock: true,
    stockCount: 7,
    images: [
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=600&h=600&fit=crop"
    ],
    description: "Sleek, powerful, and compact laptop with Intel Evo certification.",
    features: [
      "13.4-inch InfinityEdge Display",
      "Intel Core i7 13th Gen",
      "16GB RAM",
      "512GB SSD",
      "Fingerprint Reader"
    ],
    specifications: {
      "Display": "13.4-inch OLED",
      "Processor": "Intel Core i7 13th Gen",
      "Storage": "512GB SSD",
      "RAM": "16GB",
      "OS": "Windows 11",
      "Color": "Platinum"
    },
    offers: [
      { title: "Bank Offer", description: "₹10,000 off on HDFC Cards", savings: "Save ₹10,000" }
    ],
    deliveryInfo: {
      pincode: "462001",
      deliveryDate: "Tomorrow, June 23",
      deliveryCharge: "Free",
      codAvailable: false
    },
    seller: {
      name: "Dell Store",
      rating: 4.5,
      reviews: 600,
      returnPolicy: "7 days return policy"
    },
    variants: [
      { storage: "512GB SSD", price: "₹1,49,900", originalPrice: "₹1,69,900", selected: true },
      { storage: "1TB SSD", price: "₹1,69,900", originalPrice: "₹1,89,900" }
    ],
    colors: [
      { name: "Platinum", color: "#E5E4E2", selected: true },
      { name: "Graphite", color: "#474A51" }
    ]
  },
  {
    id: 7,
    name: "Apple iPad Pro 11-inch M4 256GB Wi-Fi",
    brand: "Apple",
    price: "₹99,900",
    originalPrice: "₹1,09,900",
    discount: "9% off",
    rating: 4.8,
    reviews: 1350,
    badge: "Trending",
    category: "Electronics",
    inStock: true,
    stockCount: 20,
    images: [
      "https://images.unsplash.com/photo-1611078489935-4e3c5433d80f?w=600&h=600&fit=crop"
    ],
    description: "Powerful iPad Pro with M4 chip and stunning Liquid Retina display.",
    features: [
      "11-inch Liquid Retina Display",
      "Apple M4 chip",
      "256GB Storage",
      "Wi-Fi Connectivity",
      "Apple Pencil & Magic Keyboard support"
    ],
    specifications: {
      "Display": "11-inch Liquid Retina",
      "Processor": "Apple M4",
      "Storage": "256GB",
      "Battery": "Up to 10 hours",
      "OS": "iPadOS 17",
      "Color": "Silver"
    },
    offers: [
      { title: "Exchange Offer", description: "Up to ₹20,000 off on exchange", savings: "Save up to ₹20,000" }
    ],
    deliveryInfo: {
      pincode: "462001",
      deliveryDate: "Tomorrow, June 23",
      deliveryCharge: "Free",
      codAvailable: true
    },
    seller: {
      name: "Apple Store",
      rating: 4.9,
      reviews: 900,
      returnPolicy: "7 days return policy"
    },
    variants: [
      { storage: "256GB", price: "₹99,900", originalPrice: "₹1,09,900", selected: true },
      { storage: "512GB", price: "₹1,19,900", originalPrice: "₹1,29,900" }
    ],
    colors: [
      { name: "Silver", color: "#C0C0C0", selected: true },
      { name: "Space Grey", color: "#4B4B4B" }
    ]
  },
  {
    id: 8,
    name: "Bose QuietComfort 45 Wireless Headphones",
    brand: "Bose",
    price: "₹24,990",
    originalPrice: "₹29,990",
    discount: "17% off",
    rating: 4.5,
    reviews: 1600,
    badge: "Bestseller",
    category: "Electronics",
    inStock: true,
    stockCount: 18,
    images: [
      "https://images.unsplash.com/photo-1519664824561-46c6b162f365?w=600&h=600&fit=crop"
    ],
    description: "Iconic noise-cancelling headphones with crystal clear audio.",
    features: [
      "Acoustic Noise Cancelling",
      "Up to 24 Hours Battery",
      "Bluetooth Connectivity",
      "Lightweight & Comfortable Design"
    ],
    specifications: {
      "Type": "Over-Ear",
      "Battery": "24 hours",
      "Connectivity": "Bluetooth 5.1",
      "Color": "Triple Black"
    },
    offers: [
      { title: "Bank Offer", description: "₹2,000 off on HDFC Cards", savings: "Save ₹2,000" }
    ],
    deliveryInfo: {
      pincode: "462001",
      deliveryDate: "Tomorrow, June 23",
      deliveryCharge: "Free",
      codAvailable: true
    },
    seller: {
      name: "Bose Store",
      rating: 4.7,
      reviews: 1200,
      returnPolicy: "7 days return policy"
    },
    variants: [
      { storage: "Standard", price: "₹24,990", originalPrice: "₹29,990", selected: true }
    ],
    colors: [
      { name: "Triple Black", color: "#000000", selected: true },
      { name: "White Smoke", color: "#F5F5F5" }
    ]
  },
  {
    id: 9,
    name: "Google Pixel 8 Pro 256GB Bay",
    brand: "Google",
    price: "₹1,06,999",
    originalPrice: "₹1,19,999",
    discount: "11% off",
    rating: 4.6,
    reviews: 920,
    badge: "Trending",
    category: "Electronics",
    inStock: true,
    stockCount: 9,
    images: [
      "https://images.unsplash.com/photo-1622820126589-788a98f82b92?w=600&h=600&fit=crop"
    ],
    description: "Pixel 8 Pro with Google Tensor G3 and advanced AI camera features.",
    features: [
      "6.7-inch LTPO OLED Display",
      "Google Tensor G3 Processor",
      "50MP Triple Camera",
      "5050mAh Battery",
      "IP68 Water Resistance"
    ],
    specifications: {
      "Display": "6.7-inch OLED",
      "Processor": "Tensor G3",
      "Storage": "256GB",
      "RAM": "12GB",
      "Camera": "50MP + 48MP + 48MP",
      "Battery": "5050mAh",
      "OS": "Android 14",
      "Color": "Bay"
    },
    offers: [
      { title: "Bank Offer", description: "10% off on ICICI Bank Credit Cards", savings: "Save ₹10,000" }
    ],
    deliveryInfo: {
      pincode: "462001",
      deliveryDate: "Tomorrow, June 23",
      deliveryCharge: "Free",
      codAvailable: true
    },
    seller: {
      name: "Google Store",
      rating: 4.5,
      reviews: 700,
      returnPolicy: "7 days return policy"
    },
    variants: [
      { storage: "128GB", price: "₹99,999", originalPrice: "₹1,09,999" },
      { storage: "256GB", price: "₹1,06,999", originalPrice: "₹1,19,999", selected: true }
    ],
    colors: [
      { name: "Bay", color: "#79B9E3", selected: true },
      { name: "Obsidian", color: "#1B1B1B" }
    ]
  },
  {
    id: 10,
    name: "Nothing Phone (2) 12GB RAM 256GB Dark Grey",
    brand: "Nothing",
    price: "₹44,999",
    originalPrice: "₹49,999",
    discount: "10% off",
    rating: 4.3,
    reviews: 780,
    badge: "Trending",
    category: "Electronics",
    inStock: true,
    stockCount: 30,
    images: [
      "https://images.unsplash.com/photo-1610559069487-e89807e1b276?w=600&h=600&fit=crop"
    ],
    description: "Sleek transparent design with Glyph Interface and Snapdragon 8+ Gen 1.",
    features: [
      "6.7-inch OLED Display",
      "Snapdragon 8+ Gen 1",
      "50MP Dual Camera",
      "4700mAh Battery",
      "Glyph Interface"
    ],
    specifications: {
      "Display": "6.7-inch OLED",
      "Processor": "Snapdragon 8+ Gen 1",
      "Storage": "256GB",
      "RAM": "12GB",
      "Camera": "50MP + 50MP",
      "Battery": "4700mAh",
      "OS": "Nothing OS 2.5",
      "Color": "Dark Grey"
    },
    offers: [
      { title: "Exchange Offer", description: "Up to ₹5,000 off on exchange", savings: "Save up to ₹5,000" }
    ],
    deliveryInfo: {
      pincode: "462001",
      deliveryDate: "Tomorrow, June 23",
      deliveryCharge: "Free",
      codAvailable: true
    },
    seller: {
      name: "Nothing Official",
      rating: 4.4,
      reviews: 500,
      returnPolicy: "7 days return policy"
    },
    variants: [
      { storage: "128GB", price: "₹39,999", originalPrice: "₹44,999" },
      { storage: "256GB", price: "₹44,999", originalPrice: "₹49,999", selected: true }
    ],
    colors: [
      { name: "Dark Grey", color: "#2F4F4F", selected: true },
      { name: "White", color: "#FFFFFF" }
    ]
  }

];


export default product;