export default function Header({ title }: { title: string }) {
    return (
        <div id="header" className="flex flex-row p-4 mb-4 bg-slate-50">
            <div className="flex flex-row self-center items-center">
                {/* <img src="./img/logo.svg" alt="dashboard logo" class="max-h-8 md:max-h-10 mx-2 md:mx-4" /> */}
                <h1 id="title" className="text-2xl md:text-3xl text-gray-600 self-center font-medium">{title}</h1>
            </div>
        </div>
    )
}