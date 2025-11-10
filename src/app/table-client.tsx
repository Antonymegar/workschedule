"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import type { WorkOrder } from "@/types/work-order";

interface TableClientProps {
  data: WorkOrder[];
}
export default function TableClient({ data} :TableClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return <DataTable columns={columns} data={data} />;
}
