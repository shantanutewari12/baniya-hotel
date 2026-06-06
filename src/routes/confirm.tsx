import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { CheckCircle2, Phone } from "lucide-react";
import { HOTEL } from "@/data/menu";

const search = z.object({ name: z.string().optional(), room: z.string().optional() });

export const Route = createFileRoute("/confirm")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Order Sent \u2014 Baniya Hotel" },
      { name: "description", content: "Your order has been sent to reception." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfirmPage,
});

function ConfirmPage() {
  const { name, room } = Route.useSearch();
  return (
    <div className="grid min-h-screen place-items-center bg-[var(--gradient-hero)] px-6 text-primary-foreground">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[var(--gradient-gold)] text-primary shadow-2xl">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Order sent!</h1>
        <p className="mt-2 text-primary-foreground/80">
          {name ? `Thank you, ${name}. ` : ""}
          Our kitchen has received your request
          {room ? ` for Room ${room}` : ""}. Reception will confirm shortly on WhatsApp.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <a href={`tel:${HOTEL.phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gradient-gold)] px-5 py-3 font-semibold text-primary shadow-lg">
            <Phone className="h-4 w-4" /> Call Reception
          </a>
          <Link to="/" search={room ? { room } : undefined}
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-5 py-3 font-semibold text-primary-foreground hover:bg-white/10">
            Back to menu
          </Link>
        </div>
      </div>
    </div>
  );
}