// 从 @prisma/client 包中导入 PrismaClient
import { PrismaClient } from "@prisma/client";

// 声明一个全局变量来保存 PrismaClient 实例
declare global {
    var prisma: PrismaClient | undefined;
};

// 创建一个新的 PrismaClient 实例并将其赋值给 db 变量
export const db = globalThis.prisma || new PrismaClient();

// 如果环境不是生产环境，则将 db 变量赋值给全局 prisma 变量
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}