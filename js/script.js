class LocalStorageTags {

    saveTags = (value, data) => {
        localStorage.setItem(value, JSON.stringify(data));
    };

    loadTags = (value = null) => {
        const listTagsStorage =  localStorage.getItem(value);
        return JSON.parse(listTagsStorage);
    };
}

class ManagerListTags extends LocalStorageTags {

    inputForTag = document.querySelector('.inputTag');
    btnAddTag = document.querySelector('.btnAddTag');
    wrapTags = document.querySelector('.listTags');
    imgDeleteTags = null;


    constructor() {
        super();
    }
     
    _listTags = this.loadTags('tagsStorage') ? this.loadTags('tagsStorage') : [];

    addTags = this.btnAddTag.addEventListener('click', () => {
        if(this.inputForTag.value) {
            this._listTags.push({
                id: new Date(),
                content: this.inputForTag.value,
            });
            this.saveTags('tagsStorage', this._listTags);
            this.inputForTag.value = '';
            this.loadTagsList('tagsStorage');
        };
    })

    deleteTags = (index) => {
        const updateListTags = this._listTags.filter((el, i) => {
            if(index !== i) {
                return el;
            }
        })
        this._listTags = updateListTags;
        this.saveTags('tagsStorage', this._listTags);
        this.loadTagsList('tagsStorage');
    }
    
    loadTagsList = (value, wrapperTags = this.wrapTags) => {
        if(value) {
            wrapperTags.innerHTML = ``;
            this.loadTags(value).map(el => {
                wrapperTags.innerHTML += 
                `<li class="itemTag"><p>${el.content}</p><img class="deleteTag" src="../assets/img/close.svg"  alt="delete tag" /></li>`;
            })
            this.imgDeleteTags = document.querySelectorAll('.deleteTag');
            this.imgDeleteTags.forEach((el, i) => {
                el.addEventListener('click', () => {
                    this.deleteTags(i);
                })
            })
        }
    }
}


const childrenMananger = new ManagerListTags();
if(childrenMananger.loadTags('tagsStorage')) {
    childrenMananger.loadTagsList('tagsStorage');
}







