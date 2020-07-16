function outputToDocument(name, command, prefix, wait, content) {
    // Output bind to bindOutput
    let bindOutput = [];
    let lines = content.length;

    bindOutput.push('// ' + name + '\n');
    bindOutput.push('// Created with Source Bindmaker by kyleseven');
    bindOutput.push('alias \"' + command + '\" \"' + prefix + '1' + '\"\n');

    for (i = 0; i < lines - 1; i++) {
        bindOutput.push('alias \"' + prefix + (i + 1).toString() + '\" \"say ' + content[i] + "; wait " + 
            wait + '; ' + prefix + (i + 2).toString() + '\"\n');
    }

    bindOutput.push('alias \"' + prefix + ((lines - 1) + 1).toString() + '\" \"say ' + content[lines - 1] + '\"\n');

    let newBox = document.createElement('div');
    newBox.id = 'bindBox';
    newBox.className = 'box-2';
    
    for (i = 0; i < bindOutput.length; i++) {
        newBox.innerHTML += (bindOutput[i] + "<br>");
    }

    // Remove the old bindBox if it exists, then add the new one
    if (document.getElementById('bindBox')) {
        let element = document.getElementById('bindBox');
        element.parentNode.removeChild(element);
    }
    let mainDiv = document.getElementById('inputBox');
    mainDiv.parentNode.insertBefore(newBox, mainDiv.nextSibling);
}

function validate(name, command, prefix, wait, content) {
    event.preventDefault();
    let errors = ["Error:"]

    if (!name) {
        errors.push("- Name cannot be empty.");
    }
    if (!command) {
        errors.push("- Command cannot be empty.");
    }
    if (command.indexOf(' ') >= 0) {
        errors.push("- Command cannot contain spaces.");
    }
    if (!prefix) {
        errors.push("- Prefix cannot be empty.");
    }
    if (prefix.indexOf(' ') >= 0) {
        errors.push("- Prefix cannot contain spaces.");
    }
    if (!wait) {
        errors.push("- Wait cannot be empty.");
    }
    if (isNaN(wait)) {
        errors.push("- Wait must be a number.");
    }
    if (content.length == 0) {
        errors.push("- Content cannot be empty.");
    }

    let alertMsg = "";
    for (i = 0; i < errors.length; i++) {
        alertMsg += errors[i] + "\n";
    }

    if (errors.length > 1) {
        alert(alertMsg);
    }

    return errors.length == 1;
}

function createBind() {
    // Bind properties
    let name = document.getElementById('bindName').value;
    let command = document.getElementById('bindCommand').value;
    let prefix = document.getElementById('bindPrefix').value;
    let wait = document.getElementById('bindWaitTime').value;
    let content = document.getElementById('bindContents').value.split('\n').filter(e => e !== "");

    event.preventDefault();
    if (validate(name, command, prefix, wait, content)) {
        outputToDocument(name, command, prefix, wait, content);
    }
}