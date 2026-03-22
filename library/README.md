# Cosas para añadir.

- Página de autores, número total de libros guardados y desplegable de todos sus libros. 
  Además, input para añadir nuevo autor directo a db.
- Arreglar página de estadísticas: las cajas pequeñas ponerlas a la izquierda y la grande a la derecha. 
  En responsive, la grande baja para abajo. Además, añadir una cajita de género favorito.
- Página de "citas" para añadir citas favoritas, relacionadas con el libro y posibilidad de poner en qué página está. 
  Para ello, añadir tabla a la db: 
    CREATE TABLE quote (
      quote_id AUTOINCREMENT PRIMARY KEY AUTO_INCREMENT,
      quote_text TEXT,
      CONSTRAINT fk_book FOREIGN KEY (book_id) 
      REFERENCES book(title)
    );
