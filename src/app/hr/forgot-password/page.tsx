import Link from 'next/link'
import NavBar from '@/components/navbar'
import Logo from '@/components/Logo';
import BackArrow from '@/components/BackArrow';

export default function forgotPassword() {

    return (
        <>
        <NavBar LeftItem={Logo}/>
        <main className="flex flex-col items-center pt-5">
            <div className="text-2xl font-bold m-5"><Logo /></div>
            <span className="text-sm text-blue-500">Forgot Password</span>
            <span className="mt-10 font-semibold">Contact your administrator</span>
            <Link className="pt-5 italic text-s text-fuchsia-600 flex" href="/hr"><BackArrow/>Back</Link>
        </main>
        </>
    )
}