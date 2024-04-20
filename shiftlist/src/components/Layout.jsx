export default function Layout({ children }) {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
            {children}
        </div>
    );
}
