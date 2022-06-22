const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteTask)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addImportance)
})

async function deleteTask(){
    const doThis = this.parentNode.childNodes[1].innerText
    const deadline = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'doThis': doThis,
              'deadline': deadline
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addImportance(){
    const doThis = this.parentNode.childNodes[1].innerText
    const deadline = this.parentNode.childNodes[3].innerText
    const importance = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneIPoint', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'doThis': doThis,
              'deadline': deadline,
              'importance': importance
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}