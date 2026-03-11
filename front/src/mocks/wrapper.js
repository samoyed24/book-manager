export default function mockResponse(code, data, message) {
    return {
        code,
        data,
        message
    };
}
export function mockPagedTableData(tableData) {
    return {
        content: tableData,
        empty: false,
        first: false,
        last: false,
        number: 0,
        numberOfElements: 0,
        pageable: {
            offset: 0,
            pageNumber: 0,
            pageSize: 0,
            paged: false,
            sort: {
                empty: false,
                sorted: false,
                unsorted: false
            },
            unpaged: false
        },
        size: 0,
        sort: {
            empty: false,
            sorted: false,
            unsorted: false
        },
        totalElements: 50,
        totalPages: 0
    };
}
