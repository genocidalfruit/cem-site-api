// seedData600127.js - Seeding script for pincode 600127 (Chennai)
const mongoose = require('mongoose');
const Resource = require('./models/Resource');
const CostBreakdown = require('./models/CostBreakdown');
const Timeline = require('./models/Timeline');

const seedData600127 = async () => {
  try {
    console.log('Starting data seeding for pincode 600127...');

    // Updated Resource data structure
    const resourceData = [
      {
        pincode: '600127',
        resource: 'Cement',
        basic: { quantity: '2250 bags', price: 785000 },
        medium: { quantity: '2250 bags', price: 981250 },
        premium: { quantity: '2250 bags', price: 1177500 }
      },
      {
        pincode: '600127',
        resource: 'Steel',
        basic: { quantity: '17500 tons', price: 820000 },
        medium: { quantity: '17500 tons', price: 1025000 },
        premium: { quantity: '17500 tons', price: 1230000 }
      },
      {
        pincode: '600127',
        resource: 'Bricks',
        basic: { quantity: '95000 pieces', price: 680000 },
        medium: { quantity: '95000 pieces', price: 850000 },
        premium: { quantity: '95000 pieces', price: 1020000 }
      },
      {
        pincode: '600127',
        resource: 'Aggregate',
        basic: { quantity: '9500 cubic feet', price: 320000 },
        medium: { quantity: '9500 cubic feet', price: 400000 },
        premium: { quantity: '9500 cubic feet', price: 480000 }
      },
      {
        pincode: '600127',
        resource: 'Sand',
        basic: { quantity: '10000 cubic feet', price: 375000 },
        medium: { quantity: '10000 cubic feet', price: 468750 },
        premium: { quantity: '10000 cubic feet', price: 562500 }
      },
      {
        pincode: '600127',
        resource: 'Flooring',
        basic: { quantity: '5000 sq. feet', price: 510000 },
        medium: { quantity: '5000 sq. feet', price: 637500 },
        premium: { quantity: '5000 sq. feet', price: 765000 }
      },
      {
        pincode: '600127',
        resource: 'Windows',
        basic: { quantity: '850 sq. feet', price: 182000 },
        medium: { quantity: '850 sq. feet', price: 227500 },
        premium: { quantity: '850 sq. feet', price: 273000 }
      },
      {
        pincode: '600127',
        resource: 'Doors',
        basic: { quantity: '900 sq. feet', price: 248000 },
        medium: { quantity: '900 sq. feet', price: 310000 },
        premium: { quantity: '900 sq. feet', price: 372000 }
      },
      {
        pincode: '600127',
        resource: 'Electrical fittings',
        basic: { quantity: '750 sq. feet', price: 61500 },
        medium: { quantity: '750 sq. feet', price: 76875 },
        premium: { quantity: '750 sq. feet', price: 92250 }
      },
      {
        pincode: '600127',
        resource: 'Painting',
        basic: { quantity: '30000 sq. feet', price: 690000 },
        medium: { quantity: '30000 sq. feet', price: 862500 },
        premium: { quantity: '30000 sq. feet', price: 1035000 }
      }
    ];

    const costBreakdownData = {
      pincode: '600127',
      breakdownData: [
        { label: 'Home Design & Approval', percentage: 11, color: '#F59E0B' },
        { label: 'Excavation', percentage: 13, color: '#10B981' },
        { label: 'Footing & Foundation', percentage: 16, color: '#3B82F6' },
        { label: 'RCC Work - Columns & Slabs', percentage: 19, color: '#EF4444' },
        { label: 'Roof Slab', percentage: 9, color: '#8B5CF6' },
        { label: 'Brickwork and Plastering', percentage: 8, color: '#6B7280' },
        { label: 'Flooring & Tiling', percentage: 7, color: '#F97316' },
        { label: 'Electric Wiring', percentage: 6, color: '#7C3AED' },
        { label: 'Water Supply & Plumbing', percentage: 5, color: '#059669' },
        { label: 'Door', percentage: 6, color: '#374151' }
      ]
    };

    const timelineData = {
      pincode: '600127',
      timelineData: [
        { label: 'Home Design & Approval', duration: 42, offset: 0, cost: '₹ 2,35,000' },
        { label: 'Excavation', duration: 15, offset: 42, cost: '₹ 1,15,000' },
        { label: 'Footing & Foundation', duration: 38, offset: 57, cost: '₹ 8,20,000' },
        { label: 'RCC Work - Columns & Slabs', duration: 19, offset: 95, cost: '₹ 5,65,000' },
        { label: 'Roof Slab', duration: 35, offset: 114, cost: '₹ 4,50,000' },
        { label: 'Brickwork and Plastering', duration: 9, offset: 149, cost: '₹ 92,000' },
        { label: 'Flooring & Tiling', duration: 24, offset: 158, cost: '₹ 3,95,000' },
        { label: 'Electric Wiring', duration: 16, offset: 182, cost: '₹ 1,12,000' },
        { label: 'Water Supply & Plumbing', duration: 28, offset: 198, cost: '₹ 72,000' },
        { label: 'Door', duration: 17, offset: 226, cost: '₹ 2,15,000' }
      ]
    };

    // Remove existing data for pincode 600127
    await Resource.deleteMany({ pincode: '600127' });
    await CostBreakdown.deleteMany({ pincode: '600127' });
    await Timeline.deleteMany({ pincode: '600127' });

    console.log('Existing data for pincode 600127 cleared');

    // Insert new data
    await Resource.insertMany(resourceData);
    await CostBreakdown.create(costBreakdownData);
    await Timeline.create(timelineData);

    console.log('✅ Data seeded successfully for pincode 600127');
    console.log(`📊 Inserted ${resourceData.length} resources`);
    console.log('📈 Inserted cost breakdown data');
    console.log('⏰ Inserted timeline data');

  } catch (error) {
    console.error('❌ Error seeding data for pincode 600127:', error);
    throw error;
  }
};

const runSeeding = async () => {
  try {
    await mongoose.connect('mongodb+srv://mr-fruit:Jfz1KFo7stuwOOsB@cemsite-clust.suuxmrk.mongodb.net/');
    console.log('🔗 Connected to MongoDB');

    await seedData600127();

    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('💥 Seeding failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📴 Database connection closed');
    process.exit(0);
  }
};

if (require.main === module) {
  runSeeding();
}

module.exports = seedData600127;
