function sayHello() {
    alert("你好呀 hello👋");
}

// 留言板功能
document.addEventListener('DOMContentLoaded', () => {
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookName = document.getElementById('guestbook-name');
    const guestbookMessage = document.getElementById('guestbook-message');
    const messagesDisplay = document.getElementById('messages-display');

    let messages = JSON.parse(localStorage.getItem('guestbookMessages')) || [];

    function displayMessages() {
        messagesDisplay.innerHTML = ''; // 清空现有留言 Clear existing messages
        messages.forEach((msg, index) => {
            const messageItem = document.createElement('div');
            messageItem.classList.add('guestbook-message-item');
            messageItem.innerHTML = `
                <strong>${msg.name}:</strong> ${msg.message}
                <span class="timestamp">${new Date(msg.timestamp).toLocaleString()}</span>
            `;
            messagesDisplay.appendChild(messageItem);
        });
    }

    guestbookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = guestbookName.value.trim();
        const message = guestbookMessage.value.trim();

        if (name && message) {
            const newMessage = {
                name: name,
                message: message,
                timestamp: new Date().toISOString()
            };
            messages.push(newMessage);
            localStorage.setItem('guestbookMessages', JSON.stringify(messages));

            guestbookName.value = '';
            guestbookMessage.value = '';
            displayMessages();
        } else {
            alert('请填写你的名字和留言！Please fill in your name and message!');
        }
    });

    // 首次加载时显示留言 Display messages on initial load
    displayMessages();
});
