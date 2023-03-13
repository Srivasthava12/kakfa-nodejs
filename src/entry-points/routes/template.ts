import util from 'util';
import { logger } from '@lib/logger';
import express from 'express';
import { registerTemplate } from '@services/template/register-template';

const router = express.Router();


router.post('/', async (req, res, next) => {
    try {
        logger.info(`In register route ${util.inspect(req.body)}`);
        const registerTemplateRespose = await registerTemplate(req.body);
        return res.json(registerTemplateRespose);
    } catch (error) {
        next(error);
        return undefined;
    }
});


module.exports = router