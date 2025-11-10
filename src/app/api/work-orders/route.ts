import { NextResponse } from 'next/server';
import { listWorkOrders, createWorkOrder } from '@/lib/work-orders';
import { z } from 'zod';
import { ZodError } from 'zod';

// const CreateSchema = z.object({
//   title: z.string().min(2).max(80),
//   description: z.string().max(2000).optional(),
//   priority: z.enum(['Low','Medium','High'])
// });



const CreateSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }).max(80),
  description: z.string().max(2000, { message: "Description too long" }).optional(),
  priority: z
    .enum(["Low", "Medium", "High"])
    .refine((val) => !!val, { message: "Priority is required" })
});


export async function GET(req: Request) {
  const url = new URL(req.url);
  const status = url.searchParams.get('status') ?? undefined;
  const q = url.searchParams.get('q') ?? undefined;
  const data = await listWorkOrders({ status: (status as any) , q });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CreateSchema.parse(body);
    const created = await createWorkOrder(parsed);
    return NextResponse.json(created, { status: 201 });
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
