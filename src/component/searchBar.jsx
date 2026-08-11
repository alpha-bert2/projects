import "./searchBar.css"

function SearchBar({ search, setSearch, isSearching = false }){
    return(
        <span className={`SearchBarButton ${isSearching ? "searching" : ""}`}>
            <input
                type="search"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="🔍 Search for ingredient, cuisines, recipes and more..."
                className="mainSearchBar"
            />
            <button type="button" onClick={() => setSearch(search.trim())}>
                {isSearching ? <span className="searchSpinner"></span> : "➡"}
            </button>
        </span>
    )
}
export default SearchBar;