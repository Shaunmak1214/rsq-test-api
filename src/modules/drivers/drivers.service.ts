import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../errors/ApiError';
import Driver from './drivers.model';
import { NewCreatedDriver, IDriverDoc, UpdateDriverBody } from './drivers.interfaces';
import { IOptions, QueryResult } from '../paginate/paginate';

/**
 * Create a driver
 * @param {NewCreatedDriver} driverBody
 * @returns {Promise<IDriverDoc>}
 */
export const createDriver = async (driverBody: NewCreatedDriver): Promise<IDriverDoc> => {
  return Driver.create(driverBody);
};

/**
 * Query for drivers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryDrivers = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const drivers = await Driver.paginate(filter, options);
  return drivers;
};

/**
 * Get driver by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IDriverDoc | null>}
 */
export const getDriverById = async (id: mongoose.Types.ObjectId): Promise<IDriverDoc | null> => Driver.findById(id);

/**
 * Get driver by email
 * @param {string} email
 * @returns {Promise<IDriverDoc | null>}
 */
export const getDriverByEmail = async (email: string): Promise<IDriverDoc | null> => Driver.findOne({ email });

/**
 * Update driver by id
 * @param {mongoose.Types.ObjectId} driverId
 * @param {UpdateDriverBody} updateBody
 * @returns {Promise<IDriverDoc | null>}
 */
export const updateDriverById = async (
  driverId: mongoose.Types.ObjectId,
  updateBody: UpdateDriverBody
): Promise<IDriverDoc | null> => {
  const driver = await getDriverById(driverId);
  if (!driver) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Driver not found');
  }

  Object.assign(driver, updateBody);
  await driver.save();
  return driver;
};

/**
 * Delete driver by id
 * @param {mongoose.Types.ObjectId} driverId
 * @returns {Promise<IDriverDoc | null>}
 */
export const deleteDriverById = async (driverId: mongoose.Types.ObjectId): Promise<IDriverDoc | null> => {
  const driver = await getDriverById(driverId);
  if (!driver) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Driver not found');
  }
  await driver.deleteOne();
  return driver;
};
