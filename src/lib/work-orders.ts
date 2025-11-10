import fs from 'fs';
import { join } from 'path';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import type { WorkOrder, Priority, Status } from '@/types/work-order';

const WorkOrderSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(2).max(80),
  description: z.string().max(2000),
  priority: z.enum(['Low','Medium','High']),
  status: z.enum(['Open','In Progress','Done']),
  updatedAt: z.string().refine((s)=>!Number.isNaN(Date.parse(s)), 'invalid date')
});
const WorkOrdersSchema = z.array(WorkOrderSchema);

const DATA_PATH = join(process.cwd(), 'data', 'work-orders.json');

async function readAll(): Promise<WorkOrder[]> {
  try {
    const raw = await fs.promises.readFile(DATA_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return WorkOrdersSchema.parse(parsed);
  } catch (err: any) {
    if (err?.code === 'ENOENT') {
      await saveAll([]);
      return [];
    }
    throw err;
  }
}

async function saveAll(items: WorkOrder[]) {
  await fs.promises.mkdir(join(process.cwd(), 'data'), { recursive: true });
  await fs.promises.writeFile(DATA_PATH, JSON.stringify(items, null, 2), 'utf8');
}

export async function listWorkOrders(opts?: { status?: Status, q?: string }) {
  let all = await readAll();
  if (opts?.status) all = all.filter(w => w.status === opts.status);
  if (opts?.q) {
    const q = opts.q.toLowerCase();
    all = all.filter(w => w.title.toLowerCase().includes(q));
  }
  all.sort((a,b)=> a.updatedAt > b.updatedAt ? -1 : 1);
  return all;
}

export async function getWorkOrder(id: string) {
  const all = await readAll();
  return all.find(w => w.id === id) ?? null;
}

export async function createWorkOrder(payload: { title: string; description?: string; priority: Priority }) {
  const now = new Date().toISOString();
  const newWO: WorkOrder = {
    id: uuidv4(),
    title: payload.title,
    description: payload.description ?? '',
    priority: payload.priority,
    status: 'Open',
    updatedAt: now
  };
  WorkOrderSchema.parse(newWO);
  const all = await readAll();
  all.push(newWO);
  await saveAll(all);
  return newWO;
}

export async function updateWorkOrder(id: string, patch: Partial<Omit<WorkOrder,'id'>>) {
  const all = await readAll();
  const idx = all.findIndex(w => w.id === id);
  if (idx === -1) return null;
  const updated: WorkOrder = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
  WorkOrderSchema.parse(updated);
  all[idx] = updated;
  await saveAll(all);
  return updated;
}

export async function deleteWorkOrder(id: string) {
  const all = await readAll();
  const idx = all.findIndex(w => w.id === id);
  if (idx === -1) return false;
  all.splice(idx,1);
  await saveAll(all);
  return true;
}
