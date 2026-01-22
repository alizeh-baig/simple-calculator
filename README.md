# Simple Calculator

A small, responsive calculator built with HTML, CSS, and JavaScript. It supports mouse and keyboard input, basic arithmetic (+, −, ×, ÷), decimals, percent, clear, backspace, and simple input validation before evaluation.

## Live preview
Open `index.html` in your browser to run the calculator.

## Features
- Basic arithmetic: addition, subtraction, multiplication, division
- Decimal numbers
- Percent handling (e.g. `50%` → `0.5`)
- Clear (C) and Backspace (⌫)
- Keyboard support (numbers, operators, Enter, Backspace, Escape)
- Simple validation to prevent unsafe evaluation
- Responsive layout suitable for mobile and desktop

## Files
- `index.html` — the HTML markup and structure
- `styles.css` — styling and responsive layout
- `script.js` — calculator logic and keyboard handling

## How to run
1. Clone or download the project.
2. Open `index.html` in any modern browser.

Optionally, serve the folder with a local server:

Using Python 3:
```bash
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Using Node (http-server):
```bash
npx http-server -p 8000
# then open http://localhost:8000 in your browser
```

## Usage
- Click the buttons or type on your keyboard.
- Press `=` or `Enter` to evaluate.
- Press `C` or `Escape` to clear.
- Press `Backspace` to delete the last character.

Supported keys:
- Numbers: `0–9`
- Decimal: `.`
- Operators: `+ - * / ( ) %`
- Enter / `=`: evaluate
- Backspace: delete last character
- Escape / `c`: clear

Examples:
- `12+7` → press `Enter` → `19`
- `50%` → press `Enter` → `0.5`
- `2*(3+4)` → press `Enter` → `14`

## Implementation notes
- Input is validated to allow only digits, whitespace, parentheses, decimal point and the operators `+ - * / %`.
- Percent tokens like `50%` are converted to `(50/100)` before evaluation.
- The code uses the Function constructor to evaluate the sanitized expression. While validated here, avoid evaluating untrusted user input in other contexts.

## Customization ideas
- Add a memory (M+, M-, MR) feature
- Add a history panel showing previous calculations
- Improve parser to support unary operators and implicit multiplication
- Add themes (dark/light) or color customization
- Add unit tests for the evaluation logic

## Contributing
Contributions and improvements are welcome. Open an issue or submit a pull request with a clear description of the change.

When contributing:
- Keep UI accessible (semantic buttons, ARIA where appropriate)
- Add tests for new logic or parsing behavior
- Keep CSS small and maintainable; prefer variables for theme colors

## License
MIT — see LICENSE for details.

## Author
alizeh-baig
