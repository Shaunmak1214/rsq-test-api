import express, { Router } from 'express';
import * as shipmentController from '../../modules/shipments/shipments.controller';

const router: Router = express.Router();

router.post('/shipments', shipmentController.createShipment);
router.get('/shipments', shipmentController.getShipments);
router.get('/analytics', shipmentController.getShipmentsAnalytics);
router.get('/shipments/:shipmentId', shipmentController.getShipment);
router.patch('/shipments/:shipmentId', shipmentController.updateShipment);
router.delete('/shipments/:shipmentId', shipmentController.deleteShipment);

export default router;
