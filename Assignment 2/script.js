// Shared navigation helper
function navigateTo(page) {
    window.location.href = `${page}.html`;
  }
  
  // Load a quote from ZenQuotes on the homepage
  window.addEventListener('DOMContentLoaded', async () => {
    const quoteElem = document.getElementById('quote');
    if (quoteElem) {
      try {
        const res = await fetch("https://zenquotes.io/api/random");
        const data = await res.json(); // ZenQuotes returns an array
        const quote = data[0].q;
        const author = data[0].a;
        quoteElem.textContent = `"${quote}" — ${author}`;
      } catch (e) {
        quoteElem.textContent = "Failed to load quote.";
      }
    }
  
    // Setup Annyang voice commands
    if (annyang) {
      const commands = {
        'hello': () => {
          console.log("Voice command: hello");
          alert("Hello World!");
        },
  
        'say hello': () => {
          console.log("Voice command: say hello");
          alert("Hello from say hello!");
        },
  
        'change the color to *color': (color) => {
          const cleanedColor = color.toLowerCase().trim().replace(/[^\w\s]/g, '');
          const colorMap = {
            'dark blue': '#001f3f',
            'light blue': '#add8e6',
            'sky': 'skyblue',
            'mint': 'mintcream',
            'black': 'black',
            'white': 'white',
            'red': 'red',
            'blue': 'blue',
            'green': 'green',
            'yellow': 'yellow',
            'pink': 'pink',
            'purple': 'purple',
            'gray': 'gray',
            'orange': 'orange'
          };
          const finalColor = colorMap[cleanedColor] || cleanedColor;
          document.body.style.backgroundColor = finalColor;
        },
  
        'navigate to *page': (page) => {
          const target = page.toLowerCase().trim().replace(/[^\w]/g, '');
          if (['home', 'index'].includes(target)) {
            navigateTo('index');
          } else if (['stocks', 'stock'].includes(target)) {
            navigateTo('stocks');
          } else if (['dogs', 'dog'].includes(target)) {
            navigateTo('dogs');
          } else {
            alert(`Sorry, I don’t recognize the page: "${target}"`);
          }
        }
      };
  
      annyang.addCommands(commands);
  
      // Log what Annyang hears
      annyang.addCallback('result', function (phrases) {
        console.log('Annyang recognized:', phrases);
      });
  
      annyang.start();
    }
  });
  
  // Manual buttons to start/stop Annyang
  function startListening() {
    if (annyang) {
      annyang.start();
    }
  }
  
  function stopListening() {
    if (annyang) {
      annyang.abort();
    }
  }
  
  