

export default function TestPage(){

    return (
        <>
            <h1 className="2xl:hidden">Shown Before 2XL</h1>
            <h1 className="xl:hidden">Shown Before XL</h1>
            <h1 className="lg:hidden">Shown Before Large</h1>
            <h1 className="md:hidden">Shown Before Medium</h1>
            <h1 className="sm:hidden">Shown Before Small</h1>
            <h1 className="block"> Always Shown</h1>
            <h1 className="sm:block hidden">Shown After Small</h1>
            <h1 className="md:block hidden">Shown After Medium</h1>
            <h1 className="lg:block hidden">Shown After Large</h1>
            <h1 className="xl:block hidden">Shown After XL</h1>
            <h1 className="2xl:block hidden">Shown After 2XL</h1>
        </>

    );
}