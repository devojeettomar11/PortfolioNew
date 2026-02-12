export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-300 mt-4 font-semibold tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
}
