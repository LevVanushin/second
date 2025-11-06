let button = document.getElementById('btn');
let form = document.getElementById('sign-in-form');


let signEvent = new CustomEvent('sign');


document.addEventListener("sign", (e) => {
  let obj = {
    
  }

  let inputs = form.getElementsByTagName('input');
  for (input of inputs){
    console.log(input)
  }
})


button.addEventListener('click', (e) => {
  e.preventDefault()
  let arr_div = form.getElementsByClassName('block');

  for (div of arr_div){

    let arr_inp = div.getElementsByTagName('input');

    for (inp of arr_inp){
      let errorText = div.getElementsByClassName("error-text")[0];
      if (inp.value == 0 || (inp.checked == false && inp == form.check)){
        inp.style.borderColor = "red";
        errorText.style.display = 'block';

      } else {
        inp.style.borderColor = "gray";
        errorText.style.display = "none";

        localStorage.setItem(inp.name, inp.value);

      }

    }
  }
})




