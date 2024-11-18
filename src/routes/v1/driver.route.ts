import express, { Router } from 'express';
import * as driverController from '../../modules/drivers/drivers.controller';

const router: Router = express.Router();

router.post('/drivers', driverController.createDriver);
router.get('/drivers', driverController.getDrivers);
router.get('/drivers/:driverId', driverController.getDriver);
router.patch('/drivers/:driverId', driverController.updateDriver);
router.delete('/drivers/:driverId', driverController.deleteDriver);

export default router;
