import { z } from "zod";

export const UserVariablesValidSchema = z.object({
    channelFontSize: z.number().min(2).max(64).default(16),
    appFontSize: z.number().min(2).max(64).default(16),
    defaultZoomFactor: z.number().min(1).max(8).default(2),
    magnifyingGlassOnPreviews: z.boolean().default(true),
});