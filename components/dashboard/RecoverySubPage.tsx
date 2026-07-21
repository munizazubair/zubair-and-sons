"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { formatCurrencyAmount } from '../../lib/calculateDashboardStats';

interface RecoveryTask {
  id: string;
  customerName: string;
  phone: string;
  installmentAmount: number;
  dueDate: string;
  isOverdue: boolean;
  collected: boolean;
}

const INITIAL_TASKS: RecoveryTask[] = [
  { id: 'REC-901', customerName: 'Zeeshan Khan', phone: '+91 98765 43210', installmentAmount: 15000, dueDate: 'Today', isOverdue: false, collected: false },
  { id: 'REC-902', customerName: 'Fatima Bi', phone: '+91 76543 21098', installmentAmount: 20000, dueDate: '5 Days Overdue', isOverdue: true, collected: false },
  { id: 'REC-903', customerName: 'Rohit Verma', phone: '+91 65432 10987', installmentAmount: 10000, dueDate: 'Today', isOverdue: false, collected: false },
  { id: 'REC-904', customerName: 'Siddharth Sen', phone: '+91 54321 09876', installmentAmount: 12500, dueDate: '7 Days Overdue', isOverdue: true, collected: false },
  { id: 'REC-905', customerName: 'Priya Sharma', phone: '+91 98989 12345', installmentAmount: 8000, dueDate: 'Today', isOverdue: false, collected: true },
];

export default function RecoverySubPage() {
  const [tasks, setTasks] = useState<RecoveryTask[]>(INITIAL_TASKS);
  const [activeTab, setActiveTab] = useState<'all' | 'due' | 'collected'>('all');

  const handleMarkCollected = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, collected: true } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === 'due') return !task.collected;
    if (activeTab === 'collected') return task.collected;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl md:text-2xl font-bold font-display text-slate-800 dark:text-white">
          Recovery Workspace
        </h2>
        <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400">
          Track individual customer collections, initiate messages, and confirm received payments.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-slate-800">
        {(['all', 'due', 'collected'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs md:text-sm font-semibold capitalize border-b-2 cursor-pointer transition-colors duration-200 ${
              activeTab === tab
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            {tab === 'due' ? 'Pending due/Overdue' : tab}
          </button>
        ))}
      </div>

      {/* Recovery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <motion.div
              layout
              key={task.id}
              className={`rounded-xl border p-5 bg-white dark:bg-slate-900 shadow-2xs relative flex flex-col justify-between ${
                task.collected
                  ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/[0.02]'
                  : task.isOverdue
                  ? 'border-rose-200 dark:border-rose-900/30'
                  : 'border-gray-200 dark:border-slate-800'
              }`}
            >
              {/* Top Details */}
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-gray-400 dark:text-slate-500">{task.id}</span>
                    <h3 className="text-base font-semibold text-slate-800 dark:text-white mt-0.5">
                      {task.customerName}
                    </h3>
                  </div>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      task.collected
                        ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                        : task.isOverdue
                        ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 animate-pulse'
                        : 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {task.collected ? 'collected' : task.isOverdue ? 'overdue' : 'due'}
                  </span>
                </div>

                <div className="space-y-1.5 mt-4">
                  <div className="flex justify-between text-xs font-sans text-gray-500 dark:text-slate-400">
                    <span>Due Date</span>
                    <span className={`font-semibold ${task.isOverdue && !task.collected ? 'text-rose-500' : 'text-slate-700 dark:text-slate-200'}`}>
                      {task.dueDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-sans text-gray-500 dark:text-slate-400">
                    <span>Amount Due</span>
                    <span className="font-semibold text-slate-800 dark:text-white">
                      {formatCurrencyAmount(task.installmentAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3.5 border-t border-gray-100 dark:border-slate-800/60 flex items-center gap-2">
                {!task.collected ? (
                  <>
                    <button
                      onClick={() => handleMarkCollected(task.id)}
                      className="flex-1 py-1.5 px-3 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors duration-200"
                    >
                      Receive
                    </button>
                    <a
                      href={`tel:${task.phone}`}
                      className="p-1.5 border border-gray-200 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400 rounded-lg cursor-pointer"
                      title="Call Customer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-4 h-4"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </a>
                  </>
                ) : (
                  <div className="flex-1 text-center py-1 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-900/30">
                    Payment Secured ✓
                  </div>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-400 dark:text-slate-500">
            No payments found matching the selected filter.
          </div>
        )}
      </div>
    </motion.div>
  );
}
