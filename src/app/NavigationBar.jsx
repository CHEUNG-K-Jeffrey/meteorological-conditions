
export default function NavigationBar() {
    return (
        <div className="self-end flex justify-evenly w-screen h-24  bg-slate-300">
            <a className=" bg-slate-200 hover:cursor-pointer w-24 flex justify-center items-center" href="/"><i className="fa-4x fa-solid fa-house"></i></a>
            <div className="w-24 bg-slate-200">Temperature</div>
        </div>
    );
}