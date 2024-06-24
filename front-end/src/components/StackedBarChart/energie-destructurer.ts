function energieDestructurer(data: any) {
   if (!data) {
      return null;
   };

   try {

      // console.log('data:', data);

      // console.log("Data datum:", dataTodayDate, "Huidige datum:", currentDate.toISOString().split('T')[0]);
      interface resultProps { 
         days: Array<string>
         noodzakelijkeReadings: Array<string>
         verspildeReadings: Array<string>
      }
      let result: resultProps= {
         days: [],
         noodzakelijkeReadings: [],
         verspildeReadings: []
      };

      for (let i=0; i < data.length; i++) {
         result.days[i] = data[i].day 
      }

      for (let i=0; i < data.length; i++) {
         result.noodzakelijkeReadings[i] = data[i].noodzakelijkeReading
      }

      for (let i=0; i < data.length; i++) {
         result.verspildeReadings[i] = data[i].verspildeReading 
      }

      
      // console.log(result);

      return result

   } catch (err) { 
      // console.log(err); 
      return null; 
   };
}

export default energieDestructurer;