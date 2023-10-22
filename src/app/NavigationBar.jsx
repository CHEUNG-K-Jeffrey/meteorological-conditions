
export default function NavigationBar() {
    return (
        <div className="flex w-screen h-40 sm:h-28 bg-black">
            <div className="w-40 sm:w-28 bg-slate-100">Home</div>
            <div className="w-40 sm:w-28 bg-slate-100">Temperature</div>
        </div>
    );
}