export function getCompanyName() {
  return "Real Company";
}

export default function Logo({ className }: { className?: string }) {
  if (!className) {
    className = "text-white";
  }
  const logo = getCompanyName();
  return <span className={"text-xl font-bold " + className}>{logo}</span>;
}
