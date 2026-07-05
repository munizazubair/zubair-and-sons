export interface Customer {
  id: string;
  full_name: string;
  phone: string;
  cnic: string;
  address: string;
  created_at: string;
}

export interface InstallmentPlan {
  id: string;
  customer_id: string;
  product_id: string;
  total_amount: number;
  down_payment: number;
  remaining_amount: number;
  monthly_installment: number;
  duration_months: number;
  start_date: string;
  status: 'active' | 'completed' | 'overdue' | 'defaulted';
  created_at: string;
  customer?: { full_name: string };
}

export interface Payment {
  id: string;
  plan_id: string;
  amount_paid: number;
  payment_date: string;
  received_by?: string;
  notes?: string;
  created_at: string;
}