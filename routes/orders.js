const router = require('express').Router();
const ordersModel = require('../models/Orders');
const axios = require('axios');
const mongoose = require('mongoose');
const menuModel = require('../models/Menus');

const toMongoId = mongoose.Types.ObjectId;


router.get("/", async (req,res)=>{


    try{
        const orders = await ordersModel.find().sort({date: -1}).populate('itemlist.itemCode')

        res.status(200).send(orders);
    }catch(err){
        console.log(err)
        res.status(500).send({response:"Server Error"});
    }
});

router.post("/create", async (req,res)=>{

    console.log(req.body)
    try{
        const newOrder  = new ordersModel({
            itemlist: req.body.itemlist,
            address: req.body.address,
            name: req.body.name,
        })
        await newOrder.save();
        res.status(200).send(newOrder);
    }catch(err){
        console.log(err)
        res.status(500).send({response:"Server Error"});
    }
});

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Orders:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The Menu ID.
 *           example: 62e78743fe39ddf97042f
 *         itemlist:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               itemCode:
 *                 type: string
 *                 example: 62e78743fe39ddf97042f
 *               quantity:
 *                 type: number
 *                 example: 24
 *         address:
 *           type: string
 *           description: User's Address.
 *           example: Appetizers
 *         name:
 *           type: string
 *           description: User's Name
 *           example: Crunchy nuggets
 *         date:
 *           type: string
 *           description: Date added.
 *           example: 2022-10-21T08:16:58.302+00:00         
 */


/**
 * @swagger
 * /api/orders/:
 *   get:
 *     summary: Get all Orders
 *     description: An Array of all Orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: A list of Orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Orders'
*/

/**
 * @swagger
 * /api/orders/create:
 *   post:
 *     summary: Create Orders
 *     description: Create Order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: TName of guest
 *                 example: Nik
 *               address:
 *                 type: string
 *                 description: Address of guest
 *                 example: Greece
 *               itemlist:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemCode:
 *                       type: string
 *                       example: 6433e5ba2418e839809c3b65
 *                     quantity:
 *                       type: number
 *                       example: 4
 *     responses:
 *       200:
 *         description: Created Order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Orders'
*/
