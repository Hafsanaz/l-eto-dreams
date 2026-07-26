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
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/orders" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setSubmitting(false);
      if (error) return setError(error.message);
      navigate({ to: "/admin/orders" });
    } else {
      const redirectUrl = `${window.location.origin}/admin/orders`;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl },
      });
      setSubmitting(false);
      if (error) return setError(error.message);
      if (data.session) {
        setInfo("Account created. Ask the site owner to grant you admin access, then refresh.");
      } else {
        setInfo("Check your email to confirm your account, then sign in.");
      }
    }
  };

  return (
    <section className="bg-powder flex min-h-screen items-center justify-center px-6 pt-24">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-ivory p-8 shadow-[var(--shadow-soft)]">
        <p className="eyebrow">Staff area</p>
        <h1 className="mt-3 font-display text-3xl text-navy">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-2 text-sm text-navy-soft">Admin & staff access only.</p>
        <div className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-[0.72rem] uppercase tracking-[0.22em] text-navy-soft">Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required autoComplete="email" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[0.72rem] uppercase tracking-[0.22em] text-navy-soft">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required minLength={6} autoComplete={mode === "signin" ? "current-password" : "new-password"} />
          </label>
        </div>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {info && <p className="mt-4 text-sm text-navy">{info}</p>}
        <button disabled={submitting} className="btn-navy mt-6 w-full justify-center disabled:opacity-60">
          {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Working…</> : (mode === "signin" ? "Sign in" : "Create account")}
        </button>
        <button
          type="button"
          onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); setInfo(null); }}
          className="mt-4 w-full text-center text-xs uppercase tracking-[0.22em] text-navy-soft hover:text-gold"
        >
          {mode === "signin" ? "Need to create an account?" : "Already have an account? Sign in"}
        </button>
      </form>
    </section>
  );
}
