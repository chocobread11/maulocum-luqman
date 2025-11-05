import { hc } from "hono/client";
import type { APIType } from "@/app/api/[...route]/route";

export const client = hc<APIType>("/");
