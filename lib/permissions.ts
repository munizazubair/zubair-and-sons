export type UserRole = 'owner' | 'staff';

export interface UserPermissions {
  canViewAllCustomers: boolean;
  canAddCustomers: boolean;
  canEditCustomers: boolean;
  canDeleteCustomers: boolean;
  canRecordPayments: boolean;
  canAccessSettings: boolean;
  canManageStaff: boolean;
  canViewAllReports: boolean;
}

export const PERMISSIONS_BY_ROLE: Record<UserRole, UserPermissions> = {
  owner: {
    canViewAllCustomers: true,
    canAddCustomers: true,
    canEditCustomers: true,
    canDeleteCustomers: true,
    canRecordPayments: true,
    canAccessSettings: true,
    canManageStaff: true,
    canViewAllReports: true,
  },
  staff: {
    canViewAllCustomers: true, // can view assigned (all for mock simplicity)
    canAddCustomers: true,
    canEditCustomers: true, // only assigned
    canDeleteCustomers: false, // ✗ Cannot delete customers
    canRecordPayments: true,
    canAccessSettings: false, // ✗ Cannot access Settings
    canManageStaff: false,    // ✗ Cannot manage staff
    canViewAllReports: false, // ✗ Cannot view all reports
  }
};

/**
 * Checks if a user role has a specific system permission.
 */
export function hasPermission(role: UserRole, permission: keyof UserPermissions): boolean {
  return PERMISSIONS_BY_ROLE[role]?.[permission] ?? false;
}

/**
 * Helper to check if a route is accessible by a given role.
 */
export function isRouteAccessible(role: UserRole, path: string): boolean {
  if (path.includes('/settings') && role !== 'owner') {
    return false;
  }
  return true;
}
