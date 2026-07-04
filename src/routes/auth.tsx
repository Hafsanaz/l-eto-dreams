import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — L'ETO Bakeshop" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/orders" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/admin/orders" });
  };

  return (
    <section className="bg-powder flex min-h-screen items-center justify-center px-6 pt-24">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-ivory p-8 shadow-[var(--shadow-soft)]">
        <p className="eyebrow">Staff area</p>
        <h1 className="mt-3 font-display text-3xl text-navy">Sign in</h1>
        <p className="mt-2 text-sm text-navy-soft">Admin & staff login only.</p>
        <div className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-[0.72rem] uppercase tracking-[0.22em] text-navy-soft">Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required autoComplete="email" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[0.72rem] uppercase tracking-[0.22em] text-navy-soft">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required autoComplete="current-password" />
          </label>
        </div>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <button disabled={submitting} className="btn-navy mt-6 w-full justify-center disabled:opacity-60">
          {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : "Sign in"}
        </button>
      </form>
    </section>
  );
}
