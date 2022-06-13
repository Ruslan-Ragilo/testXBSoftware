//variables
const inputForTag = document.querySelector('.inputTag'),
    readOnlyCheckbox = document.querySelector('.readOnlyCheckbox'),
    btnAddTag = document.querySelector('.btnAddTag'),
    listTags = document.querySelector('.listTags');

const  tags = {
    _tagsList: [],
    
    getTags() {
        return this._tagsList;
    },
    setTags(value) {
        this._tagsList = value;
    },
    addTag(value) {
        this._tagsList.push(value);
    },
    removeTag(id) {
        const updateTags = this._tagsList.filter((el,i) => {
            if(el.id !== id) {
                return el;
            } 
        }) 
        this._tagsList = updateTags;
        localStorage.setItem('tags', JSON.stringify(this._tagsList));
    },



    //тут под вопросом, не совсем понял, что должен lелать этот метод, сделаю как я понял...
    readOnly(checked) {
        if (checked) {
            inputForTag.setAttribute('disabled', 'disabled');
            btnAddTag.setAttribute('disabled', 'disabled');
            deleteTag.forEach(el => {
                el.classList.add('readMode');
            })
        } else {
            inputForTag.removeAttribute('disabled');
            btnAddTag.removeAttribute('disabled');
            deleteTag.forEach(el => {
                el.classList.remove('readMode');
            })
        }
    }
}

if(localStorage.getItem('tags')) {
    const getTagsLocal = JSON.parse(localStorage.getItem('tags'))
    tags.setTags(getTagsLocal);
    showListTags();
}

// function

function showListTags () {
    listTags.innerHTML = ``;
    tags.getTags().map(el => {
            listTags.innerHTML += 
            `<li class="itemTag"><p>${el.content}</p><img class="deleteTag" src="../assets/img/close.svg"  alt="delete tag" /></li>`;
        })
}

readOnlyCheckbox.addEventListener('change', (e) => {
    tags.readOnly(e.target.checked);
})
let deleteTag = document.querySelectorAll('.deleteTag');

btnAddTag.addEventListener('click', () => {
    if (inputForTag.value != ``) {
        listTags.innerHTML = ``;
        const newTag = {content: inputForTag.value, id: new Date()};
        tags.addTag(newTag);
        showListTags();
        inputForTag.value = ``;
        localStorage.setItem('tags', JSON.stringify(tags.getTags()));
    }
    deleteTag = document.querySelectorAll('.deleteTag');
});

listTags.addEventListener('click', (e) => {
    deleteTag = document.querySelectorAll('.deleteTag');
    deleteTag.forEach((el, i) => {
        if(e.target == el) {
            console.log(el)
            tags.removeTag(tags.getTags()[i].id);
            showListTags();
        }
    })
})








