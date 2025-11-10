import { NextResponse } from 'next/server';
import { getWorkOrder, updateWorkOrder, deleteWorkOrder } from '@/lib/work-orders';
import { z } from 'zod';
import { ZodError } from 'zod';

const UpdateSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }).max(80).optional(),
  description: z.string().max(2000, { message: "Description too long" }).optional(),
  priority: z
    .enum(["Low", "Medium", "High"])
    .optional()
    .refine((val) => !!val, { message: "Priority is required" }),
  status: z
    .enum(["Open", "In Progress", "Done"])
    .optional()
    .refine((val) => !!val, { message: "Status is required" }),
});

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; 
  const found = await getWorkOrder(id);
  if (!found) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(found);
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const body = await req.json();
    const parsed = UpdateSchema.parse(body);
    const updated = await updateWorkOrder(id, parsed);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err: any) {
    if (err instanceof ZodError) {
      const fieldErrors = err.flatten().fieldErrors;
      return NextResponse.json({ fieldErrors }, { status: 400 });
    }

    return NextResponse.json(
      { error: err?.message ?? "Invalid" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const ok = await deleteWorkOrder(id);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
