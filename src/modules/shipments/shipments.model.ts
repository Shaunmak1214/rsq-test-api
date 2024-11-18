import mongoose from 'mongoose';
import { IShipmentDoc, IShipmentModel } from './shipments.interfaces';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const shipmentSchema = new mongoose.Schema<IShipmentDoc, IShipmentModel>(
  {
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
    },
    fromTo: {
      from: {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        lat: {
          type: Number,
          required: true,
        },
        lng: {
          type: Number,
          required: true,
        },
        address: {
          type: String,
          required: true,
          trim: true,
        },
        time: {
          type: Date,
          required: true,
        },
      },
      to: {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        lat: {
          type: Number,
          required: true,
        },
        lng: {
          type: Number,
          required: true,
        },
        address: {
          type: String,
          required: true,
          trim: true,
        },
        time: {
          type: Date,
          required: true,
        },
      },
      distance: {
        type: Number,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      eta: {
        type: Date,
        required: true,
      },
    },
    courierType: {
      type: String,
      enum: ['courier', 'courierDelivery', 'courierPickup'],
      required: true,
    },
    courierName: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'pending', 'delivering', 'paused', 'stopped', 'delivered', 'cancelled', 'failed'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

shipmentSchema.pre('find', async function (next) {
  this.populate({
    path: 'vehicle',
  });
  this.populate({
    path: 'driver',
  });
  next();
});

// add plugin that converts mongoose to json
shipmentSchema.plugin(toJSON);
shipmentSchema.plugin(paginate);

const Shipment = mongoose.model<IShipmentDoc, IShipmentModel>('Shipment', shipmentSchema);

export default Shipment;
