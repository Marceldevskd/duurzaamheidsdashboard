function getDays() {
   const days = [];
   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   const today = new Date().getDay(); // Get the current day index (0-6)
   
   // Iterate over the days of the week starting from yesterday
   for (let i = 1; i <= 7; i++) {
       const index = (today - i + 7) % 7; // Calculate the index for the previous days
       days.unshift(daysOfWeek[index]); // Add the day to the beginning of the array
   }
   
   return days;
}

export default getDays;






// function getDays() {
//    const days = [];
//    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//    let dateObj = new Date();
//    dateObj.setDate(dateObj.getDate() - 1);
//    return days
//    console.log(dateObj);
// }

// export default getDays;