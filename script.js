// para pegar o campo do resultado
const result = document.querySelector(".result");
// pegar todos os botoes 
const buttons = document.querySelectorAll(".buttons button");

// variaveis 
// numero atual 
let currentNumber = ""; 
// primeiro numero 
let firstOperand = null;
// operdaor com + -
let operator = null;
// apagador de tudo 
let restart = false;

// função para atualizar o resultado 
function updateResult(originClear = false) {
    result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
  }

// função para adicionar um digito
function addDigit(digit){
    // verifica se esta digitando uma vingula ou se já tem uma no visor
    if (digit === "," && (currentNumber.includes(",") || !currentNumber)) return;
    

    if (restart) {
        currentNumber = digit;
        restart = false;
      } else {
        currentNumber += digit;
      }

    updateResult();
}
// função que verifica cada operador por parametro 
function setOperator(newOperator) {
    if (currentNumber) {
      calculate();
  
      firstOperand = parseFloat(currentNumber.replace(",", "."));
      currentNumber = "";
    }
  
    operator = newOperator;
  }

// função para fazer o calculo
function calculate(){
    // verifica se ter o primeiro numero e se tiver algum operador 
    if (operator === null || firstOperand === null) return;
  let secondOperand = parseFloat(currentNumber.replace(",", "."));
  let resultValue;

  switch (operator) {
    case "+":
      resultValue = firstOperand + secondOperand;
      break;
    case "-":
      resultValue = firstOperand - secondOperand;
      break;
    case "×":
      resultValue = firstOperand * secondOperand;
      break;
    case "÷":
      resultValue = firstOperand / secondOperand;
      break;
    default:
      return;
    }
    // verifica se tem mais de 5 casas decimais se tiver ele fixa as 5 
    if (resultValue.toString().split(".")[1]?.length > 5) {
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
      } else {
        currentNumber = resultValue.toString();
      }
    
      operator = null;
      firstOperand = null;
      restart = true;
      percentageValue = null;
      updateResult();
}

// função se limpar os numeros 
function clearCalculator() {
    currentNumber = "";
    firstOperand = null;
    operator = null;
    updateResult(true);
  }

// função que vai calcular a porcentagem 
function setPercentage() {
    let result = parseFloat(currentNumber) / 100;
  
    if (["+", "-"].includes(operator)) {
      result = result * (firstOperand || 1);
    }
  
    if (result.toString().split(".")[1]?.length > 5) {
      result = result.toFixed(5).toString();
    }
  
    currentNumber = result.toString();
    updateResult();
  }

// funçoes para cada operador
buttons.forEach((button) => {
    button.addEventListener("click", () =>{
     const buttonText = button.innerText;
    //   verifica se o botao clicado é um operador 
    if(/^[0-9 ,]+$/.test(buttonText)){
        addDigit(buttonText);
    } else if (["+", "-", "×", "÷"].includes(buttonText)){
        setOperator(buttonText);
    }else if(buttonText === "="){
        calculate()
    }else if (buttonText === "C") {
        clearCalculator();
      } else if (buttonText === "±") {
        currentNumber = (
          parseFloat(currentNumber || firstOperand) * -1
        ).toString();
        updateResult();
      } else if (buttonText === "%") {
        setPercentage();
      }
    })
}) 

