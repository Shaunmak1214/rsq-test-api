import express, { Router } from 'express';
import * as maintenanceController from '../../modules/maintenance/maintenance.controller';

const router: Router = express.Router();

router.post('/maintenances', maintenanceController.createMaintenance);
router.get('/maintenances', maintenanceController.getMaintenances);
router.get('/maintenances/:maintenanceId', maintenanceController.getMaintenance);
router.patch('/maintenances/:maintenanceId', maintenanceController.updateMaintenance);
router.delete('/maintenances/:maintenanceId', maintenanceController.deleteMaintenance);

export default router;
