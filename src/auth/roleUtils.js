// auth/roleUtils.js
export const isAdmin = (role) => role === 'ADMIN';
export const isMember = (role) => ['member', 'ADMIN'].includes(role);
