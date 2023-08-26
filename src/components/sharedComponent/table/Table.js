import React from 'react';
import './Table.css'

const Table = (props) => {
    const tableHeaders = props.tableHeaders;
    const tableData = props.tableData;

    return (
        <>
            <div className='table-wrapper'>{
                !tableData || tableData.length === 0 ? <h5> No Data Found</h5>  : (
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
                                        tableData.map((row) => 
                                            <tr key={row.id}>{row.map((e, index2) => <td key={index2} className='text-center'>{e}</td>)}</tr>
                                        )
                                    }
                            </tbody>
                        </table>
                    </div>)
                }
            </div>
        </>
    );
}

export default Table;
