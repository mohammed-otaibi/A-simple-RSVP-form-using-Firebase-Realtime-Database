

// Initialize Firebase
// Replace the placeholders with your Firebase project configuration
const firebaseConfig = {
    ......
};

// Initialize Firebase App and Realtime Database
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Event listener for form submission
document.getElementById('rsvpForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const attendance = document.getElementById('attendance').value;
    const userMessage = document.getElementById('messageXXX').value.trim();
    const confirmationMessage = document.getElementById('confirmationMessage');
    const body = document.body;

    if (!userMessage) {
        alert("Message cannot be empty.");
        return;
    }

    if (attendance === 'yes') {
        confirmationMessage.textContent = "🎉 Yay! You're attending the GIF Gala! We can't wait to see your meme costume!";
        body.style.backgroundImage = 'url("https://media.giphy.com/media/l2JHPB58MjfV8W3K0/giphy.gif")';

        // Save message to Firebase
        database.ref('messages').push({
            message: userMessage
        }).then(() => {
            console.log("Message saved successfully.");
        }).catch((error) => {
            console.error("Error saving message:", error);
        });
    } else {
        confirmationMessage.textContent = "😔 We will miss you at the GIF Gala!";
        body.style.backgroundImage = 'url("https://media.giphy.com/media/JER2en0ZRiGUE/giphy.gif")';
    }

    confirmationMessage.style.display = 'block';
    document.getElementById('rsvpForm').reset();
});
