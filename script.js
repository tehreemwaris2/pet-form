document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission from reloading the page
  
    var pet = document.getElementById('petInput').value; // Get the entered pet name
  
    // Make the API call
    fetch('https://api.publicapis.org/entries?Title=' + encodeURIComponent(pet))
      .then(response => response.json()) // Parse the JSON response
      .then(data => {
        displayResults(data); // Call function to display results
      })
      .catch(error => {
        console.error('Error fetching data:', error); // Log any errors
      });
  });
  
  // Function to display search results
  function displayResults(data) {
    var resultsDiv = document.getElementById('response');
    resultsDiv.innerHTML = ''; // Clear previous results
    
    if (data.count > 0) {
      var ul = document.createElement('ul'); // Create a new unordered list
  
      data.entries.forEach(function(entry) {
        // Create a list item for each entry and display API name and description
        var li = document.createElement('li');
        li.textContent = entry.API + ': ' + entry.Description;
        ul.appendChild(li); // Append list item to the unordered list
      });
  
      resultsDiv.appendChild(ul); // Append the unordered list to the results container
    } else {
      // Display a message if there are no results
      resultsDiv.textContent = 'No results found.';
    }
  }