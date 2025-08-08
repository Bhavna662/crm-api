import logModel from "../model/log.model.js"

export const createLog = async (req, res)=>{
    try {
        const log = new logModel(req.body)
        await log.save()
        res.json(log)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}

export const fetchLogs = async (req, res)=>{
    try {
        const logs = await logModel.find()
        res.json(logs)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}

export const fetchLogById = async (req, res)=>{
    try {
        const log = await logModel.findById(req.params.id)

        if(!log)
            return res.status(400).json({message: 'log not found'})

        res.json(log)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}

export const updateLog = async (req, res)=>{
    try {
        const log = await logModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if(!log)
            return res.status(400).json({message: 'log not found'})

        res.json(log)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}

export const deleteLog = async (req, res)=>{
    try {
        const log = await logModel.findByIdAndDelete(req.params.id, req.body, {new: true})

        if(!log)
            return res.status(400).json({message: 'log not found'})

        res.json(log)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}