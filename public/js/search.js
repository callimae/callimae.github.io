document.addEventListener('DOMContentLoaded', (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query');
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results');  // upewnij się, że masz ten element na swojej stronie

  if (query && searchInput) {
    searchInput.value = query;
    const event = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
    searchInput.dispatchEvent(event);
  }

  let data;  // Deklaracja zmiennej data na zewnątrz funkcji fetch

  fetch('/index.json')
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData;  // Przypisanie danych JSON do zmiennej data

      // Inicjalizacja indeksu Lunr
      const idx = lunr(function () {
        this.ref('uri');
        this.field('title');
        this.field('content');
        this.field('description');
        this.field('categories');

        data.forEach(doc => {
          this.add(doc);  // Tutaj dodajesz dokumenty do indeksu Lunr
        });
      });

      // Dodanie zdarzenia do pola wyszukiwania
      document.getElementById('search-input').addEventListener('input', function () {
        const query = this.value;
        const results = idx.search(query);
        resultsContainer.innerHTML = results.map(result => {
          const item = data.find(item => item.uri === result.ref);
          return `<li><a href="${item.uri}">${item.title}</a></li>`;
        }).join('');
      });
    })
    .catch(error => console.error('Error fetching JSON data:', error));
});
