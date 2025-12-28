/**
 * Auth Types and RBAC Definitions
 */

// User roles in order of permission level
export type UserRole = 'admin' | 'editor' | 'author' | 'viewer'

// Permission definitions
export type Permission =
  // Content management
  | 'content:create'
  | 'content:read'
  | 'content:update'
  | 'content:delete'
  | 'content:publish'
  // User management
  | 'users:read'
  | 'users:create'
  | 'users:update'
  | 'users:delete'
  // System settings
  | 'settings:read'
  | 'settings:update'
  // Analytics
  | 'analytics:read'

// Role-Permission mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    'content:create',
    'content:read',
    'content:update',
    'content:delete',
    'content:publish',
    'users:read',
    'users:create',
    'users:update',
    'users:delete',
    'settings:read',
    'settings:update',
    'analytics:read',
  ],
  editor: [
    'content:create',
    'content:read',
    'content:update',
    'content:delete',
    'content:publish',
    'users:read',
    'analytics:read',
  ],
  author: [
    'content:create',
    'content:read',
    'content:update', // Only own content
    'analytics:read', // Only own content analytics
  ],
  viewer: [
    'content:read',
  ],
}

// Role hierarchy (higher index = higher permissions)
export const ROLE_HIERARCHY: UserRole[] = ['viewer', 'author', 'editor', 'admin']

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false
}

/**
 * Check if a role is at least a certain level
 */
export function hasRoleLevel(userRole: UserRole, requiredRole: UserRole): boolean {
  const userLevel = ROLE_HIERARCHY.indexOf(userRole)
  const requiredLevel = ROLE_HIERARCHY.indexOf(requiredRole)
  return userLevel >= requiredLevel
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || []
}

/**
 * Check multiple permissions (AND logic)
 */
export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission))
}

/**
 * Check multiple permissions (OR logic)
 */
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission))
}
