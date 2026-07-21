"use client";
import React, { useState, useEffect } from 'react';
import { StaffMember } from '../../../types/staff';
import { Users, Plus, ShieldCheck, Phone, Mail, ToggleLeft, ToggleRight, Trash2, Edit } from 'lucide-react';
import Button from '../../ui/Button';
import AddStaffModal from './AddStaffModal';
import RemoveStaffModal from './RemoveStaffModal';

const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Sajid Khan',
    phone: '0300-1234567',
    jobTitle: 'recovery_inspector',
    role: 'staff',
    loginEmail: 'sajid@devicecollection.com',
    isActive: true,
    createdAt: '2026-01-10T12:00:00Z',
  },
  {
    id: 'staff-2',
    name: 'Muhammad Ali',
    phone: '0321-7654321',
    jobTitle: 'salesman',
    role: 'staff',
    loginEmail: 'ali@devicecollection.com',
    isActive: true,
    createdAt: '2026-02-15T12:00:00Z',
  },
];

export default function StaffList() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('staff_members_v1');
      if (saved) {
        try {
          setStaffList(JSON.parse(saved));
        } catch (e) {
          console.error('Error loading staff', e);
          setStaffList(INITIAL_STAFF);
        }
      } else {
        setStaffList(INITIAL_STAFF);
        localStorage.setItem('staff_members_v1', JSON.stringify(INITIAL_STAFF));
      }
    }
  }, []);

  const saveToStorage = (updatedList: StaffMember[]) => {
    setStaffList(updatedList);
    localStorage.setItem('staff_members_v1', JSON.stringify(updatedList));
  };

  const handleAddStaff = (newStaffData: Omit<StaffMember, 'id' | 'createdAt'>) => {
    const newStaff: StaffMember = {
      ...newStaffData,
      id: `staff-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updated = [...staffList, newStaff];
    saveToStorage(updated);
    setIsAddOpen(false);
  };

  const handleToggleActive = (id: string) => {
    const updated = staffList.map((member) => {
      if (member.id === id) {
        return { ...member, isActive: !member.isActive };
      }
      return member;
    });
    saveToStorage(updated);
  };

  const handleJobTitleChange = (id: string, newTitle: 'recovery_inspector' | 'salesman') => {
    const updated = staffList.map((member) => {
      if (member.id === id) {
        return { ...member, jobTitle: newTitle };
      }
      return member;
    });
    saveToStorage(updated);
  };

  const handleOpenRemove = (member: StaffMember) => {
    setSelectedStaff(member);
    setIsRemoveOpen(true);
  };

  const handleConfirmRemove = () => {
    if (selectedStaff) {
      // Soft deactivate instead of hard delete
      const updated = staffList.map((member) => {
        if (member.id === selectedStaff.id) {
          return { ...member, isActive: false };
        }
        return member;
      });
      saveToStorage(updated);
      setIsRemoveOpen(false);
      setSelectedStaff(null);
    }
  };

  const getJobTitleLabel = (title: string) => {
    if (title === 'recovery_inspector') return 'Recovery Inspector';
    if (title === 'salesman') return 'Salesman';
    return title;
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-orange" />
            Staff Members
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Provision roles, monitor status flags, and update system credentials.
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          onClick={() => setIsAddOpen(true)}
          className="bg-brand-orange text-white flex items-center gap-1 text-xs md:text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Staff
        </Button>
      </div>

      {staffList.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 dark:border-slate-800 p-12 text-center">
          <Users className="w-10 h-10 text-gray-300 dark:text-slate-700 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No staff members added yet
          </p>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
            Click the button above to authorize your first staff member.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/45 border-b border-gray-100 dark:border-slate-800/60 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-5">Name</th>
                  <th className="py-4 px-5">Job Title</th>
                  <th className="py-4 px-5">Contact Details</th>
                  <th className="py-4 px-5">System Role</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800/50 text-sm">
                {staffList.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white">
                      {member.name}
                    </td>
                    <td className="py-4 px-5">
                      <select
                        value={member.jobTitle}
                        onChange={(e) =>
                          handleJobTitleChange(member.id, e.target.value as 'recovery_inspector' | 'salesman')
                        }
                        className="px-2 py-1 text-xs rounded-lg border border-gray-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white font-medium focus:outline-hidden focus:ring-1 focus:ring-brand-orange cursor-pointer"
                      >
                        <option value="recovery_inspector">Recovery Inspector</option>
                        <option value="salesman">Salesman</option>
                      </select>
                    </td>
                    <td className="py-4 px-5 space-y-0.5">
                      <div className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {member.phone}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-slate-500 flex items-center gap-1 select-all">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {member.loginEmail}
                      </div>
                    </td>
                    <td className="py-4 px-5 text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                      {member.role}
                    </td>
                    <td className="py-4 px-5">
                      <button
                        onClick={() => handleToggleActive(member.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          member.isActive
                            ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                            : 'bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${member.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        {member.isActive ? 'Active' : 'Suspended'}
                      </button>
                    </td>
                    <td className="py-4 px-5 text-right space-x-2">
                      <button
                        onClick={() => handleToggleActive(member.id)}
                        className="p-1.5 rounded-lg border border-gray-100 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                        title="Toggle status"
                      >
                        {member.isActive ? (
                          <ToggleRight className="w-4.5 h-4.5 text-brand-orange" />
                        ) : (
                          <ToggleLeft className="w-4.5 h-4.5 text-slate-400" />
                        )}
                      </button>
                      <button
                        onClick={() => handleOpenRemove(member)}
                        className="p-1.5 rounded-lg border border-gray-100 dark:border-slate-800 text-red-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
                        title="Remove access"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Grid Cards (stacks vertically) */}
          <div className="md:hidden divide-y divide-gray-100 dark:divide-slate-800/50">
            {staffList.map((member) => (
              <div key={member.id} className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-slate-800 dark:text-white">
                      {member.name}
                    </h4>
                    <div>
                      <select
                        value={member.jobTitle}
                        onChange={(e) =>
                          handleJobTitleChange(member.id, e.target.value as 'recovery_inspector' | 'salesman')
                        }
                        className="px-2 py-0.5 text-[11px] rounded-md border border-gray-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white font-semibold focus:outline-hidden focus:ring-1 focus:ring-brand-orange cursor-pointer"
                      >
                        <option value="recovery_inspector">Recovery Inspector</option>
                        <option value="salesman">Salesman</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleActive(member.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      member.isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600'
                        : 'bg-rose-50 dark:bg-rose-950/20 text-rose-500'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${member.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    {member.isActive ? 'Active' : 'Suspended'}
                  </button>
                </div>

                <div className="space-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    {member.phone}
                  </div>
                  <div className="flex items-center gap-1.5 select-all">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    {member.loginEmail}
                  </div>
                  <div className="flex items-center gap-1.5 uppercase font-mono text-[10px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    System Role: {member.role}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-slate-800/40">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleToggleActive(member.id)}
                    className="flex-1 py-1 text-xs text-slate-600 dark:text-slate-300"
                  >
                    {member.isActive ? 'Suspend' : 'Activate'}
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleOpenRemove(member)}
                    className="bg-red-600 text-white text-xs py-1"
                  >
                    Remove Access
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddStaff}
      />

      {/* Remove Confirm Modal */}
      <RemoveStaffModal
        isOpen={isRemoveOpen}
        staff={selectedStaff}
        onClose={() => {
          setIsRemoveOpen(false);
          setSelectedStaff(null);
        }}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
}
