import mongoClient from 'mongoose';

// Create Schema
const shippingRateSchema = mongoClient.Schema({
  cargoType: { 
    type: String,
    required: true
   },
  weight: {
     type: Number,
     required: true
   },
  distance: {
     type: Number,
     required: true
     }, 
  basePrice: {
     type: Number,
     required: true
     }, 
     currency: {
       type: String, required: true
      },
});

shippingRateSchema.index({ cargoType: 1, weight: 1, distance: 1 });

const Shipping = mongoClient.model('shipping', shippingRateSchema, 'shipping_costs');

export default Shipping;
