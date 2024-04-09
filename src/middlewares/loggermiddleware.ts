import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const loggermiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Log the request method and URL
  logger.info(`${req.method} ${req.originalUrl}`);
  
  // Move to the next middleware
  next();
};

export default loggermiddleware;

// const logger = (options) =>
// (req, res, next) => { 
//   const timestamp = new Date().toISOString(); 
//     const { method, url, ip } = req; 
//       console.log(`
//           ${timestamp} 
//           ${options.level} 
//           ${method} ${url} 
//           ${ip}`); 
//         next(); 
//   };