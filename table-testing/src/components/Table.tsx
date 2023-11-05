import { useState } from "react";
import jsondata from "../data.json";

const headers = [
    { title: 'category', size: 'w-0' },
    { title: 'title' },
    { title: 'pubdate', size: 'w-0' },
    { title: 'leechers', size: 'w-0' },
    { title: 'seeders', size: 'w-0' },
    { title: 'downloads', size: 'w-0' },
    { title: 'trusted', size: 'w-0' },
    { title: 'link', size: 'w-0' },
    { title: 'view', size: 'w-0' },
]

function Table() {
    const [data, setData] = useState(jsondata)
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className={header.size}>{header.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    )
}

export default Table