import type { APIEvent } from "@solidjs/start/server";

export async function GET({ params }: APIEvent) {
  try {
    const dict = await import(
      `../../../../.model-configs/model-translations/${params.lang}`
    );
    return dict;
  } catch (error) {
    return { message: "not found" };
  }
}
