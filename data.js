const authors = [{
    id: "1",
    name: "Reşat Nuri",
    surname: "Güntekin",
    books: [{
        id: "erwsedf332",
        title: "Test",
        score: 7,
        isPublished: false
    },
    {
        id: "erwsedf33sd",
        title: "Test 2",
        score: 8,
        isPublished: true
    }]
}]

const books = [{
    id: "sdfsdfsdfc23",
    title: 'Çalıkuşu',
    author: authors[0],
    score: 9.8,
    isPublished: true
},
{
    id: "sdfsdfsdfc23",
    title: 'Deneme',
    author: authors[0],
    score: 9,
    isPublished: false
}];

module.exports = {
    authors,
    books
}