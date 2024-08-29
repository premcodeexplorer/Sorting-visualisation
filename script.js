const arrayContainer = document.getElementById('array-container');
const explanationContainer = document.getElementById('explanation');
let array = [];

function generateArray() {
    array = [];
    for (let i = 0; i < 7; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    renderArray(array);
    updateExplanation("Array generated. Click 'Start QuickSort' to begin.");
}

function renderArray(array, pivotIndex = null, swapIndices = []) {
    arrayContainer.innerHTML = '';
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 3}px`;
        bar.textContent = value;
        if (index === pivotIndex) {
            bar.classList.add('pivot'); 
        } else if (swapIndices.includes(index)) {
            bar.classList.add('swap'); 
        }
        arrayContainer.appendChild(bar);
    });
}

function updateExplanation(message) {
    explanationContainer.textContent = message;
}

async function quickSort(array, low, high) {
    if (low < high) {
        const pi = await partition(array, low, high);
        await quickSort(array, low, pi - 1);
        await quickSort(array, pi + 1, high);
    }
}

async function partition(array, low, high) {
    const pivot = array[high];
    let i = low - 1;
    updateExplanation(`Pivot is ${pivot} (index ${high}). Partitioning the array.`);
    renderArray(array, high); 
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            updateExplanation(`Element ${array[j]} (index ${j}) is less than pivot ${pivot}, so swapping with element ${array[i]} (index ${i}).`);
            renderArray(array, high, [i, j]); 
            await new Promise(resolve => setTimeout(resolve, 1000)); 
        } else {
            updateExplanation(`Element ${array[j]} (index ${j}) is not less than pivot ${pivot}, so no swap.`);
            await new Promise(resolve => setTimeout(resolve, 1000)); 
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    updateExplanation(`Swapping pivot ${pivot} (index ${high}) with element ${array[i + 1]} (index ${i + 1}).`);
    renderArray(array, high, [i + 1, high]); 
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    return i + 1;
}

async function startQuickSort() {
    updateExplanation("Starting QuickSort...");
    await quickSort(array, 0, array.length - 1);
    updateExplanation("QuickSort completed.");
}


generateArray();
