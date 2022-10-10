import {useContext} from "react";
import {AppContext} from "../providers/rocketsDataProvider";

const Paginator = () => {
  const {filteredData, page, setPage, itemsPerPage} = useContext(AppContext);
  const totalPages = filteredData.length > 0 ? Math.ceil(filteredData.length / itemsPerPage) : 1;
  const pages = [...Array(totalPages).keys()]

  return (
    <div className="paginator">
      {pages.map(currentPage =>
        <div key={currentPage + 1} onClick={() => setPage(currentPage + 1)} className={(currentPage + 1) === page ? 'isActive' : ''}>
          {currentPage + 1}
      </div>)}
    </div>
  )
}

export default Paginator;
