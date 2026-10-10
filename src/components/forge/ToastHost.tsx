"use client";

import { useForge } from "@/store/forge/useForge";

export default function ToastHost() {
  const toasts = useForge((s) => s.toasts);
  const dismiss = useForge((s) => s.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div className="forge-toast-host" role="region" aria-label="Notifications">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`forge-toast ${t.kind}`}
          role="alert"
          onClick={() => dismiss(t.id)}
        >
          <div className="title">
            {t.kind === "error" ? "Error" : t.kind === "ok" ? "Done" : "Note"}
          </div>
          <div>{t.message}</div>
          {t.detail && <div className="detail">{t.detail}</div>}
        </div>
      ))}
    </div>
  );
}
