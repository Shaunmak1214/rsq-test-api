import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../errors/ApiError';
import Shipment from './shipments.model';
import { NewCreatedShipment, IShipmentDoc, UpdateShipmentBody } from './shipments.interfaces';
import { IOptions, QueryResult } from '../paginate/paginate';
import Maintenance from '../maintenance/maintenance.model';
import Vehicle from '../vehicles/vehicles.model';

/**
 * Create a shipment
 * @param {NewCreatedShipment} shipmentBody
 * @returns {Promise<IShipmentDoc>}
 */
export const createShipment = async (shipmentBody: NewCreatedShipment): Promise<IShipmentDoc> => {
  return Shipment.create(shipmentBody);
};

/**
 * Query for shipments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryShipments = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const shipments = await Shipment.paginate(filter, options);
  return shipments;
};

/**
 * Get shipment by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IShipmentDoc | null>}
 */
export const getShipmentById = async (id: mongoose.Types.ObjectId): Promise<IShipmentDoc | null> => Shipment.findById(id);

/**
 * Get shipment by email
 * @param {string} email
 * @returns {Promise<IShipmentDoc | null>}
 */
export const getShipmentByEmail = async (email: string): Promise<IShipmentDoc | null> => Shipment.findOne({ email });

/**
 * Update shipment by id
 * @param {mongoose.Types.ObjectId} shipmentId
 * @param {UpdateShipmentBody} updateBody
 * @returns {Promise<IShipmentDoc | null>}
 */
export const updateShipmentById = async (
  shipmentId: mongoose.Types.ObjectId,
  updateBody: UpdateShipmentBody
): Promise<IShipmentDoc | null> => {
  const shipment = await getShipmentById(shipmentId);
  if (!shipment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shipment not found');
  }

  Object.assign(shipment, updateBody);
  await shipment.save();
  return shipment;
};

/**
 * Delete shipment by id
 * @param {mongoose.Types.ObjectId} shipmentId
 * @returns {Promise<IShipmentDoc | null>}
 */
export const deleteShipmentById = async (shipmentId: mongoose.Types.ObjectId): Promise<IShipmentDoc | null> => {
  const shipment = await getShipmentById(shipmentId);
  if (!shipment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shipment not found');
  }
  await shipment.deleteOne();
  return shipment;
};

export const getShipmentsAnalytics = async (): Promise<any> => {
  return {
    totalShipments: await Shipment.countDocuments(),
    totalMaintenance: await Maintenance.countDocuments(),
    totalDead: await Vehicle.countDocuments({ status: 'dead' }),
    totalVehicles: await Vehicle.countDocuments(),
  };
};
