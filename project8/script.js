// Currency Converter using closure, promise, fetch, button, alert, catch, finally, counter, try

function createCurrencyConverter() {
    let conversionCounter = 0; // Counter using closure

    return async function(amount, fromCurrency, toCurrency) {
        try {
            // Use fetch to get exchange rates (using a free API)
            const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const rate = data.rates[toCurrency];
            if (!rate) {
                throw new Error('Currency not supported');
            }
            const convertedAmount = amount * rate;
            alert(`Converted amount: ${convertedAmount.toFixed(2)} ${toCurrency}`);
            document.getElementById('result').textContent = `Converted: ${convertedAmount.toFixed(2)} ${toCurrency}`;
            return convertedAmount;
        } catch (error) {
            alert('Error: ' + error.message);
            document.getElementById('result').textContent = 'Conversion failed';
            throw error;
        } finally {
            conversionCounter++;
            console.log(`Total conversions: ${conversionCounter}`);
        }
    };
}

// Create the converter instance (closure)
const convertCurrency = createCurrencyConverter();

// Event listener for the button
document.getElementById('convertBtn').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    convertCurrency(amount, fromCurrency, toCurrency);
});