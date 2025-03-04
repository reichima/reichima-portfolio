import { hc } from "hono/client";
import type { AppType } from "@/app/api/[[...route]]/route";

if (!process.env.NEXT_PUBLIC_API_URL) {
	throw new Error("NEXT_PUBLIC_API_URL is not defined");
}
export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL);
