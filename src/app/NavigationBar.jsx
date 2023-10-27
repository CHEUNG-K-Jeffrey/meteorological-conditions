function NavigationButton(props) {
    return (
        <a className="bg-slate-200 hover:cursor-pointer w-20 sm:w-24 flex justify-center items-center" href={props.href}>
            {props.children}
        </a>
    )
}

export default function NavigationBar() {
    return (
        <div className="self-end flex justify-evenly w-screen h-20 sm:h-24  bg-slate-300">
            <NavigationButton id="home-page-button" href="/">
                <i className="fa-3x fa-solid fa-house"></i>
            </NavigationButton>
            <NavigationButton id="temperature-page-button" href="/Temperature">
                <i className="fa-3x fa-solid fa-temperature-half"></i>
            </NavigationButton>
        </div>
    );
}