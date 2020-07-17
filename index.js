function outputToDocument(name, command, prefix, wait, type, spamText) {
  // Output bind to bindOutput
  const bindOutput = [];
  const lines = spamText.length;

  bindOutput.push(`// ${name}`);
  bindOutput.push('// Created with Source Bindmaker by kyleseven');
  if (type === 'normal') {
    bindOutput.push(`alias "${command}" "${prefix}1"`);
  } else {
    bindOutput.push(`alias "${command}" "start_${prefix}"`);
    bindOutput.push(`alias "start_${prefix}" "alias "${command}" "stop_${prefix}"; alias "redir_${prefix}" "${prefix}1"; ${prefix}1"`);
    bindOutput.push(`alias "stop_${prefix}" "alias redir_${prefix} ""; alias "${command}" "start_${prefix}""`);
  }

  for (let i = 0; i < lines - 1; i += 1) {
    bindOutput.push(`alias "${prefix}${i + 1}" "say ${spamText[i]}; wait ${wait}; ${prefix}${i + 2}"`);
  }

  if (type === 'normal') {
    bindOutput.push(`alias "${prefix}${lines}" "say ${spamText[lines - 1]}"`);
  } else {
    bindOutput.push(`alias "${prefix}${lines}" "say ${spamText[lines - 1]}; wait ${wait}; redir_${prefix}"`);
  }

  const newBox = document.createElement('div');
  newBox.id = 'bindBox';
  newBox.className = 'box-2';

  for (let i = 0; i < bindOutput.length; i += 1) {
    newBox.innerHTML += `${bindOutput[i]}<br>`;
  }

  // Remove the old bindBox if it exists, then add the new one
  if (document.getElementById('bindBox')) {
    const element = document.getElementById('bindBox');
    element.parentNode.removeChild(element);
  }
  const mainDiv = document.getElementById('inputBox');
  mainDiv.parentNode.insertBefore(newBox, mainDiv.nextSibling);
}

function validate(name, command, prefix, wait, spamText) {
  window.event.preventDefault();
  const errors = ['Error:'];

  if (!name) {
    errors.push('- Name cannot be empty.');
  }
  if (!command) {
    errors.push('- Command cannot be empty.');
  }
  if (command.indexOf(' ') >= 0) {
    errors.push('- Command cannot contain spaces.');
  }
  if (!prefix) {
    errors.push('- Prefix cannot be empty.');
  }
  if (prefix.indexOf(' ') >= 0) {
    errors.push('- Prefix cannot contain spaces.');
  }
  if (!wait) {
    errors.push('- Wait cannot be empty.');
  }
  if (Number.isNaN(wait)) {
    errors.push('- Wait must be a number.');
  }
  if (wait < 0) {
    errors.push('- Wait cannot be negative.');
  }
  if (spamText.length === 0) {
    errors.push('- Spam text cannot be empty.');
  }

  let alertMsg = '';
  for (let i = 0; i < errors.length; i += 1) {
    alertMsg += `${errors[i]}\n`;
  }

  if (errors.length > 1) {
    alert(alertMsg); // eslint-disable-line no-alert
  }

  return errors.length === 1;
}

function createBind() { // eslint-disable-line no-unused-vars
  // Bind properties
  const name = document.getElementById('bindName').value.trim();
  const command = document.getElementById('bindCommand').value.trim();
  const prefix = document.getElementById('bindPrefix').value.trim();
  const wait = document.getElementById('bindWaitTime').value;
  const type = document.getElementById('type').value;
  const spamText = document.getElementById('bindSpamText').value.split('\n').filter((e) => e !== '');

  window.event.preventDefault();
  if (validate(name, command, prefix, wait, spamText)) {
    outputToDocument(name, command, prefix, wait, type, spamText);
  }
}
