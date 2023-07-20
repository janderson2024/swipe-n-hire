/*
Customizable Nav bar that should be useable for every view

LeftItem will be the "LOGO" or the "<back to postings" in the HR job view

CenterItem will be used for "Current Postings" or the tabs in the Hr job view

Right Item will be the "HR profile image" or the "< Back to openings" in the Applicant view


*/

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
    <nav className="order-neutral-400 border-b-4">
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
