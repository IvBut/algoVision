
const wrapper = document.getElementById('wrapper');
let arr = [];

document.addEventListener("DOMContentLoaded", function(event) {
    arr = generateNumbers();
    createColums(arr);
  });


async function handleQuickSort(){
    let result = await quickSort(arr, 0, arr.length - 1);
    console.log(result);    
}  

async function handleBubleSort(){
    let result = await bubleSort(arr);
}

function createColums(arr){
    let str = '';
    let colWidth = Math.floor(100 / arr.length);
    console.log(wrapper.width);
    
    for (let i = 0; i < arr.length; i++){
        let colHeight = arr[i]*10;
         str += `
            <div class="el" 
                style="min-width: ${colWidth}%; height: ${colHeight}px;">
               ${arr[i]}
            </div>
         `   
    }
    wrapper.innerHTML = str;
}

async function bubleSort(items){
    let blocks = document.querySelectorAll('.el'); 
    for (let i = 0; i < items.length - 1; i++){
        for (let j = 0; j < items.length - i -1; j++){
            if (items[j] > items[j+1]) {
              await  swap(items, j, j+1);
            }
        }
        blocks[items.length - i - 1].style.background = 'white'
    }
    blocks[0].style.background = 'white'
    return Promise.resolve(items);
}


async function quickSort(items, left, right) {
        let index;
        let blocks = document.querySelectorAll('.el');

        if (items.length > 1) {
    
            index = await partition(items, left, right);
            blocks.forEach(el => el.style.background = 'white');
         
            if (left < index - 1) {
                await quickSort(items, left, index - 1);
            }
    
            if (right > index) {
               await quickSort(items, index, right);
            }
    
        }
        
        return Promise.resolve(items);
}


async function partition(items, left, right) {
    let blocks = document.querySelectorAll('.el');
    let idx = Math.floor((right + left) / 2);

    var pivot   = items[idx],
        i       = left,
        j       = right;
    
    blocks[i].style.background = 'green';
    blocks[j].style.background = 'green';

    while (i <= j) {
        
        blocks[idx].style.background = 'red';

        while (items[i] < pivot) {
            await sleep(100);
            blocks[i].style.background = 'green';
            i++;
        }
      
        while (items[j] > pivot) {
            await sleep(100);
            blocks[j].style.background = 'green';
            j--;
        }

        if (i <= j) {
           if (items[i] !== items[j]){
            await swap(items, i, j);  
           } 
            i++;
            j--;
            await sleep(100);
        }
    }

    return i;
}


async function swap(items, firstIndex, secondIndex){
    await sleep(50);
    
    let blocks = document.querySelectorAll('.el');
    blocks[firstIndex].style.background = 'yellow';
    blocks[secondIndex].style.background = 'yellow';

    const temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;

    blocks[firstIndex].textContent = items[firstIndex];
    blocks[firstIndex].style.height = `${items[firstIndex]*10}px`;

    blocks[secondIndex].textContent = items[secondIndex];
    blocks[secondIndex].style.height = `${items[secondIndex]*10}px`;
}

  function sleep(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms)); 
} 


function handleGenerate(){
    arr = generateNumbers();
    createColums(arr);
}


function generateNumbers(){
    return new Array(50).fill(null).map(item => item = Math.ceil(Math.random() * 49)+1);
}