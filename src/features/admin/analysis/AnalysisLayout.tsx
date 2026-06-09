import { Outlet, useOutletContext } from 'react-router-dom';
import type { AdminOutletContext } from '@/types/admin';

export function AnalysisLayout() {
  const ctx = useOutletContext<AdminOutletContext>();
  return <Outlet context={ctx} />;
}
