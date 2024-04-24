function destructurer(data: any) {
   if (!data) {
      return null;
   };

   try {

      // console.log('data:', data);

      // console.log("Data datum:", dataTodayDate, "Huidige datum:", currentDate.toISOString().split('T')[0]);
      let result = [];

      for (let i=0; i < data.length; i++) {
         result[i] = data[i].totalAmount 
      }
      // console.log(result);

      return result

   } catch (err) { 
      // console.log(err); 
      return null; 
   };
}

export default destructurer;