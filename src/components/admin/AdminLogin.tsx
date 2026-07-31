import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { authenticateAdmin } from "@/lib/ordersStore";

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticateAdmin(pin)) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold uppercase tracking-tight">Admin Panel</h1>
          <p className="text-sm text-zinc-500 mt-1">Enter PIN to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              autoFocus
              className={`w-full bg-zinc-900/60 border rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-all ${error ? "border-red-500 animate-[shake_0.3s_ease]" : "border-white/10 focus:border-primary"}`}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-xs text-center"
            >
              Incorrect PIN. Try again.
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full h-12 bg-primary text-primary-foreground font-extrabold uppercase text-sm tracking-wider rounded-xl hover:bg-orange-600 transition-colors cursor-pointer"
          >
            Unlock Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
}
