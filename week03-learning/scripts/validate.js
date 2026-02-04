// const form = document.getElementById('myForm');
// form.addEventListener('submit', function(event) {
//   const email = document.getElementById('email').value;
//   const age = document.getElementById('age').value;
//   if (!email || !age) {
//     event.preventDefault(); // Prevent form submission
//     alert('Please fill out all required fields.');
//   } else if (age < 18 || age > 100) {
//     event.preventDefault(); // Prevent form submission
//     alert('Age must be between 18 and 100.');
//   }
// });



const compute = document.querySelector(".compute")

compute.addEventListener("click", () => {
  // INPUT
  let p = parseFloat(document.getElementById("principle").value);
  let r = parseFloat(document.getElementById("annualrate").value);
  let n = parseInt(document.getElementById("periods").value);
  let y = parseInt(document.getElementById("years").value);
    
  let confrim_p = parseInt(document.querySelector("#confirm-principle").value)
  if (p !== confrim_p) {

    document.querySelector("#c-principle").style.visibility = "visible"
    document.querySelector("#c-principle").textContent = "Mismatch"

  }
  else { 
    // PROCESSING
    
  document.querySelector("#c-principle").textContent = ""

  let output = computeFutureValue(p, r, n, y);
  // OUTPUT with formatting
  document.getElementById("output").innerHTML = `$${output.toFixed(2)}`;
}
  })

// computer future value function
// p = principal, r = annual rate, y = number of years, n = periods of year.

function computeFutureValue(p, r, n, y) {
	let er = r / n; // effective rate per period
	let totalperiods = n * y;
	return p * Math.pow(1 + er, totalperiods);
}

// get and display the current year
document.getElementById("theyear").textContent = new Date().getFullYear();

