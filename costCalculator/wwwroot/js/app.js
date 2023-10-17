document.addEventListener("DOMContentLoaded", function () {
    const promptTextElement = document.getElementById("promptText");
    const tokenCountElement = document.getElementById("tokenCount");
    const selectedLLMElement = document.getElementById("selectedLLM");
    const averageEmployeesElement = document.getElementById("averageEmployees");
    const employeesValueElement = document.getElementById("employeesValue");
    const averageFrequencyElement = document.getElementById("averageFrequency");
    const frequencyValueElement = document.getElementById("frequencyValue");
    const averagePromptTokensElement = document.getElementById("averagePromptTokens");
    const promptTokensValueElement = document.getElementById("promptTokensValue");
    const averageCompletionsTokensElement = document.getElementById("averageCompletionsTokens");
    const completionsTokensValueElement = document.getElementById("completionsTokensValue");
    const costPerDayElement = document.getElementById("costPerDay");
    const costPerMonthElement = document.getElementById("costPerMonth");
    const costPerYearElement = document.getElementById("costPerYear");

    // Calculate token count when prompt text changes


    //promptTextElement.addEventListener("input", function () {
    //    const inputText = promptTextElement.value;
    //    const words = inputText.split(/\s+/); // Split text into words using spaces as separators
    //    let tokenCount = 0;

    //    for (let i = 0; i < words.length; i += 4) {
    //        tokenCount++;
    //    }

    //    tokenCountElement.textContent = tokenCount;
    //});


    
    promptTextElement.addEventListener("input", function () {
        const inputText = promptTextElement.value;
        let tokenCount;

        if (inputText.length === 0) {
            tokenCount = 0;
        } else {
            // Calculate token count based on character ranges
            tokenCount = Math.ceil(inputText.length / 20);
        }

        tokenCountElement.textContent = tokenCount;
    });


    // Update slider value display
    function updateSliderValue(sliderElement, valueElement) {
        valueElement.textContent = sliderElement.value;
    }

    averageEmployeesElement.addEventListener("input", function () {
        updateSliderValue(averageEmployeesElement, employeesValueElement);
    });

    averageFrequencyElement.addEventListener("input", function () {
        updateSliderValue(averageFrequencyElement, frequencyValueElement);
    });

    averagePromptTokensElement.addEventListener("input", function () {
        updateSliderValue(averagePromptTokensElement, promptTokensValueElement);
    });

    averageCompletionsTokensElement.addEventListener("input", function () {
        updateSliderValue(averageCompletionsTokensElement, completionsTokensValueElement);
    });

    // Calculate cost
    function calculateCost() {
        const selectedLLM = selectedLLMElement.value;
        const employees = parseFloat(averageEmployeesElement.value);
        const frequency = parseFloat(averageFrequencyElement.value);
        const promptTokens = parseFloat(averagePromptTokensElement.value);
        const completionsTokens = parseFloat(averageCompletionsTokensElement.value);

        let costPerDay = 0;

        if (selectedLLM === "GPT-3.5-Turbo") {
            costPerDay = employees * frequency * promptTokens * 0.0015 / 1000 + employees * frequency * completionsTokens * 0.002 / 1000;
        } else if (selectedLLM === "GPT-4") {
            costPerDay = employees * frequency * promptTokens * 0.03 / 1000 + employees * frequency * completionsTokens * 0.06 / 1000;
        }

        const costPerMonth = costPerDay * 30;
        const costPerYear = costPerMonth * 12;

        costPerDayElement.textContent = costPerDay.toFixed(3);
        costPerMonthElement.textContent = costPerMonth.toFixed(3);
        costPerYearElement.textContent = costPerYear.toFixed(3);
    }

    // Attach the calculateCost function to input events
    const inputs = [averageEmployeesElement, averageFrequencyElement, averagePromptTokensElement, averageCompletionsTokensElement];
    inputs.forEach((input) => {
        input.addEventListener("input", calculateCost);
    });

    // Initial calculation
    calculateCost();
});
