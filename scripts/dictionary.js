// For toggling font dropdown
let font_toggle = document.getElementById("font-toggle");
font_toggle.addEventListener("click", () => {
  let dropdown_radio = document.querySelector(".dropdown-radio");
  if (dropdown_radio.style.display == "none") {
    dropdown_radio.style.display = "block";
  } else {
    dropdown_radio.style.display = "none";
  }
});

// Get the checkbox element
var checkbox = document.querySelector(".switch input");

// Add event listener for checkbox change event
checkbox.addEventListener("change", function () {
  // Get the body element
  var body = document.querySelector("body");

  // Toggle the dark mode class on the body element
  body.classList.toggle("dark-mode");
});

// Functionality for changing the font upon font_toggle
var radioButtons = document.querySelectorAll('input[name="font"]');

// Add event listener to each radio button
radioButtons.forEach(function (radioButton) {
  radioButton.addEventListener("change", function () {
    if (radioButton.checked) {
      if (radioButton.value === "serif") {
        document.body.style.fontFamily = "'Merriweather', serif";
      } else if (radioButton.value === "sans-serif") {
        document.body.style.fontFamily =
          "'Manrope', 'Merriweather', 'Montserrat', 'Open Sans', 'Poppins', 'Raleway', 'Roboto', 'Roboto Slab'";
      } else if (radioButton.value === "monospace") {
        document.body.style.fontFamily = "monospace";
      }
      font_toggle.innerHTML = radioButton.value;
    }
  });
});

// Functionality to search the word and display it
function get_word(word) {
  let received_word = fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  received_word
    .then((value1) => {
      return value1.json();
    })
    .then((value2) => {
      console.log(value2[0]);
      let response = value2[0];
      document.querySelector("#bold-word h1").innerHTML = word;

      document.querySelector("#bold-word p").innerHTML =
        response.phonetics[0].text;
      let meanings = response.meanings;
      document.getElementById("word-type").innerHTML = meanings[0].partOfSpeech;

      let audio_url = "";
      for (let i = 0; i < response.phonetics.length; i++) {
        if (response.phonetics[i].audio !== "") {
          audio_url = response.phonetics[i].audio;
          break;
        }
      }

      let audio_btn = document.getElementById("audio-btn");
      audio_btn.addEventListener("click", () => {
        if (audio_url === "") {
          alert("Audio file does not exist");
        } else {
          let audio = new Audio();
          audio.src = audio_url;
          audio.play();
        }
      });

      let desc = document.querySelector(".description ul");
      desc.innerHTML = "";
      meanings.forEach((meaning) => {
        desc.innerHTML += `<li><p>${meaning.partOfSpeech} - ${meaning.definitions[0].definition}</p></li>`;
      });
    });
}

let search_btn = document.getElementById("search-btn");
let word_search = document.getElementById("word_search");
search_btn.addEventListener("click", () => {
  if (word_search.value === "") {
    alert("Please enter a word");
  } else {
    get_word(word_search.value);
  }
});
