const Pagination = ({TotalPages,CurrentPage,handlePageChange}) => {
    return (
        <div className="flex justify-center mb-6">
            {Array.from({length:TotalPages},(_,i)=>(
                <button key={i} onClick={()=>handlePageChange(i+1)} className={`mx-1 px-3 py-1 rounded  ${CurrentPage===i+1?"bg-secondary text-white": "bg-gray-200"}`}>
                    {i+1}
                </button>
            ))}
            
        </div>
    );
};

export default Pagination;