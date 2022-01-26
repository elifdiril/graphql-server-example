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
  createAuthor(data: { name: "cdd", surname: "sf", age: 12 }) {
    id
    name
    surname
    books {
      title
    }
  }
}

mutation uA {
  updateAuthor(
    id: "sLjMlaAJh6lXP5s4hhxeY"
    data: { name: "d", surname: "sf", age: 21 }
  ) {
    name
    surname
    books {
      title
    }
    age
  }
}

mutation dA {
  deleteAuthor(id: 1) {
    id
    name
    surname
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

mutation uB {
  updateBook(
    id: "w9U3F1TqeILkzzWcKJQeq"
    data: { title: "sef", author_id: "1", isPublished: true, score: 7.4 }
  ) {
    title
    author {
      name
    }
  }
}

mutation dB {
  deleteBook(id: "sdfsdfsdfc23") {
    id
    title
    author {
      name
    }
  }
}

```