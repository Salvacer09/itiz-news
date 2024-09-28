document.addEventListener('DOMContentLoaded', function() {
  const apiKey = 'MkjdY4DYnFOLdzL6JFXNQyY9XNJIvAIs';

  // APIs específicas para cada carrera
  const apiSistemas = `https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${apiKey}`;
  const apiGestion = `https://api.nytimes.com/svc/topstories/v2/business.json?api-key=${apiKey}`;
  const apiIndustrial = `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${apiKey}`;
  const apiMecatronica = `https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${apiKey}`; 

  // Función genérica para obtener y mostrar noticias
  function fetchNews(apiUrl, containerId) {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const articles = data.results;
        const container = document.getElementById(containerId);
        
        if (articles && articles.length > 0) {
          articles.forEach(article => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';

            const newsImage = document.createElement('img');
            newsImage.src = article.multimedia && article.multimedia.length > 0 ? article.multimedia[0].url : 'default-image.jpg';

            const newsCardContent = document.createElement('div');
            newsCardContent.className = 'news-card-content';

            const newsTitle = document.createElement('h3');
            newsTitle.textContent = article.title;

            const newsDescription = document.createElement('p');
            newsDescription.textContent = article.abstract;

            const newsLink = document.createElement('a');
            newsLink.href = article.url;
            newsLink.target = '_blank';
            newsLink.textContent = 'Leer más';

            newsCardContent.appendChild(newsTitle);
            newsCardContent.appendChild(newsDescription);
            newsCardContent.appendChild(newsLink);

            newsCard.appendChild(newsImage);
            newsCard.appendChild(newsCardContent);

            container.appendChild(newsCard);
          });
        } else {
          container.textContent = 'No hay noticias disponibles.';
        }
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        const container = document.getElementById(containerId);
        container.textContent = 'Lo sentimos, no se pudieron cargar las noticias.';
      });
  }

  // Obtener noticias para cada carrera
  fetchNews(apiSistemas, 'news-sistemas-container');
  fetchNews(apiGestion, 'news-gestion-container');
  fetchNews(apiIndustrial, 'news-industrial-container');
  fetchNews(apiMecatronica, 'news-mecatronica-container');

  // Manejo del formulario de suscripción
  const subscribeForm = document.querySelector('#subscribe form');
  
  subscribeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email').value;

    // Aquí podrías hacer una llamada a tu backend para enviar el correo
    console.log(`Correo para suscripción: ${emailInput}`);

    // Envío de noticias
    alert(`Noticias enviadas a: ${emailInput}`);

    // Limpiar el campo de correo
    subscribeForm.reset();
  });

  // Desplazamiento suave 
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      const offset = target.getBoundingClientRect().top + window.pageYOffset - 80; // Ajusta el desplazamiento
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    });
  });

  // Agrega este código en el script de tu HTML
  const contactButtons = document.querySelectorAll('.social-icon, .map-icon');

  contactButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault(); // Evitar el comportamiento predeterminado
      alert('Un momento, te estamos redirigiendo...'); // Muestra una alerta
      setTimeout(() => {
        window.open(button.href, '_blank'); // Espera 2 segundos antes de redirigir
      }, 500); // Espera 2 segundos
    });
  });  
});

