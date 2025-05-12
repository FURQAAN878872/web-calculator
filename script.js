document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const previousOperandElement = document.querySelector('.previous-operand');
    const currentOperandElement = document.querySelector('.current-operand');
    const numberButtons = document.querySelectorAll('button:not(.operator):not(#clear):not(#delete):not(#equals):not(.mode-btn):not(#theme-switcher)');
    const operatorButtons = document.querySelectorAll('.operator:not(#equals)');
    const equalsButton = document.getElementById('equals');
    const clearButton = document.getElementById('clear');
    const deleteButton = document.getElementById('delete');
    const themeSwitcher = document.getElementById('theme-switcher');
    const standardModeBtn = document.getElementById('standard-mode');
    const scientificModeBtn = document.getElementById('scientific-mode');
    const calculatorContainer = document.querySelector('.calculator-container');
    const scientificButtons = document.querySelector('.scientific-buttons');
    
    // Calculator state
    let currentOperand = '0';
    let previousOperand = '';
    let operation = undefined;
    let resetScreen = false;
    
    // Initialize
    updateDisplay();
    
    // Number buttons
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.value === '.' && currentOperand.includes('.')) return;
            
            if (currentOperand === '0' || resetScreen) {
                currentOperand = '';
                resetScreen = false;
            }
            
            currentOperand += button.value;
            updateDisplay();
        });
    });
    
    // Operator buttons
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentOperand === '') return;
            if (previousOperand !== '') {
                compute();
            }
            
            operation = button.value;
            previousOperand = currentOperand;
            currentOperand = '';
            updateDisplay();
        });
    });
    
    // Equals button
    equalsButton.addEventListener('click', () => {
        if (previousOperand === '' || currentOperand === '' || operation === undefined) return;
        compute();
        updateDisplay();
    });
    
    // Clear button
    clearButton.addEventListener('click', () => {
        currentOperand = '0';
        previousOperand = '';
        operation = undefined;
        updateDisplay();
    });
    
    // Delete button
    deleteButton.addEventListener('click', () => {
        if (currentOperand.length === 1) {
            currentOperand = '0';
        } else {
            currentOperand = currentOperand.slice(0, -1);
        }
        updateDisplay();
    });
    
    // Theme switcher
    themeSwitcher.addEventListener('click', () => {
        document.body.classList.toggle('day-theme');
        document.body.classList.toggle('night-theme');
        
        if (document.body.classList.contains('night-theme')) {
            themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Mode switcher
    standardModeBtn.addEventListener('click', () => {
        calculatorContainer.classList.remove('scientific-mode');
        standardModeBtn.classList.add('active');
        scientificModeBtn.classList.remove('active');
    });
    
    scientificModeBtn.addEventListener('click', () => {
        calculatorContainer.classList.add('scientific-mode');
        standardModeBtn.classList.remove('active');
        scientificModeBtn.classList.add('active');
    });
    
    // Scientific functions
    scientificButtons.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            switch(button.value) {
                case 'sin':
                    currentOperand = Math.sin(parseFloat(currentOperand)).toString();
                    break;
                case 'cos':
                    currentOperand = Math.cos(parseFloat(currentOperand)).toString();
                    break;
                case 'tan':
                    currentOperand = Math.tan(parseFloat(currentOperand)).toString();
                    break;
                case 'log':
                    currentOperand = Math.log10(parseFloat(currentOperand)).toString();
                    break;
                case 'ln':
                    currentOperand = Math.log(parseFloat(currentOperand)).toString();
                    break;
                case 'π':
                    currentOperand = Math.PI.toString();
                    break;
                case 'e':
                    currentOperand = Math.E.toString();
                    break;
                case '^':
                    operation = '^';
                    previousOperand = currentOperand;
                    currentOperand = '';
                    break;
                case 'sqrt':
                    currentOperand = Math.sqrt(parseFloat(currentOperand)).toString();
                    break;
                case 'fact':
                    currentOperand = factorial(parseInt(currentOperand)).toString();
                    break;
                case 'pow10':
                    currentOperand = Math.pow(10, parseFloat(currentOperand)).toString();
                    break;
                case 'abs':
                    currentOperand = Math.abs(parseFloat(currentOperand)).toString();
                    break;
                case 'mod':
                    operation = 'mod';
                    previousOperand = currentOperand;
                    currentOperand = '';
                    break;
                case '(':
                case ')':
                    currentOperand += button.value;
                    break;
            }
            updateDisplay();
        });
    });
    
    // Helper functions
    function updateDisplay() {
        currentOperandElement.textContent = currentOperand;
        if (operation) {
            const operatorSymbol = getOperatorSymbol(operation);
            previousOperandElement.textContent = `${previousOperand} ${operatorSymbol}`;
        } else {
            previousOperandElement.textContent = previousOperand;
        }
    }
    
    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            case 'mod':
                computation = prev % current;
                break;
            default:
                return;
        }
        
        currentOperand = computation.toString();
        operation = undefined;
        previousOperand = '';
        resetScreen = true;
    }
    
    function getOperatorSymbol(operator) {
        switch(operator) {
            case '*': return '×';
            case '/': return '÷';
            case '^': return '^';
            case 'mod': return 'mod';
            default: return operator;
        }
    }
    
    function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
});