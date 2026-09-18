import dbConnect from '../utils/db';
import Product from '@/models/Product';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

/**
 * Seed the database with initial data
 * Run this script with: node -r esm src/lib/seed/seed-db.js
 */
async function seedDatabase() {
  try {
    // Connect to the database
    await dbConnect();
    console.log('Connected to the database');

    // Clear existing data
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@chemicalssite.com' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      await User.create({
        name: 'Admin User',
        email: 'admin@chemicalssite.com',
        password: hashedPassword,
        isAdmin: true,
      });
      console.log('Admin user created');
    }

    // Sample products data
    const productsData = [
      // Anabolic Steroids
      {
        name: 'Testosterone Enanthate',
        slug: 'testosterone-enanthate',
        category: 'anabolic steroids',
        images: ['/images/products/testosterone-enanthate.jpg'],
        description: 'Testosterone enanthate reference material, 99.5% purity. For laboratory research only.\n\nSupplied with an analytical certificate covering identity and concentration.',
        priceVariants: [
          { quantity: 1, price: 29.99 },
          { quantity: 5, price: 129.99 },
          { quantity: 10, price: 249.99 },
        ],
        countInStock: 50,
        rating: 4.8,
        numReviews: 24,
        featured: true,
      },
      {
        name: 'Trenbolone Acetate',
        slug: 'trenbolone-acetate',
        category: 'anabolic steroids',
        images: ['/images/products/trenbolone-acetate.jpg'],
        description: 'Trenbolone acetate reference material, 99% purity. For laboratory research only.\n\nIdeal for comparative studies and analytical method development.',
        priceVariants: [
          { quantity: 1, price: 39.99 },
          { quantity: 5, price: 179.99 },
          { quantity: 10, price: 329.99 },
        ],
        countInStock: 35,
        rating: 4.5,
        numReviews: 18,
        featured: false,
      },
      {
        name: 'Oxandrolone',
        slug: 'oxandrolone',
        category: 'anabolic steroids',
        images: ['/images/products/oxandrolone.jpg'],
        description: 'Oxandrolone reference material, 98%+ purity. For laboratory research only.\n\nCrystalline powder supplied with batch identity and purity data.',
        priceVariants: [
          { quantity: 1, price: 49.99 },
          { quantity: 5, price: 219.99 },
          { quantity: 10, price: 399.99 },
        ],
        countInStock: 20,
        rating: 4.7,
        numReviews: 12,
        featured: true,
      },
      
      // Research Chemicals
      {
        name: '3-MMC',
        slug: '3-mmc',
        category: 'research chemicals',
        images: ['/images/products/3-mmc.jpg'],
        description: '3-MMC (3-Methylmethcathinone) research compound, 99% purity. For analytical chemistry only.\n\nThis compound is provided for laboratory research and analytical purposes.',
        priceVariants: [
          { quantity: 1, price: 59.99 },
          { quantity: 5, price: 269.99 },
          { quantity: 10, price: 499.99 },
        ],
        countInStock: 15,
        rating: 4.3,
        numReviews: 9,
        featured: false,
      },
      {
        name: '4-AcO-DMT',
        slug: '4-aco-dmt',
        category: 'psychedelic drugs',
        images: ['/images/products/4-aco-dmt.jpg'],
        description: '4-AcO-DMT (O-Acetylpsilocin) research compound, 99.5% purity. For laboratory use only.\n\nThis tryptamine compound is ideal for comparative analysis and scientific research.',
        priceVariants: [
          { quantity: 1, price: 79.99 },
          { quantity: 5, price: 349.99 },
          { quantity: 10, price: 649.99 },
        ],
        countInStock: 10,
        rating: 4.9,
        numReviews: 15,
        featured: true,
      },
      {
        name: '2-FDCK',
        slug: '2-fdck',
        category: 'research chemicals',
        images: ['/images/products/2-fdck.jpg'],
        description: '2-FDCK (2-Fluorodeschloroketamine) research compound, 99% purity. For analytical purposes only.\n\nThis arylcyclohexylamine compound is provided for laboratory research.',
        priceVariants: [
          { quantity: 1, price: 69.99 },
          { quantity: 5, price: 299.99 },
          { quantity: 10, price: 549.99 },
        ],
        countInStock: 25,
        rating: 4.6,
        numReviews: 11,
        featured: false,
      },
      
      // Psychedelic Drugs
      {
        name: '1P-LSD',
        slug: '1p-lsd',
        category: 'psychedelic drugs',
        images: ['/images/products/1p-lsd.jpg'],
        description: '1P-LSD reference material, 99.8% purity. For laboratory research only.\n\nThis lysergamide compound is provided for analytical chemistry and scientific research.',
        priceVariants: [
          { quantity: 1, price: 49.99 },
          { quantity: 5, price: 219.99 },
          { quantity: 10, price: 399.99 },
        ],
        countInStock: 25,
        rating: 4.7,
        numReviews: 19,
        featured: true,
      },
      {
        name: 'Mescaline HCl',
        slug: 'mescaline-hcl',
        category: 'psychedelic drugs',
        images: ['/images/products/mescaline-hcl.jpg'],
        description: 'Mescaline HCl reference material, 99.5% purity. For analytical purposes only.\n\nThis phenethylamine compound is provided for laboratory research and analysis.',
        priceVariants: [
          { quantity: 1, price: 69.99 },
          { quantity: 5, price: 299.99 },
          { quantity: 10, price: 549.99 },
        ],
        countInStock: 15,
        rating: 4.6,
        numReviews: 14,
        featured: false,
      },
      {
        name: '2C-B',
        slug: '2c-b',
        category: 'psychedelic drugs',
        images: ['/images/products/2c-b.jpg'],
        description: '2C-B reference material, 99.7% purity. For laboratory use only.\n\nThis phenethylamine compound is provided for analytical chemistry and scientific research.',
        priceVariants: [
          { quantity: 1, price: 74.99 },
          { quantity: 5, price: 329.99 },
          { quantity: 10, price: 599.99 },
        ],
        countInStock: 10,
        rating: 4.8,
        numReviews: 16,
        featured: false,
      },
    ];

    // Insert products
    await Product.insertMany(productsData);
    console.log(`${productsData.length} products inserted`);

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();
