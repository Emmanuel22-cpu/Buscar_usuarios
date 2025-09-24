import { useEffect, useState } from "react"
export default function SearchInput({onSearch}) {

    const [query, setQuery] = useState('')
    

    useEffect(() => {
        onSearch(query)
    }, [query, onSearch])

    return (
        <input className="w-full p-2 border border-gray-300 rounded shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        />
         
    )


}