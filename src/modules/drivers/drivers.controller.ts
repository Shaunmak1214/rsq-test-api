import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as driverService from './drivers.service';

export const createDriver = catchAsync(async (req: Request, res: Response) => {
  const driver = await driverService.createDriver(req.body);
  res.status(httpStatus.CREATED).send(driver);
});

export const getDrivers = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'age']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await driverService.queryDrivers(filter, options);
  res.send(result);
});

export const getDriver = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['driverId'] === 'string') {
    const driver = await driverService.getDriverById(new mongoose.Types.ObjectId(req.params['driverId']));
    if (!driver) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Driver not found');
    }
    res.send(driver);
  }
});

export const updateDriver = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['driverId'] === 'string') {
    const driver = await driverService.updateDriverById(new mongoose.Types.ObjectId(req.params['driverId']), req.body);
    res.send(driver);
  }
});

export const deleteDriver = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['driverId'] === 'string') {
    await driverService.deleteDriverById(new mongoose.Types.ObjectId(req.params['driverId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
