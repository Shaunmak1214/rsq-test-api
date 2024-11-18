import { Document, Model } from 'mongoose';

export type HealthStatus = 'good' | 'bad' | 'unknown';

export interface IVehicleHealth {
  overall: HealthStatus;
  engine: HealthStatus;
  transmission: HealthStatus;
  brakes: HealthStatus;
  tires: HealthStatus;
  fuel: HealthStatus;
  maintenance: HealthStatus;
  parts: HealthStatus;
}

export interface IVehicle {
  name: string;
  slug: string;
  vehicleType: string;
  status: string;
  weight: number;
  weightUnit: string;
  vehicleHealth: IVehicleHealth;
}

export interface IVehicleDoc extends IVehicle, Document {}

export interface IVehicleModel extends Model<IVehicleDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<any>;
}

export type NewCreatedVehicle = Omit<IVehicle, 'vehicleHealth'>;

export type UpdateVehicleBody = Partial<IVehicle>;
