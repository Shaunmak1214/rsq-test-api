import express, { Router } from 'express';
import * as vehicleController from '../../modules/vehicles/vehicles.controller';

const router: Router = express.Router();

router.post('/vehicles', vehicleController.createVehicle);
router.get('/vehicles', vehicleController.getVehicles);
router.get('/vehicles/:vehicleId', vehicleController.getVehicle);
router.patch('/vehicles/:vehicleId', vehicleController.updateVehicle);
router.delete('/vehicles/:vehicleId', vehicleController.deleteVehicle);

export default router;
