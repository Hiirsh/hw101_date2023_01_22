//id;firstName;lastName;age
const persons = [];

const state = {
    areStatsShowed: false,
    arePersonsShowed: false
}

addPerson.onclick = function (e) {
    e.preventDefault()
    const person = new Person(personId.value.trim(), firstName.value.trim(), lastName.value.trim(), age.value);
    if (findPerson(persons, person.id) === -1) {
        persons.push(person);
    } else {
        alert(`Person with id: ${person.id} exists`);
    }
    personId.value = firstName.value = lastName.value = age.value = '';
    if (state.arePersonsShowed) {
        printPersons(persons);
    }
    if (state.areStatsShowed) {
        printStats(persons);
    }
}
showPersons.onclick = handlePersons

function handlePersons(e) {
    if (e) {
        e.preventDefault()
    }
    if (!state.arePersonsShowed) {
        printPersons(persons);
        state.arePersonsShowed = true
    }
    else {
        while (personsList.firstElementChild) {
            personsList.removeChild(personsList.firstElementChild);
        }
        state.arePersonsShowed = false
    }
}

calcStats.onclick = handleStats

function handleStats(e) {
    if (e) {
        e.preventDefault()
    }
    if (!state.areStatsShowed) {
        printStats(persons)
        state.areStatsShowed = true
    } else {
        while (stats.firstElementChild) {
            stats.removeChild(stats.firstElementChild);
        }
        state.areStatsShowed = false
    }
}
function findPerson(persons, id) {
    return persons.findIndex(p => p.id === id);
}

function printPersons(persons) {
    while (personsList.firstElementChild) {
        personsList.removeChild(personsList.firstElementChild);
    }
    persons.forEach(p => {
        const li = createInfoElement(p.toString(), 'li');
        personsList.appendChild(li);
        const deleteButton = document.createElement('button')
        deleteButton.append(document.createTextNode('delete'))
        li.appendChild(deleteButton)
        deleteButton.onpointerdown = function () {
            const note = deleteButton.parentElement
            note.parentElement.removeChild(note)
            persons.splice(persons.indexOf(p), 1)
            if (state.areStatsShowed) {
                printStats(persons)
            }
        }
    })
}

function deletePerson(e) {
    e.preventDefault()
}

function printStats(persons) {
    if (persons.length) {
        const start = persons[0].age
        const minAge = persons.reduce((res, p) => p.age < res ? p.age : res, start);
        const maxAge = persons.reduce((res, p) => p.age > res ? p.age : res, start);
        const avgAge = persons.reduce((res, p) => p.age + res, 0) / persons.length;
        const divStats = document.createElement('div')
        const h3avg = createInfoElement(`Average age: ${avgAge.toFixed(1)}`, 'h3');
        const h3min = createInfoElement(`Min age: ${minAge}`, 'h3');
        const h3max = createInfoElement(`Max age: ${maxAge}`, 'h3');
        divStats.append(h3avg, h3min, h3max);
        if (stats.firstElementChild) {
            stats.replaceChild(divStats, stats.firstElementChild);
        } else {
            stats.appendChild(divStats);
        }
    } else {
        stats.appendChild(createInfoElement('No stats', 'h3'));
    }
}

class Person {
    constructor(id, firstName, lastName, birthDate) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = new Date(birthDate);
        this.age = Math.floor((Date.now() - this.birthDate.getTime()) / 1000 / 60 / 60 / 24 / 365)
        this.fullName = function () {
            return `${this.firstName} ${this.lastName}`;
        };
        this.toString = function () {
            return `ID: ${this.id}, Name: ${this.fullName()}, Age: ${this.age}`;
        };
    }
}

function createInfoElement(content, tag) {
    const element = document.createElement(tag);
    const text = document.createTextNode(content);
    element.appendChild(text);
    return element;
}