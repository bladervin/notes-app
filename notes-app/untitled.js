const now = new Date()  //new creates a new instance of date
const timeStamp = now.getTime() //get timestamp and save it

const myDate = new Date(timeStamp)
console.log(myDate.getFullYear())

const dateOne = new Date('March 1 2018 12:00:00')
const dateTwo = new Date('June 9 2020 15:07:00')

const myDate1 = dateOne.getTime()
const myDate2 = dateTwo.getTime()

if (myDate1 < myDate2) {
    console.log(dateOne.toString())
} else if (dateTwo < dateOne) {
    console.log(dateTwo.toString())
}
