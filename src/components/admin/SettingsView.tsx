import { useState } from "react";
import { Settings, Lock } from "lucide-react";
import { getAdminSettings, saveAdminSettings, simpleHash } from "@/lib/ordersStore";

export function SettingsView() {
  const settings = getAdminSettings();
  const [storeName, setStoreName] = useState(settings.storeName);
  const [whatsapp, setWhatsapp] = useState(settings.whatsappNumber);
  const [currency, setCurrency] = useState(settings.currency);
  const [prefix, setPrefix] = useState(settings.orderPrefix);
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [pinMsg, setPinMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveAdminSettings({ storeName, whatsappNumber: whatsapp, currency, orderPrefix: prefix });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChangePin = () => {
    if (simpleHash(oldPin) !== settings.passwordHash) {
      setPinMsg({ ok: false, text: "Current PIN is incorrect" });
      return;
    }
    if (newPin.length < 4) {
      setPinMsg({ ok: false, text: "New PIN must be at least 4 characters" });
      return;
    }
    saveAdminSettings({ passwordHash: simpleHash(newPin) });
    setPinMsg({ ok: true, text: "PIN updated successfully!" });
    setOldPin("");
    setNewPin("");
    setTimeout(() => setPinMsg(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold uppercase tracking-tight">Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">Store configuration</p>
      </div>

      {/* Store Settings */}
      <div className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold flex items-center gap-2">
          <Settings className="w-4 h-4 text-primary" /> Store Details
        </h2>

        <Field label="Store Name" value={storeName} onChange={setStoreName} />
        <Field label="WhatsApp Number" value={whatsapp} onChange={setWhatsapp} placeholder="923272487127" />
        <Field label="Currency" value={currency} onChange={setCurrency} placeholder="PKR" />
        <Field label="Order Prefix" value={prefix} onChange={setPrefix} placeholder="DP" />
      </div>

      <button onClick={handleSave} className="admin-btn-primary">
        {saved ? "✓ Saved!" : "Save Settings"}
      </button>

      {/* Change PIN */}
      <div className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold flex items-center gap-2">
          <Lock className="w-4 h-4 text-red-400" /> Change Admin PIN
        </h2>

        <Field label="Current PIN" value={oldPin} onChange={setOldPin} type="password" />
        <Field label="New PIN" value={newPin} onChange={setNewPin} type="password" />

        {pinMsg && (
          <p className={`text-xs font-semibold ${pinMsg.ok ? "text-emerald-400" : "text-red-400"}`}>
            {pinMsg.text}
          </p>
        )}

        <button onClick={handleChangePin} className="admin-btn-sm !py-2 !px-4">
          Update PIN
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-zinc-900/60 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
