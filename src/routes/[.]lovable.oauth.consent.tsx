import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Local typed wrapper for the beta supabase.auth.oauth namespace.
type AuthorizationDetails = {
  client?: { name?: string; client_uri?: string } | null;
  redirect_url?: string;
  redirect_to?: string;
  scopes?: string[];
};
type OAuthNs = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};
const oauth = () => (supabase.auth as unknown as { oauth: OAuthNs }).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/auth", search: { next } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center bg-powder px-6">
      <div className="bg-ivory p-8 max-w-md">
        <h1 className="font-display text-2xl text-navy">Authorization error</h1>
        <p className="mt-2 text-sm text-navy-soft">
          Could not load this authorization request: {String((error as Error)?.message ?? error)}
        </p>
      </div>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorization_id)
      : await oauth().denyAuthorization(authorization_id);
    if (error) { setBusy(false); setError(error.message); return; }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) { setBusy(false); setError("No redirect returned by the authorization server."); return; }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? "an app";

  return (
    <main className="flex min-h-screen items-center justify-center bg-powder px-6 py-16">
      <div className="w-full max-w-md bg-ivory p-8 shadow-[var(--shadow-soft)]">
        <p className="eyebrow">Authorize access</p>
        <h1 className="mt-3 font-display text-3xl text-navy">
          Connect {clientName} to L'ETO Bakeshop
        </h1>
        <p className="mt-3 text-sm text-navy-soft">
          This lets {clientName} use L'ETO Bakeshop as you — reading and acting on data your account can access.
        </p>
        {error && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
        <div className="mt-6 flex flex-col gap-3">
          <button disabled={busy} onClick={() => decide(true)} className="btn-navy w-full justify-center disabled:opacity-60">
            {busy ? "Working…" : "Approve"}
          </button>
          <button disabled={busy} onClick={() => decide(false)} className="text-xs uppercase tracking-[0.22em] text-navy-soft hover:text-gold disabled:opacity-60">
            Deny
          </button>
        </div>
      </div>
    </main>
  );
}
