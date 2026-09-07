export function Loader() {
  return (
    <div className="flex justify-center py-2">
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
      </div>
    </div>
  );
}
