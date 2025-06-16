/**
 * This is just example code. Replace it with your implementation. Just added a basic error handler in between.
 */

import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Something went wrong' });
};

export default errorHandler;