


async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY 2023`


  //${currentYear}
//1. Fetching Data
//  -header information changes when fetching to received
//  -header while fetching removes section

//variables

let studentInfo;
let mentorInfo;
let url = 'http://localhost:3003/api'

//HTML Selectors

const cardClass = document.querySelector('.cards')



//Axios Data Retrevial

await axios.get(`${url}/learners`)
  .then (res => {
    studentInfo = res.data
  })
  .catch (error => {
    console.log('you fucked up!')
  })  

await axios.get (`${url}/mentors`)
  .then (res => {
    mentorInfo = res.data 
  })
  .catch (error => {
    console.log('you fucked up!')
  })  
  .finally(() => {
    document.querySelector('.info').textContent = 'No learner is selected'
  })

//2. Organizing Data Structures
//A. brute force

// loop over student to get access over each mentor Array;
// nested loop that gets access to each id number in individual mentor Array;
// within that nested loop, I need to match the each id number with specific id number in mentorInfo Array.




// studentInfo.forEach(student => {
//     student.mentors.forEach((mentorId, idx) => {
//       const found = mentorInfo.find(m => m.id === mentorId)
//       student.mentors[idx] = found.firstName + ' ' + found.lastName
//     })

//   })
// console.log(studentInfo)



//B. create new data structure 1

// let mentObj = {};

// mentorInfo.forEach(mentor => {
//   mentObj[mentor.id] = mentor.firstName + ' ' + mentor.lastName
// })

// studentInfo.forEach(student => {
//   student.mentors.forEach((mentorId, idx) => {
//     if (mentObj[mentorId]) {
//       student.mentors[idx] = mentObj[mentorId] 
//     }
//   })
// })


//C. create new array using .map instead of mutating original array

// const newArray = studentInfo.map(student => {
//   return {
//     ...student, 
//     mentors: student.mentors.map(mentorId => {
//       const found = mentorInfo.find(m => m.id === mentorId)
//       return found.firstName + ' ' + found.lastName
//     })
//   }
// })

// console.log(newArray)

//D. [my way] extra brute force using for loops

for (let i = 0; i < studentInfo.length; i ++){
  let mentorIDs = studentInfo[i].mentors;

  for(let k = 0; k < mentorIDs.length; k ++){
    let mentorId = mentorIDs[k];
    
    for (let m = 0; m < mentorInfo.length; m ++){
      let mentor = mentorInfo[m].id ;
      
      if (mentor === mentorId){
        mentorIDs[k] = mentorInfo[m].firstName + ' ' + mentorInfo[m].lastName 
      } 
    } 
  }  
}


//3. Component Function
//  -takes single learner as argument and returns "learnerCard"
//  -card takes event listener that should bubble up and trigger two changes: the mentor accordion and card selection
//  -when selected the name adds the student ID


function learnerCard (learner) {
  
  //instantiating elements

  const card = document.createElement('div');
  const nameHeader = document.createElement('h3');
  const emailDiv = document.createElement('div');
  const mentorHeader = document.createElement ('h4')
  const unorderedList = document.createElement ('ul')

  

  // <div class ='card'></div>
  //   <h3>full name, ID ? when selected</h3>
  //   <div>email</div>
  //   <h4 class = 'closed'></h4>
  //   <ul></ul>
  //     <li></li> as many as needed
  //modifying element attributes

  card.classList.add('card')
  mentorHeader.classList.add('closed')



  //element structuring

  card.appendChild(nameHeader)
  card.appendChild(emailDiv)
  card.appendChild(mentorHeader)
  card.appendChild(unorderedList)


  //element content

  nameHeader.textContent = learner.fullName
  emailDiv.textContent = learner.email
  mentorHeader.textContent = 'Mentors'


  //mentor li elements 
  learner.mentors.forEach(mentor =>{
    const indMentor = document.createElement('li')
    unorderedList.appendChild(indMentor).textContent = mentor
  })

  //element event handlers
  

  // function toggle(el, classname) {

  //   allCards.forEach(c =>{
  //         c.classList.remove('selected')
  //      })

  //   if (el.classList.contains(classname)){
  //     el.classList.remove(classname)
  //   }
  //   else {
  //     el.classList.add(classname)
  //   }
  // }

   

  // card.addEventListener('click', evt => {
  //  if (evt.currentTarget.classList.contains('card')){
  //   evt.currentTarget.classList.toggle('selected')
  //  }
  // })


    
    
  

  return card
}


//4. Looping Over Data and Attaching Learner Cards To The DOM


studentInfo.forEach(student =>{
  const indStudentCard = learnerCard(student)
  cardClass.appendChild(indStudentCard)
  }
)


const allCards = document.querySelectorAll('.card');
const allMentorsButton = document.querySelectorAll('h4')
console.log(allMentorsButton)

function toggle(evt){
  allCards.forEach(card => {
    if (card !== evt) {card.classList.remove('selected')}
  })
  evt.classList.toggle('selected')
  
  if (evt.classList.contains('selected')){document.querySelector('.info').textContent = `The selected learner is ${evt.childNodes[0].textContent}`}
  else if (!evt.classList.contains('selected')){document.querySelector('.info').textContent = `No learner is selected`}
  return evt
}

allCards.forEach(card => {
  card.addEventListener('click', evt => {
  toggle(evt.currentTarget)
  })
})


function mentorToggle(evt){
  // allMentorsButton.forEach(b => {
  //   if (b !== evt) {b.setAttribute('class', 'closed')}
  // })

  console.log(evt)
  if (!(evt.parentElement.classList.contains('selected')) && (evt.classList.contains('closed'))) {
    evt.setAttribute('class', 'open')
    toggle(evt.parentElement)
  }
  if ((evt.parentElement.classList.contains('selected')) && (evt.classList.contains('closed'))){evt.setAttribute('class', 'open')}


  if (evt.classList.contains('open')) {
    evt.setAttribute('class', 'closed')
  }

  
  
  return evt

}




allMentorsButton.forEach(b => {
  b.addEventListener('click', evt => {
    evt.stopPropagation()
    mentorToggle(evt.target)
    
  })
})






  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
