export interface StaffMember {
  id: string;
  name: string;
  phone: string;
  jobTitle: 'recovery_inspector' | 'salesman';   // descriptive label only
  role: 'owner' | 'staff';                        // actual permission level
  loginEmail: string;
  isActive: boolean;
  createdAt: string;
}
