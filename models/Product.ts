import { IProduct } from '@/interfaces';
import mongoose, { Schema, Model, model } from 'mongoose';

const productSchema = new Schema({
  description: {type: String, required: true},
  images: [{type: String}],
  inStock: {type: Number, required: true, default: 0},
  price: {type: Number, required: true, default: 0},
  sizes: [{
    type: String,
    enum: {
      values: ['XS','S','M','L','XL','XXL','XXXL'],
      message: '{VALUE} not permited size'
    }
  }],
  slug: {type: String, required: true, unique: true},
  tags: [{type: String}],
  title: {type: String, required: true},
  type: {
    type: String,
    enum: {
      values: ['shirts','pants','hoodies','hats'],
      message: '{VALUE} not permited type'
    }
  },
  gender: {
    type: String,
    enum: {
      values: ['men','women','kid','unisex'],
      message: '{VALUE} not permited gender'
    }
  }
}, {
  timestamps: true
});

// TODO: Crear indice de mongo

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);

export default Product;