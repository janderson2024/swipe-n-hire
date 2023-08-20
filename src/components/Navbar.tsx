interface HRNavBarProps {
  LeftItem: React.ReactElement;
  CenterItem?: React.ReactElement;
  RightItem?: React.ReactElement;
}

export default function NavBar({
  LeftItem,
  CenterItem,
  RightItem,
}: HRNavBarProps) {
  return (
    <nav className="order-neutral-400 border-b-4 bg-purple-700 h-16">
      <div className="mx-auto px-2">
        <div className="relative flex h-16 items-center justify-between">
          {LeftItem}
          {CenterItem && CenterItem}
          <div className="pr-2">{RightItem && RightItem}</div>
        </div>
      </div>
    </nav>
  );
}
