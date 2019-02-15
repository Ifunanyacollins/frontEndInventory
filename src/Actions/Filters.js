export const sortByUp = (sortWord) => (
    {
        type:'up',
        sortWord
    }
)


export const sortByDown = (sortWord) => (
    {
        type:'down',
        sortWord
    }
)

export const SortByText = (text) => (
    {
        type:'text',
        text
    }
)