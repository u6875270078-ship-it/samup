import { type User, type InsertUser, type OtpCode, type InsertOtp } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createOtp(otp: InsertOtp): Promise<OtpCode>;
  getOtpByUserId(userId: string): Promise<OtpCode | undefined>;
  verifyOtp(userId: string, code: string): Promise<boolean>;
  deleteOtp(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private otpCodes: Map<string, OtpCode>;

  constructor() {
    this.users = new Map();
    this.otpCodes = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createOtp(insertOtp: InsertOtp): Promise<OtpCode> {
    const id = randomUUID();
    const otp: OtpCode = { 
      ...insertOtp, 
      id,
      verified: 'false'
    };
    this.otpCodes.set(id, otp);
    return otp;
  }

  async getOtpByUserId(userId: string): Promise<OtpCode | undefined> {
    return Array.from(this.otpCodes.values())
      .filter((otp) => otp.userId === userId && otp.verified === 'false')
      .sort((a, b) => b.expiresAt.getTime() - a.expiresAt.getTime())[0];
  }

  async verifyOtp(userId: string, code: string): Promise<boolean> {
    const otp = await this.getOtpByUserId(userId);
    if (!otp) return false;
    
    if (otp.expiresAt < new Date()) {
      return false;
    }
    
    if (otp.code === code) {
      otp.verified = 'true';
      return true;
    }
    
    return false;
  }

  async deleteOtp(id: string): Promise<void> {
    this.otpCodes.delete(id);
  }
}

export const storage = new MemStorage();
