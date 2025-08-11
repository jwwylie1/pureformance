import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

export const viewAnalytics = async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

    const dailySalesData = await getDailySalesData(startDate, endDate);

    res.json({
      analyticsData,
      dailySalesData
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

const getAnalyticsData = async () => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();

 const salesData = await Order.aggregate([
    {
      $group: {
        _id: null, // groups all documents together
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      }
    }
  ]);

  const { totalSales, totalRevenue} = salesData[0] || { totalSales: 0, totalRevenue: 0 };

  return {
    users: totalUsers,
    products: totalProducts,
    totalSales,
    totalRevenue
  };
}

const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,  // greater than or equal to startDate
            $lte: endDate     // less than or equal to endDate
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" }
        }
      },
      {
        $sort: { _id: 1 } // sort by date ascending
      }
    ]);

    const dateArray = getDatesInRange(startDate, endDate);

    return dateArray.map(date => {
      const dailyData = dailySalesData.find(item => item._id === date);
      return {
        date,
        sales: dailyData?.sales || 0,
        revenue: dailyData?.revenue || 0
      };
    });
  } catch (error) {
    console.error("Error fetching daily sales data:", error);
    throw error;
  }
}

function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split('T')[0]); // format as YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}