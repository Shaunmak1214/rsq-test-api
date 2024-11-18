import { Document, Model } from 'mongoose';
import { IDriverDoc } from '../drivers/drivers.interfaces';
import { IVehicleDoc } from '../vehicles/vehicles.interfaces';

export interface IShipmentLoc {
  from: {
    name: string;
    lat: number;
    lng: number;
    address: string;
    time: Date;
  };
  to: {
    name: string;
    lat: number;
    lng: number;
    address: string;
    time: Date;
  };
  distance: number;
  duration: number;
  eta: Date;
}

export type CourierType = 'courier' | 'courierDelivery' | 'courierPickup';

export type ShipmentStatus =
  | 'scheduled'
  | 'pending'
  | 'delivering'
  | 'paused'
  | 'stopped'
  | 'delivered'
  | 'cancelled'
  | 'failed';

export interface IShipment {
  slug: string;
  vehicle: IVehicleDoc;
  driver: IDriverDoc;
  fromTo: IShipmentLoc;
  courierType: CourierType;
  courierName: string;
  status: ShipmentStatus;
}

export interface IShipmentDoc extends IShipment, Document {}

export interface IShipmentModel extends Model<IShipmentDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<any>;
}

export type NewCreatedShipment = Omit<IShipment, 'courierName'>;

export type UpdateShipmentBody = Partial<IShipment>;
