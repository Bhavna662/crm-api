import customerModel from "../model/customer.model.js"
import logModel from "../model/log.model.js"

export const createCustomer = async (req, res)=>{
    try {
         const customer = await customerModel.create(req.body)
         res.json(customer)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json(err)
    }
}

export const fetchCustomers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  try {
    const [customers, total] = await Promise.all([
      customerModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      customerModel.countDocuments(),
    ]);
    res.json({ customers, total });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const fetchCustomerById = async (req, res)=>{
   try {
       const customer = await customerModel.findById(req.params.id)
        
       if(!customer) 
        return res.status(404).json({message: 'customer not found'})
       
       res.json(customer)
   }
   catch(err)
   {
     res.status(500).json(err)
   }
}

export const updateCustomer = async (req, res)=>{
   try {
       const customer = await customerModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

       if(!customer)
           return res.status(404).json({message: 'customer not found'})

       res.json(customer)
   }
   catch(err)
   {
    res.status(500).json(err)
   }
}

export const deleteCustomer = async (req, res)=>{
   try{
     const customer = await customerModel.findByIdAndDelete(req.params.id)

     if(!customer)
           return res.status(404).json({message: 'customer not found'})

       res.json(customer)
   }
   catch(err)
   {
    res.status(500).json(err)
   }
}

export const getCustomerLogs = async (req, res)=>{
    try {
        const customerId = req.params.id;
        const logs = await logModel.find()
        res.json(logs)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}

export const getCustomerCount = async (req, res) => {
  try {
    const count = await customerModel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get customer count' });
  }
};