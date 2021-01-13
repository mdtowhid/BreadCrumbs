
const mainUl = document.getElementById('mainUl');
const mainUlLi = mainUl.childNodes;
const breadcumbs = document.getElementById('breadcumbs');

const mainUla = document.querySelectorAll('#mainUl a');
let arr = [];


arr.push(mainUla.forEach(
    (value, index) => {
        let attrClass = value.getAttribute('class');
        let text = value.innerText;
        if (text.length > 0 && attrClass !== undefined){
            value.setAttribute('id', attrClass + "_" + text);
            arr.push({ index, attrClass, text, id: value.getAttribute('id')});
        }
    }
));

// mainUlLi.forEach(li=>{
//     console.log(li.hasChildNodes('ul'))
// });


let storage = [];


mainUla.forEach((a, i) => {
    
    a.addEventListener('click', (e)=>{
        // e.preventDefault()
        let linkText = a.innerText; 
        let path = a.getAttribute('href');
        
        let storageObjs = getStorage();
        if (storageObjs != null){
            storageObjs.forEach((value, index)=>{
                let f = storageObjs.map(x => x.path === path).indexOf(path === path);
                if(f === -1 && path !== null){
                    let obj = {
                        path,linkText
                    }
                    storageObjs.push(obj);
                    localStorage.setItem('breadcumbs', JSON.stringify(storageObjs));
                }
                if (value.path !== path && path != null)
                {
                    breadcumbsBulider();
                    // window.location.href = path.replace('./', '/');
                    // console.log(window.location.hostname + path.replace('./', '/'));
                    return;
                }
            });
        }else{
            let obj = {
                path, linkText
            }
            storage.push(obj);
            localStorage.setItem('breadcumbs', JSON.stringify(storage))
        }
    });
});



function getStorage (){
    return JSON.parse(window.localStorage.getItem('breadcumbs'));
}

function breadcumbsBulider(){
    let breadcumbsArray = getStorage();
    if(breadcumbsArray.length > 0){
        let tempVar = ``;
        breadcumbsArray.forEach(breadcumb => {
            tempVar += `<a href='${breadcumb.path}' class="breadcumb">${breadcumb.linkText}</a>`;
            let pathname = window.location.pathname;
            let hrefPath = breadcumb.path.replace('./', '/');
            if (pathname === hrefPath)
                activatingMenu(hrefPath, breadcumb);
        });
        breadcumbs.innerHTML = tempVar;
    }
}

breadcumbsBulider();


function activatingMenu(path, breadcumbObj){
    path = path.replace('/', './');
    console.log(path);
    mainUla.forEach((a, i) => {
        let href = a.getAttribute('href');
        let id = breadcumbObj.linkText.replace(" ", "");
        if(href === path){
            let p = a.parentElement.setAttribute('id', id);
            document.getElementById(id).style.backgroundColor = 'red'
            a.classList.add('activated');
            console.log(p);
        }
    })
}





// mainUla.forEach((a, i)=>{
//     a.addEventListener('click', ()=>{
//         let tagName = a.parentElement.nodeName;
//         let rootTagClass = a.parentElement.getAttribute('id');
//         a.parentElement.classList.toggle('active-imp')
//         // console.log(tagName, rootTagClass);
//         // console.log(arr[i]);
//         // console.log(rootTagClass)
//         // if (tagName.toLowerCase() === 'ul' && rootTagClass !== 'mainUl')
//         //     a.parentElement.parentElement.classList.toggle('active-imp')
//     })
//     // console.log(i);
    
// });


// mainUlLi.forEach((value, index)=>{
//     value.addEventListener('click', ()=>{
//         let attrClass = value.getAttribute('class');
//         let text = value.innerText;
//         console.log(arr[index]);
//         // let childs = value.childNodes;
//         // childs.forEach(v=>{
//         //     let tagName = v.nodeName;
//         //     if(tagName.toLowerCase() === 'ul'){
//         //         v.classList.toggle('active-imp');
//         //     }
//         // })
//     })
// });

// console.log(arr)


//(value, index) => value !== value.getAttribute('class'))
// mainUla.forEach((value, index)=>{
//     arr.push(x => x !== value.getAttribute('class'));
// });

// setTimeout(() => {
//     arr.forEach((v, i) => console.log(v));
// }, 1000);


// let x = arr.find(x => x === attrClass);
// console.log(typeof x);
// if (x === 'undefined' || x === null) {
//     console.log('xxx');
//     arr.push(attrClass);
// }
        // let isExist = arr.filter(x=>x === attrClass);
        // console.log(isExist);