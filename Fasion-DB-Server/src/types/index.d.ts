import { IJwtPayload } from '../app/modules/auth/auth.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
    }
  }
}

