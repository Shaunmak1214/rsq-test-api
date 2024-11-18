import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as vehicleService from './vehicles.service';

export const createVehicle = catchAsync(async (req: Request, res: Response) => {
  const vehicle = await vehicleService.createVehicle(req.body);
  res.status(httpStatus.CREATED).send(vehicle);
});

export const getVehicles = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'vehicleType']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await vehicleService.queryVehicles(filter, options);
  res.send(result);
});

export const getVehicle = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['vehicleId'] === 'string') {
    const vehicle = await vehicleService.getVehicleById(new mongoose.Types.ObjectId(req.params['vehicleId']));
    if (!vehicle) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
    }
    res.send(vehicle);
  }
});

export const updateVehicle = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['vehicleId'] === 'string') {
    const vehicle = await vehicleService.updateVehicleById(new mongoose.Types.ObjectId(req.params['vehicleId']), req.body);
    res.send(vehicle);
  }
});

export const deleteVehicle = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['vehicleId'] === 'string') {
    await vehicleService.deleteVehicleById(new mongoose.Types.ObjectId(req.params['vehicleId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
