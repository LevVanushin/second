let signUpPage = document.getElementById('signUpPage');
let signInPage = document.getElementById('signInPage');

let buttonUp = document.getElementById('btn-up');
let buttonIn = document.getElementById('btn-in');
let form = document.getElementById('sign-up-form');
const links = document.getElementsByTagName('a');

let signEvent = new CustomEvent('sign');
let checkEvent = new CustomEvent('check');

function go(){
  if (signInPage.style.display == 'none') {
      console.log(2)
      signUpPage.style.display = 'none';
      signInPage.style.display = 'flex'
    } else {
      signInPage.style.display = 'none';
      signUpPage.style.display = 'flex';
    }
}

buttonUp.addEventListener('send', (e) => {
  localStorage.setItem(`data`, JSON.stringify(e.detail.dataUser))
})

buttonUp.addEventListener('check', (e) => {
  e.preventDefault();
  let ready = false;
  let arr_div = form.getElementsByClassName('block');

  let res = 0;
  let data = [];
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
          res+=1;
          data.push(inp.value)
        }

      }
      res == 3 ? ready = true : 0
    }
    if (ready) {
      let sendEvent = new CustomEvent('send', {
        detail: {dataUser: data}
      });
      go();
      buttonUp.dispatchEvent(sendEvent);
    }
  }
)



buttonUp.addEventListener('click', (e) => {
  buttonUp.dispatchEvent(checkEvent)
})

buttonIn.addEventListener('check', (e) => {
  let formIn = document.getElementById('sign-in-form')
  e.preventDefault();
  let ready = false;
  let arr_div = formIn.getElementsByClassName('block');

  let res = 0;
  let dataUserCheck = [];
    for (div of arr_div){
      let arr_inp = div.getElementsByTagName('input');

      for (inp of arr_inp){
        let errorText = div.getElementsByClassName("error-text")[0];
        console.log(inp)
        if (inp.value == 0 || (inp.checked == false && inp == formIn.checkIn)){
          inp.style.borderColor = "red";
          errorText.style.display = 'block';
          console.log(inp, "No")

        }
        else {
          inp.style.borderColor = "gray";
          errorText.style.display = "none";
          res+=1;
          dataUserCheck.push(inp.value)
        }

      }
      console.log(res)
      res == 3 ? ready = true : 0
    }
    if (ready) {
      let checkDataEvent = new CustomEvent('dataCheck', {
        detail: {dataUser: dataUserCheck}
      });

      buttonIn.dispatchEvent(checkDataEvent);
    }
  
})

buttonIn.addEventListener('dataCheck', (e) => {
  console.log(6);
  let dataUserIn = e.detail.dataUser;
  dataUserIn.pop()
  let dataUserStorage = JSON.parse(localStorage.getItem("data"));
  let res = 0

  try {
    for (elem of dataUserStorage) {
      for (data of dataUserIn) {
        console.log(elem, data)
        if (elem == data && res != 2){
          res+=1
          break  
        }
      }
    }
    if (res == 2) {
        document.getElementById('errorIn').style.display = 'none';
        signUpPage.style.display = 'none';
        signInPage.style.display = 'none';
        document.getElementById('welcome').style.display = "block";
    } else {
      console.log(19)
      document.getElementById('errorIn').style.display = 'block';
    }}
    catch{
      document.getElementById('errorIn').style.display = 'block';

    }
})

buttonIn.addEventListener('click', (e) => {
  buttonIn.dispatchEvent(checkEvent)
})


signInPage.style.display = 'none';
for (link of links){
  console.log(link)
  link.addEventListener('click', (e) => {
    
    e.preventDefault();
    console.log(link.getAttribute('id'))
    go()
  })
}


