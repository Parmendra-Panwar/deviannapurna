// Function to show pop-up messages
function showPopup(id) {
  const popup = document.getElementById(id);
  popup.classList.add('show');

  // Hide popup after 5 seconds
  setTimeout(() => {
    popup.classList.remove('show');
  }, 5000);
}

// Trigger the popups for demo purposes
window.onload = function () {
  // Show success popup after 1 second
  setTimeout(() => showPopup('successPopup'), 1000);

  // Show error popup after 3 seconds
  setTimeout(() => showPopup('errorPopup'), 3000);
};
