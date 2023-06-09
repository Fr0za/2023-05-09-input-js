// PIRMA DALIS:
// Sukurti kontaktų formą.
// 1. Kontaktų formoje turi būti šie laukeliai:
//     1. Tekstinis laukelis vardui (privalomas).
//     2. Tekstinis laukelis pavardei (privalomas).
//     3. Skaičiaus laukelis amžiui (privalomas).
//     4. Laukelis įvesti telefono numerį (neprivalomas).
//     5. Laukelis įvesti el. paštą (privalomas).
//     6. Range tipo laukelis, kuris skirtas įvertinti savo IT žinias nuo 1 iki 10. Galimas vertinimas tik sveikiems skaičiams.
//     7. Radio tipo laukeliai, kuriuose pasirenkamas grupės numeris. Turi būti galimybė pasirinkti grupes nuo FEU 1gr. iki FEU 7gr.
//     8. Šalia kiekvieno įvesties (input) elemento, pridėti label elementą, kuris žymi laukelio pavadinimą.

// ANTRA DALIS:
// 1. Sukurti div elementą, kuris turės id „students-list".
// 2. Kiekvieną kartą pridavus formą (submit), turi būti sukurtas naujas div elementas su klase „student-item" ir pridedamas į „students-list" elemento pradžią.
// 3. Duomenys apie studentą turi būti įdėti į „student-item" elementą.
// 4. Formoje pridėti „checkbox" tipo input'ą, kuriame pateikta galimybę rinktis iš dominančių programavimo kalbų.
// 5. Dominančias programavimo kalbas atvaizduoti „student-item" elemente.
// 6. Sukūrus studentą, turi iššokti <span> elementas, kuris informuoja apie studento sukūrimą: „Sukurtas studentas (Vardas Pavardė)". Šis span elementas dingsta po 5 sekundžių.
// 7. Range reikšmės atvaizdavimas naujame elemente.

// TREČIA DALIS:
// 1. Vietoje el. pašto rodyti tik žvaigždutes „****".
// 2. Kiekviename „student-item" elemente sukurti mygtuką „Rodyti asmens duomenis".
// 3. Paspaudus šį mygtuką:
//     3.1. Parodyti to studento el. paštą.
//     3.2. Pakeist mygtuko tekstą į „Slėpti asmens duomenis".
// 4. Jeigu asmens duomenys yra rodomi, tai paspaudus mygtuką:
//     4.1. Paslėpti asmens el. paštą.
//     4.2. Mygtuko tekstą pakeisti į „Rodyti asmens duomenis".

// KETVIRTA DALIS (studento ištrynimas):
// 1. Prie kiekvieno sukurti studento elemento pridėti mygtuką „Ištrinti studentą".
// 2. Paspaudus šį mygtuką, studento elementas yra ištrinamas.
// 3. Ištrynus studentą, turi iššokti <span> elementas, kuris informuoja apie studento ištrynimą: „Studentas (Vardas Pavardė) sėkmingai ištrintas.". Šis span elementas dingsta po 5 sekundžių.


const studentForm = document.getElementById('student-form');

function itKnowledgeChangeHandler() {
  const studentItKnowledgeInput = document.querySelector('#student-it-knowledge');
  const studentItKnowledgeOutput = document.querySelector('#student-it-knowledge-output');

  studentItKnowledgeOutput.textContent = studentItKnowledgeInput.value;

  studentItKnowledgeInput.addEventListener('input', (event) => {
    studentItKnowledgeOutput.textContent = event.target.value;
  })
}

itKnowledgeChangeHandler();

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;

  const name = form.name.value;
  const lastname = form.lastname.value;
  const age = form.age.value;
  const phone = form.phone.value;
  const email = form.email.value;
  const itKnowledge = form['it-knowledge'].value;
  const group = form.group.value;
  const interests = form.querySelectorAll('[name="interests"]:checked');

  const studentsList = document.querySelector('#students-list');

  const studentItem = document.createElement('div');
  studentItem.classList.add('student-item');

  studentsList.prepend(studentItem);

  const nameEl = document.createElement('p');
  nameEl.innerHTML = `<strong>Name:</strong> ${name}`;

  const lastNameEl = document.createElement('p');
  lastNameEl.innerHTML = `<strong>Lastname:</strong> ${lastname}`;

  const ageEl = document.createElement('p');
  ageEl.innerHTML = `<strong>Age:</strong> ${age}`;

  const phoneEl = document.createElement('p');
  phoneEl.innerHTML = `<strong>Phone:</strong> ${phone}`;

  const emailEl = document.createElement('p');
  emailEl.innerHTML = `<strong>Email:</strong> ${email}`;

  const itKnowledgeEl = document.createElement('p');
  itKnowledgeEl.innerHTML = `<strong>IT knowledge:</strong> ${itKnowledge}`;

  const groupEl = document.createElement('p');
  groupEl.innerHTML = `<strong>Group:</strong> ${group}`;

  const interestsWrapper = document.createElement('div');
  const interestsTitle = document.createElement('h3');
  interestsTitle.textContent = `Student Interests:`;
  const interestsList = document.createElement('ul');

  interests.forEach(interest => {
    const interestsEl = document.createElement('li');
    interestsEl.innerHTML = interest.value;
    interestsList.append(interestsEl);
  });

  const privateInfoButton = document.createElement('button');
  privateInfoButton.textContent = `Show private info!`;

  let privateInfoHidden = true;

  privateInfoButton.addEventListener('click', () => {
    let symbol = '*';

    privateInfoHidden = !privateInfoHidden;

    if (privateInfoHidden) {
      emailEl.innerHTML = `<strong>Email:</strong> ${symbol.repeat(email.length)}`;
      phoneEl.innerHTML = `<strong>Phone:</strong> ${symbol.repeat(phone.length)}`;
      privateInfoButton.textContent = 'Show Private info';
    } else {
      emailEl.innerHTML = `<strong>Email:</strong> ${email}`;
      phoneEl.innerHTML = `<strong>Phone:</strong> ${phone}`;
      privateInfoButton.textContent = 'Hide Private info';
    }

  })

  let deleteButton = document.createElement('button');
  deleteButton.textContent = `Delete student!`;

  deleteButton.addEventListener('click', () => {
    studentItem.remove();
    alert(`Student deleted! (${name} ${lastname})`, 'red');
  })

  interestsWrapper.append(interestsTitle, interestsList);
  studentItem.append(nameEl, lastNameEl, ageEl, phoneEl, emailEl, itKnowledgeEl, groupEl, interestsWrapper, privateInfoButton, deleteButton);

  form.reset();
  itKnowledgeChangeHandler();

  let studentCreatedMSG = `Student Created (${name} ${lastname})`;
  alert(studentCreatedMSG, 'green');
})



function alert(text, color) {
  const alertMessage = document.getElementById('alert-message');
  alertMessage.style.color = color;
  alertMessage.innerHTML = `${text}`;

  setTimeout(() => {
    alertMessage.innerHTML = '';
  }, 5000);
}



// PENKTA UŽDUOTIS (formos validacija naudojant JavaScript):
// 1. Priduodant formą (submit) patikrinti ar privalomi laukeliai nėra tušti.
// 2. Jeigu bent vienas privalomas formos laukelis yra tuščias:
//     2.1. Formos alert žinutėje reikia parašyti, jog ne visi laukeliai yra užpildyti. Šis tekstas turi būti raudonos spalvos.
//     2.2. Kiekvienas privalomas input laukelis, kuris nėra užpildytas:
//         2.2.1. Turi būti apvestas raudonu rėmeliu.
//         2.2.2. Šalia laukelio turi būti parašytas raudonas tekstas: „Šis laukelis yra privalomas".




// PAPILDOMA UŽDUOTIS (formos validacija naudojant JavaScript):
// Papildyti formos validaciją. Jeigu:
// 1. Vardas yra trumpesnis nei 3 simboliai, parašyti: „Vardas privalo būti bent 3 simbolių ilgumo".
// 2. Pavardė yra trumpesnė nei 3 simboliai, parašyti: „Pavardė privalo būti bent 3 simbolių ilgumo".
// 3. Amžius yra neigamas, parašyti: „Amžius privalo būti teigiamas skaičius".
// 4. Amžius yra daugiau nei 120 metų, parašyti: „Įvestas amžius yra per didelis".
// 5. Telefono numeris yra mažiau nei 9 arba daugiau nei 12 simbolių, parašyti: „Įvestas telefono numeris yra neteisingas".
// 6. Elektroninis paštas yra trumpesnis nei 8 simboliai ir jame nėra panaudotas @ ir . simboliai, parašyti: „Įvestas elektroninis paštas yra neteisingas".

// ŠEŠTA UŽDUOTIS:
// 1. Sukurti pradinius duomenų masyvą, kuriame būtų bent 5 studentų duomenys (objektų formatu).
// 2. Sukurti funkciją, kuri priima šiuos duomenis ir užkrovus puslapį į ekraną iškart išveda duomenis iš šio masyvo.

// SEPTINTA UŽDUOTIS:
// 1. Prie kiekvieno studento pridėti mygtuką, kurį paspaudus leistų redaguoti studento duomenis.
// 2. Redaguojant studentą, submit mygtuko tekstas turėtų pasikeisti į „Save Changes".
// 3. Pakeitus studento duomenis, turi iššokti <span> elementas, kuris informuoja apie studento duomenų redagavimą: „Studento (Vardas Pavardė) duomenys sėkmingai pakeisti". Šis span elementas dingsta po 5 sekundžių.

// 1. Sukurti Edit mygtuką.
// 2. Prie mygtuko pridėti event listener'į.
// 3. Surinkti studento duomenis ir jais užpildyti formos laukelius.
// 4. Pakeisti formos submit mygtuko tekstą.
// 5. Išsaugoti studento HTML elementą kintamąjame.
// 6. Submit event'o metu patikrinti ar kuriame naują studentą, ar redaguojame jau sukurtą.
// 7. Jeigu studentas redaguojamas, šį naują (redaguotą) HTML elementą panaudoti perrašant seną studento HTML elementą (kuris išsaugotas 5 žingsnyje).
// 8. Pakeisti formos submit mygtuko tekstą į pradinį ir pakeisti iššokančio pranešimo tekstą.

// AŠTUNTA UŽDUOTIS (local storage):
// 1. Vedamą tekstą į input elementus išsaugoti į localStorage.
// 2. Perkrovus puslapį localStorage esančiomis reikšmėmis užpildyti input elementus.
// 3. Jeigu sukuriamas studentas, tai localStorage esančias reikšmes reikia išvalyti.