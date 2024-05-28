const products = [
  {
    name: "Airpods Wireless Bluetooth Headphones",
    image: "/images/airpods.png",
    images: ["/images/airpods.png", "/images/iPhone.png", "/images/camera.png"],
    colors: ["red", "green", "blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "Electronics",
    price: 89.99,
    countInStock: 0,
    oldPrice: 119.99,
    discount: 10,
    rating: 3.5,
    numReviews: 12,
  },
  {
    name: "iPhone 11 Pro 256GB Memory",
    image: "/images/iPhone.png",
    description:
      "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "Electronics",
    price: 599.99,
    countInStock: 7,
    oldPrice: 799.99,
    discount: 20,
    rating: 3.5,
    numReviews: 8,
    images: ["/images/iPhone.png", "/images/iPhone.png", "/images/camera.png"],
    colors: ["red", "green", "blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    name: "Cannon EOS 80D DSLR Camera",
    image: "/images/camera.png",
    description:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    brand: "Cannon",
    category: "Electronics",
    price: 929.99,
    countInStock: 0,
    oldPrice: 1200,
    discount: 10,
    rating: 3,
    numReviews: 12,
    images: ["/images/camera.png", "/images/iPhone.png", "/images/camera.png"],
    colors: ["red", "green", "blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    name: "Sony Playstation 4 Pro White Version",
    image: "/images/playstation.png",
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Sony",
    category: "Electronics",
    price: 399.99,
    countInStock: 11,
    oldPrice: 499.99,
    discount: 10,
    rating: 5,
    numReviews: 12,
    images: [
      "/images/playstation.png",
      "/images/iPhone.png",
      "/images/playstation.png",
    ],
    colors: ["red", "green", "blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    name: "Logitech G-Series Gaming Mouse",
    image: "/images/mouse.png",
    description:
      "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
    brand: "Logitech",
    category: "Electronics",
    price: 49.99,
    countInStock: 7,
    oldPrice: 59.99,
    discount: 10,
    rating: 3.5,
    numReviews: 10,
    images: ["/images/mouse.png", "/images/iPhone.png", "/images/mouse.png"],
    colors: ["red", "green", "blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    name: "Amazon Echo Dot 3rd Generation",
    image: "/images/alexa.png",
    description:
      "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
    brand: "Amazon",
    category: "Electronics",
    price: 29.99,
    countInStock: 0,
    oldPrice: 39.99,
    discount: 10,
    rating: 4,
    numReviews: 12,
    images: ["/images/alexa.png", "/images/iPhone.png", "/images/alexa.png"],
    colors: ["red", "green", "blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    name: "Samsung Galaxy S20 Ultra",
    image: "/images/samsung.png",
    description:
      "The Samsung Galaxy S20 Ultra features a 108MP camera and 100x Space Zoom for stunning photos and videos. 5G connectivity and a 6.9-inch display make it a powerhouse device.",
    brand: "Samsung",
    category: "Electronics",
    price: 1199.99,
    countInStock: 8,
    oldPrice: 1399.99,
    discount: 54,
    rating: 4.7,
    numReviews: 15,
    images: [
      "/images/samsung.png",
      "/images/iPhone.png",
      "/images/samsung.png",
    ],
    colors: ["red", "green", "blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    name: "Sony WH-1000XM4 Noise Cancelling Headphones",
    image: "/images/sonyheadphones.png",
    description:
      "Industry-leading noise canceling with Dual Noise Sensor technology. Up to 30-hour battery life with quick charging (10 min charge for 5 hours of playback).",
    brand: "Sony",
    category: "Electronics",
    price: 348.99,
    countInStock: 12,
    oldPrice: 399.99,
    discount: 54,
    rating: 4.8,
    numReviews: 20,
    images: [
      "/images/sonyheadphones.png",
      "/images/iPhone.png",
      "/images/sonyheadphones.png",
    ],
    colors: ["red", "green", "blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    name: "Dell XPS 13 Laptop",
    image: "/images/dellxps13.png",
    description:
      "The Dell XPS 13 offers a stunning 13.3-inch 4K Ultra HD display, 11th Gen Intel Core processors, and an ultra-thin, lightweight design perfect for on-the-go productivity.",
    brand: "Dell",
    category: "Electronics",
    price: 999.99,
    countInStock: 4,
    oldPrice: 1199.99,
    discount: 20,
    rating: 4.6,
    numReviews: 10,
    images: [
      "/images/dellxps13.png",
      "/images/iPhone.png",
      "/images/dellxps13.png",
    ],
    colors: ["red", "green", "blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    name: "Modern Smartwatch",
    image: "/images/smartwatch.png",
    description:
      "A sleek and modern smartwatch with a black silicone band, featuring a round touch screen displaying the time and various app icons. The watch has a silver bezel and a minimalist design.",
    brand: "Generic",
    category: "Electronics",
    price: 199.99,
    countInStock: 15,
    oldPrice: 299.99,
    discount: 20,
    rating: 4.3,
    numReviews: 7,
    images: [
      "/images/smartwatch.png",
      "/images/iPhone.png",
      "/images/smartwatch.png",
    ],
    colors: ["red", "green", "blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    name: "Smart 4K TV",
    image: "/images/tv.png",
    description:
      "A sleek and modern smart TV with a thin bezel, displaying a vibrant 4K image. The TV is mounted on a minimalist stand and is shown in a living room setting with a modern aesthetic. The background includes a comfortable sofa and a stylish coffee table.",
    brand: "Generic",
    category: "Electronics",
    price: 799.99,
    countInStock: 9,
    discount: 10,
    oldPrice: 999.99,
    rating: 4.5,
    numReviews: 10,
    images: ["/images/tv.png", "/images/iPhone.png", "/images/tv.png"],
    colors: ["red", "green", "blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

export default products;
