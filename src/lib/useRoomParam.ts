import { useEffect, useState } from "react";

export function useRoomParam(): string | null {
  const [room, setRoom] = useState<string | null>(null);
  useEffect(() => {
    try {
      const u = new URL(window.location.href);
      const r = u.searchParams.get("room");
      if (r) setRoom(r);
    } catch {}
  }, []);
  return room;
}