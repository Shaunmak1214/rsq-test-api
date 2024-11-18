import { Document, Model } from 'mongoose';
import { IVehicleDoc } from '../vehicles/vehicles.interfaces';
import { IUserDoc } from '../user/user.interfaces';

export type MaintenanceType = 'general' | 'repair' | 'annual';

export type MaintenanceParts = 'engine' | 'transmission' | 'brakes' | 'tires' | 'fuel' | 'maintenance' | 'parts';

export type MaintenanceStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'failed';

export interface IMaintenance {
  slug: string;
  remarks: string;
  dueDate: Date;
  status: MaintenanceStatus;
  type: MaintenanceType;
  parts: MaintenanceParts[];
  vehicle: IVehicleDoc;
  report_key_path: string;
  scheduledDate: Date;
  scheduledBy: IUserDoc;
  completedDate: Date;
}

export interface IMaintenanceDoc extends IMaintenance, Document {}

export interface IMaintenanceModel extends Model<IMaintenanceDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<any>;
}

export type NewCreatedMaintenance = Omit<IMaintenance, 'scheduledBy'>;

export type UpdateMaintenanceBody = Partial<IMaintenance>;
