# Bookshop Application Frontend (ReactJS)

### Live project [https://zeidmagboub.ly](https://zeidmagboub.ly)

### Backend repo [https://github.com/ZeidMag/bookshop](https://github.com/ZeidMag/bookshopCakeV4)

---

## `Purpose:`

The project serves to demonstrate the use of (**ReactJS** + **CakePHP** + **MySQL**) `Stack`.

## `Description:`

This is a simple application for a bookshop, utilizing the following:

- [ReactJS](https://reactjs.org/)
- [CakePHP](https://cakephp.org/)
- [MySQL](https://www.mysql.com/)

The user of the application can:

1. View all books & authors.
2. Search Books.
3. Login / Logout.
4. Add / Edit Books & Authors.
5. Rent a Book.
6. Update profile (username / password).
7. Review rent history.

## `Frontend Features:`

The **`frontend`** is built with _ReactJS_ and _MaterialUI_ library containing:

- React Class & Function components.
- Redux State management.
- Redux Thunk middleware.
- Axios HTTP client.
- MomentJS date handler.
- React-router-dom routing handler.
- Material-UI components.
- Responsive design.

The **`frontend`** also features a **custom search bar**, **custom scrollbar**, **custom alerts**, reusable **Alert** & **Spinner** components,**private routing**, reusable **API call handler** as well as a **Regex validator**.

`Styling` is done with **MaterialUI**, **SASS**, **Inline-CSS** and **CSS files**.

## `Backend Features:`

The **`server`** is built with _CakePHP framework_, containing:

- CRUD operations
- Passowrd encryption
- Authentication system
- Custom JSON responses

The **`database`** is built with _MySQL_, containing:

- Books, Authors, Rents & Users tables.

To review the database schema, please refer to the file `/bookshopCakeV4/db-tables.sql`.

---

## `User Walkthrough:`

When accessing the [application](https://zeidmagboub.ly/bookshop), the user is presented with **Books page** that features a list of books along with details about each book such as (author name / number of pages ...etc) along with the ability to search the books list by inserting book name or author name.

Next tab is the list of **Authors page**, and the last tab is to login.

In order to rent a book you must login first through **Login page**.

You can register through **Registration page** login afterwards, alternatively you can use the following credentials:

```
username: test
```

```
password: 123
```

Once logged in, you can go back to the **Books page** on the navbar and rent a book.

Additionally, two more tabs will appear, one is a **Management page** tab to add / edit books and authors, and the other is a drop down menu that leads to either **Logout action** or **Profile page**.

Profile page will allow you to _update_ your username and password and _review_ rent history (if any).

---

## `Possible Future Improvements:`

As the project's main purpose is to demonstrate konwledge rather than to be a full-fledged application, there are some features left out that can further improve the project:

- Restrict resource editing (books & authors) to only their creator adding user id to each book & author applying relavent checks.
- Introduce authorization levels.
- Improve UI/UX.
