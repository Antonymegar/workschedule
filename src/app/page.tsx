import { listWorkOrders } from '@/lib/work-orders';
import { DataTable } from "@/components/data-table";
import TableClient from './table-client';
import {columns} from './columns'
import TopHeader from '@/components/data-table/Header';
import Sidebar from './sidebar';

type Props = { searchParams?: { status?: string, q?: string } };

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const status = params?.status as any | undefined;
  const q = params?.q;
  const items = await listWorkOrders({ status, q });
  return (
     <div className="flex flex-col w-full gap-10">
      <TopHeader />
      <TableClient data={items}/>

    </div>
  );
}
