function destructurer(data: any) {
   if (!data) {
      return null;
   };

   try {
      const currentDate = new Date();
      currentDate.setUTCHours(-1, 0, 0, 0); // Set current date to midnight (UTC+0)

      const dataToday = data[data.length - 1];
      let todayTotalAmount;

      // Verwijder tijdzone-informatie uit dataToday.date
      const dataTodayDate = dataToday.date.split('T')[0];

      // console.log("Data datum:", dataTodayDate, "Huidige datum:", currentDate.toISOString().split('T')[0]);

      if (dataTodayDate === currentDate.toISOString().split('T')[0]) {
         todayTotalAmount = dataToday.totalAmount;
      } else {
         todayTotalAmount = 0;
      }
      return todayTotalAmount	
   } catch (err) { 
      // console.log(err); 
      return null; 
   };
}

export default destructurer;