import { useState } from "react";
import { Send, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { getAdminSettings, saveAdminSettings } from "@/lib/ordersStore";
import { testTelegramConnection } from "@/lib/sendTelegramOrder";

export function TelegramView() {
  const settings = getAdminSettings();
  const [token, setToken] = useState(settings.telegramBotToken);
  const [chatId, setChatId] = useState(settings.telegramChatId);
  const [enabled, setEnabled] = useState(settings.enableNotifications);
  const [sendArtwork, setSendArtwork] = useState(settings.sendArtwork);
  const [notifyStatus, setNotifyStatus] = useState(settings.notifyStatusChanges);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveAdminSettings({
      telegramBotToken: token,
      telegramChatId: chatId,
      enableNotifications: enabled,
      sendArtwork,
      notifyStatusChanges: notifyStatus,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    const result = await testTelegramConnection(token, chatId);
    setTestResult({
      ok: result.ok,
      msg: result.ok ? `Connected to ${result.botName}!` : result.error || "Connection failed",
    });
    setTesting(false);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold uppercase tracking-tight">Telegram</h1>
        <p className="text-sm text-zinc-500 mt-1">Configure bot notifications</p>
      </div>

      {/* Credentials */}
      <div className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold flex items-center gap-2">
          <Send className="w-4 h-4 text-primary" /> Bot Configuration
        </h2>

        <div>
          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
            Bot Token
          </label>
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="123456:ABC-DEF..."
            className="w-full bg-zinc-900/60 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-primary transition-colors font-mono"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
            Chat ID
          </label>
          <input
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            placeholder="123456789"
            className="w-full bg-zinc-900/60 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-primary transition-colors font-mono"
          />
        </div>

        {/* Test Connection */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleTest}
            disabled={testing}
            className="admin-btn-sm !py-2 !px-4"
          >
            {testing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {testing ? "Testing..." : "Test Connection"}
          </button>

          {testResult && (
            <span
              className={`flex items-center gap-1.5 text-xs font-semibold ${testResult.ok ? "text-emerald-400" : "text-red-400"}`}
            >
              {testResult.ok ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
              {testResult.msg}
            </span>
          )}
        </div>
      </div>

      {/* Toggles */}
      <div className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold">Notification Settings</h2>

        <Toggle label="Enable Notifications" desc="Send Telegram messages on new orders" value={enabled} onChange={setEnabled} />
        <Toggle label="Send Artwork Images" desc="Attach custom print artwork to notifications" value={sendArtwork} onChange={setSendArtwork} />
        <Toggle label="Notify Status Changes" desc="Send updates when order status changes" value={notifyStatus} onChange={setNotifyStatus} />
      </div>

      {/* Save */}
      <button onClick={handleSave} className="admin-btn-primary">
        {saved ? "✓ Saved!" : "Save Telegram Settings"}
      </button>
    </div>
  );
}

function Toggle({
  label,
  desc,
  value,
  onChange,
}: {
  label: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-[11px] text-zinc-500">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative ${value ? "bg-primary" : "bg-zinc-700"}`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? "left-[22px]" : "left-0.5"}`}
        />
      </button>
    </div>
  );
}
