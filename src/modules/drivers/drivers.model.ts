import mongoose from 'mongoose';
import { IDriverDoc, IDriverModel } from './drivers.interfaces';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const driverSchema = new mongoose.Schema<IDriverDoc, IDriverModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
driverSchema.plugin(toJSON);
driverSchema.plugin(paginate);

const Driver = mongoose.model<IDriverDoc, IDriverModel>('Driver', driverSchema);

export default Driver;
