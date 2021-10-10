var calculator = {};
(
    function () {
        this.INPUT = document.querySelector("[name='input']");
        /**Prevent default event
         * @param e Event
         * @return undefined 
         */
        this.prevent = (e) => {
            e.preventDefault();
        };
        /**Add character to the input
         * @param e Event
         * @return undefined
         */
        this.addToCurrent = (e) => {
            this.prevent(e);
            this.INPUT.value += e.target.innerText;
        };
        /**Reset input value
         * @param e Event
         * @return undefined
         */
        this.reset = (e) => {
            this.prevent(e);
            this.INPUT.value = "";
        };
        /**Delete last character
         * @param e Event
         * @return undefined
         */
        this.delete = (e) => {
            this.prevent(e);
            let text = this.INPUT.value.split("");
            text.splice(text.length - 1, 1);
            this.INPUT.value = text.join("");
        };
        /**Convert text to number. If result is NaN throw error.
         * @param text string
         * @return number | Error 
         */
        this.textToNumber = (text) => {
            let num = Number(text);
            if (isNaN(num))
                throw new Error("NaN");
            return num;
        };
        /**From text make array of numbers and operators 
         * and array of operator position
         * @param text string
         * @return [Array,Array] | Error 
         */
        this.parseInput = (text) => {
            let i, currentNumber = text[0], t;
            let numbers = [], indexes = [];
            for (i = 1; i < text.length; i++)
            {
                t = text[i];
                switch (t) {
                    case "+":
                    case "-":
                        numbers.push(this.textToNumber(currentNumber));
                        currentNumber = t;
                        break;
                    case "*":
                    case "/":
                        if (currentNumber === "")
                            throw new Error("NaN");
                        numbers.push(this.textToNumber(currentNumber));
                        numbers.push(t);
                        indexes.push(numbers.length - 1);
                        currentNumber = "";
                        break;
                    default:
                        currentNumber += t;
                        break;
                }
            }
            if (currentNumber !== '')
                numbers.push(this.textToNumber(currentNumber));
            return [numbers, indexes];
        };
        this.submit = (e) => {
            this.prevent(e);
            try {
                let [num,index] = this.parseInput(this.INPUT.value);
                let i,j;
                for (i = 0; i < index.length; i++)
                {
                    j = index[i];
                    switch (num[j]) {
                        case "*":
                            num.splice(j - 1, 3, num[j - 1] * num[j + 1]);
                            break;
                        case "/":
                            if (num[j + 1] == 0)
                                throw new Error("NaN");
                            num.splice(j - 1, 3, num[j - 1] / num[j + 1]);
                            break;
                        default:
                            throw new Error("NaN");
                            break;
                    }
                }
                let n = num.reduce((previous, current) => previous + current, 0);
                //console.log(this.INPUT.value + `=${n}`);
                this.INPUT.value = n;
            }
            catch (err) {
                this.INPUT.value = "ERR";
            }
        };

        const BUTTONS = document.querySelectorAll(".normal-button");
        const RESET = document.querySelector(".reset-button");
        const DEL = document.querySelector(".del-button");
        const SUBMIT = document.querySelector(".submit-button");
        
        BUTTONS.forEach(b => {
            b.addEventListener("keypress", this.prevent);
            b.addEventListener("click", this.addToCurrent);
        });
        RESET.addEventListener("keypress", this.prevent);
        DEL.addEventListener("keypress", this.prevent);
        SUBMIT.addEventListener("keypress", this.prevent);

        RESET.addEventListener("click", this.reset);
        DEL.addEventListener("click", this.delete);
        SUBMIT.addEventListener("click",this.submit);
    }
).apply(calculator);

