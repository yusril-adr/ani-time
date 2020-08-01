import "../component/anime-list.js";
import { getList } from '../db.js';

const ascending = (list, sort) => {
    return list.sort( (a, b) => {
        if ( a[sort] < b[sort] ){
            return -1;
          }

        if ( a[sort] > b[sort] ){
            return 1;
        }
        return 0;
    });
}

const descending = (list, sort) => {
    return list.sort( (a, b) => {
        if ( a[sort] < b[sort] ){
            return 1;
          }

        if ( a[sort] > b[sort] ){
            return -1;
        }
        return 0;
    });
} 

const loadYourList = () => {
    const selectElems = document.querySelectorAll('select');
    let instances = M.FormSelect.init(selectElems);

    const sortElem = document.querySelector("#sort");
    const sortDir = document.querySelector("#direction");
    let sortList;

    const searchElement = document.querySelector("#search");
    const listElement = document.querySelector(".your-list-page anime-list");


    getList()
    .then( list => {
        if (list.length === 0) {
            listElement.savedIsEmpty();
        } else {
            listElement.load = descending(list, "date_add_list");

            // change dir event when first load
            sortDir.addEventListener("change", () => {
                switch(sortDir.value) {
                    case "descending":
                        sortList = descending(list, "date_add_list");
                    break;

                    case "ascending":
                        sortList = ascending(list, "date_add_list");
                    break;
                }

                listElement.load = sortList;
            });
        }

        // Sort Form
        
        // change sort event
        sortElem.addEventListener("change", () => {
            switch(sortElem.value) {
                case "added":
                    sortDir.innerHTML =
                    `
                    <option value="descending">Newest</option>
                    <option value="ascending">Oldest</option>
                    `;

                    M.FormSelect.init(selectElems);
                    sortList = descending(list, "date_add_list");
                    listElement.load = sortList;

                    // Change dir when sort is date
                    sortDir.addEventListener("change", () => {
                        switch(sortDir.value) {
                            case "descending":
                                sortList = descending(list, "date_add_list");
                            break;

                            case "ascending":
                                sortList = ascending(list, "date_add_list");
                            break;
                        }

                        listElement.load = sortList;
                    });

                    listElement.load = sortList;
                break;

                case "name":
                    sortDir.innerHTML =
                    `
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                    `;

                    M.FormSelect.init(selectElems);
                    sortList = ascending(list, "title");
                    listElement.load = sortList;

                    // Change dir when sort is name
                    sortDir.addEventListener("change", () => {
                        switch(sortDir.value) {
                            case "descending":
                                sortList = descending(list, "title");
                            break;

                            case "ascending":
                                sortList = ascending(list, "title");
                            break;
                        }

                        listElement.load = sortList;
                    });

                    listElement.load = sortList;
                break;
            }
        })

        // Search form
        searchElement.addEventListener("keypress", event => {
            if (event.key === "Enter" && searchElement.value !== "") {
                const filterList = list.filter( anime => {
                    return anime.title.toLowerCase().includes(searchElement.value.toLowerCase());
                });

                if (filterList.length === 0) {
                    listElement.isEmpty();
                } else {
                    // Get the sort when search is trigger
                    if ( sortElem.value === "added") {
                        switch(sortDir.value) {
                            case "descending":
                                sortList = descending(filterList, "date_add_list");
                            break;

                            case "ascending":
                                sortList = ascending(filterList, "date_add_list");
                            break;
                        }
                    } else {
                        switch(sortDir.value) {
                            case "descending":
                                sortList = descending(filterList, "title");
                            break;

                            case "ascending":
                                sortList = ascending(filterList, "title");
                            break;
                        }
                    }

                    listElement.load = sortList;

                    // adding event when sort elem is change
                    sortElem.addEventListener("change", () => {
                        switch(sortElem.value) {
                            case "added":
                                sortDir.innerHTML =
                                `
                                <option value="descending">Newest</option>
                                <option value="ascending">Oldest</option>
                                `;
            
                                M.FormSelect.init(selectElems);
                                sortList = descending(filterList, "date_add_list");
                                listElement.load = sortList;
            
                                // Change dir when sort is date
                                sortDir.addEventListener("change", () => {
                                    switch(sortDir.value) {
                                        case "descending":
                                            sortList = descending(filterList, "date_add_list");
                                        break;
            
                                        case "ascending":
                                            sortList = ascending(filterList, "date_add_list");
                                        break;
                                    }
            
                                    listElement.load = sortList;
                                });
            
                                listElement.load = sortList;
                            break;
            
                            case "name":
                                sortDir.innerHTML =
                                `
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                                `;
            
                                M.FormSelect.init(selectElems);
                                sortList = ascending(filterList, "title");
                                listElement.load = sortList;
            
                                // Change dir when sort is name
                                sortDir.addEventListener("change", () => {
                                    switch(sortDir.value) {
                                        case "descending":
                                            sortList = descending(filterList, "title");
                                        break;
            
                                        case "ascending":
                                            sortList = ascending(filterList, "title");
                                        break;
                                    }
            
                                    listElement.load = sortList;
                                });
            
                                listElement.load = sortList;
                            break;
                        }
                    });

                    // adding event when dir elem is change
                    sortDir.addEventListener("change", () => {
                        if ( sortElem.value === "added") {
                            switch(sortDir.value) {
                                case "descending":
                                    sortList = descending(filterList, "date_add_list");
                                break;
    
                                case "ascending":
                                    sortList = ascending(filterList, "date_add_list");
                                break;
                            }
                        } else {
                            switch(sortDir.value) {
                                case "descending":
                                    sortList = descending(filterList, "title");
                                break;
    
                                case "ascending":
                                    sortList = ascending(filterList, "title");
                                break;
                            }
                        }

                        listElement.load = sortList;
                    });
                }
            }
        });
    });
}

export default loadYourList;