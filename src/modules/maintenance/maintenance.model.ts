import mongoose from 'mongoose';
import { IMaintenanceDoc, IMaintenanceModel } from './maintenance.interfaces';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const maintenanceSchema = new mongoose.Schema<IMaintenanceDoc, IMaintenanceModel>(
  {
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    remarks: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled', 'failed'],
      required: true,
    },
    type: {
      type: String,
      enum: ['general', 'repair', 'annual'],
      required: true,
    },
    parts: {
      type: [String],
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    report_key_path: {
      type: String,
      trim: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    scheduledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    completedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

maintenanceSchema.pre('find', async function (next) {
  this.populate({
    path: 'vehicle',
  });
  next();
});

// add plugin that converts mongoose to json
maintenanceSchema.plugin(toJSON);
maintenanceSchema.plugin(paginate);

const Maintenance = mongoose.model<IMaintenanceDoc, IMaintenanceModel>('Maintenance', maintenanceSchema);

export default Maintenance;
