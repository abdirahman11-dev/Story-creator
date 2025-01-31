//header manipulation
document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item.has-drop");
  const dropdown = document.querySelector(".dropdown");

  // Function to detect if the code is running on GitHub Pages
  function isGitHubPages() {
      return window.location.hostname.includes('github.io');
  }

  // Base path for GitHub Pages and local
  const basePath = isGitHubPages() ? "/Story-creator/Html" : "."; 
  // Adjusted paths for GitHub Pages and local
  const chapterLinks = {
      3: [
          { text: "Chapter1", href: `${basePath}/chapter1.html` },
          { text: "Chapter2", href: `${basePath}/chapter2.html` },
          { text: "Chapter3", href: `${basePath}/chapter3.html` },
          { text: "Chapter4", href: `${basePath}/chapter4.html` },
          { text: "Chapter5", href: `${basePath}/chapter5.html` },
          { text: "Chapter6", href: `${basePath}/chapter6.html` },
          { text: "Chapter7", href: `${basePath}/chapter7.html` },
          { text: "Chapter8", href: `${basePath}/chapter8.html` },
      ],
  };

  navItems.forEach((item) => {
      item.addEventListener("click", function (event) {
          event.stopPropagation();
          const chapterId = this.getAttribute("data-chapter");
          const links = chapterLinks[chapterId];

          if (!links) return;

          dropdown.innerHTML = links
              .map((link) => `<a href="${link.href}">${link.text}</a>`)
              .join("");

          const rect = this.getBoundingClientRect();
          dropdown.style.left = `${rect.left}px`;
          dropdown.style.top = `${rect.bottom + window.scrollY}px`;
          dropdown.style.display = "block";
      });
  });

  document.addEventListener("click", function (event) {
      if (!dropdown.contains(event.target)) {
          dropdown.style.display = "none";
      }
  });
});


//project
const saveButton = document.getElementById('save-story');
const showSavedStoriesButton = document.getElementById('show-saved-stories');
const savedStoriesContainer = document.getElementById('saved-stories-container');
const userStoryInput = document.getElementById('user-story-input');
const userTitleInput = document.getElementById('user-title-input');  // Added title input

// Save story (user-prompted story only)
function saveCustomStory() {
  const userStory = userStoryInput.value.trim();
  const storyTitle = userTitleInput.value.trim();  // Getting title

  if (userStory && storyTitle) {
    let savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
    const storyToSave = {
      title: storyTitle,
      content: userStory
    };
    savedStories.push(storyToSave);
    localStorage.setItem('savedStories', JSON.stringify(savedStories));
    userStoryInput.value = '';  // Clear input field
    userTitleInput.value = '';  // Clear title input field
    showNotification('Your story has been saved successfully!', 'success');
  } else {
    showNotification('Please provide both title and story before saving!', 'error');
  }
}

// Show saved stories
function showSavedStories() {
  const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
  savedStoriesContainer.innerHTML = ''; // Clear existing content

  if (savedStories.length === 0) {
    savedStoriesContainer.textContent = 'No saved stories found.';
  } else {
    const list = document.createElement('ol');
    savedStories.forEach((story, index) => {
      const listItem = document.createElement('li');
      listItem.style.marginBottom = '10px';
      listItem.style.padding = '10px';
      listItem.style.border = '1px solid #ddd';
      listItem.style.borderRadius = '5px';
      listItem.style.background = '#fff';

      // Story title and text
      const storyTitle = document.createElement('h3');
      storyTitle.textContent = story.title;
      const storyText = document.createElement('p');
      storyText.textContent = story.content;

      // Edit button
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.style.margin = '5px 0 0 5px';
      editButton.style.fontSize = '12px';
      editButton.addEventListener('click', () => editSavedStory(index));

      // Delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteSavedStory(index));

      // Share button
      const shareButton = document.createElement('button');
      shareButton.textContent = 'Share';
      shareButton.addEventListener('click', () => shareSavedStory(story));

      listItem.appendChild(storyTitle);
      listItem.appendChild(storyText);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
      listItem.appendChild(shareButton);
      list.appendChild(listItem);
    });
    savedStoriesContainer.appendChild(list);
  }

  savedStoriesContainer.style.display = 'block';
}

// Edit a saved story
function editSavedStory(index) {
  const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
  const newTitle = prompt('Edit your story title:', savedStories[index].title);
  const newStory = prompt('Edit your story content:', savedStories[index].content);
  
  if (newStory !== null && newTitle !== null) {
    savedStories[index] = { title: newTitle, content: newStory };
    localStorage.setItem('savedStories', JSON.stringify(savedStories));
    showNotification('Story updated successfully!', 'success');
    showSavedStories();
  }
}

// Delete a saved story
function deleteSavedStory(index) {
  const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
  savedStories.splice(index, 1);
  localStorage.setItem('savedStories', JSON.stringify(savedStories));
  showNotification('Story deleted successfully!', 'success');
  showSavedStories();
}

// Share a saved story
function shareSavedStory(story) {
  if (navigator.share) {
    navigator.share({
      title: story.title,
      text: story.content,
      url: window.location.href,
    })
      .then(() => showNotification('Story shared successfully!', 'success'))
      .catch(() => showNotification('Failed to share story', 'error'));
  } else {
    showNotification('Share not supported on this browser', 'error');
  }
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.style.backgroundColor = type === 'success' ? '#2ecc71' : '#e74c3c';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// EventListeners for the project
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
});

function setupEventListeners() {
  if (saveButton) saveButton.addEventListener('click', saveCustomStory);
  if (showSavedStoriesButton) showSavedStoriesButton.addEventListener('click', showSavedStories);
}




// Example Logic

// chapter one
const ex_content = document.querySelector('.example--content');
const clickBtn = document.getElementById('buttonClick');
const Hided = document.querySelector('.hidden');
const sen = 'Hello, world!';
const sayHello = () => {
  if (Hided) Hided.classList.remove('hidden');
  if (ex_content) ex_content.textContent = sen;
};

//chapter 2

function executeExample(exampleNumber) {
  // Hide all result divs
  document.querySelectorAll('.exampleResult').forEach(div => div.classList.add('hidden'));

  // Fetch the clicked button's associated result div
  const resultDiv = document.querySelector(`.exampleButton[data-example="${exampleNumber}"]`).nextElementSibling;

  // Determine what to display based on the example number
  let output = '';
  switch (exampleNumber) {
    case 1:
      let result1 = 5 + 3;
      output = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let result1 = 5 + 3;
console.log(result1); // Result: 8
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${result1}</div>
      `;
      break;

    case 2:
      let isEqual = 2 === 3;
      output = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let isEqual = 2 === 3;
console.log(isEqual); // Result: ${isEqual}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${isEqual}</div>
      `;
      break;

    case 3:
      let isTrue3 = true && false;
      output = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let isTrue3 = true && false;
console.log(isTrue3); // Result: ${isTrue3}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${isTrue3}</div>
      `;
      break;

    case 4:
      let isTrue4 = true || false;
      output = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let isTrue4 = true || false;
console.log(isTrue4); // Result: ${isTrue4}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${isTrue4}</div>
      `;
      break;

    case 5:
      let isTrue5 = !true;
      output = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let isTrue5 = !true;
console.log(isTrue5); // Result: ${isTrue5}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${isTrue5}</div>
      `;
      break;

    case 6:
      let count = 10;
      count += 5;
      output = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let count = 10;
count += 5;
console.log(count); // Result: ${count}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${count}</div>
      `;
      break;

    case 7:
      let age7 = 20;
      let message7 = age7 > 18 ? "Adult" : "Junior";
      output = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let age7 = 20;
let message7 = age7 > 18 ? "Adult" : "Junior";
console.log(message7); // Result: ${message7}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${message7}</div>
      `;
      break;

    case 8:
      let x8 = 5;
      let y8 = x8++;
      output = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let x8 = 5;
let y8 = x8++;
console.log(x8, y8); // x: ${x8}, y: ${y8}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">x=${x8}, y=${y8}</div>
      `;
      break;

    case 9:
      let x9 = 10;
      let y9 = ++x9;
      output = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let x9 = 10;
let y9 = ++x9;
console.log(x9, y9); // x: ${x9}, y: ${y9}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">x=${x9}, y=${y9}</div>
      `;
      break;

    case 10:
      let x10 = 8;
      let y10 = x10--;
      output = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let x10 = 8;
let y10 = x10--;
console.log(x10, y10); // x: ${x10}, y: ${y10}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">x=${x10}, y=${y10}</div>
      `;
      break;

    case 11:
      let x11 = 15;
      let y11 = --x11;
      output = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let x11 = 15;
let y11 = --x11;
console.log(x11, y11); // x: ${x11}, y: ${y11}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">x=${x11}, y=${y11}</div>
      `;
      break;

    case 12:
      let age12 = 25;
      let message12 = "I am " + age12 + " years old.";
      output = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let age12 = 25;
let message12 = "I am " + age12 + " years old.";
console.log(message12); // Result: ${message12}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${message12}</div>
      `;
      break;

    case 13:
      let numStr = "42";
      let result13 = numStr * 2;
      output = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let numStr = "42";
let result13 = numStr * 2;
console.log(result13); // Result: ${result13}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${result13}</div>
      `;
      break;

    case 14:
      let num = 10;
      let strNum = "5";
      let comparison = num > strNum;
      output = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let num = 10;
let strNum = "5";
console.log(num > strNum); // Result: ${comparison}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${comparison}</div>
      `;
      break;

    default:
      output = `<strong>Error:</strong> Invalid example number.`;
  }

  // Display the result below the button
  resultDiv.innerHTML = output;
  resultDiv.classList.remove('hidden');
}

// Add event listeners to buttons
document.querySelectorAll('.exampleButton').forEach(button => {
  button.addEventListener('click', () => {
    const exampleNumber = parseInt(button.getAttribute('data-example'));
    executeExample(exampleNumber);
  });
});


//chapter 3

function executeExampleChap1(exampleNumber) {
  // Hide all result divs
  document.querySelectorAll('.exampleResult2').forEach(div => div.classList.add('hidden'));

  // Fetch the clicked button's associated result div
  const resultDiv3 = document.querySelector(`.exampleButton--2[data-example="${exampleNumber}"]`).nextElementSibling;

  // Determine what to display based on the example number
  let output3 = '';
  switch (exampleNumber) {
    case 1:
      const name = "Alica";
      const message1 = `Hello ${name}`;
      console.log(message1);
      output3 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
          const name = "Alica";
          const message = "Hello ${name}";
          console.log(message);
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${message1}</div>
      `;
      break;

    case 2:
      const age = 30;
      const message2 = `My age is ${age} years. I live in Mogadishu.`;
      console.log(message2);
      output3 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
          const age = 30;
          const message = "My age is ${age} years. I live in Mogadishu.";
          console.log(message);
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${message2}</div>
      `;
      break;

    case 3:
      let a = 5, b = 10, temp = a;
      a = b;
      b = temp;
      console.log(`After Swapping: a=${a}, b=${b}`);
      output3 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
          let a = 5, b = 10;
          let temp = a;
          a = b;
          b = temp;
          console.log("After Swapping: a=${a}, b=${b}");
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">a=${a}, b=${b}</div>
      `;
      break;

    case 4:
      let a2 = 5, b2 = 10;
      a2 = a2 + b2;
      b2 = a2 - b2;
      a2 = a2 - b2;
      console.log(`After Swapping: a=${a2}, b=${b2}`);
      output3 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
          let a2 = 5, b2 = 10;
          a2 = a2 + b2;
          b2 = a2 - b2;
          a2 = a2 - b2;
          console.log("After Swapping: a=${a2}, b=${b2}");
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">a=${a2}, b=${b2}</div>
      `;
      break;

    case 5:
      const age2 = 18;
      const message5 = age2 >= 18 ? "You are an Adult!" : "You are a Minor!";
      console.log(message5);
      output3 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
          const age = 18;
          if (age >= 18) {
            console.log("You are an Adult!");
          } else {
            console.log("You are a Minor!");
          }
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${message5}</div>
      `;
      break;

    case 6:
      const grade = 85;
      let gradeResult;
      if (grade > 90) {
        gradeResult = "A";
      } else if (grade > 80) {
        gradeResult = "B";
      } else {
        gradeResult = "C";
      }
      console.log(gradeResult);
      output3 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
          const grade = 85;
          if (grade > 90) {
            console.log("A");
          } else if (grade > 80) {
            console.log("B");
          } else {
            console.log("C");
          }
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${gradeResult}</div>
      `;
      break;

    case 7:
      const age3 = 18;
      const isAdult = age3 >= 18 ? true : false;
      console.log(isAdult);
      output3 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
          const age = 18;
          const isAdult = age >= 18 ? true : false;
          console.log(isAdult);
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${isAdult}</div>
      `;
      break;

    case 8:
      const day = "Saturday";
      let dayMessage;
      switch (day) {
        case "Saturday":
          dayMessage = "It's the start of the week.";
          break;
        case "Wednesday":
          dayMessage = "It's almost the weekend.";
          break;
        default:
          dayMessage = "It's a regular day.";
      }
      console.log(dayMessage);
      output3 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
          const day = "Saturday";
          switch (day) {
            case "Saturday":
              console.log("It's the start of the week.");
              break;
            case "Wednesday":
              console.log("It's almost the weekend.");
              break;
            default:
              console.log("It's a regular day.");
          }
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${dayMessage}</div>
      `;
      break;

    case 9:
      let loopResult = '';
      for (let i = 1; i <= 5; i++) {
        loopResult += i + ' ';
      }
      console.log(loopResult.trim());
      output3 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${loopResult.trim()}</div>
      `;
      break;

    case 10:
      let i2 = 1;
      let whileResult = '';
      while (i2 <= 5) {
        whileResult += i2 + ' ';
        i2++;
      }
      console.log(whileResult.trim());
      output3 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let i = 1;
while (i <= 5) {
  console.log(i);
  i++;
}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${whileResult.trim()}</div>
      `;
      break;

    case 11:
      let i3 = 1;
      let doWhileResult = '';
      do {
        doWhileResult += i3 + ' ';
        i3++;
      } while (i3 <= 5);
      console.log(doWhileResult.trim());
      output3 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
let i = 1;
do {
  console.log(i);
  i++;
} while (i <= 5);
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${doWhileResult.trim()}</div>
      `;
      break;

    case 12:
      let breakResult = '';
      for (let i4 = 0; i4 < 5; i4++) {
        if (i4 === 3) break;
        breakResult += i4 + ' ';
      }
      console.log(breakResult.trim());
      output3 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
for (let i = 0; i < 5; i++) {
  if (i === 3) break;
  console.log(i);
}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${breakResult.trim()}</div>
      `;
      break;

    case 13:
      let continueResult = '';
      for (let i5 = 0; i5 < 5; i5++) {
        if (i5 === 2) continue;
        continueResult += i5 + ' ';
      }
      console.log(continueResult.trim());
      output3 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);
}
        </pre>
        <div class="output-section"><strong>Output:</strong></div>
        <div class="output">${continueResult.trim()}</div>
      `;
      break;

    default:
      output3 = `<strong>Error:</strong> Invalid example number.`;
  }

  // Display the result below the button
  resultDiv3.innerHTML = output3;
  resultDiv3.classList.remove('hidden');
}

// Add event listeners to buttons
document.querySelectorAll('.exampleButton--2').forEach(button => {
  button.addEventListener('click', () => {
    const exampleNumber = parseInt(button.getAttribute('data-example'));
    executeExampleChap1(exampleNumber);
  });
});






//chapter 4 
document.addEventListener("DOMContentLoaded", () => {
  const codeExamples = {
      hello: {
          code: `
function hello() {
  console.log("Hello World!");
}
hello();
          `,
          execute: () => {
              const output4 = "Hello World!";
              return output4;
          }
      },
      greet: {
          code: `
function greet(name) {
  console.log("Hello, " + name);
}
greet('Abdirahman');
          `,
          execute: () => {
              const output4 = "Hello, Abdirahman";
              return output4;
          }
      },
      add: {
          code: `
function add(a, b) {
  return a + b;
}
add(5, 3);
          `,
          execute: () => {
              const output4 = 5 + 3;
              return output4;
          }
      },
      globalScope: {
          code: `
var globalVariable = "I'm in global scope";
console.log(globalVariable);
          `,
          execute: () => {
              const output4 = "I'm in global scope";
              return output4;
          }
      },
      localScope: {
          code: `
function sayhello2() {
  let localVariable = "I'm in Local Scope";
  console.log(localVariable);
}
sayhello2();
          `,
          execute: () => {
              const output4 = "I'm in Local Scope";
              return output4;
          }
      },
      blockScope: {
          code: `
function block() {
  if (true) {
      let blockVariable = "I'm in block scope";
      console.log(blockVariable);
  }
}
block();
          `,
          execute: () => {
              const output4 = "I'm in block scope";
              return output4;
          }
      },
      callback: {
          code: `
function doSomething(callback) {
  console.log("Doing something...");
  callback();
}
function onComplete() {
  console.log("The operation is completed");
}
doSomething(onComplete);
          `,
          execute: () => {
              const output4 = "Doing something...\nThe operation is completed";
              return output4;
          }
      },
      timeoutCallback: {
          code: `
function executecallback() {
  setTimeout(function () {
      console.log("This is a callback executed after 2 seconds");
  }, 2000);
}
executecallback();
          `,
          execute: () => {
              const output4 = "This is a callback executed after 2 seconds (delayed)";
              return output4;
          }
      }
  };

  const buttons4 = document.querySelectorAll(".exampleButton--3");

  buttons4.forEach(button_4 => {
      button_4.addEventListener("click", () => {
          // Hide all other result divs
          document.querySelectorAll(".exampleResult").forEach(div => {
              if (div !== button_4.nextElementSibling) {
                  div.classList.add("hidden");
              }
          });

          const example = button_4.dataset.example;
          const resultDiv4 = button_4.nextElementSibling;

          if (codeExamples[example]) {
              const { code, execute } = codeExamples[example];
              const output4 = execute();

              resultDiv4.classList.remove("hidden");
              resultDiv4.innerHTML = `
                  <div>
                      <strong>Code:</strong>
                      <pre>${code}</pre>
                  </div>
                  <div>
                      <strong>Output:</strong>
                      <p>${output4}</p>
                  </div>
              `;
          }
      });
  });
});



//chapter 5
function executeExample5(exampleNumber5) {
  // Hide all result divs
  document.querySelectorAll('.exampleResult5').forEach(div => div.classList.add('hidden'));

  // Fetch the clicked button's associated result div
  const resultDiv5 = document.querySelector(`.exampleButton--5[data-example="${exampleNumber5}"]`).nextElementSibling;

  // Determine what to display based on the example number
  let output5 = '';
  switch (exampleNumber5) {
    case 1:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const fruits = ['apple', 'banana', 'mango'];
console.log(fruits); // Output5: ['apple', 'banana', 'mango']
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Creates an array using an array literal and logs it.</div>
      `;
      break;

    case 2:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const numbers = new Array(5, 10, 15, 20);
console.log(numbers); // Output5: [5, 10, 15, 20]
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Creates an array using the Array constructor and initializes it with elements.</div>
      `;
      break;

    case 3:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const emptyArray = [];
emptyArray.push(1, 2, 3);
console.log(emptyArray); // Output5: [1, 2, 3]
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Creates an empty array and adds elements to it using the push method.</div>
      `;
      break;

    case 4:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const stringToArray = Array.from('hello');
console.log(stringToArray); // Output5: ['h', 'e', 'l', 'l', 'o']
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Converts a string into an array using Array.from().</div>
      `;
      break;

    case 5:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const arrayWithLength = new Array(5);
console.log(arrayWithLength); // Output5: [undefined, undefined, undefined, undefined, undefined]
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Creates an array with a specific length using the Array constructor.</div>
      `;
      break;

    case 6:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const originalArray = [1, 2, 3];
const newArray = [...originalArray, 4, 5];
console.log(newArray); // Output5: [1, 2, 3, 4, 5]
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Demonstrates the spread operator to create a new array by extending an existing one.</div>
      `;
      break;

    case 7:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const singleElementArray = Array.of(10);
console.log(singleElementArray); // Output5: [10]
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Creates an array with a single element using Array.of().</div>
      `;
      break;

    case 8:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const colors = ['red', 'blue', 'green'];
console.log(colors[0]); // Output5: red
console.log(colors[2]); // Output5: green
console.log(colors[3]); // Output5: undefined
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Accesses elements in an array using their indices.</div>
      `;
      break;

    case 9:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const names = ['Alice', 'Bob'];
names.push('Charlie');
console.log(names); // Output5: ['Alice', 'Bob', 'Charlie']
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Adds an element to the end of an array using the push method.</div>
      `;
      break;

    case 10:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const names = ['Alice', 'Bob', 'Charlie'];
names.unshift('Zara');
console.log(names); // Output5: ['Zara', 'Alice', 'Bob', 'Charlie']
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Adds an element to the beginning of an array using the unshift method.</div>
      `;
      break;

    case 11:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const names = ['Alice', 'Bob', 'Charlie'];
names.pop();
console.log(names); // Output5: ['Alice', 'Bob']
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Removes the last element from an array using the pop method.</div>
      `;
      break;

    case 12:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.log(matrix[1][2]); // Output5: 6
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Accesses elements in a multidimensional array by their indices.</div>
      `;
      break;

    case 15:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const numbers = [1, 2, 3, 4, 5];
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Iterates through an array using a traditional for loop.</div>
      `;
      break;

    case 16:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((number) => {
  console.log(number);
});
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Iterates through an array using the forEach method.</div>
      `;
      break;

    case 17:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const numbers = [1, 2, 3, 4, 5];
for (let number of numbers) {
  console.log(number);
}
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Iterates through an array using the for...of loop.</div>
      `;
      break;

    case 18:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled); // Output5: [2, 4, 6, 8, 10]
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Creates a new array by applying a function to each element using the map method.</div>
      `;
      break;

    case 19:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const products = [
  { name: 'Laptop', price: 1200, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
  { name: 'Keyboard', price: 60, inStock: true },
  { name: 'Monitor', price: 300, inStock: true }
];
const availableProducts = products.filter(product => product.inStock);
console.log(availableProducts);
// Output5: [
//   { name: 'Laptop', price: 1200, inStock: true },
//   { name: 'Keyboard', price: 60, inStock: true },
//   { name: 'Monitor', price: 300, inStock: true }
// ]
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Filters an array of products to return only those that are in stock.</div>
      `;
      break;

    case 20:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const temperatures = [22, 25, 19, 30, 28];
const isHotDay = temperatures.some(temp => temp > 28);
console.log(isHotDay); // Output5: true
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Checks if there is at least one day with a temperature greater than 28°C.</div>
      `;
      break;

    case 21:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const examScores = [85, 90, 78, 92, 88];
const allPassing = examScores.every(score => score >= 75);
console.log(allPassing); // Output5: true
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Checks if all exam scores are passing (i.e., greater than or equal to 75).</div>
      `;
      break;

    case 22:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const cartItems = [
  { name: 'Shirt', price: 25, quantity: 2 },
  { name: 'Jeans', price: 50, quantity: 1 },
  { name: 'Shoes', price: 80, quantity: 1 }
];
const totalCost = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
console.log(totalCost); // Output5: 180
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Calculates the total cost of items in a shopping cart using the reduce method.</div>
      `;
      break;

    case 13:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const person = {
  name: 'Amina',
  educ_level: 'Bachelor',
  gra_status: 'Active'
};
for (let index in person) {
  console.log(\`\${index}: \${person[index]}\`);
}
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Iterates through an object and logs each key-value pair.</div>
      `;
      break;

    case 14:
      output5 = `
        <div class="code-section"><strong>Code:</strong></div>
        <pre class="code">
const jsonData = '{"name": "Mohamed Ali", "age": 30, "isStudent": false}';
const parsedData = JSON.parse(jsonData);
console.log(parsedData.name); // Output5: Mohamed Ali

const jsObject = { name: 'Sara', age: 22, city: 'Cairo' };
const jsonString = JSON.stringify(jsObject);
console.log(jsonString); // Output5: {"name":"Sara","age":22,"city":"Cairo"}
        </pre>
        <div class="output5-section"><strong>Description:</strong></div>
        <div class="output5">Demonstrates parsing a JSON string to an object and converting an object to a JSON string.</div>
      `;
      break;

    default:
      output5 = `<strong>Error:</strong> Invalid example number.`;
  }

  // Display the result below the button
  resultDiv5.innerHTML = output5;
  resultDiv5.classList.remove('hidden');
}

// Add event listeners to buttons
document.querySelectorAll('.exampleButton--5').forEach(button5 => {
  button5.addEventListener('click', () => {
    const exampleNumber5 = parseInt(button5.getAttribute('data-example'));
    executeExample5(exampleNumber5);
  });
});
// EvenListener for chapter 1
clickBtn?.addEventListener('click', sayHello);


//chapter 6


document.addEventListener('DOMContentLoaded', function() {
  const main = document.getElementById('main');
  const itemContainer = document.getElementById('itemContainer');
  const addItemButton = document.getElementById('addItemButton');
  const itemInput = document.getElementById('itemInput');

  main.style.padding = '2em';
  main.style.textAlign = 'center';

  itemContainer.style.listStyleType = 'none';
  itemContainer.style.padding = '0';
  itemContainer.style.margin = '1em 0';
  itemContainer.style.display = 'flex';
  itemContainer.style.flexWrap = 'wrap'; // Allow items to wrap to the next line
  itemContainer.style.justifyContent = 'space-around';
  itemContainer.style.backgroundColor = '#e0e0e0';
  itemContainer.style.padding = '1em';
  itemContainer.style.borderRadius = '8px';
  itemContainer.style.color = 'black';
  itemContainer.style.minHeight = '50px'; // Set a minimum height

  itemInput.style.padding = '0.5em';
  itemInput.style.margin = '1em';
  itemInput.style.border = '1px solid #cccccc';
  itemInput.style.borderRadius = '4px';

  const items = itemContainer.getElementsByTagName('li');
  for (const item of items) {
      item.style.padding = '0.5em';
      item.style.backgroundColor = '#ffffff';
      item.style.border = '1px solid #cccccc';
      item.style.borderRadius = '4px';
      item.style.margin = '0.5em';
      item.style.position = 'relative'; // For positioning the remove button

      // Add a remove button to each existing item
      const removeButton = document.createElement('button');
      removeButton.textContent = '×';
      removeButton.style.position = 'absolute';
      removeButton.style.top = '-10px';
      removeButton.style.right = '-10px';
      removeButton.style.backgroundColor = 'red';
      removeButton.style.color = 'white';
      removeButton.style.border = 'none';
      removeButton.style.borderRadius = '50%';
      removeButton.style.cursor = 'pointer';
      removeButton.style.padding = '2px 6px';
      removeButton.style.fontSize = '12px';
      removeButton.addEventListener('click', function() {
          itemContainer.removeChild(item);
      });
      item.appendChild(removeButton);
  }

  addItemButton.style.padding = '0.5em 1em';
  addItemButton.style.fontSize = '1em';
  addItemButton.style.cursor = 'pointer';

  // Function to add a new item to the list
  const addItem = function() {
      const newItemName = itemInput.value.trim();
      if (newItemName) {
          const newItem = document.createElement('li');
          newItem.textContent = newItemName;
          newItem.style.padding = '0.5em';
          newItem.style.backgroundColor = '#ffffff';
          newItem.style.border = '1px solid #cccccc';
          newItem.style.borderRadius = '4px';
          newItem.style.margin = '0.5em';
          newItem.style.position = 'relative'; // For positioning the remove button

          // Add a remove button to the new item
          const removeButton = document.createElement('button');
          removeButton.textContent = '×';
          removeButton.style.position = 'absolute';
          removeButton.style.top = '-10px';
          removeButton.style.right = '-10px';
          removeButton.style.backgroundColor = 'red';
          removeButton.style.color = 'white';
          removeButton.style.border = 'none';
          removeButton.style.borderRadius = '50%';
          removeButton.style.cursor = 'pointer';
          removeButton.style.padding = '2px 6px';
          removeButton.style.fontSize = '12px';
          removeButton.addEventListener('click', function() {
              itemContainer.removeChild(newItem);
          });
          newItem.appendChild(removeButton);

          itemContainer.appendChild(newItem);
          itemInput.value = '';
      } else {
          alert('Please enter a valid item name.');
      }
  };

  addItemButton.addEventListener('click', addItem);

  document.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
          addItem();
      }
  });
});



//chapter 7 
// document.addEventListener('DOMContentLoaded', () => {
//   // Click Event Example
//   const clickButton = document.getElementById('clickButton');
//   clickButton.addEventListener('click', () => {
//       alert('Button clicked!');
//   });

//   // Key Events Example
//   const keyInput = document.getElementById('keyInput');
//   const keyEventOutput = document.getElementById('keyEventOutput');

//   keyInput.addEventListener('keydown', (event) => {
//       keyEventOutput.innerHTML = `Keypress: ---<br>Keydown: ${event.key}<br>Keyup: ---`;
//   });

//   keyInput.addEventListener('keypress', (event) => {
//       keyEventOutput.innerHTML = `Keypress: ${event.key}<br>Keydown: ---<br>Keyup: ---`;
//   });

//   keyInput.addEventListener('keyup', (event) => {
//       keyEventOutput.innerHTML = `Keypress: ---<br>Keydown: ---<br>Keyup: ${event.key}`;
//   });

//   // Form Event Example
//   const exampleForm = document.getElementById('exampleForm');
//   exampleForm.addEventListener('submit', (event) => {
//       event.preventDefault(); // Prevent the form from actually submitting
//       alert('Form submitted with text: ' + document.getElementById('formInput').value);
//   });

//   // Mouseover Event Example
//   const hoverArea = document.getElementById('hoverArea');
//   hoverArea.addEventListener('mouseover', () => {
//       hoverArea.style.backgroundColor = 'lightgreen';
//       hoverArea.textContent = 'You hovered over me!';
//   });
//   hoverArea.addEventListener('mouseout', () => {
//       hoverArea.style.backgroundColor = 'lightblue';
//       hoverArea.textContent = 'Hover over me';
//   });
// });
document.addEventListener('DOMContentLoaded', () => {
  // Click Event Example
  const clickButton = document.getElementById('clickButton');
  clickButton.addEventListener('click', () => {
      alert('Button clicked!');
  });

  // Key Events Example
  const keyInput = document.getElementById('keyInput');
  const keyEventOutput = document.getElementById('keyEventOutput');

  keyInput.addEventListener('keydown', (event) => {
      keyEventOutput.innerHTML = `Keypress: ---<br>Keydown: ${event.key}<br>Keyup: ---`;
  });

  keyInput.addEventListener('keypress', (event) => {
      keyEventOutput.innerHTML = `Keypress: ${event.key}<br>Keydown: ---<br>Keyup: ---`;
  });

  keyInput.addEventListener('keyup', (event) => {
      keyEventOutput.innerHTML = `Keypress: ---<br>Keydown: ---<br>Keyup: ${event.key}`;
  });

  // Form Events Example
  const exampleForm = document.getElementById('exampleForm');
  exampleForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the form from actually submitting
      alert('Form submitted with text: ' + document.getElementById('formInput').value);
  });

  // Mouseover Event Example
  const hoverArea = document.getElementById('hoverArea');
  hoverArea.addEventListener('mouseover', () => {
      hoverArea.style.backgroundColor = 'lightgreen';
      hoverArea.textContent = 'You hovered over me!';
  });
  hoverArea.addEventListener('mouseout', () => {
      hoverArea.style.backgroundColor = 'lightblue';
      hoverArea.textContent = 'Hover over me';
  });

  // Focus Events Example
  const focusInput = document.getElementById('focusInput');
  const focusOutput = document.getElementById('focusOutput');

  focusInput.addEventListener('focus', () => {
      focusOutput.innerText = 'Element focused!';
      focusOutput.style.color = 'green';
  });

  focusInput.addEventListener('blur', () => {
      focusOutput.innerText = 'Element blurred!';
      focusOutput.style.color = 'red';
  });

  // Event Delegation Example
  const parentList = document.getElementById('parentList');
  parentList.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
          alert('Clicked on: ' + event.target.innerText);
      }
  });
});



//chapter 8
document.addEventListener("DOMContentLoaded", function () {
const form = document.querySelector('#loginForm');
const usernameField = document.querySelector('#username');
const emailField = document.querySelector('#email');
const passwordField = document.querySelector('#password');

const Abdirahman = {
  username: 'Abdirahman11',
  email: 'abdirahman@gmail.com',
  pass: '12345678'
};

// Custom validation for username
usernameField.addEventListener('input', function () {
  const username = usernameField.value;
  const startsWithLetter = /^[a-zA-Z]/.test(username); // Starts with a letter
  const containsNumber = /\d/.test(username); // Contains at least one number
  const isLongEnough = username.length >= 7; // At least 7 characters

  if (!startsWithLetter || !containsNumber || !isLongEnough) {
      usernameField.setCustomValidity(
          'Username must start with a letter, include at least one number, and be at least 7 characters long.'
      );
  } else {
      usernameField.setCustomValidity('');
  }
});

// Custom validation for password
passwordField.addEventListener('input', function () {
  const password = passwordField.value;
  const isValid = password.length >= 6; // At least 6 characters
  if (!isValid) {
      passwordField.setCustomValidity('Password must be at least 6 characters long.');
  } else {
      passwordField.setCustomValidity('');
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission for demonstration

  // Reset all fields to default state
  usernameField.classList.remove('is-invalid', 'is-valid');
  emailField.classList.remove('is-invalid', 'is-valid');
  passwordField.classList.remove('is-invalid', 'is-valid');

  // Validate username
  const username = usernameField.value;
  const startsWithLetter = /^[a-zA-Z]/.test(username);
  const containsNumber = /\d/.test(username);
  const isLongEnough = username.length >= 7;
  const isUsernameValid = startsWithLetter && containsNumber && isLongEnough;

  if (!isUsernameValid) {
      usernameField.classList.add('is-invalid');
  } else {
      usernameField.classList.add('is-valid');
  }

  // Validate email
  const email = emailField.value;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation
  if (!isEmailValid) {
      emailField.classList.add('is-invalid');
  } else {
      emailField.classList.add('is-valid');
  }

  // Validate password
  const password = passwordField.value;
  const isPasswordValid = password.length >= 6;
  if (!isPasswordValid) {
      passwordField.classList.add('is-invalid');
  } else {
      passwordField.classList.add('is-valid');
  }

  // Check if all fields are valid
  if (isUsernameValid && isEmailValid && isPasswordValid) {
      // Check if input values match the stored credentials
      if (usernameField.value === Abdirahman.username &&
          emailField.value === Abdirahman.email &&
          passwordField.value === Abdirahman.pass) {
          alert('Logged in successfully!');
      } else {
          alert('Invalid username, email, or password.');
      }
  } else {
      // Blur fields that are valid
      if (isUsernameValid) usernameField.blur();
      if (isEmailValid) emailField.blur();
      if (isPasswordValid) passwordField.blur();

      // Focus on the first invalid field
      if (!isUsernameValid) {
          usernameField.focus();
      } else if (!isEmailValid) {
          emailField.focus();
      } else if (!isPasswordValid) {
          passwordField.focus();
      }
  }

  // Add Bootstrap's validation classes
  form.classList.add('was-validated');
});
});