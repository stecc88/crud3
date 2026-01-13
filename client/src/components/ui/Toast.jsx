import { useUI } from "../../context/UIContext";

export default function Toast() {
  const { toasts, dismissToast } = useUI();
  if (toasts.length === 0) return null;
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={
            "px-4 py-2 rounded shadow text-white cursor-pointer " +
            (t.variant === "success"
              ? "bg-green-600"
              : t.variant === "error"
              ? "bg-red-600"
              : "bg-gray-800")
          }
          onClick={() => dismissToast(t.id)}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
