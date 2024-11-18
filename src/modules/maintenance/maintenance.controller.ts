import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as maintenanceService from './maintenance.service';
import * as vehicleService from '../vehicles/vehicles.service';
import { generateSlug } from '../utils';

export const createMaintenance = catchAsync(async (req: Request, res: Response) => {
  const vehicle = await vehicleService.getVehicleBySlug(req.body.vehicleSlug);

  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
  }

  req.body.slug = generateSlug();
  req.body.vehicle = vehicle._id;
  req.body.status = 'pending';

  const maintenance = await maintenanceService.createMaintenance(req.body);
  res.status(httpStatus.CREATED).send(maintenance);
});

export const getMaintenances = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['slug', 'vehicle', 'driver', 'fromTo', 'courierType']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await maintenanceService.queryMaintenances(filter, options);
  res.send(result);
});

export const getMaintenance = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['maintenanceId'] === 'string') {
    const maintenance = await maintenanceService.getMaintenanceById(
      new mongoose.Types.ObjectId(req.params['maintenanceId'])
    );
    if (!maintenance) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Maintenance not found');
    }
    res.send(maintenance);
  }
});

export const updateMaintenance = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['maintenanceId'] === 'string') {
    const maintenance = await maintenanceService.updateMaintenanceById(
      new mongoose.Types.ObjectId(req.params['maintenanceId']),
      req.body
    );
    res.send(maintenance);
  }
});

export const deleteMaintenance = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['maintenanceId'] === 'string') {
    await maintenanceService.deleteMaintenanceById(new mongoose.Types.ObjectId(req.params['maintenanceId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
