import {Router} from "express";
import { createLog, fetchLogs, fetchLogById, updateLog, deleteLog } from "../controller/log.controller.js";
const logRouter = Router()

logRouter.post('/', createLog)
logRouter.get('/', fetchLogs)
logRouter.get('/:id', fetchLogById)
logRouter.put('/:id', updateLog)
logRouter.delete('/:id',deleteLog)



export default logRouter
