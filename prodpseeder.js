const mongoose = require('mongoose');
const Product = require('./models/Product'); // Assuming Product model is correctly linked

// Your existing products data with the new 'url' field
const products = [
  {
    name: 'JSW Neo Steel TMT Bars',
    description: 'High strength and flexibility steel bars ideal for residential and commercial construction.',
    price: 45000,
    link: '/',
    url: 'https://www.jswsteel.in/products/neo-steel-tmt-bars', // Added URL for TMT Bars
    tags: ['Durable', 'High Strength', 'Eco Friendly'],
    material: 'Steel',
  },
  {
    name: 'JSW Coated Steel Sheets',
    description: 'Zinc and color coated steel sheets perfect for roofing and cladding applications.',
    price: 60000,
    link: '/',
    url: 'https://www.jswsteel.in/products/coated-steel', // Added URL for Coated Steel Sheets
    tags: ['Weather Resistant', 'Aesthetic', 'Eco Friendly'],
    material: 'Steel',
  },
  {
    name: 'JSW Cement (PSC)',
    description: 'Portland Slag Cement known for better durability and long-lasting strength.',
    price: 350,
    link: '/',
    url: 'https://www.jswcement.in/products/portland-slag-cement-psc', // Added URL for JSW Cement (PSC)
    tags: ['Eco Friendly', 'Cost Effective', 'Durable'],
    material: 'Cement',
  },
  {
    name: 'JSW Paints Aura',
    description: 'Eco-conscious water-based paints with low VOC emissions.',
    price: 2500,
    link: '/',
    url: 'https://www.jswpaints.in/products/aura', // Added URL for JSW Paints Aura
    tags: ['Eco Friendly', 'Low VOC', 'Premium Finish'],
    material: 'Paint',
  },
  {
    name: 'JSW Concreel HD Cement',
    description: 'Specially formulated for high durability construction in aggressive environments.',
    price: 380,
    link: '/',
    url: 'https://www.jswcement.in/products/concreel-hd-cement', // Added URL for JSW Concreel HD Cement
    tags: ['Durable', 'High Strength', 'Cost Effective'],
    material: 'Cement',
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://mr-fruit:Jfz1KFo7stuwOOsB@cemsite-clust.suuxmrk.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`Seeded ${createdProducts.length} products successfully`);

    // Display seeded products (now including URL for verification)
    console.log('\nSeeded Products:');
    createdProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.price} - URL: ${product.url}`);
    });

    console.log('\nDatabase seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();