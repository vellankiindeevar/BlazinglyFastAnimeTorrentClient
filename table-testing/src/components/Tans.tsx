import { useReactTable, createColumnHelper, flexRender, getCoreRowModel } from "@tanstack/react-table"
import jsondata from "../data.json";
import { useState } from "react";

type data = {
    category: string,
    title: string,
    size: string,
    pubdate: string,
    leechers: number,
    seeders: number,
    downloads: number,
    trusted: string,
    link: string,
    view: string
}

const columnhelper = createColumnHelper<data>()

const columns = [
    { id: 'select', header: '', size: 50 },
    columnhelper.accessor('category', { header: 'category', size: 270 }),
    columnhelper.accessor('title', { header: 'title', size: 900, cell: row => <a className="text-blue-600" href={row.row.original.view} target="_blank">{row.getValue()}</a> }),
    columnhelper.accessor('size', { header: 'size', size: 120 }),
    columnhelper.accessor('pubdate', { header: 'pubdate', size: 170 }),
    columnhelper.accessor('leechers', { header: 'leechers', size: 10 }),
    columnhelper.accessor('seeders', { header: 'seeders', size: 10 }),
    columnhelper.accessor('downloads', { header: 'downloads', size: 10 }),
]

function Tans() {
    const [data, setData] = useState(jsondata);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        defaultColumn: {
            minSize: 0,
            size: Number.MAX_SAFE_INTEGER,
            maxSize: Number.MAX_SAFE_INTEGER,
        }
    })
    console.log(table.getHeaderGroups()[0].headers[1].getSize())

    return (
        <div className="overflow-x-auto w-3/4 mx-auto">
            <table className={`min-w-full divide-y-2 divide-gray-200 bg-white`}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => <th style={{ width: header.getSize() }} className={`text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900 `} key={header.id}>
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>)}
                    </tr>)}
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {table.getRowModel().rows.map(row => <tr key={row.id} className={row.original.trusted === 'Yes' ? 'bg-green-200' : 'bg-transparent'}>
                        {row.getVisibleCells().map(cell => <td className={`truncate max-w-xs px-4 py-2 text-gray-700`} key={cell.id}>
                            {flexRender(
                                cell.column.columnDef.cell, cell.getContext()
                            )}
                        </td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>

    )
}

export default Tans
// ${header.column.columnDef.header !== 'title' ? 'w-10' : 'w-52'}
