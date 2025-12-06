export default function SnippetItem({ snippet, isSelected, onToggle }) {
  return (
    <div 
      className={`p-3 border rounded-md mb-2 transition-colors ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="pt-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(snippet.id)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate pr-2" title={snippet.title}>
              {snippet.title}
            </h3>
            <a
              href={snippet.editUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 shrink-0 underline decoration-dotted hover:decoration-solid"
            >
              Edit
            </a>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 break-words opacity-80">
            {snippet.content}
          </p>
        </div>
      </div>
    </div>
  );
}
