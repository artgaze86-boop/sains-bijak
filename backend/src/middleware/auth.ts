import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { prisma } from '../lib/prisma';

export interface AuthPayload {
  userId: string;
  email: string;
  role: Role;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

const JWT_SECRET = process.env.JWT_SECRET || 'sains-bijak-dev-secret';

export function signToken(payload: AuthPayload): string {
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token autentikasi diperlukan' });
    return;
  }

  const token = header.slice(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Token tidak sah atau telah tamat tempoh' });
  }
}

export function optionalAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (header?.startsWith('Bearer ')) {
    try {
      const decoded = jwt.verify(header.slice(7), JWT_SECRET) as AuthPayload;
      req.user = decoded;
    } catch {
      // ignore invalid token for optional auth
    }
  }

  next();
}

export function requireRole(...roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Tidak dibenarkan' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Akses ditolak untuk peranan ini' });
      return;
    }

    next();
  };
}

export async function requirePremium(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  if (!req.user) {
    res.status(401).json({ error: 'Tidak dibenarkan' });
    return;
  }

  if (req.user.role === Role.ADMIN || req.user.role === Role.TEACHER) {
    next();
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: { isPremium: true },
  });

  if (user?.isPremium) {
    next();
    return;
  }

  res.status(403).json({
    error: 'Langganan premium diperlukan untuk mengakses kandungan ini',
    code: 'PREMIUM_REQUIRED',
  });
}