/**
 * 路由常量 — 所有页面路径的单一来源
 */

// 核心页面
export const ABOUT = '/' as const;
export const TOOLS = '/tools' as const;
export const POSTS = '/posts' as const;

// 工具函数
export const postSlug = (id: string) => `${POSTS}/${id}` as const;
