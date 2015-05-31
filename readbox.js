

var parentBox = document.getElementById("parent");
var entryBox = document.getElementById("entrybox");
var valueBox = document.getElementById("valuebox");
var inputBox = document.getElementById("inputbox");
var activateBox = document.getElementById("activate");

function isChildFrom(node, parent) {
    while (node !== null && node.parentNode) {
	if (node === window || node === document.documentElement) {
            return false;
	}
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

function keypress(evt) {
    var target = evt.target;
    if (!isChildFrom(target, parentBox)) {
        return true;
    }
    entryBox.textContent += String.fromCharCode(evt.charCode);
    valueBox.textContent = inputBox.value + String.fromCharCode(evt.charCode);
    return false;
}

function steal() {
    var sr = parentBox.createShadowRoot();
    sr.appendChild(inputBox);
}

function activateTheft(evt) {
    var box = evt.target;
    var newSetting = box.checked;
    if (newSetting) {
        steal();
    }
}

function textChanged(evt) {
    if (isChildFrom(evt.target, parentBox)) {
        valueBox.textContent = "Change event:" + inputBox.value;
    }
}

window.addEventListener("keypress", keypress, true);
window.addEventListener("change", textChanged, true);
activateBox.addEventListener("change", activateTheft, true);
