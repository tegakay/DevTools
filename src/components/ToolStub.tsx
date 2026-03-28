interface ToolStubProps {
  title: string;
}

const ToolStub = ({ title }: ToolStubProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{title}</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-300">
          This tool is coming soon! We're working hard to bring you the best developer utilities.
        </p>
      </div>
    </div>
  );
};

export default ToolStub;