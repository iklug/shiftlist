export default function Title({ title }) {
    return (
        <div className="w-1/2 bg-gray-100 p-1 pl-2 mb-4">
            <input
                type="text"
                placeholder="Title"
                className="h-10 border-transparent bg-gray-100 text-gray-600 outline-none text-xl font-semibold"
            />
        </div>
    );
}
