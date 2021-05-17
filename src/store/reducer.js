const initialState = {
    news: [], page: 0, rows: [], loded: 0
}


function setRows(start, end, newState) {
    newState.rows = []
    for (let i = start; i < end && i < newState.news.length; i++) {
        newState.rows.push(newState.news[i])
    }
}
const reducer = (state = initialState, action) => {
    const newState = { ...state };
    newState.page =0;
    switch (action.type) {
        case "NEW_DATA":
            newState.news = action.data
            for (let i = 0; i < newState.news.length; i++) {
                newState.news[i].id = (i + 1);
                newState.news[i].date = new Date(newState.news[i].publishedAt);
            }
            newState.loded = 1;
            setRows(0, 10, newState)
            break;
        case "CHANGE_PAGE":
            newState.rows = [];
            let start = (action.page - 1) * 10;
            let end = (action.page - 1) * 10 + 10;
            newState.page = action.page -1;
            setRows(start, end, newState)
            // for (let i = start; i < end && i < newState.news.length; i++) {
            //     newState.rows.push(newState.news[i])
            // }
            break;

        case "SORT":
            if (action.sort == 1) {
                newState.news.sort((a, b) => b.date - a.date);
            } else if (action.sort == 2) {
                newState.news.sort((a, b) => a.date - b.date);

            }
            setRows(0, 10, newState)

            // newState.rows = []
            // for (let i = 0; i < 10; i++) {
            //     newState.rows.push(newState.news[i])
            // }
            break;

        case "SEARCH":
            if (action.text.length == 0) {
                setRows(0, 10, newState)
            } else {
                newState.rows = [];
                for (let i = 0; i < newState.news.length; i++) {
                    if (newState.news[i].title.toLowerCase().includes(action.text.toLowerCase()) || newState.news[i].description.toLowerCase().includes(action.text.toLowerCase()))
                        newState.rows.push(newState.news[i]);
                }
            }

            break;

        default:
            break;

    }
    console.log(newState)

    return newState;
}

export default reducer;