import { beforeEach, afterEach,describe, it, expect } from 'vitest';
import fs from 'fs';
import { join } from 'path';
import { createWorkOrder, listWorkOrders, deleteWorkOrder } from "../src/lib/work-orders";

const DATA = join(process.cwd(), 'data', 'work-orders.json');

let backup:string;

beforeEach(() => {
    if (fs.existsSync(DATA)) {
    backup = fs.readFileSync(DATA, 'utf8');
  }
  fs.writeFileSync(DATA, JSON.stringify([], null, 2), 'utf8');
});

afterEach(() => {
  fs.writeFileSync(DATA, backup, 'utf8');
});

describe('work-orders module', () => {
  it('creates and lists', async () => {
    const w = await createWorkOrder({ title: 't1', description: 'desc', priority: 'Low'});
    const all = await listWorkOrders();
    expect(all.length).toBe(1);
    expect(all[0].id).toBe(w.id);
  });

  it('deletes a work order', async () => {
    const w = await createWorkOrder({ title: 't-del', description: '', priority: 'Medium' });
    const ok = await deleteWorkOrder(w.id);
    expect(ok).toBe(true);
    const all = await listWorkOrders();
    expect(all.length).toBe(0);
  });

});