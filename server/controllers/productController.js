const Product = require('../models/Product');
const User = require('../models/User');
const Category = require('../models/Category');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.getDashboardStats = async (req, res) => {
//   try {
//     const totalProducts = await Product.countDocuments();
//     const totalCategories = await Category.countDocuments();
//     const totalUsers = await User.countDocuments();

//     // Aggregate products created per month using MongoDB aggregation pipeline
//     const monthlyProductTrends = await Product.aggregate([
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           count: { $sum: 1 },
//           totalStock: { $sum: "$stock" }
//         }
//       },
//       { $sort: { "_id": 1 } }
//     ]);

//     // Map month numbers (1-12) to readable names
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
//     // Initialize standard 6-month or 12-month array layout
//     const salesData = monthNames.slice(0, 6).map((name, index) => {
//       const monthNum = index + 1;
//       const found = monthlyProductTrends.find(item => item._id === monthNum);
//       return {
//         name: name,
//         sales: found ? found.totalStock : 0, // Reflects actual total stock or activity per month
//         productsAdded: found ? found.count : 0
//       };
//     });

//     res.json({
//       totalProducts,
//       totalCategories,
//       totalUsers,
//       salesData,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalUsers = await User.countDocuments();

    // Sample trend data or dynamic aggregation
    const salesData = [
      { name: 'Jan', sales: 400 },
      { name: 'Feb', sales: 300 },
      { name: 'Mar', sales: 600 },
      { name: 'Apr', sales: 800 },
      { name: 'May', sales: 500 },
      { name: 'Jun', sales: totalProducts * 10 }, // Dynamic tie-in example
    ];

    res.json({
      totalProducts,
      totalCategories,
      totalUsers,
      salesData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};