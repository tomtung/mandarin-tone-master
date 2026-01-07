# Mandarin Tone Master

This is a web-based tool designed to help users practice recognizing Mandarin Chinese tones.

## Features

- Displays Chinese sentences or phrases.
- Plays audio pronunciation (using browser's Text-to-Speech).
- Allows users to input tones for each character (1, 2, 3, 4, and 0 for neutral tone).
- Provides immediate feedback on correct and incorrect tone selections.
- Allows progression to the next sentence.

## Setup and Installation

1.  **Navigate to the project directory:**

    ```bash
    cd mandarin-tone-master
    ```

2.  **Install frontend dependencies:**

    ```bash
    npm install
    ```

3.  **Install Python dependencies (for data generation):**

    *   Ensure you have `pdm` installed. If not, refer to the PDM documentation for installation instructions.
    *   Install dependencies:
        ```bash
        pdm install
        ```

## Generating `sentences.json` from `sentences.txt`

The `src/data/sentences.txt` file is the ground truth for the sentences used in the application. It contains one sentence per line, without any tone annotations. The `src/data/sentences.json` file, which the application consumes, is generated from this text file.

To generate or update `sentences.json`:

1.  **Modify `src/data/sentences.txt`:** Add or modify sentences, one per line.
2.  **Run the generation script:**
    ```bash
    pdm run python scripts/process_sentences.py src/data/sentences.txt src/data/sentences.json
    ```
    This script will read `sentences.txt`, annotate tones using `pypinyin`, and create `sentences.json`.

## Running the Application

To start the development server, run:

```bash
npm run dev
```

The application will be accessible in your web browser, usually at `http://localhost:5173/`.