const numbers=document.querySelectorAll(".number");
const history=document.querySelector(".history");
const view=document.querySelector(".view");
const hasilShadow=document.querySelector(".hasil-belum-pasti");
const clearLast=document.querySelector(".last-entity-clear");
const clearAll=document.querySelector(".clear-all")
const operasion=document.querySelectorAll(".operasi");
const hasil=document.querySelector(".hasil");
let dis1num="";
let dis2num="";
let hasill=null;
let lastOperation="";
let haveDot=false;
let checkHasil=false

numbers.forEach((number) => {
    number.addEventListener("click",(e)=>{
        if (e.target.innerText === "." && !dis2num) {
            return;
        }  else if (e.target.innerText === "." && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) {
            return;
        } 
        
        checkHasil=false
        dis2num += e.target.innerText;
        view.innerText =dis2num;
    })
})
operasion.forEach((operasi) =>{
    operasi.addEventListener("click",(e) =>{
        if (!dis2num) return;
        haveDot= false;
        const operationName=e.target.innerText;
        if (dis1num && dis2num && lastOperation){
            mathOperation();
        } else {
            hasill = parseFloat(dis2num);
        }
        clearVar(operationName);
        lastOperation = operationName;
    })
})
function clearVar(name = "") {
    dis1num += dis2num + " " + name + " ";
    history.innerText = dis1num ;
    view.innerText = "" ;
    dis2num = "";
    hasilShadow.innerText = hasill;
    checkHasil=false
}
function mathOperation () {
    if (lastOperation === "x") {
        hasill = parseFloat(hasill) * parseFloat(dis2num);
    } else if (lastOperation === "+") {
        hasill = parseFloat(hasill) + parseFloat(dis2num);
    } else if (lastOperation === "-") {
        hasill = parseFloat(hasill) - parseFloat(dis2num);
    } else if (lastOperation === "/") {
        hasill = parseFloat(hasill) / parseFloat(dis2num);
    } else if (lastOperation === "%") {
        hasill = parseFloat(hasill) % parseFloat(dis2num);
    }
}

hasil.addEventListener('click' , (e) => {
    if (!dis1num || !dis2num) return;
    haveDot = true;
    mathOperation();
    clearVar();
    view.innerText = hasill;
    hasilShadow.innerText = "";
    dis2num = hasill;
    dis1num = "";
    checkHasil = true
    if (mathOperation === 0) {
        view = "0"
        dis2num = ""
    }
    if (hasil.innerText === "." && haveDot) return
})

clearAll.addEventListener("click" , () => {
    dis1num = "";
    dis2num = "";
    haveDot = false;
    view.innerText = "0";
    hasilShadow.innerText = "0";
    history.innerText = "0";
    hasill = "";
    checkHasil=false
})

clearLast.addEventListener("click" , (e) => {
    if (!checkHasil) {
        view.innerText = "0";
        dis2num = "";
    }
})

window.addEventListener ("keydown" , (e) => {
    if (
        e.key ==="0" ||
        e.key ==="1" ||
        e.key ==="2" ||
        e.key ==="3" ||
        e.key ==="4" ||
        e.key ==="5" ||
        e.key ==="6" ||
        e.key ==="7" ||
        e.key ==="8" ||
        e.key ==="9" ||
        e.key ==="."
        ) {
        clickButton(e.key)
    } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
        clickOperation(e.key);
    } else if (e.key === "x") {
        e.key === "*"
        clickOperation("x")
    } else if (e.key === "Enter" || e.key === "=") {
        clickEqual()
    } else if (e.key === "Delete") {
        clickClearAll()
    } else if (e.key === "Backspace") {
        clickClearLast()
    }
})

function clickButton(key) {
    numbers.forEach((button) => {
        if (button.innerText === key) {
            button.click()
        }
        
    })
}

function clickOperation(key) {
    operasion.forEach((operasi) => {
        if (operasi.innerText === key) {
            operasi.click()
        }
    })
}

function clickEqual() {
    hasil.click();
}

function clickClearAll() {
    clearAll.click();   
}

function clickClearLast() {
    clearLast.click();
}
