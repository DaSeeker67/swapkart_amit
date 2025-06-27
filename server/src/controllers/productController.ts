import { Request, Response, NextFunction } from 'express';
import Product, { IProduct } from '../models/Product'; // Import Product model
import mongoose from 'mongoose'; // For ObjectId validation

// Mock Product Data (for demonstration purposes until a way to add products is implemented)
const mockProducts = [
  {
    _id: new mongoose.Types.ObjectId('60d5ec49e4a3c10a3c8e4d11'),
    name: 'Samsung Galaxy S21 Ultra',
    description: 'The ultimate smartphone experience with stunning camera and performance.',
    price: 1099.99,
    imageUrl: 'https://placehold.co/600x400/FF0000/FFFFFF?text=Product1',
    category: 'Electronics',
    brand: 'Samsung',
    rating: 4.8,
    numReviews: 1200,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49e4a3c10a3c8e4d12'),
    name: 'Apple MacBook Air M1',
    description: 'Thin, light, and powerful laptop for everyday tasks and creative work.',
    price: 999.00,
    imageUrl: 'https://placehold.co/600x400/00FF00/FFFFFF?text=Product2',
    category: 'Electronics',
    brand: 'Apple',
    rating: 4.9,
    numReviews: 850,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49e4a3c10a3c8e4d13'),
    name: 'Sony WH-1000XM4 Noise Cancelling Headphones',
    description: 'Industry-leading noise cancellation with exceptional sound quality.',
    price: 279.00,
    imageUrl: 'https://placehold.co/600x400/0000FF/FFFFFF?text=Product3',
    category: 'Audio',
    brand: 'Sony',
    rating: 4.7,
    numReviews: 2500,
    inStock: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49e4a3c10a3c8e4d14'),
    name: 'Amazon Echo Dot (4th Gen)',
    description: 'Smart speaker with Alexa for voice control of music, news, and smart home.',
    price: 49.99,
    imageUrl: 'https://placehold.co/600x400/FFFF00/000000?text=Product4',
    category: 'Smart Home',
    brand: 'Amazon',
    rating: 4.5,
    numReviews: 5000,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49e4a3c10a3c8e4d15'),
    name: 'LG C1 OLED TV',
    description: 'Stunning OLED picture quality with perfect blacks and infinite contrast.',
    price: 1499.00,
    imageUrl: 'https://placehold.co/600x400/FF00FF/FFFFFF?text=Product5',
    category: 'Electronics',
    brand: 'LG',
    rating: 4.9,
    numReviews: 700,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49e4a3c10a3c8e4d16'),
    name: 'Dyson V11 Absolute Cordless Vacuum',
    description: 'Powerful and versatile cordless vacuum cleaner for deep cleaning.',
    price: 599.00,
    imageUrl: 'https://placehold.co/600x400/00FFFF/000000?text=Product6',
    category: 'Home Appliances',
    brand: 'Dyson',
    rating: 4.6,
    numReviews: 1500,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49e4a3c10a3c8e4d17'),
    name: 'Logitech MX Master 3 Mouse',
    description: 'Advanced ergonomic mouse for productivity and precision.',
    price: 99.99,
    imageUrl: 'https://placehold.co/600x400/800080/FFFFFF?text=Product7',
    category: 'Computer Accessories',
    brand: 'Logitech',
    rating: 4.8,
    numReviews: 900,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49e4a3c10a3c8e4d18'),
    name: 'Kindle Paperwhite',
    description: 'Waterproof e-reader with a glare-free display.',
    price: 129.99,
    imageUrl: 'https://placehold.co/600x400/FFA500/FFFFFF?text=Product8',
    category: 'Books & Media',
    brand: 'Amazon',
    rating: 4.7,
    numReviews: 3000,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Function to populate mock data only if collection is empty
const populateMockProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    console.log('Populating mock products...');
    await Product.insertMany(mockProducts as IProduct[]);
    console.log('Mock products populated.');
  } else {
    console.log('Products already exist in DB. Not populating mock data.');
  }
};
// Call this function once when the application starts (e.g., in server.ts or app.ts)
// For this example, it's called once a controller function is accessed.
// In a real app, you'd have a separate script for seeding or ensure it runs once on server start.
// For now, I will call it inside `searchProducts` to ensure data exists when search is first called.


/**
 * @desc    Search products with filters
 * @route   GET /api/products/search
 * @access  Public
 */
const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
  // Populate mock data if not already present (for testing purposes)
  await populateMockProducts();

  const {
    q, // search query
    category,
    minPrice,
    maxPrice,
    brand,
    rating,
    inStock,
    sortBy,
    page = '1', // default to page 1
    limit = '20', // default to 20 items per page
  } = req.query;

  const query: any = {}; // Mongoose query object

  // Add search query for name or description
  if (q && typeof q === 'string') {
    query.$or = [
      { name: { $regex: q, $options: 'i' } }, // Case-insensitive search on name
      { description: { $regex: q, $options: 'i' } }, // Case-insensitive search on description
    ];
  }

  // Add category filter
  if (category && typeof category === 'string') {
    query.category = category;
  }

  // Add price range filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice && typeof minPrice === 'string') {
      query.price.$gte = parseFloat(minPrice);
    }
    if (maxPrice && typeof maxPrice === 'string') {
      query.price.$lte = parseFloat(maxPrice);
    }
  }

  // Add brand filter
  if (brand && typeof brand === 'string') {
    query.brand = brand;
  }

  // Add rating filter (minimum rating)
  if (rating && typeof rating === 'string') {
    query.rating = { $gte: parseFloat(rating) };
  }

  // Add inStock filter
  if (inStock && typeof inStock === 'string') {
    query.inStock = inStock === 'true'; // Convert string 'true'/'false' to boolean
  }

  // Pagination
  const pageNumber = parseInt(page as string);
  const limitNumber = parseInt(limit as string);
  const skip = (pageNumber - 1) * limitNumber;

  let sortOptions: any = {}; // Mongoose sort options

  // Add sorting
  if (sortBy && typeof sortBy === 'string') {
    switch (sortBy) {
      case 'price_asc':
        sortOptions.price = 1; // Ascending
        break;
      case 'price_desc':
        sortOptions.price = -1; // Descending
        break;
      case 'name':
        sortOptions.name = 1; // Ascending by name
        break;
      case 'rating':
        sortOptions.rating = -1; // Descending by rating
        break;
      case 'newest':
      default:
        sortOptions.createdAt = -1; // Newest first (default)
        break;
    }
  } else {
    // Default sort if no sortBy is provided
    sortOptions.createdAt = -1; // Newest first
  }

  try {
    // Execute query with pagination and sorting
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber);

    // Get total count of matching products for meta information
    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limitNumber);

    res.json({
      products: products,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages,
      },
    });
  } catch (error) {
    next(error); // Pass any Mongoose or other errors to error handling middleware
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate if the ID is a valid Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error); // Pass any Mongoose or other errors to error handling middleware
  }
};

/**
 * @desc    Add a new product
 * @route   POST /api/products
 * @access  Private (e.g., Admin) - You'll implement authentication/authorization later
 */
const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name,
      description,
      price,
      imageUrl,
      category,
      brand,
      rating, // Optional, can be set to a default or calculated later
      numReviews, // Optional, can be set to 0
      inStock, // Optional, default to true
    } = req.body;

    // Basic validation (you might want a more robust validation library like Joi or Express-validator)
    if (!name || !description || !price || !category || !brand) {
      return res.status(400).json({ message: 'Please enter all required fields: name, description, price, category, brand' });
    }

    // Create a new product instance
    const newProduct: IProduct = new Product({
      name,
      description,
      price,
      imageUrl: imageUrl || 'https://placehold.co/600x400/CCCCCC/000000?text=No+Image', // Default image if not provided
      category,
      brand,
      rating: rating || 0, // Default rating to 0 if not provided
      numReviews: numReviews || 0, // Default numReviews to 0 if not provided
      inStock: inStock !== undefined ? inStock : true, // Default inStock to true if not provided
    });

    // Save the product to the database
    const createdProduct = await newProduct.save();

    res.status(201).json(createdProduct); // Respond with the newly created product and a 201 status
  } catch (error) {
    // Handle Mongoose validation errors or other errors
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    next(error); // Pass any other errors to error handling middleware
  }
};


export { searchProducts, getProductById, addProduct };