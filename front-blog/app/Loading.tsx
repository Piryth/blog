export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-900">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    </div>
  );
}
