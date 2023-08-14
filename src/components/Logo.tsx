function getLogo() {
  return "Real Company";
}

export default function Logo({ className }: { className?: string }) {
  if (!className) {
    className = "text-white";
  }
  const logo = getLogo();
  return <span className={"text-xl font-bold " + className}>{logo}</span>;
}
