import Shipping from '../models/shippingModel.js';
import { getRedisClient } from '../config/redisClient.js';

class ShippingController {

  /**
     * @method calculateCost
     * @description calculate cost
     * @param {object} request - The Request Object
     * @param {object} response - The Response Object
     * @returns {object} JSON API Response
     */  
  static async calculateCost(req, res) {
    try {
      const { weight, distance, cargoType } = req.body;
      const cacheKey = `shipping:${cargoType}:${weight}:${distance}`;

      const redis = getRedisClient();

      // ✅ Try cache only if Redis exists
      if (redis) {
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
          const rate = JSON.parse(cachedData);

          const totalCost =
            rate.basePrice +
            weight * rate.weightRate +
            distance * rate.distanceRate;

          return res.json({
            cargoType,
            weight,
            distance,
            totalCost,
            currency: rate.currency
          });
        }
      }

      // Fetch from DB
      const rate = await Shipping.findOne({ cargoType });

      if (!rate) {
        return res.status(404).json({
          error: "No rate found for this cargo type"
        });
      }

      const totalCost =
        rate.basePrice +
        weight * rate.weight +
        distance * rate.distance;

      // Cache if Redis exists
      if (redis) {
        const dataToCache = {
          basePrice: rate.basePrice,
          weightRate: rate.weight,
          distanceRate: rate.distance,
          currency: rate.currency
        };

        await redis.setEx(cacheKey, 3600, JSON.stringify(dataToCache));
      }

      return res.json({
        cargoType,
        weight,
        distance,
        totalCost,
        currency: rate.currency
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default ShippingController;
