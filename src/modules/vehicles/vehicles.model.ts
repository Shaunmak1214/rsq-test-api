import mongoose from 'mongoose';
import { IVehicleDoc, IVehicleModel } from './vehicles.interfaces';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const vehicleSchema = new mongoose.Schema<IVehicleDoc, IVehicleModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: Number,
      default: 0,
    },
    weightUnit: {
      type: String,
      default: 'kg',
    },
    vehicleHealth: {
      overall: {
        type: String,
        enum: ['good', 'bad', 'unknown'],
        default: 'unknown',
      },
      engine: {
        type: String,
        enum: ['good', 'bad', 'unknown'],
        default: 'unknown',
      },
      transmission: {
        type: String,
        enum: ['good', 'bad', 'unknown'],
        default: 'unknown',
      },
      brakes: {
        type: String,
        enum: ['good', 'bad', 'unknown'],
        default: 'unknown',
      },
      tires: {
        type: String,
        enum: ['good', 'bad', 'unknown'],
        default: 'unknown',
      },
      fuel: {
        type: String,
        enum: ['good', 'bad', 'unknown'],
        default: 'unknown',
      },
      maintenance: {
        type: String,
        enum: ['good', 'bad', 'unknown'],
        default: 'unknown',
      },
      parts: {
        type: String,
        enum: ['good', 'bad', 'unknown'],
        default: 'unknown',
      },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
vehicleSchema.plugin(toJSON);
vehicleSchema.plugin(paginate);

const Vehicle = mongoose.model<IVehicleDoc, IVehicleModel>('Vehicle', vehicleSchema);

export default Vehicle;
