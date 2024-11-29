# Tic-Tac-Toe
Tic Tac Toe Game
A browser-based Tic Tac Toe game built with HTML, CSS, and JavaScript. This project emphasizes modular design using the module pattern and factory functions to organize code effectively.

Features
A fully functional Tic Tac Toe game.
Player vs Player gameplay with customizable player names.
A clean, interactive interface to display the gameboard and results.
Restart button to reset the game.
Modular codebase for easy maintainability and scalability.
Tech Stack
HTML: Markup structure for the web page.
CSS: Styling for the interface.
JavaScript: Game logic and DOM manipulation.
How to Run
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/tic-tac-toe.git
Navigate to the project directory:
bash
Copy code
cd tic-tac-toe
Open the index.html file in your browser to play the game.
Game Instructions
Enter player names in the input fields.
Click Start Game to begin.
Players take turns clicking on the gameboard to place their markers (X or O).
The game ends when:
A player achieves a 3-in-a-row (horizontal, vertical, or diagonal), or
The board is full, resulting in a tie.
Use the Restart Game button to play again.
Modules Overview
Gameboard Module:
Manages the gameboard state (array of cells).
Player Factory:
Creates player objects with names and markers.
Game Controller:
Handles the game flow, turn logic, and win/tie conditions.
Display Controller:
Manages all interactions with the DOM.
