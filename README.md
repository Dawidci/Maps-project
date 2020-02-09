# Projekt inżynierski - Aplikacja wspierająca planowanie tras przewozu ładunków w firmie transportowej
Jest to projekt, który ma być podstawą mojej pracy inżynierskiej. 

Funkcje aplikacji:
- Zarządzanie magazynami - dodawanie (wybór lokalizacji przez kliknięcie na mapie), usuwanie z listy, aktualizowanie
- Zarządzanie zasobami (dodawanie, usuwanie oraz zmiana ilości zasobów w danym magazynie) i dodawanie/usuwanie typów zasobów
- Dodawanie tras:
a) przez wybór magazynów, które mają znajdować się na trasie - algorytm  wybiera optymalną kolejność lokalizacji.
b) przez wybór zasobu, jego ilości oraz tego, do którego zasobu musi zostać dostarczony. Algorytm sprawdza, w których magazynach znajduje się dany zasób, a następnie korzysta z tej kolekcji przy wyznaczaniu optymalnej trasy. 
- Wyświetlanie listy tras/magazynów/rodzajów zasobów
- Wyświetlenie szczegółów na temat trasy - w tym wyświetlenie trasy na mapie oraz przedstawienie magazynów, przez które ma prowadzić dana trasa
- Wyświetlenie szczegółów na temat magazynu - w tym wyświetlenie magazynu na mapie oraz dostępnych w nim zasobów

Stos technologiczny:
- Java 8
- Spring Framework
- MySQL
- Angular 8
- TypeScript
- RxJS
- LeafletJS
- Leaflet Routing Machine
