import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../errors/ApiError';
import Vehicle from './vehicles.model';
import { NewCreatedVehicle, IVehicleDoc, UpdateVehicleBody } from './vehicles.interfaces';
import { IOptions, QueryResult } from '../paginate/paginate';

/**
 * Create a vehicle
 * @param {NewCreatedVehicle} vehicleBody
 * @returns {Promise<IVehicleDoc>}
 */
export const createVehicle = async (vehicleBody: NewCreatedVehicle): Promise<IVehicleDoc> => {
  return Vehicle.create(vehicleBody);
};

/**
 * Query for vehicles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryVehicles = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const vehicles = await Vehicle.paginate(filter, options);
  return vehicles;
};

/**
 * Get vehicle by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IVehicleDoc | null>}
 */
export const getVehicleById = async (id: mongoose.Types.ObjectId): Promise<IVehicleDoc | null> => Vehicle.findById(id);

/**
 * Get vehicle by email
 * @param {string} email
 * @returns {Promise<IVehicleDoc | null>}
 */
export const getVehicleByEmail = async (email: string): Promise<IVehicleDoc | null> => Vehicle.findOne({ email });

export const getVehicleBySlug = async (slug: string): Promise<IVehicleDoc | null> => Vehicle.findOne({ slug });

/**
 * Update vehicle by id
 * @param {mongoose.Types.ObjectId} vehicleId
 * @param {UpdateVehicleBody} updateBody
 * @returns {Promise<IVehicleDoc | null>}
 */
export const updateVehicleById = async (
  vehicleId: mongoose.Types.ObjectId,
  updateBody: UpdateVehicleBody
): Promise<IVehicleDoc | null> => {
  const vehicle = await getVehicleById(vehicleId);
  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
  }

  Object.assign(vehicle, updateBody);
  await vehicle.save();
  return vehicle;
};

/**
 * Delete vehicle by id
 * @param {mongoose.Types.ObjectId} vehicleId
 * @returns {Promise<IVehicleDoc | null>}
 */
export const deleteVehicleById = async (vehicleId: mongoose.Types.ObjectId): Promise<IVehicleDoc | null> => {
  const vehicle = await getVehicleById(vehicleId);
  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
  }
  await vehicle.deleteOne();
  return vehicle;
};
