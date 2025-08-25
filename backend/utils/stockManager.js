// utils/stockManager.js
import Product from '../models/product.model.js'; // Adjust path to your Product model

class StockManager {
  static async reduceStock(purchases, session = null) {
    if (!purchases || !Array.isArray(purchases)) {
      throw new Error('Invalid purchases array');
    }

    // Create bulk write operations
    const stockUpdates = purchases.map(purchase => ({
      updateOne: {
        filter: { 
          _id: purchase.productId,
          stock: { $gte: purchase.quantity } // Only update if sufficient stock
        },
        update: { $inc: { stock: -purchase.quantity } }
      }
    }));

    if (stockUpdates.length === 0) {
      return { success: true, modifiedCount: 0 };
    }

    // Execute bulk write with session if provided
    const options = session ? { session } : {};
    const result = await Product.bulkWrite(stockUpdates, options);

    // Check if all items were successfully updated
    if (result.modifiedCount !== purchases.length) {
      const failedItems = await this.getInsufficientStockItems(purchases);
      throw new Error(`Insufficient stock for items: ${failedItems.join(', ')}`);
    }

    console.log(`Successfully reduced stock for ${result.modifiedCount} products`);
    return { success: true, modifiedCount: result.modifiedCount };
  }

  static async getInsufficientStockItems(purchases) {
    try {
      const productIds = purchases.map(p => p.productId);
      const products = await Product.find({ _id: { $in: productIds } });
      
      const failedItems = [];
      purchases.forEach(purchase => {
        const product = products.find(p => p._id.equals(purchase.productId));
        if (!product) {
          failedItems.push(`Product ${purchase.productId} not found`);
        } else if (product.stock < purchase.quantity) {
          failedItems.push(`${product.name || product._id} (available: ${product.stock}, requested: ${purchase.quantity})`);
        }
      });
      
      return failedItems;
    } catch (error) {
      console.error('Error checking stock levels:', error);
      return ['Unable to verify stock levels'];
    }
  }

  // Optional: Method to check stock availability before creating order
  static async checkStockAvailability(purchases) {
    const productIds = purchases.map(p => p.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    
    const issues = [];
    purchases.forEach(purchase => {
      const product = products.find(p => p._id.equals(purchase.productId));
      if (!product) {
        issues.push(`Product ${purchase.productId} not found`);
      } else if (product.stock < purchase.quantity) {
        issues.push({
          productId: purchase.productId,
          productName: product.name,
          requested: purchase.quantity,
          available: product.stock
        });
      }
    });

    return {
      hasIssues: issues.length > 0,
      issues
    };
  }
}

export default StockManager;