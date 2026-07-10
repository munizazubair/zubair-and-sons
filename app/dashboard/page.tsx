// "use client";
// import React, { useState, useEffect, useMemo } from 'react';
// import { createClient } from '@/lib/supabase/server';
// import { Customer, InstallmentPlan, Payment } from '@/type';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Users,
//   CreditCard,
//   Search,
//   Filter,
//   X,
//   CheckCircle2,
//   Clock,
//   RefreshCw,
//   Wallet,
//   Phone,
//   FileText,
//   MapPin,
//   ArrowLeft,
//   ChevronRight,
//   TrendingUp,
//   User,
//   AlertCircle
// } from 'lucide-react';

// export default function App2() {

//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [plans, setPlans] = useState<InstallmentPlan[]>([]);
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);
//   const [currentTime, setCurrentTime] = useState<string>('');
//   const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [areaFilter, setAreaFilter] = useState<string>('all');
//   const [detailTab, setDetailTab] = useState<'traditional' | 'modern'>('traditional');
//   const [traditionalSide, setTraditionalSide] = useState<'both' | 'front' | 'back'>('both');
//   const [activeTab, setActiveTab] = useState<'dashboard' | 'recovery' | 'reports' | 'add_customer'>('dashboard');
//   const [quickPayPlanId, setQuickPayPlanId] = useState<string | null>(null);
//   const [quickPayAmount, setQuickPayAmount] = useState<string>('');
//   const [quickPayNotes, setQuickPayNotes] = useState<string>('Routine installment collection.');
//   const [quickPayOfficer, setQuickPayOfficer] = useState<string>('Zubair Khan');
//   const [addFullName, setAddFullName] = useState<string>('');
//   const [addPhone, setAddPhone] = useState<string>('');
//   const [addCnic, setAddCnic] = useState<string>('');
//   const [addAddress, setAddAddress] = useState<string>('');
//   const [addAreaSelect, setAddAreaSelect] = useState<string>('Gulshan-e-Iqbal');
//   const [addAreaCustom, setAddAreaCustom] = useState<string>('');
//   const [addProductId, setAddProductId] = useState<string>('');
//   const [addTotalAmount, setAddTotalAmount] = useState<string>('120000');
//   const [addDownPayment, setAddDownPayment] = useState<string>('20000');
//   const [addDurationMonths, setAddDurationMonths] = useState<string>('10');
//   const [addStartDate, setAddStartDate] = useState<string>(new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Karachi' }));
//   const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

//   const TODAY_STR = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Karachi' });

//   // Live Karachi Clock
//   useEffect(() => {
//     const updateTime = () => {
//       const karachiTime = new Intl.DateTimeFormat('en-PK', {
//         timeZone: 'Asia/Karachi',
//         hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
//       }).format(new Date());
//       setCurrentTime(karachiTime);
//     };
//     updateTime();
//     const interval = setInterval(updateTime, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const calculatedInstallment = useMemo(() => {
//     const total = Number(addTotalAmount) || 0;
//     const down = Number(addDownPayment) || 0;
//     const months = Number(addDurationMonths) || 12;
//     if (months <= 0) return 0;
//     return Math.round((total - down) / months);
//   }, [addTotalAmount, addDownPayment, addDurationMonths]);

//   const loadData = async () => {
//     setLoading(true);
//     setErrorMsg(null);
//     try {
//       const supabase = await createClient();
//       if (!supabase) throw new Error('Supabase not configured. Check .env.local');

//       const { data: customersData, error: custErr } = await supabase
//         .from('customers').select('*').order('created_at', { ascending: false });
//       if (custErr) throw custErr;

//       const { data: plansData, error: plansErr } = await supabase
//         .from('installment_plans')
//         .select('*, customer:customers(full_name)')
//         .order('created_at', { ascending: false });
//       if (plansErr) throw plansErr;

//       const { data: paymentsData, error: payErr } = await supabase
//         .from('payments').select('*').order('created_at', { ascending: false });
//       if (payErr) throw payErr;

//       setCustomers(customersData || []);
//       setPlans(plansData || []);
//       setPayments(paymentsData || []);
//     } catch (err: any) {
//       setErrorMsg(err?.message || 'Failed to load data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { loadData(); }, []);

//   const handleQuickPaySubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!quickPayPlanId) return;
//     const amountNum = Number(quickPayAmount);
//     if (isNaN(amountNum) || amountNum <= 0) {
//       setErrorMsg('Please enter a valid amount greater than 0.');
//       return;
//     }
//     setLoading(true);
//     setErrorMsg(null);
//     setSuccessMsg(null);
//     try {
//       const supabase = await createClient();
//       if (!supabase) throw new Error('Supabase is not configured.');
//       const { error: payErr } = await supabase.from('payments').insert([{
//         plan_id: quickPayPlanId,
//         amount_paid: amountNum,
//         payment_date: TODAY_STR,
//         received_by: quickPayOfficer,
//         notes: quickPayNotes
//       }]);
//       if (payErr) throw payErr;

//       const plan = plans.find(p => p.id === quickPayPlanId);
//       if (plan) {
//         const result = await supabase.from('payments').select('amount_paid').eq('plan_id', quickPayPlanId);
//         const totalPaid = (result.data || []).reduce((s: any, p: any) => s + Number(p.amount_paid), 0);
//         if (totalPaid >= Number(plan.remaining_amount)) {
//           await supabase.from('installment_plans').update({ status: 'completed' }).eq('id', quickPayPlanId);
//         }
//       }
//       await loadData();
//       setSuccessMsg('Payment recorded successfully!');
//       setQuickPayPlanId(null);
//     } catch (err: any) {
//       setErrorMsg(err?.message || 'Failed to record payment.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddCustomerSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!addFullName.trim() || !addPhone.trim() || !addCnic.trim() || !addProductId.trim()) {
//       setErrorMsg('Please fill in all required fields.');
//       return;
//     }
//     setFormSubmitting(true);
//     setErrorMsg(null);
//     setSuccessMsg(null);
//     const calculatedRemaining = Number(addTotalAmount) - Number(addDownPayment);
//     const finalArea = addAreaSelect === 'custom' ? addAreaCustom : addAreaSelect;
//     const finalAddress = `${addAddress}, ${finalArea}, Karachi`;
//     try {
//       const supabase = await createClient();
//       if (!supabase) throw new Error('Supabase is not configured.');
//       const { data: newCust, error: custErr } = await supabase
//         .from('customers')
//         .insert([{ full_name: addFullName, phone: addPhone, cnic: addCnic, address: finalAddress }])
//         .select().single();
//       if (custErr) throw custErr;

//       const { error: planErr } = await supabase.from('installment_plans').insert([{
//         customer_id: newCust.id,
//         product_id: addProductId,
//         total_amount: Number(addTotalAmount),
//         down_payment: Number(addDownPayment),
//         remaining_amount: calculatedRemaining,
//         monthly_installment: calculatedInstallment,
//         duration_months: Number(addDurationMonths),
//         start_date: addStartDate,
//         status: 'active'
//       }]);
//       if (planErr) throw planErr;

//       await loadData();
//       setSuccessMsg(`Customer "${addFullName}" added successfully!`);
//       setAddFullName(''); setAddPhone(''); setAddCnic(''); setAddAddress('');
//       setAddProductId(''); setAddTotalAmount('120000'); setAddDownPayment('20000'); setAddDurationMonths('10');
//       setActiveTab('dashboard');
//     } catch (err: any) {
//       setErrorMsg(err?.message || 'Failed to add customer.');
//     } finally {
//       setFormSubmitting(false);
//     }
//   };

//   const formatPKR = (amount: number) => {
//     return new Intl.NumberFormat('en-PK', {
//       style: 'currency', currency: 'PKR',
//       minimumFractionDigits: 0, maximumFractionDigits: 0
//     }).format(amount);
//   };

//   const getCleanArea = (address: string) => {
//     if (!address) return "Karachi";
//     const areas = ["Saddar", "Gulshan-e-Iqbal", "DHA", "Federal B Area", "Orangi Town", "Korangi", "Liaquatabad", "Clifton", "North Nazimabad"];
//     for (const area of areas) {
//       if (address.toLowerCase().includes(area.toLowerCase())) return area;
//     }
//     const parts = address.split(',');
//     return parts.length > 1 ? parts[parts.length - 2].trim() : address;
//   };

//   const uniqueAreas = useMemo(() => {
//     const areasSet = new Set<string>();
//     customers.forEach(c => areasSet.add(getCleanArea(c.address)));
//     return Array.from(areasSet);
//   }, [customers]);

//   const stats = useMemo(() => {
//     const totalCustomersCount = customers.length;
//     const totalOutstanding = plans
//       .filter(p => p.status === 'active' || p.status === 'overdue')
//       .reduce((sum, p) => {
//         const planPayments = payments.filter(pay => pay.plan_id === p.id);
//         const totalPaid = planPayments.reduce((total, pay) => total + Number(pay.amount_paid), 0);
//         return sum + Math.max(0, Number(p.remaining_amount) - totalPaid);
//       }, 0);
//     const todaysDue = plans
//       .filter(p => p.status === 'active' || p.status === 'overdue')
//       .reduce((sum, p) => sum + Number(p.monthly_installment), 0);
//     const overduePlans = plans.filter(p => p.status === 'overdue');
//     const overdueCount = overduePlans.length;
//     const totalOverdueOutstanding = overduePlans.reduce((sum, p) => {
//       const planPayments = payments.filter(pay => pay.plan_id === p.id);
//       const totalPaid = planPayments.reduce((total, pay) => total + Number(pay.amount_paid), 0);
//       return sum + Math.max(0, Number(p.remaining_amount) - totalPaid);
//     }, 0);
//     return { totalCustomersCount, totalOutstanding, todaysDue, overdueCount, totalOverdueOutstanding };
//   }, [customers, plans, payments]);

//   const masterCustomerRows = useMemo(() => {
//     return customers.map(customer => {
//       const custPlans = plans.filter(p => p.customer_id === customer.id);
//       const totalAmount = custPlans.reduce((sum, p) => sum + Number(p.total_amount), 0);
//       const remainingAmount = custPlans.reduce((sum, p) => sum + Number(p.remaining_amount), 0);
//       let totalPaid = 0;
//       custPlans.forEach(plan => {
//         const planPayments = payments.filter(pay => pay.plan_id === plan.id);
//         totalPaid += planPayments.reduce((sum, p) => sum + Number(p.amount_paid), 0);
//       });
//       const outstandingDue = Math.max(0, remainingAmount - totalPaid);
//       return { customer, plans: custPlans, totalAmount, remainingAmount, totalPaid, outstandingDue, area: getCleanArea(customer.address) };
//     });
//   }, [customers, plans, payments]);

//   const filteredMasterRows = useMemo(() => {
//     let result = masterCustomerRows;
//     if (areaFilter !== 'all') result = result.filter(r => r.area.toLowerCase() === areaFilter.toLowerCase());
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(r =>
//         r.customer.full_name.toLowerCase().includes(query) ||
//         r.customer.phone.toLowerCase().includes(query) ||
//         r.customer.cnic.toLowerCase().includes(query) ||
//         r.customer.address.toLowerCase().includes(query) ||
//         r.plans.some(p => p.product_id.toLowerCase().includes(query))
//       );
//     }
//     return result;
//   }, [masterCustomerRows, searchQuery, areaFilter]);

//   const todaysPayments = useMemo(() => {
//     return payments.filter(p => p.payment_date === TODAY_STR).map(p => {
//       const plan = plans.find(pl => pl.id === p.plan_id);
//       const customer = plan ? customers.find(c => c.id === plan.customer_id) : null;
//       return { payment: p, plan, customer };
//     });
//   }, [payments, plans, customers]);

//   const todaysDefaulters = useMemo(() => {
//     return plans.filter(p => {
//       if (p.status !== 'active' && p.status !== 'overdue') return false;
//       const planPayments = payments.filter(pay => pay.plan_id === p.id);
//       const totalPaid = planPayments.reduce((sum, pay) => sum + Number(pay.amount_paid), 0);
//       if (totalPaid >= Number(p.remaining_amount)) return false;
//       return !planPayments.some(pay => pay.payment_date === TODAY_STR);
//     }).map(p => ({ plan: p, customer: customers.find(c => c.id === p.customer_id) }));
//   }, [plans, payments, customers]);

//   const selectedCustomerData = useMemo(() => {
//     if (!selectedCustomerId) return null;
//     const customer = customers.find(c => c.id === selectedCustomerId);
//     if (!customer) return null;
//     const custPlans = plans.filter(p => p.customer_id === customer.id).map(plan => {
//       const planPayments = payments.filter(pay => pay.plan_id === plan.id);
//       const amountPaid = planPayments.reduce((sum, p) => sum + Number(p.amount_paid), 0);
//       const outstanding = Math.max(0, Number(plan.remaining_amount) - amountPaid);
//       return { ...plan, amountPaid, outstanding, paymentsList: planPayments.sort((a, b) => new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime()) };
//     });
//     return {
//       customer, plans: custPlans,
//       overallTotal: custPlans.reduce((sum, p) => sum + Number(p.total_amount), 0),
//       overallRemaining: custPlans.reduce((sum, p) => sum + Number(p.remaining_amount), 0),
//       overallPaid: custPlans.reduce((sum, p) => sum + p.amountPaid, 0),
//       overallOutstanding: custPlans.reduce((sum, p) => sum + p.outstanding, 0),
//       area: getCleanArea(customer.address)
//     };
//   }, [selectedCustomerId, customers, plans, payments]);

//   const getStatusBadge = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'active': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
//       case 'completed': return 'bg-blue-50 text-blue-700 border border-blue-200';
//       case 'overdue': return 'bg-amber-50 text-amber-700 border border-amber-200';
//       case 'defaulted': return 'bg-rose-50 text-rose-700 border border-rose-200';
//       default: return 'bg-slate-50 text-slate-700 border border-slate-200';
//     }
//   };

//   return (
//     <div>

//     <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">

//       {/* HEADER */}
//       <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <div className="h-11 w-11 rounded-lg bg-indigo-950 flex items-center justify-center text-white font-bold text-lg shadow-sm">
//                 Z&S
//               </div>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h1 className="text-xl font-bold tracking-tight text-slate-900">Zubair & Sons</h1>
//                   <span className="text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
//                     Recovery HQ
//                   </span>
//                 </div>
//                 <p className="text-xs text-slate-500 font-medium">Karachi Installment Recovery Ledger — Real-time Audit & Collections</p>
//               </div>
//             </div>
//             <div className="flex flex-wrap items-center gap-3">
//               <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
//                 <Clock size={13} className="text-indigo-600" />
//                 <span className="font-semibold text-slate-700">Karachi (UTC+5): {currentTime}</span>
//               </div>
//               <button onClick={loadData} className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all cursor-pointer" title="Refresh Ledger">
//                 <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* TAB NAVIGATION */}
//       <div className="bg-white border-b border-slate-200 sticky top-[73px] z-9 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between py-1 overflow-x-auto scrollbar-none">
//             <div className="flex space-x-1 sm:space-x-2 py-1.5">
//               {[
//                 { key: 'dashboard', label: 'Recovery Ledger Book', icon: <Users size={15} /> },
//                 { key: 'recovery', label: 'Field Sheet (ریکوری شیٹ)', icon: <Clock size={15} /> },
//                 { key: 'reports', label: 'Audit Reports', icon: <TrendingUp size={15} /> },
//                 { key: 'add_customer', label: 'Add Customer Card', icon: <CreditCard size={15} /> },
//               ].map(tab => (
//                 <button key={tab.key}
//                   onClick={() => { setActiveTab(tab.key as any); setSelectedCustomerId(null); }}
//                   className={`flex items-center gap-2 py-2 px-3 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${activeTab === tab.key ? 'bg-indigo-950 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
//                   {tab.icon}{tab.label}
//                 </button>
//               ))}
//             </div>
//             <div className="hidden lg:block text-[11px] font-bold text-indigo-900 bg-indigo-50 px-2.5 py-1.5 rounded-md border border-indigo-100 uppercase tracking-wide">
//               {activeTab === 'dashboard' && "Primary Ledger Database"}
//               {activeTab === 'recovery' && "Field Cash Collection Sheet"}
//               {activeTab === 'reports' && "Performance & Audit Analytics"}
//               {activeTab === 'add_customer' && "New Customer Registration Card"}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

//         {/* ERROR / SUCCESS */}
//         {errorMsg && (
//           <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold px-4 py-3 rounded-xl flex items-center justify-between">
//             <span>⚠️ {errorMsg}</span>
//             <button onClick={() => setErrorMsg(null)}><X size={14} /></button>
//           </div>
//         )}
//         {successMsg && (
//           <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-4 py-3 rounded-xl flex items-center justify-between">
//             <span>✅ {successMsg}</span>
//             <button onClick={() => setSuccessMsg(null)}><X size={14} /></button>
//           </div>
//         )}

//         {loading ? (
//           <div className="py-24 flex flex-col items-center justify-center gap-3">
//             <RefreshCw className="animate-spin text-slate-400" size={32} />
//             <p className="text-sm font-semibold text-slate-500">Recalculating Karachi payment ledgers & collection routes...</p>
//           </div>
//         ) : (
//           <AnimatePresence mode="wait">

//             {/* CUSTOMER DETAIL PAGE */}
//             {selectedCustomerId && selectedCustomerData ? (
//               <motion.div key="customer-detail-subpage" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-6">

//                 <div className="flex items-center justify-between">
//                   <button onClick={() => setSelectedCustomerId(null)} className="group px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer">
//                     <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
//                     Back to Karachi Recovery Dashboard
//                   </button>
//                   <div className="text-xs font-semibold text-slate-500">
//                     Customer Account: <span className="font-mono text-slate-700 font-bold">{selectedCustomerData.customer.id}</span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                   <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between space-y-4">
//                     <div>
//                       <div className="flex items-center gap-3">
//                         <div className="h-12 w-12 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
//                           {selectedCustomerData.customer.full_name.charAt(0)}
//                         </div>
//                         <div>
//                           <h2 className="text-lg font-bold text-slate-900">{selectedCustomerData.customer.full_name}</h2>
//                           <div className="flex items-center gap-1 text-xs text-indigo-600 font-semibold mt-0.5">
//                             <MapPin size={12} /><span>{selectedCustomerData.area} Area</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-xs">
//                         <div className="flex justify-between">
//                           <span className="text-slate-400 font-semibold">Phone Contact:</span>
//                           <span className="text-slate-800 font-bold font-mono flex items-center gap-1"><Phone size={12} className="text-slate-400" />{selectedCustomerData.customer.phone}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-slate-400 font-semibold">National CNIC:</span>
//                           <span className="text-slate-800 font-bold font-mono">{selectedCustomerData.customer.cnic}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-slate-400 font-semibold">Complete Address:</span>
//                           <span className="text-slate-600 font-medium text-right max-w-[180px]">{selectedCustomerData.customer.address}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[11px] text-slate-500 font-mono">
//                       Created: {new Date(selectedCustomerData.customer.created_at).toLocaleString()}
//                     </div>
//                   </div>

//                   <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between lg:col-span-2">
//                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                       <div className="space-y-1">
//                         <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Value</span>
//                         <h4 className="text-lg font-bold text-slate-900">{formatPKR(selectedCustomerData.overallTotal)}</h4>
//                         <p className="text-[10px] text-slate-500">Retail Value</p>
//                       </div>
//                       <div className="space-y-1">
//                         <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Down Payout</span>
//                         <h4 className="text-lg font-bold text-slate-800">{formatPKR(selectedCustomerData.overallTotal - selectedCustomerData.overallRemaining)}</h4>
//                         <p className="text-[10px] text-slate-500">Deposit at contract</p>
//                       </div>
//                       <div className="space-y-1">
//                         <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Total Recovered</span>
//                         <h4 className="text-lg font-bold text-emerald-600">{formatPKR(selectedCustomerData.overallPaid)}</h4>
//                         <p className="text-[10px] text-emerald-600 font-medium font-mono">Installments cleared</p>
//                       </div>
//                       <div className="space-y-1">
//                         <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Outstanding Due</span>
//                         <h4 className={`text-lg font-bold ${selectedCustomerData.overallOutstanding > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
//                           {formatPKR(selectedCustomerData.overallOutstanding)}
//                         </h4>
//                         <p className="text-[10px] text-slate-500">Pending recovery</p>
//                       </div>
//                     </div>
//                     <div className="space-y-2 mt-6">
//                       <div className="flex justify-between text-xs font-semibold">
//                         <span className="text-slate-500">Ledger Amortization Status</span>
//                         <span className="text-emerald-600">
//                           {selectedCustomerData.overallRemaining > 0
//                             ? `${Math.round((selectedCustomerData.overallPaid / selectedCustomerData.overallRemaining) * 100)}% Recovered`
//                             : '100% Settled'}
//                         </span>
//                       </div>
//                       <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
//                         <div className="bg-emerald-500 h-full transition-all duration-500"
//                           style={{ width: `${selectedCustomerData.overallRemaining > 0 ? Math.min(100, (selectedCustomerData.overallPaid / selectedCustomerData.overallRemaining) * 100) : 100}%` }} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* VIEW TOGGLE */}
//                 <div className="flex bg-slate-200/60 p-1 rounded-xl gap-2 border border-slate-300/50">
//                   <button onClick={() => setDetailTab('traditional')}
//                     className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${detailTab === 'traditional' ? 'bg-indigo-950 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}>
//                     <FileText size={15} />Traditional Paper Card View (روایتی شیڈول کارڈ)
//                   </button>
//                   <button onClick={() => setDetailTab('modern')}
//                     className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${detailTab === 'modern' ? 'bg-indigo-950 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}>
//                     <TrendingUp size={15} />Modern Analytical View (ڈیجیٹل شیٹ)
//                   </button>
//                 </div>

//                 {/* TRADITIONAL CARD */}
//                 {detailTab === 'traditional' && (
//                   <div className="space-y-6">
//                     <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
//                       <div className="space-y-0.5 text-center sm:text-left">
//                         <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 justify-center sm:justify-start">
//                           <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
//                           Zubair & Sons Traditional Ledger replica (شیڈول کارڈ)
//                         </h4>
//                         <p className="text-[11px] text-slate-500">This mimics the original physical Urdu installment book.</p>
//                       </div>
//                       <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200 text-[11px] font-semibold">
//                         {(['both', 'front', 'back'] as const).map(side => (
//                           <button key={side} onClick={() => setTraditionalSide(side)}
//                             className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${traditionalSide === side ? 'bg-indigo-950 text-white' : 'text-slate-600 hover:text-slate-900'}`}>
//                             {side === 'both' ? 'Show Both Sides' : side === 'front' ? 'Front (فرنٹ سائیڈ)' : 'Back (بیک سائیڈ)'}
//                           </button>
//                         ))}
//                       </div>
//                     </div>

//                     <div className={`grid gap-8 ${traditionalSide === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>

//                       {/* FRONT CARD */}
//                       {(traditionalSide === 'both' || traditionalSide === 'front') && (
//                         <div className="bg-[#FAF7F2] text-slate-900 border-4 border-double border-slate-800 rounded-2xl p-6 sm:p-8 relative shadow-md select-none font-urdu" style={{ minHeight: '800px' }}>
//                           <div className="absolute inset-2 border border-slate-800/40 rounded-xl pointer-events-none" />
//                           <div className="text-center relative z-10 mb-4">
//                             <span className="inline-block bg-slate-900 text-[#FAF7F2] text-[10px] font-bold px-3 py-1 rounded-md tracking-wider">نقد و آسان اقساط پر</span>
//                           </div>
//                           <div className="text-center relative z-10 space-y-1">
//                             <h2 className="text-4xl font-extrabold text-slate-900 leading-tight font-urdu tracking-tight italic">زبیر اینڈ سنز</h2>
//                             <div className='h-2'/>
//                             {/* <div className="h-0.5 w-44 bg-slate-900 mx-auto my-1" /> */}
//                             <div className='h-2'/>
//                             <p className="text-[11px] sm:text-xs font-bold text-slate-700 font-urdu italic">ہفتہ وار ادائیگی اتوار کے دن کی جائے گی۔</p>
//                             <div className="h-0.5 w-full bg-slate-800/40 mt-3" />
//                           </div>

//                           <div className="mt-6 space-y-4 relative z-10">
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">اکاؤنٹ نمبر:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-mono italic font-bold text-xs pb-0.5 text-center">{selectedCustomerData.customer.id}</span>
//                               </div>
//                               <div className="flex items-baseline gap-1.5 sm:col-span-2">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">نام:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-urdu italic font-bold text-xs pb-0.5 text-center">{selectedCustomerData.customer.full_name}</span>
//                               </div>
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                               <div className="flex items-baseline gap-1.5 sm:col-span-2">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">ولدیت:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-urdu italic font-bold text-xs pb-0.5 text-center">
//                                   {selectedCustomerData.customer.full_name.includes("Zubair") ? "محمد رفیق خان" : "محمد قاسم"}
//                                 </span>
//                               </div>
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">سیلزمین:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-950 font-urdu italic text-xs pb-0.5 text-center">حمزہ صدیقی</span>
//                               </div>
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">مکان نمبر:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-mono italic font-bold text-xs pb-0.5 text-center">
//                                   {selectedCustomerData.customer.address.match(/\d+/) ? `H-${selectedCustomerData.customer.address.match(/\d+/)?.[0]}` : "H-14/B"}
//                                 </span>
//                               </div>
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">گلی نمبر:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-mono italic font-bold text-xs pb-0.5 text-center">Street 5</span>
//                               </div>
//                               <div className="flex items-baseline gap-1.5 sm:col-span-2">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">ایریا:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-urdu italic font-bold text-xs pb-0.5 text-center">{selectedCustomerData.area}</span>
//                               </div>
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">قریبی جگہ:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-urdu italic font-bold text-xs pb-0.5 text-center">نزد جامع مسجد بلال</span>
//                               </div>
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">ریکوری انسپکٹر:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-950 font-urdu italic text-xs pb-0.5 text-center">محمد زبیر خان</span>
//                               </div>
//                             </div>

//                             <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 border-b border-slate-300 pb-0.5 font-urdu">ضمانتی معلومات (Guarantor Ledger)</div>

//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                               <div className="flex items-baseline gap-1.5 sm:col-span-2">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">ضمانتی نام:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-urdu italic font-bold text-xs pb-0.5 text-center">محمد عاصم شاہ</span>
//                               </div>
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">ولدیت:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-urdu italic font-bold text-xs pb-0.5 text-center">سید طارق شاہ</span>
//                               </div>
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">مکان نمبر:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-mono italic font-bold text-xs pb-0.5 text-center">H-412</span>
//                               </div>
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">گلی نمبر:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-mono italic font-bold text-xs pb-0.5 text-center">Street 2</span>
//                               </div>
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">ایریا:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-urdu italic font-bold text-xs pb-0.5 text-center">{selectedCustomerData.area}</span>
//                               </div>
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">ضمانتی فون نمبر:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-mono italic font-bold text-xs pb-0.5 text-center">+92 321 8392104</span>
//                               </div>
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">فون نمبر:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-mono italic font-bold text-xs pb-0.5 text-center">{selectedCustomerData.customer.phone}</span>
//                               </div>
//                             </div>

//                             <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 border-b border-slate-300 pb-0.5 font-urdu">خریداری اشیاء و قیمت (Product Installment Ledger)</div>

//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                               <div className="flex items-baseline gap-1.5 sm:col-span-2">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">اشیاء:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-mono italic font-bold text-xs pb-0.5 text-center truncate">
//                                   {selectedCustomerData.plans[0]?.product_id || "الیکٹرانکس سامان"}
//                                 </span>
//                               </div>
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">تاریخ فروخت:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-mono italic font-bold text-xs pb-0.5 text-center">
//                                   {selectedCustomerData.plans[0]?.start_date || TODAY_STR}
//                                 </span>
//                               </div>
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">کل قیمت:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-mono italic font-bold text-xs pb-0.5 text-center">
//                                   {formatPKR(selectedCustomerData.plans[0]?.total_amount || 0)}
//                                 </span>
//                               </div>
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">ڈاؤن پیمنٹ:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-900 font-mono italic font-bold text-xs pb-0.5 text-center">
//                                   {formatPKR(selectedCustomerData.plans[0]?.down_payment || 0)}
//                                 </span>
//                               </div>
//                               <div className="flex items-baseline gap-1.5">
//                                 <span className="text-[11px] font-bold text-slate-800 font-urdu shrink-0">گارنٹی:</span>
//                                 <span className="border-b border-dashed border-slate-800 flex-1 text-indigo-950 font-urdu italic text-xs pb-0.5 text-center">مینوفیکچرنگ وارنٹی</span>
//                               </div>
//                             </div>
//                           </div>

//                           {/* PAYMENT TABLE */}
//                           <div className="mt-6 space-y-2 relative z-10">
//                             <div className="text-center font-extrabold text-sm font-urdu tracking-tight border-b-2 border-slate-900 pb-1 mb-2 text-slate-900 uppercase">
//                               شیڈول وصولیابی (Schedule of Collection Ledger)
//                             </div>
//                             <div className="border border-slate-800 rounded-lg overflow-hidden bg-white/50 text-[10px] sm:text-xs">
//                               <div className="grid grid-cols-12 bg-slate-900 text-[#FAF7F2] font-bold py-1.5 text-center font-urdu">
//                                 <div className="col-span-1 border-r border-slate-700">شمار</div>
//                                 <div className="col-span-3 border-r border-slate-700">تاریخ ادائیگی</div>
//                                 <div className="col-span-3 border-r border-slate-700">رقم ادا کی</div>
//                                 <div className="col-span-3 border-r border-slate-700">بقایا بیلنس</div>
//                                 <div className="col-span-2">دستخط</div>
//                               </div>
//                               <div className="divide-y divide-slate-800/40 text-center font-semibold font-mono text-[11px]">
//                                 {(() => {
//                                   const planId = selectedCustomerData.plans[0]?.id;
//                                   const listPayments = planId
//                                     ? payments.filter(pay => pay.plan_id === planId).sort((a, b) => new Date(a.payment_date).getTime() - new Date(b.payment_date).getTime())
//                                     : [];
//                                   const rows: React.ReactNode[] = [];
//                                   let currentRemaining = Number(selectedCustomerData.plans[0]?.remaining_amount || 0);
//                                   listPayments.forEach((pay, idx) => {
//                                     currentRemaining = Math.max(0, currentRemaining - Number(pay.amount_paid));
//                                     rows.push(
//                                       <div key={pay.id} className="grid grid-cols-12 py-1 bg-[#fdfcf7] hover:bg-slate-100 transition-colors">
//                                         <div className="col-span-1 border-r border-slate-800/20 text-slate-500 font-mono py-0.5">{idx + 1}</div>
//                                         <div className="col-span-3 border-r border-slate-800/20 text-blue-900 font-mono italic font-bold py-0.5">{pay.payment_date}</div>
//                                         <div className="col-span-3 border-r border-slate-800/20 text-emerald-700 font-mono italic font-bold py-0.5">{formatPKR(pay.amount_paid)}</div>
//                                         <div className="col-span-3 border-r border-slate-800/20 text-slate-900 font-mono py-0.5">{formatPKR(currentRemaining)}</div>
//                                         <div className="col-span-2 text-indigo-900 font-urdu italic text-[10px] font-bold py-0.5">Zubair</div>
//                                       </div>
//                                     );
//                                   });
//                                   const emptySpots = Math.max(0, 10 - listPayments.length);
//                                   for (let i = 0; i < emptySpots; i++) {
//                                     rows.push(
//                                       <div key={`empty-${i}`} className="grid grid-cols-12 py-1.5 bg-[#fdfcf7]/40 h-8">
//                                         <div className="col-span-1 border-r border-slate-800/20 text-slate-300 py-0.5">{listPayments.length + i + 1}</div>
//                                         <div className="col-span-3 border-r border-slate-800/20 text-slate-300 py-0.5">..................</div>
//                                         <div className="col-span-3 border-r border-slate-800/20 text-slate-300 py-0.5">..................</div>
//                                         <div className="col-span-3 border-r border-slate-800/20 text-slate-300 py-0.5">..................</div>
//                                         <div className="col-span-2 text-slate-300 py-0.5">............</div>
//                                       </div>
//                                     );
//                                   }
//                                   return rows;
//                                 })()}
//                               </div>
//                             </div>
//                           </div>

//                           <div className="mt-6 border-t border-slate-800/40 pt-4 space-y-2 relative z-10 text-[10px] sm:text-[11px] text-slate-700 font-urdu font-medium">
//                             <div className="flex justify-between">
//                               <span className="font-bold">دستخط خریدار: <span className="border-b border-slate-800 w-24 inline-block h-3 ml-1" /></span>
//                               <span className="font-bold">ضمانتی دستخط: <span className="border-b border-slate-800 w-24 inline-block h-3 ml-1" /></span>
//                             </div>
//                             <p className="text-rose-800 font-bold italic mt-2 text-center">نوٹ: دو ماہ قسط کی ادائیگی نہ کرنے پر سامان ضبط کر لیا جائے گا۔</p>
//                             <p className="text-slate-600 font-semibold italic text-center">ہر ماہ قسط کی بروقت ادائیگی کی صورت میں 5٪ خصوصی رعایت ہوگی۔</p>
//                           </div>
//                         </div>
//                       )}

//                       {/* BACK CARD */}
//                       {(traditionalSide === 'both' || traditionalSide === 'back') && (
//                         <div className="bg-[#FAF7F2] text-slate-900 border-4 border-double border-slate-800 rounded-2xl p-6 sm:p-8 relative shadow-md select-none font-urdu" style={{ minHeight: '800px' }}>
//                           <div className="absolute inset-2 border border-slate-800/40 rounded-xl pointer-events-none" />
//                           <div className="text-center relative z-10 mb-6 border-b-2 border-slate-900 pb-3">
//                             <h3 className="text-2xl font-black text-slate-900 tracking-tight font-urdu">شرائط و ضوابط (Schedule Terms & Payments Back)</h3>
//                           </div>
//                           <div className="mt-4 p-4 border-2 border-dashed border-slate-800 rounded-xl bg-white/40 space-y-3 relative z-10">
//                             <h4 className="text-center font-black text-xs sm:text-sm text-slate-950 font-urdu border-b border-slate-800 pb-1 uppercase tracking-wider">ہ د ا ی ا ت (General Guidelines)</h4>
//                             <ul className="text-[11px] sm:text-xs font-urdu font-bold text-slate-800 space-y-2.5 leading-relaxed">
//                               {[
//                                 '300 روپے فارم فیس اور ڈیلیوری چارجز قیمت میں شامل نہیں ہے۔ سامان واپسی کی صورت میں یہ رقم ناقابل واپسی ہے۔',
//                                 'سامان کی گارنٹی جو کارڈ پر لکھ کر گئی ہوگی مینوفیکچرنگ گارنٹی ہوگی۔',
//                                 'استعمال شدہ سامان واپس یا تبدیل نہیں ہوگا۔ ریپئر کر کے ہی دیا جائے گا۔',
//                                 'سامان ضبط ہونے کی صورت میں ہر قسم کا ایڈوانس اور قسط ناقابل واپسی ہوگی۔',
//                                 'رعایت جو کارڈ پر لکھ کر دی گئی ہے وہی ہوگی اس کے علاوہ کسی قسم کی کوئی رعایت نہیں ہوگی۔',
//                                 'سیلزمین جب ریکوری انسپکٹر کو کارڈ چیک کروائے تو ریکوری انسپکٹر کو ہی سامان یا قسط ادا کرے۔',
//                                 'قسط ادا نہ کرنے کی صورت میں ضمانتی کو ہی قسط ادا کرنی ہوگی۔',
//                               ].map((text, i) => (
//                                 <li key={i} className="flex items-start gap-2"><span className="text-slate-950 text-md shrink-0 mt-0.5">⭐</span><span>{text}</span></li>
//                               ))}
//                             </ul>
//                           </div>
//                           <div className="mt-20 space-y-8 relative z-10 border-t border-slate-800/40 pt-8">
//                             <p className="text-xs font-black text-center text-slate-950 font-urdu leading-relaxed">میں نے یہ تمام شرائط سن کر پڑھ کر سمجھ لی ہیں اور برضا و رغبت دستخط کئے ہیں۔</p>
//                             <div className="grid grid-cols-2 gap-6 text-xs sm:text-sm font-urdu font-black text-slate-900 mt-6">
//                               <div className="space-y-4 text-center">
//                                 <div className="text-indigo-900 font-serif italic font-bold border-b border-slate-800 mx-auto w-32 h-10 flex items-end justify-center">
//                                   {selectedCustomerData.customer.full_name.split(' ')[0]} (Buyer)
//                                 </div>
//                                 <div>خریدار دستخط (Buyer Sign)</div>
//                               </div>
//                               <div className="space-y-4 text-center">
//                                 <div className="text-indigo-950 font-serif italic border-b border-slate-800 mx-auto w-32 h-10 flex items-end justify-center text-slate-400">M. Shahid (Guarantor)</div>
//                                 <div>ضمانتی دستخط (Guarantor Sign)</div>
//                               </div>
//                             </div>
//                             <div className="h-6" />
//                             <div className="bg-slate-900 text-[#FAF7F2] p-3 rounded-lg text-center text-[10px] font-mono leading-relaxed mt-12">
//                               Zubair & Sons Karachi Recovery Registry Book • Certified Record Audit {new Date().getFullYear()}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* MODERN VIEW */}
//                 {detailTab === 'modern' && (
//                   <div className="space-y-6">
//                     <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
//                       <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
//                         <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
//                           <CreditCard size={16} className="text-slate-500" />
//                           Active Installment Agreements ({selectedCustomerData.plans.length})
//                         </h3>
//                       </div>
//                       {selectedCustomerData.plans.length === 0 ? (
//                         <div className="p-8 text-center text-xs text-slate-400">No agreements found for this client.</div>
//                       ) : (
//                         <div className="overflow-x-auto">
//                           <table className="w-full text-left text-xs border-collapse">
//                             <thead>
//                               <tr className="border-b border-slate-100 text-[10px] font-semibold tracking-wider text-slate-400 uppercase bg-slate-50/20">
//                                 <th className="py-3 px-5">Product Description</th>
//                                 <th className="py-3 px-4 text-right">Total</th>
//                                 <th className="py-3 px-4 text-right">Down Payment</th>
//                                 <th className="py-3 px-4 text-right">Principal Bal</th>
//                                 <th className="py-3 px-4 text-right text-indigo-700">Monthly</th>
//                                 <th className="py-3 px-4 text-center">Duration</th>
//                                 <th className="py-3 px-4 text-right text-emerald-700">Paid</th>
//                                 <th className="py-3 px-4 text-right">Outstanding</th>
//                                 <th className="py-3 px-4 text-center">Start Date</th>
//                                 <th className="py-3 px-5 text-center">Status</th>
//                               </tr>
//                             </thead>
//                             <tbody className="divide-y divide-slate-100 font-medium">
//                               {selectedCustomerData.plans.map(plan => (
//                                 <tr key={plan.id} className="hover:bg-slate-50/30">
//                                   <td className="py-3 px-5 font-bold text-slate-900 font-mono text-[11px]">{plan.product_id}</td>
//                                   <td className="py-3 px-4 text-right text-slate-800">{formatPKR(plan.total_amount)}</td>
//                                   <td className="py-3 px-4 text-right text-slate-500">{formatPKR(plan.down_payment)}</td>
//                                   <td className="py-3 px-4 text-right text-slate-700">{formatPKR(plan.remaining_amount)}</td>
//                                   <td className="py-3 px-4 text-right text-indigo-700 font-bold">{formatPKR(plan.monthly_installment)}/mo</td>
//                                   <td className="py-3 px-4 text-center font-mono text-slate-600">{plan.duration_months} Months</td>
//                                   <td className="py-3 px-4 text-right text-emerald-600 font-bold">{formatPKR(plan.amountPaid)}</td>
//                                   <td className="py-3 px-4 text-right text-slate-900 font-bold">{formatPKR(plan.outstanding)}</td>
//                                   <td className="py-3 px-4 text-center font-mono text-slate-500 text-[10px]">{plan.start_date}</td>
//                                   <td className="py-3 px-5 text-center">
//                                     <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${getStatusBadge(plan.status)}`}>{plan.status}</span>
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       )}
//                     </div>

//                     <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
//                       <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
//                         <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
//                           <Wallet size={16} className="text-slate-500" />
//                           Installment Recovery Log Timeline
//                         </h3>
//                       </div>
//                       <div className="overflow-x-auto">
//                         <table className="w-full text-left text-xs border-collapse">
//                           <thead>
//                             <tr className="border-b border-slate-100 text-[10px] font-semibold tracking-wider text-slate-400 uppercase bg-slate-50/20">
//                               <th className="py-3 px-5">Receipt ID</th>
//                               <th className="py-3 px-4">Product</th>
//                               <th className="py-3 px-4 text-right">Amount</th>
//                               <th className="py-3 px-4 text-center">Date</th>
//                               <th className="py-3 px-4">Collected By</th>
//                               <th className="py-3 px-5">Notes</th>
//                             </tr>
//                           </thead>
//                           <tbody className="divide-y divide-slate-100 font-medium">
//                             {selectedCustomerData.plans.flatMap(plan =>
//                               plan.paymentsList.map(pay => (
//                                 <tr key={pay.id} className="hover:bg-slate-50/30">
//                                   <td className="py-3 px-5 font-mono text-slate-400 font-bold text-[10px]">{pay.id}</td>
//                                   <td className="py-3 px-4 text-slate-700 font-mono text-[11px]">{plan.product_id}</td>
//                                   <td className="py-3 px-4 text-right text-emerald-600 font-bold font-mono">{formatPKR(pay.amount_paid)}</td>
//                                   <td className="py-3 px-4 text-center font-mono text-slate-500 text-[10px]">{pay.payment_date}</td>
//                                   <td className="py-3 px-4 text-slate-700">{pay.received_by || 'Zubair Khan'}</td>
//                                   <td className="py-3 px-5 text-slate-500 italic text-[11px]">{pay.notes || 'Routine installment collection.'}</td>
//                                 </tr>
//                               ))
//                             ).length === 0
//                               ? <tr><td colSpan={6} className="p-8 text-center text-xs text-slate-400">No payments recorded yet.</td></tr>
//                               : selectedCustomerData.plans.flatMap(plan =>
//                                 plan.paymentsList.map(pay => (
//                                   <tr key={`r-${pay.id}`} className="hover:bg-slate-50/30">
//                                     <td className="py-3 px-5 font-mono text-slate-400 font-bold text-[10px]">{pay.id}</td>
//                                     <td className="py-3 px-4 text-slate-700 font-mono text-[11px]">{plan.product_id}</td>
//                                     <td className="py-3 px-4 text-right text-emerald-600 font-bold font-mono">{formatPKR(pay.amount_paid)}</td>
//                                     <td className="py-3 px-4 text-center font-mono text-slate-500 text-[10px]">{pay.payment_date}</td>
//                                     <td className="py-3 px-4 text-slate-700">{pay.received_by || 'Zubair Khan'}</td>
//                                     <td className="py-3 px-5 text-slate-500 italic text-[11px]">{pay.notes || 'Routine installment collection.'}</td>
//                                   </tr>
//                                 ))
//                               )
//                             }
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//               </motion.div>

//             ) : (

//               /* MAIN DASHBOARD */
//               <motion.div key={`main-dashboard-${activeTab}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">

//                 {/* STATS CARDS */}
//                 {activeTab !== 'add_customer' && (
//                   <section>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                       <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between hover:border-slate-300 transition-all">
//                         <div className="space-y-1">
//                           <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Total Customers</p>
//                           <h3 className="text-2xl font-black text-slate-900">{stats.totalCustomersCount}</h3>
//                           <p className="text-[11px] text-slate-500 font-medium">Registered Karachi Clients</p>
//                         </div>
//                         <div className="h-10 w-10 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center"><Users size={18} /></div>
//                       </div>
//                       <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between hover:border-slate-300 transition-all">
//                         <div className="space-y-1">
//                           <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Outstanding Balance</p>
//                           <h3 className="text-2xl font-black text-amber-600">{formatPKR(stats.totalOutstanding)}</h3>
//                           <p className="text-[11px] text-slate-500 font-medium">Active remaining portfolio</p>
//                         </div>
//                         <div className="h-10 w-10 bg-amber-50 border border-amber-100 text-amber-700 rounded-lg flex items-center justify-center"><Wallet size={18} /></div>
//                       </div>
//                       <div className="bg-emerald-950 text-white rounded-xl p-5 shadow-sm flex items-center justify-between hover:bg-emerald-900 transition-all border border-emerald-800">
//                         <div className="space-y-1">
//                           <p className="text-[10px] text-emerald-300 font-bold tracking-wider uppercase">Due Today</p>
//                           <h3 className="text-2xl font-black text-emerald-400">{formatPKR(stats.todaysDue)}</h3>
//                           <p className="text-[11px] text-emerald-200 font-medium">Today's target collection</p>
//                         </div>
//                         <div className="h-10 w-10 bg-emerald-900/50 text-emerald-400 border border-emerald-800 rounded-lg flex items-center justify-center"><TrendingUp size={18} /></div>
//                       </div>
//                       <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between hover:border-slate-300 transition-all">
//                         <div className="space-y-1">
//                           <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Overdue Contracts</p>
//                           <h3 className="text-2xl font-black text-rose-600">{stats.overdueCount} Plans</h3>
//                           <p className="text-[11px] text-slate-500 font-medium">Value: {formatPKR(stats.totalOverdueOutstanding)}</p>
//                         </div>
//                         <div className="h-10 w-10 bg-rose-50 border border-rose-100 text-rose-700 rounded-lg flex items-center justify-center"><AlertCircle size={18} /></div>
//                       </div>
//                     </div>
//                   </section>
//                 )}

//                 {/* DASHBOARD TAB */}
//                 {activeTab === 'dashboard' && (
//                   <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
//                     <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
//                       <div>
//                         <h2 className="text-md sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
//                           <Users size={18} className="text-indigo-950" />Consolidated Customer Recovery Ledger
//                         </h2>
//                         <p className="text-xs text-slate-500 mt-0.5">Search and filter combined customer details, address areas, national identity numbers, and comprehensive installment portfolios.</p>
//                       </div>
//                       <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
//                         <div className="relative">
//                           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
//                           <input type="text" placeholder="Search name, phone, CNIC..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
//                             className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all w-full sm:w-56" />
//                           {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={12} /></button>}
//                         </div>
//                         <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shrink-0 text-xs text-slate-500">
//                           <Filter size={13} className="text-slate-400" />
//                           <select value={areaFilter} onChange={e => setAreaFilter(e.target.value)} className="bg-transparent font-semibold focus:outline-none text-slate-700 cursor-pointer">
//                             <option value="all">All Karachi Areas</option>
//                             {uniqueAreas.map(area => <option key={area} value={area}>{area}</option>)}
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                     {filteredMasterRows.length === 0 ? (
//                       <div className="p-16 text-center">
//                         <FileText className="mx-auto text-slate-300 mb-2" size={36} />
//                         <p className="text-sm font-semibold text-slate-500">No matching client ledgers found.</p>
//                         <p className="text-xs text-slate-400 mt-1">Try resetting the area filter or typing a different keyword.</p>
//                       </div>
//                     ) : (
//                       <div className="overflow-x-auto">
//                         <table className="w-full text-left text-xs sm:text-sm border-collapse">
//                           <thead>
//                             <tr className="border-b border-slate-100 text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase bg-slate-50/25">
//                               <th className="py-3.5 px-6">Customer & Phone No</th>
//                               <th className="py-3.5 px-4">Karachi Area</th>
//                               <th className="py-3.5 px-4">National CNIC</th>
//                               <th className="py-3.5 px-4">Primary Product Bought</th>
//                               <th className="py-3.5 px-4 text-right">Portfolio Total</th>
//                               <th className="py-3.5 px-4 text-right text-emerald-700">Total Recovered</th>
//                               <th className="py-3.5 px-4 text-right">Outstanding Bal</th>
//                               <th className="py-3.5 px-4 text-center">Active Contracts</th>
//                               <th className="py-3.5 px-6 text-center">Action Details</th>
//                             </tr>
//                           </thead>
//                           <tbody className="divide-y divide-slate-100 text-xs font-medium">
//                             {filteredMasterRows.map(({ customer, plans: custPlans, totalAmount, totalPaid, outstandingDue, area }) => {
//                               const latestPlan = custPlans[0];
//                               const productLabel = latestPlan ? latestPlan.product_id : 'No active purchase';
//                               return (
//                                 <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedCustomerId(customer.id)}>
//                                   <td className="py-3.5 px-6">
//                                     <div className="flex items-center gap-2.5">
//                                       <div className="h-7 w-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-extrabold group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
//                                         {customer.full_name.charAt(0)}
//                                       </div>
//                                       <div>
//                                         <div className="font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">{customer.full_name}</div>
//                                         <div className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">{customer.phone}</div>
//                                       </div>
//                                     </div>
//                                   </td>
//                                   <td className="py-3.5 px-4 text-slate-600 font-semibold"><span className="inline-flex items-center gap-1"><MapPin size={11} className="text-slate-400" />{area}</span></td>
//                                   <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{customer.cnic}</td>
//                                   <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px] max-w-[150px] truncate" title={productLabel}>
//                                     {productLabel}
//                                     {custPlans.length > 1 && <span className="ml-1 text-[9px] px-1 bg-slate-100 text-slate-500 rounded font-sans font-semibold">+{custPlans.length - 1} more</span>}
//                                   </td>
//                                   <td className="py-3.5 px-4 text-right text-slate-900">{formatPKR(totalAmount)}</td>
//                                   <td className="py-3.5 px-4 text-right text-emerald-600 font-bold">{formatPKR(totalPaid)}</td>
//                                   <td className={`py-3.5 px-4 text-right font-black ${outstandingDue > 0 ? 'text-amber-600' : 'text-slate-400'}`}>{formatPKR(outstandingDue)}</td>
//                                   <td className="py-3.5 px-4 text-center">
//                                     <span className="font-mono text-xs px-2.5 py-0.5 bg-slate-100 border border-slate-200 rounded-md text-slate-600 font-bold">{custPlans.length}</span>
//                                   </td>
//                                   <td className="py-3.5 px-6 text-center">
//                                     <div className="flex items-center justify-center gap-2">
//                                       <button onClick={e => { e.stopPropagation(); setSelectedCustomerId(customer.id); }}
//                                         className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold rounded-md transition-all flex items-center gap-0.5 cursor-pointer">
//                                         View Card <ChevronRight size={10} />
//                                       </button>
//                                       {latestPlan && latestPlan.status !== 'completed' && (
//                                         <button onClick={e => { e.stopPropagation(); setQuickPayPlanId(latestPlan.id); setQuickPayAmount(String(latestPlan.monthly_installment)); setQuickPayNotes("Installment collection - Cash Received"); setQuickPayOfficer("Zubair Khan"); }}
//                                           className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold rounded-md transition-all flex items-center gap-1 cursor-pointer border border-emerald-200/50">
//                                           <CheckCircle2 size={11} />Paid
//                                         </button>
//                                       )}
//                                     </div>
//                                   </td>
//                                 </tr>
//                               );
//                             })}
//                           </tbody>
//                         </table>
//                       </div>
//                     )}
//                   </section>
//                 )}

//                 {/* RECOVERY TAB */}
//                 {activeTab === 'recovery' && (
//                   <div className="space-y-6">
//                     <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
//                       <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
//                         <Wallet className="text-indigo-950" size={20} />Today's Recovery Route & Field Sheet (ریکوری شیٹ)
//                       </h2>
//                       <p className="text-xs text-slate-500 mt-0.5">Date: {TODAY_STR} — Operational route checklist for recovery officers.</p>
//                     </div>
//                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//                       <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden lg:col-span-7">
//                         <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-rose-50/20">
//                           <div>
//                             <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><Clock size={16} className="text-rose-600" />Pending Daily Installments ({todaysDefaulters.length} Pending)</h3>
//                             <p className="text-[10px] text-slate-500 mt-0.5">Active clients who have not yet cleared today's collection cycle.</p>
//                           </div>
//                           <span className="text-[10px] font-bold font-mono bg-rose-100 border border-rose-200 text-rose-700 px-2 py-0.5 rounded-full">{todaysDefaulters.length} Pending</span>
//                         </div>
//                         {todaysDefaulters.length === 0 ? (
//                           <div className="p-12 text-center text-slate-400 font-medium space-y-2">
//                             <CheckCircle2 size={32} className="mx-auto text-emerald-500" />
//                             <p className="text-xs">Excellent! All daily recovery routes cleared for today.</p>
//                           </div>
//                         ) : (
//                           <div className="overflow-x-auto">
//                             <table className="w-full text-left text-xs border-collapse">
//                               <thead>
//                                 <tr className="border-b border-slate-100 text-[10px] font-semibold tracking-wider text-slate-400 uppercase bg-slate-50/20">
//                                   <th className="py-2.5 px-4">Customer Details</th>
//                                   <th className="py-2.5 px-3">Karachi Area</th>
//                                   <th className="py-2.5 px-3">Device Product</th>
//                                   <th className="py-2.5 px-3 text-right">Installment Due</th>
//                                   <th className="py-2.5 px-4 text-center text-indigo-700">Actions</th>
//                                 </tr>
//                               </thead>
//                               <tbody className="divide-y divide-slate-100 font-medium">
//                                 {todaysDefaulters.map(({ plan, customer }) => {
//                                   if (!customer) return null;
//                                   return (
//                                     <tr key={plan.id} className="hover:bg-slate-50/50">
//                                       <td className="py-3 px-4">
//                                         <div className="font-bold text-slate-900">{customer.full_name}</div>
//                                         <div className="text-[10px] text-slate-400 font-mono font-bold">{customer.phone}</div>
//                                       </td>
//                                       <td className="py-3 px-3 text-slate-600 font-semibold">{getCleanArea(customer.address)}</td>
//                                       <td className="py-3 px-3 font-mono text-slate-500 text-[11px] truncate max-w-[120px]">{plan.product_id}</td>
//                                       <td className="py-3 px-3 text-right font-black text-rose-700 font-mono">{formatPKR(plan.monthly_installment)}</td>
//                                       <td className="py-3 px-4 text-center">
//                                         <div className="flex items-center justify-center gap-1.5">
//                                           <button onClick={() => setSelectedCustomerId(customer.id)} className="text-[10px] font-bold text-indigo-700 hover:text-indigo-950 px-2 py-1 bg-indigo-50 hover:bg-indigo-100 rounded-md cursor-pointer transition-colors">Card</button>
//                                           <button onClick={() => { setQuickPayPlanId(plan.id); setQuickPayAmount(String(plan.monthly_installment)); setQuickPayNotes("Installment collection - Cash Received"); setQuickPayOfficer("Zubair Khan"); }}
//                                             className="text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-2 py-1 rounded-md shadow-sm flex items-center gap-0.5 cursor-pointer transition-colors">
//                                             <CheckCircle2 size={10} />Paid
//                                           </button>
//                                         </div>
//                                       </td>
//                                     </tr>
//                                   );
//                                 })}
//                               </tbody>
//                             </table>
//                           </div>
//                         )}
//                       </div>

//                       <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden lg:col-span-5">
//                         <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-emerald-50/30">
//                           <div>
//                             <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" />Today's Received Payments ({todaysPayments.length} Paid)</h3>
//                             <p className="text-[10px] text-slate-500 mt-0.5">Payments received on {TODAY_STR}.</p>
//                           </div>
//                           <span className="text-[10px] font-bold font-mono bg-emerald-100 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full">{todaysPayments.length} Settled</span>
//                         </div>
//                         {todaysPayments.length === 0 ? (
//                           <div className="p-12 text-center text-slate-400 font-medium">No cash payments received yet today.</div>
//                         ) : (
//                           <div className="overflow-x-auto">
//                             <table className="w-full text-left text-xs border-collapse">
//                               <thead>
//                                 <tr className="border-b border-slate-100 text-[10px] font-semibold tracking-wider text-slate-400 uppercase bg-slate-50/20">
//                                   <th className="py-2.5 px-4">Customer</th>
//                                   <th className="py-2.5 px-3 text-right">Amount</th>
//                                   <th className="py-2.5 px-4">Notes</th>
//                                 </tr>
//                               </thead>
//                               <tbody className="divide-y divide-slate-100 font-medium">
//                                 {todaysPayments.map(({ payment, customer }) => (
//                                   <tr key={payment.id} className="hover:bg-slate-50/50">
//                                     <td className="py-3 px-4 font-bold text-slate-900">{customer ? customer.full_name : "General Plan"}</td>
//                                     <td className="py-3 px-3 text-right font-black text-emerald-600 font-mono text-[13px]">{formatPKR(payment.amount_paid)}</td>
//                                     <td className="py-3 px-4 text-slate-500 text-[10px]">
//                                       <div className="font-bold">{payment.received_by || "Zubair Khan"}</div>
//                                       <div className="italic text-slate-400 text-[9px] truncate max-w-[150px]">{payment.notes || "Installment credit"}</div>
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* REPORTS TAB */}
//                 {activeTab === 'reports' && (
//                   <div className="space-y-6">
//                     <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
//                       <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
//                         <TrendingUp className="text-indigo-950" size={20} />Zubair & Sons Audit & Collection Performance Reports
//                       </h2>
//                       <p className="text-xs text-slate-500 mt-0.5">Consolidated financial portfolio breakdown across Karachi recovery beats.</p>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
//                         <div>
//                           <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5 mb-1"><CheckCircle2 className="text-emerald-600" size={15} />Cumulative Recovery Rate</h3>
//                           <p className="text-[11px] text-slate-400">Total collection performance vs retail ledger value.</p>
//                         </div>
//                         {(() => {
//                           const totalVal = plans.reduce((s, p) => s + Number(p.total_amount), 0);
//                           const totalPaid = payments.reduce((s, p) => s + Number(p.amount_paid), 0);
//                           const downPay = plans.reduce((s, p) => s + Number(p.down_payment), 0);
//                           const recoveryRate = totalVal > 0 ? Math.round((totalPaid / (totalVal - downPay)) * 100) : 0;
//                           return (
//                             <div className="space-y-3 py-2">
//                               <div className="flex justify-between items-end">
//                                 <div><span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Cleared Balances</span><div className="text-xl font-black text-emerald-600">{formatPKR(totalPaid)}</div></div>
//                                 <div className="text-right"><span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Principal</span><div className="text-sm font-bold text-slate-800">{formatPKR(totalVal - downPay)}</div></div>
//                               </div>
//                               <div className="space-y-1">
//                                 <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
//                                   <div className="bg-emerald-500 rounded-full h-full" style={{ width: `${Math.min(100, recoveryRate)}%` }} />
//                                 </div>
//                                 <div className="flex justify-between text-[10px] text-slate-500 font-bold font-mono">
//                                   <span>Progress: {recoveryRate}%</span><span>Target: 100%</span>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         })()}
//                       </div>

//                       <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
//                         <div>
//                           <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5 mb-1"><Users className="text-indigo-600" size={15} />Agreement Accounts Portfolio</h3>
//                           <p className="text-[11px] text-slate-400">Active status distribution counts of Karachi client cards.</p>
//                         </div>
//                         <div className="grid grid-cols-2 gap-3 py-2 text-xs">
//                           <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg text-center">
//                             <span className="text-[9px] uppercase font-bold text-emerald-600 tracking-wider">Active</span>
//                             <div className="text-lg font-black text-emerald-800">{plans.filter(p => p.status === 'active').length}</div>
//                           </div>
//                           <div className="bg-amber-50 border border-amber-100 p-2.5 rounded-lg text-center">
//                             <span className="text-[9px] uppercase font-bold text-amber-600 tracking-wider">Overdue</span>
//                             <div className="text-lg font-black text-amber-800">{plans.filter(p => p.status === 'overdue').length}</div>
//                           </div>
//                           <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-lg text-center">
//                             <span className="text-[9px] uppercase font-bold text-blue-600 tracking-wider">Completed</span>
//                             <div className="text-lg font-black text-blue-800">{plans.filter(p => p.status === 'completed').length}</div>
//                           </div>
//                           <div className="bg-rose-50 border border-rose-100 p-2.5 rounded-lg text-center">
//                             <span className="text-[9px] uppercase font-bold text-rose-600 tracking-wider">Defaulted</span>
//                             <div className="text-lg font-black text-rose-800">{plans.filter(p => p.status === 'defaulted').length}</div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
//                         <div>
//                           <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5 mb-1"><AlertCircle className="text-rose-600" size={15} />High Priority Recoveries</h3>
//                           <p className="text-[11px] text-slate-400">Top clients with pending outstanding balances.</p>
//                         </div>
//                         <div className="space-y-2 max-h-[110px] overflow-y-auto pr-1">
//                           {masterCustomerRows.filter(r => r.outstandingDue > 0).sort((a, b) => b.outstandingDue - a.outstandingDue).slice(0, 3).map(r => (
//                             <div key={r.customer.id} className="flex justify-between items-center bg-slate-50 p-1.5 rounded-lg border border-slate-100">
//                               <div className="text-[11px] font-bold text-slate-800 truncate max-w-[130px]">{r.customer.full_name}</div>
//                               <div className="text-[10px] font-mono font-black text-rose-700">{formatPKR(r.outstandingDue)}</div>
//                             </div>
//                           ))}
//                           {masterCustomerRows.filter(r => r.outstandingDue > 0).length === 0 && (
//                             <div className="text-center text-slate-400 py-4 text-xs">All accounts fully cleared!</div>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
//                       <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
//                         <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><MapPin size={16} className="text-slate-500" />Karachi Address Beats Recovery Performance Metrics</h3>
//                       </div>
//                       <div className="overflow-x-auto">
//                         <table className="w-full text-left text-xs border-collapse">
//                           <thead>
//                             <tr className="border-b border-slate-100 text-[10px] font-semibold tracking-wider text-slate-400 uppercase bg-slate-50/20">
//                               <th className="py-3 px-5">Karachi Area Beat</th>
//                               <th className="py-3 px-4 text-center">Customers Count</th>
//                               <th className="py-3 px-4 text-right">Total Contract Portfolio</th>
//                               <th className="py-3 px-4 text-right text-emerald-700">Cleared Cash</th>
//                               <th className="py-3 px-4 text-right">Outstanding Balance</th>
//                               <th className="py-3 px-5 text-right">Recovery Efficiency</th>
//                             </tr>
//                           </thead>
//                           <tbody className="divide-y divide-slate-100 font-medium">
//                             {uniqueAreas.map(area => {
//                               const areaRows = masterCustomerRows.filter(r => r.area === area);
//                               const totalVal = areaRows.reduce((s, r) => s + r.totalAmount, 0);
//                               const totalPaid = areaRows.reduce((s, r) => s + r.totalPaid, 0);
//                               const outstanding = areaRows.reduce((s, r) => s + r.outstandingDue, 0);
//                               const efficiency = totalVal > 0 ? Math.round((totalPaid / totalVal) * 100) : 0;
//                               return (
//                                 <tr key={area} className="hover:bg-slate-50/30">
//                                   <td className="py-3 px-5 font-bold text-slate-900 flex items-center gap-1.5"><MapPin size={11} className="text-slate-400" />{area}</td>
//                                   <td className="py-3 px-4 text-center text-slate-600 font-bold">{areaRows.length}</td>
//                                   <td className="py-3 px-4 text-right text-slate-800 font-mono">{formatPKR(totalVal)}</td>
//                                   <td className="py-3 px-4 text-right text-emerald-600 font-bold font-mono">{formatPKR(totalPaid)}</td>
//                                   <td className="py-3 px-4 text-right text-slate-900 font-black font-mono">{formatPKR(outstanding)}</td>
//                                   <td className="py-3 px-5 text-right">
//                                     <div className="flex items-center justify-end gap-2">
//                                       <span className="font-mono font-bold text-indigo-700">{efficiency}%</span>
//                                       <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                                         <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${efficiency}%` }} />
//                                       </div>
//                                     </div>
//                                   </td>
//                                 </tr>
//                               );
//                             })}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* ADD CUSTOMER TAB */}
//                 {activeTab === 'add_customer' && (
//                   <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden max-w-3xl mx-auto">
//                     <div className="bg-indigo-950 text-white p-6">
//                       <h2 className="text-lg font-extrabold flex items-center gap-2"><User size={20} className="text-indigo-300" />New Customer Installment Account Setup (خریدار کا اضافہ)</h2>
//                       <p className="text-xs text-indigo-200 mt-1 leading-relaxed">Establish a certified physical ledger replica card and set up their electronic installment plan cycles.</p>
//                     </div>
//                     <form onSubmit={handleAddCustomerSubmit} className="p-6 space-y-6">
//                       <div>
//                         <h3 className="text-xs font-black uppercase text-indigo-900 tracking-wider border-b border-indigo-50 pb-2 mb-4">1. Customer Identity & Identification (خریدار کی معلومات)</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div className="space-y-1.5">
//                             <label className="block text-xs font-bold text-slate-700">Full Name * <span className="text-[10px] text-slate-400 font-urdu">(خریدار کا پورا نام)</span></label>
//                             <input type="text" required value={addFullName} onChange={e => setAddFullName(e.target.value)} placeholder="e.g. Muhammad Farooq"
//                               className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white bg-slate-50/50 transition-all font-medium text-slate-900" />
//                           </div>
//                           <div className="space-y-1.5">
//                             <label className="block text-xs font-bold text-slate-700">Phone Number * <span className="text-[10px] text-slate-400 font-urdu">(فون نمبر)</span></label>
//                             <input type="text" required value={addPhone} onChange={e => setAddPhone(e.target.value)} placeholder="e.g. +92 300 1234567"
//                               className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white bg-slate-50/50 transition-all font-medium text-slate-900" />
//                           </div>
//                           <div className="space-y-1.5">
//                             <label className="block text-xs font-bold text-slate-700">National CNIC * <span className="text-[10px] text-slate-400 font-urdu">(شناختی کارڈ نمبر)</span></label>
//                             <input type="text" required value={addCnic} onChange={e => setAddCnic(e.target.value)} placeholder="e.g. 42101-1234567-1"
//                               className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white bg-slate-50/50 transition-all font-medium text-slate-900 font-mono" />
//                           </div>
//                           <div className="space-y-1.5">
//                             <label className="block text-xs font-bold text-slate-700">Karachi Area Beat * <span className="text-[10px] text-slate-400 font-urdu">(کراچی کا علاقہ)</span></label>
//                             <select value={addAreaSelect} onChange={e => setAddAreaSelect(e.target.value)}
//                               className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white bg-slate-50/50 transition-all font-medium text-slate-900 cursor-pointer">
//                               {['Gulshan-e-Iqbal', 'Saddar', 'DHA', 'Federal B Area', 'Orangi Town', 'Korangi', 'Liaquatabad', 'Clifton', 'North Nazimabad'].map(a => <option key={a} value={a}>{a}</option>)}
//                               <option value="custom">Other Karachi Area... (نیا علاقہ درج کریں)</option>
//                             </select>
//                           </div>
//                           {addAreaSelect === 'custom' && (
//                             <div className="space-y-1.5 md:col-span-2">
//                               <label className="block text-xs font-bold text-slate-700">Type Custom Karachi Area Name *</label>
//                               <input type="text" required value={addAreaCustom} onChange={e => setAddAreaCustom(e.target.value)} placeholder="e.g. Malir Cantonment"
//                                 className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white bg-slate-50/50 transition-all font-medium text-slate-900" />
//                             </div>
//                           )}
//                           <div className="space-y-1.5 md:col-span-2">
//                             <label className="block text-xs font-bold text-slate-700">Street Address & Block Details * <span className="text-[10px] text-slate-400 font-urdu">(گھر کا پتہ)</span></label>
//                             <input type="text" required value={addAddress} onChange={e => setAddAddress(e.target.value)} placeholder="e.g. House 45-B, Sector 3, near Masjid-e-Noor"
//                               className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white bg-slate-50/50 transition-all font-medium text-slate-900" />
//                           </div>
//                         </div>
//                       </div>

//                       <div>
//                         <h3 className="text-xs font-black uppercase text-indigo-900 tracking-wider border-b border-indigo-50 pb-2 mb-4">2. Product & Installment Plan Cycle Setup (خریداری اور ادائیگی کا شیڈول)</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div className="space-y-1.5 md:col-span-2">
//                             <label className="block text-xs font-bold text-slate-700">Electronics Device Product Description * <span className="text-[10px] text-slate-400 font-urdu">(خرید کردہ سامان کی تفصیل)</span></label>
//                             <input type="text" required value={addProductId} onChange={e => setAddProductId(e.target.value)} placeholder="e.g. Dawlance Inverter Refrigerator 9199 VS"
//                               className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white bg-slate-50/50 transition-all font-medium text-slate-900" />
//                           </div>
//                           <div className="space-y-1.5">
//                             <label className="block text-xs font-bold text-slate-700">Agreement Price total (Rs.) * <span className="text-[10px] text-slate-400 font-urdu">(کل قیمت)</span></label>
//                             <input type="number" required value={addTotalAmount} onChange={e => setAddTotalAmount(e.target.value)} placeholder="120000"
//                               className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white bg-slate-50/50 transition-all font-medium text-slate-900 font-mono" />
//                           </div>
//                           <div className="space-y-1.5">
//                             <label className="block text-xs font-bold text-slate-700">Down Payment (Rs.) * <span className="text-[10px] text-slate-400 font-urdu">(ڈاؤن پیمنٹ)</span></label>
//                             <input type="number" required value={addDownPayment} onChange={e => setAddDownPayment(e.target.value)} placeholder="20000"
//                               className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white bg-slate-50/50 transition-all font-medium text-slate-900 font-mono" />
//                           </div>
//                           <div className="space-y-1.5">
//                             <label className="block text-xs font-bold text-slate-700">Plan Duration (Months) * <span className="text-[10px] text-slate-400 font-urdu">(ادائیگی کی معیاد)</span></label>
//                             <input type="number" required value={addDurationMonths} onChange={e => setAddDurationMonths(e.target.value)} placeholder="10"
//                               className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white bg-slate-50/50 transition-all font-medium text-slate-900 font-mono" />
//                           </div>
//                           <div className="space-y-1.5">
//                             <label className="block text-xs font-bold text-slate-700">Cycle Start Date * <span className="text-[10px] text-slate-400 font-urdu">(آغاز کی تاریخ)</span></label>
//                             <input type="date" required value={addStartDate} onChange={e => setAddStartDate(e.target.value)}
//                               className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white bg-slate-50/50 transition-all font-medium text-slate-900 font-mono" />
//                           </div>
//                           <div className="md:col-span-2 bg-indigo-50/60 border border-indigo-100 p-4 rounded-xl flex items-center justify-between">
//                             <div className="space-y-0.5">
//                               <h4 className="text-xs font-black text-indigo-950">Calculated Monthly Installment</h4>
//                               <p className="text-[10px] text-slate-500">Auto calculated as (Agreement Price - Down Payment) / Duration</p>
//                             </div>
//                             <div className="text-right">
//                               <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">Estimated Amount</span>
//                               <div className="text-xl font-black text-indigo-950 font-mono">{formatPKR(calculatedInstallment)}/mo</div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex gap-4 pt-3 border-t border-slate-100">
//                         <button type="button" onClick={() => setActiveTab('dashboard')} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-all">Cancel</button>
//                         <button type="submit" disabled={formSubmitting} className="flex-1 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-55 cursor-pointer">
//                           {formSubmitting ? <><RefreshCw className="animate-spin" size={14} />Saving Customer Ledger...</> : <><CheckCircle2 size={14} />Establish Ledger Card Account</>}
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 )}

//               </motion.div>
//             )}
//           </AnimatePresence>
//         )}
//       </main>

//       {/* QUICK PAY MODAL */}
//       {quickPayPlanId && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="font-bold text-slate-900">Record Payment</h3>
//               <button onClick={() => setQuickPayPlanId(null)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
//             </div>
//             <form onSubmit={handleQuickPaySubmit} className="space-y-4">
//               <div className="space-y-1.5">
//                 <label className="block text-xs font-bold text-slate-700">Amount (Rs.) *</label>
//                 <input type="number" required value={quickPayAmount} onChange={e => setQuickPayAmount(e.target.value)}
//                   className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 font-mono" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="block text-xs font-bold text-slate-700">Collected By</label>
//                 <input type="text" value={quickPayOfficer} onChange={e => setQuickPayOfficer(e.target.value)}
//                   className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="block text-xs font-bold text-slate-700">Notes</label>
//                 <input type="text" value={quickPayNotes} onChange={e => setQuickPayNotes(e.target.value)}
//                   className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600" />
//               </div>
//               <div className="flex gap-3 pt-2">
//                 <button type="button" onClick={() => setQuickPayPlanId(null)} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg">Cancel</button>
//                 <button type="submit" className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2">
//                   <CheckCircle2 size={14} />Record Payment
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* FOOTER */}
//       <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-400">
//         <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
//           <p className="font-semibold">© {new Date().getFullYear()} Zubair & Sons, Karachi, Pakistan. All Rights Reserved.</p>
//           <p className="font-mono text-[10px]">Next.js + Supabase — Installment Recovery Management System</p>
//         </div>
//       </footer>

//     </div>
//         </div>

//   );
// }