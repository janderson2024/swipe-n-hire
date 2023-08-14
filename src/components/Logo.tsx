function getLogo() {
  return "Real Company";
}

export default function Logo() {
  const logo = getLogo();
  return <span className="text-xl font-bold">{logo}</span>;
}
