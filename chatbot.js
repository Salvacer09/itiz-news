// Manejo del chatbot
document.getElementById('open-chat').addEventListener('click', function() {
  document.getElementById('chatbot').style.display = 'block';
  document.getElementById('open-chat').style.display = 'none';
});

document.getElementById('close-chat').addEventListener('click', function() {
  document.getElementById('chatbot').style.display = 'none';
  document.getElementById('open-chat').style.display = 'block';
});

document.getElementById('send-btn').addEventListener('click', sendMessage);

function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  if (userInput.trim() === '') return;

  const userMessage = document.createElement('div');
  userMessage.className = 'user-message';
  userMessage.textContent = userInput;
  document.getElementById('chat-body').appendChild(userMessage);
  document.getElementById('user-input').value = '';

  setTimeout(() => {
    const botMessage = document.createElement('div');
    botMessage.className = 'bot-message';
    botMessage.textContent = getBotResponse(userInput);
    document.getElementById('chat-body').appendChild(botMessage);
  }, 500);
}

function getBotResponse(input) {
  const responses = {
    "hola": "¡Hola! ¿Cómo te puedo ayudar?",
    "noticias": "Puedes consultar las últimas noticias en la sección Noticias.",
    "contacto": "Visita la sección de contacto para más información.",
    "default": "Lo siento, no entiendo tu pregunta. ¿Puedes reformularla?",
  };
  return responses[input.toLowerCase()] || responses["default"];
}
