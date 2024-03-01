import { Router } from 'express';

// Factoriser ces imports mais de quelle manière ?
//  import * from './router'
//  OU
//  import {eventRouter, messagingRouter, rewardRouter, ...} from './router'
import eventRouter from './eventRouter.js';
import messagingRouter from './messagingRouter.js';
import rewardRouter from './rewardRouter.js';
import pollRouter from './pollRouter.js';
import responseRouter from './responseRouter.js';
import taskRouter from './taskRouter.js';
import userRouter from './userRouter.js';
import colocationRouter from './colocationRouter.js';
import articleRouter from './articleRouter.js';
import expenseRouter from './expenseRouter.js';
import allergyRouter from './allergyRouter.js';
import ruleRouter from './ruleRouter.js';
import settingRouter from './settingRouter.js'

const router = Router();

router.use('/event', eventRouter);
router.use('/message', messagingRouter);
router.use('/reward', rewardRouter);
router.use('/poll', pollRouter);
router.use('/response', responseRouter);
router.use('/task', taskRouter);
router.use('/user', userRouter);
router.use('/colocation', colocationRouter);
router.use('/article', articleRouter);
router.use('/expense', expenseRouter);
router.use('/allergy', allergyRouter);
router.use('/rule', ruleRouter);
router.use('/task', taskRouter);
router.use('/setting', settingRouter);

export default router;
