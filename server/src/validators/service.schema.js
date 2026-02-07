const { z } = require("zod");

exports.serviceCreateSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  base_price: z.number().positive(),
  duration_minutes: z.number().int().positive()
});

exports.serviceUpdateSchema = exports.serviceCreateSchema.partial();
