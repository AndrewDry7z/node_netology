запросы для MongoDB:

* запрос(ы) для вставки данных минимум о двух книгах в коллекцию <b>books</b>:

```javascript
db.books.insertMany(
  [
    {title: "Sample title", description: "123", authors: "Hello world"},
    {title: "Book 777", description: "HESOYAM", authors: "..."}
  ]
)
```

* запрос для поиска полей документов коллекции <b>books</b> по полю <b>title</b>

```javascript
db.books.find({title: "Sample title"})
```

* запрос для редактирования полей: <b>description</b> и <b>authors</b> коллекции books по <b>_id</b> записи

```javascript
db.books.updateOne(
  {_id: "349583745937459"},
  {
    $set: {description: "new description", authors: "new authors"}
  }
)
```
