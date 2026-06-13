import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { getNotifications } from "../../services/notification.service";
import type { AppNotification } from "../../services/notification.service";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch {
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      >
        <Bell size={18} />
        {notifications.length > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-xs font-black text-white">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-30 w-80 rounded-lg border border-slate-200 bg-white p-3 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-black text-slate-950">Notifications</p>
            <span className="badge badge-blue">{notifications.length}</span>
          </div>

          <div className="max-h-80 space-y-2 overflow-y-auto">
            {notifications.length ? (
              notifications.map((notification, index) => (
                <div
                  key={`${notification.type}-${index}`}
                  className="rounded-lg bg-slate-50 p-3"
                >
                  <p className="text-sm font-black text-slate-900">
                    {notification.title}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    {notification.message}
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-lg bg-slate-50 p-4 text-center text-sm font-bold text-slate-500">
                No notifications
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;