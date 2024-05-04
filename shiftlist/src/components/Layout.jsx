export default function Layout({ children }) {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100 py-10 px-12 min-w-[400px] sm:py-4 md:p-0 sm:px-0">
            {children}
        </div>
    );
}
