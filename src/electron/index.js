document.addEventListener('DOMContentLoaded', function (){
    window.bridge.updateMessage(updateMessage);
});

const updateMessage = (event, message) => {
    console.log('Message view');
    let element = document.getElementById('message');
    element.innerHTML = message;
}