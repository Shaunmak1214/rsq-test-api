import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as shipmentService from './shipments.service';

export const createShipment = catchAsync(async (req: Request, res: Response) => {
  const shipment = await shipmentService.createShipment(req.body);
  res.status(httpStatus.CREATED).send(shipment);
});

export const getShipments = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['slug', 'vehicle', 'driver', 'fromTo', 'courierType']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await shipmentService.queryShipments(filter, options);
  res.send(result);
});

export const getShipment = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['shipmentId'] === 'string') {
    const shipment = await shipmentService.getShipmentById(new mongoose.Types.ObjectId(req.params['shipmentId']));
    if (!shipment) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Shipment not found');
    }
    res.send(shipment);
  }
});

export const updateShipment = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['shipmentId'] === 'string') {
    const shipment = await shipmentService.updateShipmentById(
      new mongoose.Types.ObjectId(req.params['shipmentId']),
      req.body
    );
    res.send(shipment);
  }
});

export const deleteShipment = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['shipmentId'] === 'string') {
    await shipmentService.deleteShipmentById(new mongoose.Types.ObjectId(req.params['shipmentId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});

export const getShipmentsAnalytics = catchAsync(async (_: Request, res: Response) => {
  const analytics = await shipmentService.getShipmentsAnalytics();
  res.send(analytics);
});
