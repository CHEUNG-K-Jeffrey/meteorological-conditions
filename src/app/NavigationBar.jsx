function NavigationButton(props) {
    return (
        <a className="bg-slate-200 hover:cursor-pointer w-24 flex justify-center items-center" href={props.href}>
            {props.children}
        </a>
    )
}

export default function NavigationBar() {
    return (
        <div className="self-end flex justify-evenly w-screen h-24  bg-slate-300">
            <NavigationButton href="/">
                <i className="fa-4x fa-solid fa-house"></i>
            </NavigationButton>
            <NavigationButton href="/Temperature">
                <i className="fa-4x fa-solid fa-temperature-half"></i>
            </NavigationButton>
        </div>
    );
}