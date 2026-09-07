const display = document.getElementById('Display');
const numbers = document.querySelectorAll('.buttons');
const functions = document.querySelectorAll('.CalcFunct');

let firstNumber = '';
let operator = '';
let isReadyForNewNumber = false;

// Нажатие на цифры (сбрасываем старые события, чтобы не было двойного ввода)
numbers.forEach(button => {
    button.onclick = () => {
        // Если до этого нажали на знак (+, -, *, /), очищаем экран для нового числа
        if (isReadyForNewNumber) {
            display.textContent = '';
            isReadyForNewNumber = false;
        }
        
        // Добавляем только ОДНУ цифру за раз
        display.textContent += button.textContent.trim();
    };
});

// Нажатие на функциональные кнопки
functions.forEach(button => {
    button.onclick = () => {
        const action = button.textContent.trim();

        if (action === 'C') {
            display.textContent = '';
            firstNumber = '';
            operator = '';
            isReadyForNewNumber = false;
        } 
        else if (action === '=') {
            if (firstNumber !== '' && operator !== '') {
                const secondNumber = display.textContent;
                const result = calculate(parseFloat(firstNumber), parseFloat(secondNumber), operator);
                
                display.textContent = result;
                
                firstNumber = '';
                operator = '';
                isReadyForNewNumber = true; 
            }
        } 
        else {
            // Если нажали +, -, * или /
            if (display.textContent !== '') {
                firstNumber = display.textContent;
                operator = action;
                isReadyForNewNumber = true;
            }
        }
    };
});

// Функция для математических расчетов
function calculate(num1, num2, op) {
    if (isNaN(num1) || isNaN(num2)) return 'Ошибка';
    
    switch (op) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : 'На 0 делить нельзя';
        default: return '';
    }
}
