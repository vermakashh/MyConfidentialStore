document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const topic = document.getElementById('topic').value;
    const comment = document.getElementById('comment').value;
  
    alert(`Thank you, ${firstName} ${lastName}! Your message on "${topic}" has been sent.`);
    this.reset();
  });
  