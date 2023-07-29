import config from '../config/index.js';
import pino from 'pino';
import { v4 as uuid } from 'uuid';
import { context } from './async-context.js';


const pinoOptions = {
    level: config.logLevel,
  }

if(config.prettyPrint == true) pinoOptions["transport"] = {
    target: 'pino-pretty'
  };


const pinoLogger = pino(pinoOptions);

export const logger = new Proxy(pinoLogger, {
  get(target, property, receiver) {
    target = context.getStore()?.get('logger') || target;
    return Reflect.get(target, property, receiver);
  },
});

export function contextMiddleware(req, res, next){
  const child = pinoLogger.child({ traceId : req.headers._traceId || uuid() });
  const store = new Map();
  store.set('logger', child);
  return context.run(store, next);
};