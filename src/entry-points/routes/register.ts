import util from 'util';
import { logger } from '@lib/logger';
import express from 'express';
import * as RegisterService from '@services/register'



const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
      logger.info( `In register route ${util.inspect(req.body)}` );
      const addOrderResponse = await RegisterService.resgiterTemplate()
      return res.json(addOrderResponse);
    } catch (error) {
      next(error);
      return undefined;
    }
  });


module.exports = router