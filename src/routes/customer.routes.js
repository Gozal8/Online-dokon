

import { Router } from "express";
import { createCustomer, deleteCustomer, getCustomerData, updateCustomer } from "../controller/customer.controller.js";


export const customerRoutes = Router()

customerRoutes
  .get('/', getCustomerData)
  .post('/add',createCustomer)
  .patch("/update/:customerId",updateCustomer)
  .delete("/delete/:customerId", deleteCustomer)


export default customerRoutes;