
export default function NavBar({logo}: {logo:string}) {
  return (
    <nav className="border-neutral-400 border-b-4 p-4">
        <span className="text-xl font-bold">{logo}</span>
    </nav>

  )
}