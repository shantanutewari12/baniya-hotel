export function VegBadge({ veg }: { veg: boolean }) {
  const color = veg ? "border-veg" : "border-nonveg";
  const dot = veg ? "bg-veg" : "bg-nonveg";
  return (
    <span
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      className={`inline-flex h-4 w-4 items-center justify-center rounded-[3px] border-2 ${color} bg-background`}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} />
    </span>
  );
}
