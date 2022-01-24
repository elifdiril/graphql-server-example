# graphql-server-example
## for playing apollo

## In order to run this project in your local environment

 <br/>

```bash
git clone https://github.com/elifdiril/graphql-server-example.git
```

And then

```bash
npm install
```

to install all the dependencies.

Finally,

```bash
npm run dev
```

to start the development mode.

Example mutation queries: 

``` sql
mutation cA {
  createAuthor(data: { name: "adsf", surname: "sf", age: 12 }) {
    name
    surname
    books {
      title
    }
  }
}

mutation cB {
  createBook(
    data: { title: "dsfsd", author_id: "1", isPublished: true, score: 5.4 }
  ) {
    title
    author {
      name
    }
  }
}
```