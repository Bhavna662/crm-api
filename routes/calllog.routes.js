// routes/calllog.routes.js
import { Router } from 'express';
import { createCallLog, listCallLogsByCustomer } from '../controller/calllog.controller.js';

const router = Router();

router.post('/', createCallLog);
router.get('/customer/:customerId', listCallLogsByCustomer);



export default router;
