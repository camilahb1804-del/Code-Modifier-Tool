import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { quizLeadsTable, waitlistTable } from "@workspace/db";
import { z } from "zod";

const router: IRouter = Router();

const quizLeadBody = z.object({
  email: z.string().email().optional().or(z.literal("")).transform((v) => v || null),
  answers: z.record(z.unknown()),
});

const waitlistBody = z.object({
  email: z.string().email(),
  productId: z.string().min(1),
});

router.post("/leads/quiz", async (req, res) => {
  const parsed = quizLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { email, answers } = parsed.data;
  const [row] = await db
    .insert(quizLeadsTable)
    .values({ email: email ?? null, answers })
    .returning({ id: quizLeadsTable.id });
  res.status(201).json({ ok: true, id: row.id });
});

router.post("/leads/waitlist", async (req, res) => {
  const parsed = waitlistBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .insert(waitlistTable)
    .values(parsed.data)
    .returning({ id: waitlistTable.id });
  res.status(201).json({ ok: true, id: row.id });
});

export default router;
