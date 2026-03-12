export type LeadPayload = {
  formName: string;
  name: string;
  phone: string;
  comment?: string;
  honeypot?: string;
  [key: string]: unknown;
};

export async function submitLead(payload: LeadPayload): Promise<Response> {
  const pageUrl =
    typeof window !== "undefined" ? window.location.pathname : "";
  return fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      pageUrl,
    }),
  });
}
