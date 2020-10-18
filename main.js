    const keyboard = document.createElement('div');
    const keyboard_keys = document.createElement('div');
    const textArea = document.getElementById('value');
    let caps = false;

    // create elements;
keyboard.classList.add('keyboard', 'keyboard-hidden');
keyboard_keys.classList.add('keyboard_keys');

// add to DOM
document.body.appendChild(keyboard);
keyboard.appendChild(keyboard_keys);
keyboard_keys.appendChild(createElement());
    // create keyLayout
function createElement(){
    const fragment = document.createDocumentFragment();
    const keyLayout = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
    "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
    "space"
];
    const createIcon = (icon_name)=>{
        return `<i class="material-icons">${icon_name}</i>`;
    }

    keyLayout.forEach(key => {
        const keyElement = document.createElement('button');
        const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;
        keyElement.setAttribute('type', 'button');
        keyElement.classList.add('keyboard_key');
            switch(key){
                case 'backspace': 
                keyElement.classList.add("keyboard_key-wide");
                keyElement.innerHTML = createIcon("backspace");
                keyElement.addEventListener('click', () => {
                    textArea.value = textArea.value.substring(0, textArea.value.length - 1);
                })
                break;
                case 'caps':
                keyElement.classList.add('keyboard_key-wide', 'keyboard_key-activatable');
                keyElement.innerHTML = createIcon("keyboard_capslock");
                keyElement.addEventListener('click', () => {
                    keyElement.classList.toggle('keyboard_key-active');
                    caps = !caps;
                    updateCaps();
                })
                break;
                case 'enter':
                keyElement.classList.add("keyboard_key-wide");
                keyElement.innerHTML = createIcon("keyboard_return");
                keyElement.addEventListener('click', () => {
                    textArea.value += '\n';
                })
                break;
                case 'done':
                keyElement.classList.add("keyboard_key-wide", 'keyboard_key-dark');
                keyElement.innerHTML = createIcon("check_circle");
                keyElement.addEventListener('click', close);
                break;
                case 'space':
                keyElement.classList.add('keyboard_key-extra');
                keyElement.innerHTML = createIcon("space_bar");
                keyElement.addEventListener('click', ()=>{
                    textArea.value += ' ';  
                })
                break;
                default:
                keyElement.classList.add('getCaps');
                keyElement.textContent = key;
                keyElement.addEventListener('click', ()=>{
                    textArea.value += keyElement.textContent;  
                })
            }
        fragment.appendChild(keyElement);
        if (insertLineBreak) {
            fragment.appendChild(document.createElement("br"));
        }
    })
    return fragment;
}

function close(){keyboard.classList.add('keyboard-hidden');}

function open(){keyboard.classList.remove('keyboard-hidden');}

function updateCaps(){
    const keys = document.querySelectorAll('.getCaps');
    keys.forEach(key => {
        key.textContent = !caps?key.textContent.toLowerCase():key.textContent.toUpperCase();
    })
}

value.addEventListener('focus', open);
