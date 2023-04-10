const router = require('express').Router();
const menuModel = require('../models/Menus');
const axios = require('axios');
const mongoose = require('mongoose');

const toMongoId = mongoose.Types.ObjectId;


router.get("/", async (req,res)=>{

    let currency = req.query.currency;
    let category = req.query.category;


    try{
        let menu;
        if(typeof category !== 'undefined'){
            if( category === 'Appetizers' || category === 'Drinks' || category === 'Main Dishes'){
                menu = await menuModel.find({category: category});
            }else{
                menu = await menuModel.find({});
            }
        }else{
            menu = await menuModel.find({});
        }
        if(typeof currency !== 'undefined'){
            const url = 'https://api.apilayer.com/fixer/latest?symbols='+currency.toString()+'&base=EUR'

            const currencyConvert = await axios.get(url,{
                headers: {
                    apikey: process.env.APILAYER.toString()
                }
            });

            menu = menu.map(obj => (
                {...obj._doc, [`price${currency}`]: obj.price * currencyConvert.data.rates[currency.toString()]}        
            ))
        }
        res.status(200).send(menu);
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
 *     Menu:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The Menu ID.
 *           example: 62e78743fe39ddf97042f
 *         item:
 *           type: string
 *           description: Menu Item name.
 *           example: Nuggets
 *         price:
 *           type: string
 *           description: Price of item EUR.
 *           example: 10
 *         category:
 *           type: string
 *           description: Appetizers, Drinks, Main Dishes.
 *           example: Appetizers
 *         description:
 *           type: string
 *           description: Description of item.
 *           example: Crunchy nuggets
 *         date:
 *           type: string
 *           description: Date added.
 *           example: 2022-10-21T08:16:58.302+00:00         
 */


/**
 * @swagger
 * /api/menu/:
 *   get:
 *     summary: Get all Menu items
 *     description: An Array of all Menu Items.
 *     tags:
 *       - Menu
 *     parameters:
 *       - in: query
 *         name: currency
 *         required: false
 *         schema:
 *           type: string
 *         description: Desired currency (Optional)
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         description: Desired category (Optional)
 *     responses:
 *       200:
 *         description: A list of Menu Items.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
*/
