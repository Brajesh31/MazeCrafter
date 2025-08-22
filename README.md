<p align="center">
  <a href="https://github.com/Brajesh31/MazeCrafter">
    <img src="https://raw.githubusercontent.com/Brajesh31/asset/main/maze-crafter-banner.png" alt="MazeCrafter Banner">
  </a>
</p>

<div align="center">

# 🧩 MazeCrafter: Generator & Solver 🤖

**A Python application for procedurally generating complex mazes and visualizing classic pathfinding algorithms in real-time.**

</div>

<p align="center">
  <img src="https://img.shields.io/github/stars/Brajesh31/MazeCrafter?style=for-the-badge&color=gold" alt="Stars">
  &nbsp;
  <img src="https://img.shields.io/github/last-commit/Brajesh31/MazeCrafter?style=for-the-badge&color=blue" alt="Last Commit">
  &nbsp;
  <img src="https://img.shields.io/github/license/Brajesh31/MazeCrafter?style=for-the-badge&color=green" alt="License">
</p>

---

## ✨ Project Overview

MazeCrafter is an interactive algorithm visualization tool that brings classic maze generation and pathfinding algorithms to life. Users can generate intricate mazes of customizable sizes using various algorithms and then watch as different solver algorithms navigate the labyrinth to find the solution.

This project serves as an educational and entertaining way to understand the mechanics behind fundamental computer science algorithms like Depth-First Search (DFS), Breadth-First Search (BFS), and A*.

[GIF of maze generation and solving]

<br>

## ⭐ Core Features

* **Multiple Generation Algorithms:** Generate mazes using different techniques, such as:
    * **Recursive Backtracking (DFS):** Creates mazes with long, winding corridors.
    * **Prim's Algorithm:** Produces mazes with many short branches.
* **Multiple Solving Algorithms:** Visualize and compare different pathfinding algorithms, including:
    * **Breadth-First Search (BFS):** Guaranteed to find the shortest path.
    * **Depth-First Search (DFS):** Explores one path deeply before backtracking.
    * **A\* Search Algorithm:** An intelligent algorithm that finds the shortest path much faster.
* **Customizable Grid:** Easily adjust the size of the maze grid to create simpler or more complex challenges.
* **Step-by-Step Visualization:** Watch the entire process unfold in real-time, with clear visual cues for the current path, visited cells, and the final solution.

<br>

## 🛠️ Technology Stack

| Technology                                                                                                               | Description                                                                    |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [![Python][Python-badge]][Python-url]                                                                                    | Core programming language for all logic and algorithms.                        |
| [![Pygame][Pygame-badge]][Pygame-url]                                                                                    | A powerful library used for creating the GUI and rendering the real-time visualization. |
| [![NumPy][NumPy-badge]][NumPy-url]                                                                                       | Used for efficient grid creation and manipulation.                             |

<br>

## 🚀 Getting Started

Follow these instructions to get the project running on your local machine.

### ✅ Prerequisites

* **Python 3.8+**
* **pip** (Python package installer)

### ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Brajesh31/MazeCrafter.git](https://github.com/Brajesh31/MazeCrafter.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd MazeCrafter
    ```
3.  **Create and activate a virtual environment (recommended):**
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```
4.  **Install the required Python packages:**
    ```sh
    pip install -r requirements.txt
    ```

<br>

## 🎬 Usage

1.  **Run the application:**
    ```sh
    python main.py
    ```
2.  An interactive window will open. Use the UI controls to:
    * Set the desired **grid size**.
    * Select a **maze generation algorithm**.
    * Select a **pathfinding algorithm**.
3.  Click **"Generate Maze"** to create a new maze.
4.  Click **"Solve Maze"** to watch the selected algorithm find the path from the start (green) to the end (red).

---

## 📜 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 📬 Contact

Brajesh - [@Brajesh31 on GitHub](https://github.com/Brajesh31)

[Python-badge]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/
[Pygame-badge]: https://img.shields.io/badge/Pygame-6F4E37?style=for-the-badge&logo=pygame&logoColor=white
[Pygame-url]: https://www.pygame.org/
[NumPy-badge]: https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white
[NumPy-url]: https://numpy.org/
