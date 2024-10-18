(function() {
    document.head.insertAdjacentHTML('beforeend', '<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css" rel="stylesheet">');
  
    // Inject the CSS
    const style = document.createElement('style');
    style.innerHTML = `
    .hidden {
      display: none;
    }
    #chat-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      flex-direction: column;
    }
    #chat-popup {
      height: 70vh;
      max-height: 70vh;
      transition: all 0.3s;
      overflow: hidden;
    }
    @media (max-width: 768px) {
      #chat-popup {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 10px;
      }
    }
    `;
  
    document.head.appendChild(style);
  
    // Create chat widget container
    const chatWidgetContainer = document.createElement('div');
    chatWidgetContainer.id = 'chat-widget-container';
    document.body.appendChild(chatWidgetContainer);
    
    // Inject the HTML
    chatWidgetContainer.innerHTML = `
      <div id="chat-bubble" class="w-16 h-16 bg-purle-900 rounded-full flex items-center justify-center cursor-pointer text-3xl">
        <svg xmlns="http://www.w3.org/200/svg" class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <div id="chat-popup" class="hidden absolute bottom-20 right-0 w-96 bg-white rounded-md shadow-md flex flex-col transition-all text-sm">
        <div id="chat-header" class="flex justify-between items-center p-4 bg-gray-800 text-white rounded-t-md">
          <h3 class="m-0 text-lg">Chat Widget by GPT4</h3>
          <button id="close-popup" class="bg-transparent border-none text-white cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div id="chat-messages" class="flex-1 p-4 overflow-y-auto"></div>
        <div id="chat-input-container" class="p-4 border-t border-gray-200">
          <div class="flex space-x-4 items-center">
            <input type="text" id="chat-input" class="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none w-3/4" placeholder="Type your message...">
            <button id="chat-submit" class="bg-gray-800 text-white rounded-md px-4 py-2 cursor-pointer">Send</button>
          </div>
          <div class="flex text-center text-xs pt-4">
            <span class="flex-1">Автор - <a href="https://t.me/lTheMkl" target="_blank" class="text-indigo-600">@lTheMKl</a></span>
          </div>
        </div>
      </div>
    `;
  
    // Add event listeners
    const chatInput = document.getElementById('chat-input');
    const chatSubmit = document.getElementById('chat-submit');
    const chatMessages = document.getElementById('chat-messages');
    const chatBubble = document.getElementById('chat-bubble');
    const chatPopup = document.getElementById('chat-popup');
    const closePopup = document.getElementById('close-popup');
  
    chatSubmit.addEventListener('click', function() {
      
      const message = chatInput.value.trim();
      if (!message) return;
      
      chatMessages.scrollTop = chatMessages.scrollHeight;
  
      chatInput.value = '';
  
      onUserRequest(message);
  
    });
  
    chatInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        chatSubmit.click();
      }
    });
  
    chatBubble.addEventListener('click', function() {
      togglePopup();
    });
  
    closePopup.addEventListener('click', function() {
      togglePopup();
    });
  
    function togglePopup() {
      const chatPopup = document.getElementById('chat-popup');
      chatPopup.classList.toggle('hidden');
      if (!chatPopup.classList.contains('hidden')) {
        document.getElementById('chat-input').focus();
      }
    }  
  
    function onUserRequest(message) {
      // Handle user request here
      console.log('User request:', message);
    
      // Display user message
      const messageElement = document.createElement('div');
      messageElement.className = 'flex justify-end mb-3';
      messageElement.innerHTML = `
        <div class="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-[70%]">
          ${message}
        </div>
      `;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    
      chatInput.value = '';
    
    let response;
    const greetings = 
        ["Привет!", "Добрый день!", "Здравствуйте!", "Приветсвую!!"];
    const affirmatives = 
        ["Yes", "Certainly", "Of course", "Absolutely"];
    const negatives = 
        ["No", "Sorry, I can't do that", "Unfortunately not", "I'm afraid not"];
    const thanks = 
        ["You're welcome!", "No problem!", "Glad to help!", "Anytime!"];
    const test = 
        [getCurrentTime(), getJoke(), getQuote(), getWeatherInfo()];
    const commands = {
            "help": "You can ask me questions or chat about various topics.",
            "time": getCurrentTime(),
            "date": getCurrentDate(),
            "weather": getWeatherInfo(),
            "joke": getJoke(),
            "fact": getFact(),
            "quote": getQuote(),
    }
    if (message.toLowerCase() in commands) {
        response = commands[message.toLowerCase()];
    } else if (message.toLowerCase().includes("thank")) {
        response = getRandomElement(thanks);
    } else if (message.toLowerCase().includes("yes")) {
        response = getRandomElement(affirmatives);
    } else if (message.toLowerCase().includes("no")) {
        response = getRandomElement(negatives);
    } else if (message.toLowerCase().includes("привет" || "Привет" || "Дарова" || "Здравствуйте" || "дарова" || "здравствуйте" || "Мейсон" || "мейсон")) {
        response = getRandomElement(greetings);
    } else {
        response = getRandomElement(test);
    }

      // Reply to the user
      setTimeout(function() {
        reply(response);
      }, 1000);
    }
    
    function reply(message) {
      const chatMessages = document.getElementById('chat-messages');
      const replyElement = document.createElement('div');
      replyElement.className = 'flex mb-3';
      replyElement.innerHTML = `
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
          ${message}
        </div>
      `;
      chatMessages.appendChild(replyElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getCurrentTime() {
        const now = new Date();
        return `Current time is ${now.toLocaleTimeString()}`;
    }
    
    function getCurrentDate() {
        const now = new Date();
        return `Today's date is ${now.toDateString()}`;
    }
    
    function getWeatherInfo() {
    
        // Simulate getting weather information from an API
        const weatherData = {
            temperature: getRandomNumber(10, 35),
            condition: getRandomElement(["Sunny", "Cloudy", "Rainy", "Windy"]),
        };
        return `Current weather: ${weatherData.temperature}°C,
                                 ${weatherData.condition}`;
    }
    
    function getJoke() {
        
        // Simulate getting a random joke
        const jokes = ["Why don't scientists trust atoms? Because they make up everything!",
            "Parallel lines have so much in common. It's a shame they'll never meet.",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "Why did the scarecrow win an award? Because he was outstanding in his field!"
        ];
        return getRandomElement(jokes);
    }
    
    function getFact() {
        
        // Simulate getting a random fact
        const facts = ["Ants stretch when they wake up in the morning.", 
                       "A group of flamingos is called a flamboyance.",
                       "Honey never spoils.",
                       "The shortest war in history lasted only 38 minutes.",
                       "Octopuses have three hearts."
        ];
        return getRandomElement(facts);
    }
    
    function getQuote() {
        
        // Simulate getting a random quote
        const quotes = 
            ["The only way to do great work is to love what you do. – Steve Jobs",
            "In the middle of difficulty lies opportunity. – Albert Einstein",
            "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill"
        ];
        return getRandomElement(quotes);
    }
    
    function getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
    
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getResponse('Hello');
    
  })();