import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { db } from "@workspace/db";
import { quizLeadsTable, waitlistTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    res.status(503).json({ error: "ADMIN_PASSWORD not configured" });
    return;
  }
  const auth = req.headers["authorization"] ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (token !== password) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.get("/admin/quiz-leads", requireAdmin, async (_req, res) => {
  const rows = await db
    .select()
    .from(quizLeadsTable)
    .orderBy(desc(quizLeadsTable.createdAt));
  res.json(rows);
});

router.get("/admin/waitlist", requireAdmin, async (_req, res) => {
  const rows = await db
    .select()
    .from(waitlistTable)
    .orderBy(desc(waitlistTable.createdAt));
  res.json(rows);
});

export default router;
