import React from 'react';
import './Table.css'

const Table = (props) => {
    const tableHeaders = props.tableHeaders;
    const tableData = props.tableData;
    const currentpageno = props.currentpageno;
    const setCurrentpageno = props.setCurrentpageno;
    const totalpages = props.totalpages;
    const setSize = props.setSize;


    return (
        <div className='table-wrapper shadow-sm p-3 mb-5 bg-body-tertiary rounded'>{
        !tableData || tableData.length === 0 ? <h5>{setCurrentpageno(1)}  No Data Found</h5>  : (
            <div className='w-75'>
                <table className="table table-striped my-3">
                    <thead>
                        <tr>{
                            tableHeaders.map((e, index) => <th key={index} scope="col" className='text-center'>{e}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                            {
                                tableData && tableData.map((row) => 
                                    <tr key={row.id}>{row.map((e, index2) => <td key={index2} className='text-center'>{e}</td>)}</tr>
                                )
                            }
                    </tbody>
                </table>
                
                <div className='pagination-wrapper'>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className={currentpageno>1 ? "page-item" : "page-item disabled"}>
                                <p className="page-link" onClick={() => setCurrentpageno(currentpageno-1)}>Previous</p>
                            </li>
                            {
                                Array.from({ length: totalpages }, (_, index) => (
                                    <li 
                                    className = {index+1 === currentpageno ? "page-item active" : "page-item"}
                                    onClick={(e) => {
                                        setCurrentpageno(index+1)
                                    }}
                                    ><p className="page-link" key={index}>{index + 1}</p></li>
                                ))
                            }
                            <li className={currentpageno<totalpages ? "page-item" : "page-item disabled"}>
                                <p className="page-link" onClick={() => setCurrentpageno(currentpageno+1)}>Next</p>
                            </li>
                        </ul>
                    </nav>
                    <select className="custom-select" onChange={(e)=>setSize(e.target.value)}>
                        <option value="5">5 rows/page</option>
                        <option value="10">10 rows/page</option>
                        <option value="15">15 rows/page</option>
                    </select>
                </div>
            </div>)
        }</div>
    );
}

export default Table;
