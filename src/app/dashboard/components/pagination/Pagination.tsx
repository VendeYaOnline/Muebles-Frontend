interface Props {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  setCurrentPage: (index: number) => void;
  currentPage: number;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  handleNextPage,
  handlePrevPage,
  totalPages,
  setCurrentPage,
}: Props) => {
  const getDisplayedPages = () => {
    const totalToShow = 3; // Máximo de páginas a mostrar
    const start = Math.max(1, currentPage - Math.floor(totalToShow / 2));
    const end = Math.min(totalPages, start + totalToShow - 1);

    // Ajusta el rango si está cerca del final
    const adjustedStart = Math.max(1, end - totalToShow + 1);

    return Array.from(
      { length: end - adjustedStart + 1 },
      (_, i) => adjustedStart + i
    );
  };

  const displayedPages = getDisplayedPages();

  return (
    <div className="w-full">
      <nav className="flex items-center justify-center space-x-2 mt-4">
        <button
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        {displayedPages.map((page) => (
          <button
            key={page}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              currentPage === page
                ? "text-white bg-indigo-600"
                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        {/* Mostrar botón "..." si hay más páginas después del rango */}
        {displayedPages[displayedPages.length - 1] < totalPages && (
          <span className="px-3 py-2 text-sm font-medium text-gray-500">
            ...
          </span>
        )}

        <button
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
