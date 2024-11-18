import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../errors/ApiError';
import Maintenance from './maintenance.model';
import { NewCreatedMaintenance, IMaintenanceDoc, UpdateMaintenanceBody } from './maintenance.interfaces';
import { IOptions, QueryResult } from '../paginate/paginate';

/**
 * Create a maintenance
 * @param {NewCreatedMaintenance} maintenanceBody
 * @returns {Promise<IMaintenanceDoc>}
 */
export const createMaintenance = async (maintenanceBody: NewCreatedMaintenance): Promise<IMaintenanceDoc> => {
  return Maintenance.create(maintenanceBody);
};

/**
 * Query for maintenances
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryMaintenances = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const maintenances = await Maintenance.paginate(filter, options);
  return maintenances;
};

/**
 * Get maintenance by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IMaintenanceDoc | null>}
 */
export const getMaintenanceById = async (id: mongoose.Types.ObjectId): Promise<IMaintenanceDoc | null> =>
  Maintenance.findById(id);

/**
 * Get maintenance by email
 * @param {string} email
 * @returns {Promise<IMaintenanceDoc | null>}
 */
export const getMaintenanceByEmail = async (email: string): Promise<IMaintenanceDoc | null> =>
  Maintenance.findOne({ email });

/**
 * Update maintenance by id
 * @param {mongoose.Types.ObjectId} maintenanceId
 * @param {UpdateMaintenanceBody} updateBody
 * @returns {Promise<IMaintenanceDoc | null>}
 */
export const updateMaintenanceById = async (
  maintenanceId: mongoose.Types.ObjectId,
  updateBody: UpdateMaintenanceBody
): Promise<IMaintenanceDoc | null> => {
  const maintenance = await getMaintenanceById(maintenanceId);
  if (!maintenance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Maintenance not found');
  }

  Object.assign(maintenance, updateBody);
  await maintenance.save();
  return maintenance;
};

/**
 * Delete maintenance by id
 * @param {mongoose.Types.ObjectId} maintenanceId
 * @returns {Promise<IMaintenanceDoc | null>}
 */
export const deleteMaintenanceById = async (maintenanceId: mongoose.Types.ObjectId): Promise<IMaintenanceDoc | null> => {
  const maintenance = await getMaintenanceById(maintenanceId);
  if (!maintenance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Maintenance not found');
  }
  await maintenance.deleteOne();
  return maintenance;
};
