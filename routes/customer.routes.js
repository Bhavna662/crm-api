import { Router } from "express";
import { createCustomer, deleteCustomer, fetchCustomerById, fetchCustomers, updateCustomer, getCustomerLogs, getCustomerCount } from "../controller/customer.controller.js";
const router = Router()

router.post('/', createCustomer)
router.get('/', fetchCustomers)
router.get('/:id', fetchCustomerById)
router.put('/:id', updateCustomer)
router.delete('/:id', deleteCustomer)
router.get('/:id/logs', getCustomerLogs)
router.get('/count', getCustomerCount);

export default router