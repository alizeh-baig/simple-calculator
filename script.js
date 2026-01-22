// Simple Calculator logic
const displayEl = document.getElementById('display');
const keys = document.querySelector('.keys');

let current = ''; // current expression shown
let lastResult = null;

function updateDisplay(text){
  displayEl.textContent = text === '' ? '0' : text;
}

// Sanitize expression: allow digits, whitespace, parentheses, decimal point and + - * / %
function isSafeExpression(expr){
  // Reject empty or only whitespace
  if(!expr || /^\s*$/.test(expr)) return false;
  // Only allow these characters
  return /^[0-9+\-*/().%\s]+$/.test(expr);
}

// Evaluate safely after validation
function evaluateExpression(expr){
  if(!isSafeExpression(expr)) throw new Error('Invalid expression');
  // Convert percent: replace 'number%' with '(number/100)'
  // This basic replacement handles cases like 50% -> (50/100)
  const withPercent = expr.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
  // Use Function to evaluate (safer than eval in this controlled context)
  // Surround with parentheses to ensure correct return of expression
  // Note: expression has been validated to contain only safe chars
  return Function('"use strict"; return (' + withPercent + ')')();
}

// Handle button presses
keys.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if(!btn) return;

  const value = btn.dataset.value;
  const action = btn.dataset.action;

  if(value){
    // Append digit/operator/decimal
    // Prevent multiple consecutive operators (simple guard)
    if(/^[+\-*/%]$/.test(value) && current === '') return; // don't start with operator (except minus could be allowed)
    current += value;
    updateDisplay(current);
    return;
  }

  if(action){
    if(action === 'clear'){
      current = '';
      lastResult = null;
      updateDisplay(current);
    } else if(action === 'back'){
      current = current.slice(0, -1);
      updateDisplay(current);
    } else if(action === 'equals'){
      try {
        const result = evaluateExpression(current);
        // Display result and prepare for next input
        current = String(result);
        lastResult = result;
        updateDisplay(current);
      } catch (err){
        updateDisplay('Error');
        current = '';
      }
    } else if(action === 'percent'){
      // Append percent sign for later evaluation
      current += '%';
      updateDisplay(current);
    }
  }
});

// Keyboard support
window.addEventListener('keydown', (e) => {
  const allowed = '0123456789+-*/().%';
  if(allowed.includes(e.key)){
    e.preventDefault();
    current += e.key;
    updateDisplay(current);
    return;
  }

  if(e.key === 'Enter' || e.key === '='){
    e.preventDefault();
    try {
      const result = evaluateExpression(current);
      current = String(result);
      lastResult = result;
      updateDisplay(current);
    } catch {
      updateDisplay('Error');
      current = '';
    }
    return;
  }

  if(e.key === 'Backspace'){
    e.preventDefault();
    current = current.slice(0, -1);
    updateDisplay(current);
    return;
  }

  if(e.key === 'Escape' || e.key.toLowerCase() === 'c'){
    e.preventDefault();
    current = '';
    updateDisplay(current);
    return;
  }
});

// Initialize
updateDisplay('0');
