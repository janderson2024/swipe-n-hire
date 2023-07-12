/*
Master "Logo" component
Currently Just a string, but we can replace this with a real img logo

*/


function getLogo(){
    return "Total Real Company"
}

export default function Logo(){
    const logo = getLogo();
    return (
        <span className="text-xl font-bold">{logo}</span>
    )
}