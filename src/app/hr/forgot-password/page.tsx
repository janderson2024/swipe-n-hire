import Link from 'next/link'
import NavBar from '../../../components/navbar'

export default function forgotPassword() {
    const companyName = "Real Company 2.0";

    return (
        <>
        <NavBar logo={companyName}/>
        <main className="flex flex-col items-center pt-5">
            <span className="text-2xl font-bold m-5">{companyName}</span>
            <span className="text-sm text-blue-500">Forgot Password</span>
            <span className="mt-10 font-semibold">Contact your administrator</span>
            <Link className="pt-5 italic text-s text-fuchsia-600" href="../../">&lt; back</Link>
        </main>
        </>
    )
}