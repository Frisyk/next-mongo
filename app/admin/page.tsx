import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';

export default async function AdminPage() {
  // Pastikan user adalah admin
  await requireAdmin();
  
  // Langsung redirect ke dashboard admin
  redirect('/admin/dashboard');
}
