function getLogo() {
  return "Real Company";
}

export default function Logo() {
  const logo = getLogo();
  return <span className="text-xl text-white font-bold">{logo}</span>;
}
