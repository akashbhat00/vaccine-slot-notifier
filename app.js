var  nodemailer     = require("nodemailer")
   , axios          = require("axios")
   , moment         = require("moment")
   , cron = require('node-cron')


require('dotenv').config()


let notify = async(person , slotDetails)=>{
    try{
        console.log("mailer")
        //console.log(slotDetails)
        let rows = ``
        for (i=0;i<slotDetails.length;i++){
             let row = `<tr>
                      <td>`+slotDetails[i].name+`</td>
                      <td>`+slotDetails[i].district_name+`</td>
                      <td>`+slotDetails[i].pincode+`</td>
                      <td>`+slotDetails[i].vaccine+`</td>
                      <td>`+slotDetails[i].fee+`</td>
                    </tr>
                     `
             rows = rows + row       
        }
        let html = `
          <html>
            <head>
                <title>Test-email</title>
                <style>
                    #tests {
                        font-family: Verdana, Helvetica, sans-serif;
                        border-collapse: collapse;
                        width: 100%;
                    }


                    #tests td, #tests th {
                        border: 1px solid #ddd;
                        padding: 8px;
                    }

                    #tests tr:nth-child(even){background-color: #f2f2f2;}

                    #tests tr:hover {background-color: #ddd;}

                    #tests th {
                        padding-top: 12px;
                        padding-bottom: 12px;
                        text-align: left;
                        background-color: #023b52;
                        color: white;
                    }

                    .additionalStyles{
                        font-family: Verdana, Helvetica, sans-serif;
                    }
                </style>
            </head>
            <body>

        
            <h3 class="additionalStyles"> Available Slots </h3>


            <table id="tests">
                <tr>
                    <th>Center-Name</th>
                    <th>District</th>
                    <th>Pincode</th>
                    <th>Vaccine</th>
                    <th>Fee</th>
                </tr>
                 `+rows+`
            </table>
            
            </body>
            </html>

        `

        const buff = Buffer.from(html, "utf-8");

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL, 
              pass: process.env.PASS 
            },
          });

    
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: person.email, // list of receivers
            subject:'Vaccine slot available', // Subject line
            text: 'For clients with plaintext support only',
            html: buff,
          });

       console.log(info)
    }catch(error){
       console.log(error)
       throw error   
    }
 
}


let checkSlots = async(person,date)=>{
   try{
    
    for(let i = 0 ; i < person.districts.length ; i++ ) {
       let config = {
          method: 'get',
          url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id='+person.districts[i]+'&date='+date,
          headers: {
              'accept': 'application/json',
              'Accept-Language': 'hi_IN',
              'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36'
          }
        }

       response = await axios(config)
       let sessions = response.data.sessions;
       // console.log(sessions);
       let validSlots = sessions.filter(slot => slot.min_age_limit === person.age &&  slot.available_capacity > 0)
       console.log({date:date, validSlots: validSlots.length, person: person.email});
       if(validSlots.length > 0) {
                  notify(person,validSlots);
       }       
     }  
   }catch(error){
       console.log('error response', error);
       throw error
   }
}


let fetchNext10Days = async()=>{
    let dates = [];
    let today = moment();
    for(let i = 0 ; i < 10 ; i ++ ){
        let dateString = today.format('DD-MM-YYYY')
        dates.push(dateString);
        today.add(1, 'day');
    }
    return dates;
}

let checkAvailability = async(persons, dates)=>{
    console.log(dates);
    dates.forEach(async(date) => {
        for(let i = 0; i < persons.length; i++) {
            checkSlots(persons[i],date);
        }
    })
    // let dateString = moment().format('DD-MM-YYYY')
    // for(let i = 0; i < persons.length; i++) {
    //     checkSlots(persons[i],dateString);
    // }
}




let main = async()=>{
    try {
        console.log('running app');
        let persons = [{
            districts : [496],
            email : "akashbhat00@gmail.com", // email of the person
            age : 18 //minimum tracking age
        }, {
            districts : [230],
            email : ["nehalbhat97@gmail.com", "vspandita@gmail.com"], // email of the person
            age : 18 //minimum tracking age
        }, 
        // {
        //     districts : [230],
        //     email : "vspandita@gmail.com", // email of the person
        //     age : 18 //minimum tracking age
        // }
    ];
        let datesArray = await fetchNext10Days();
       cron.schedule('*/1 * * * *', async () => {
           console.log(persons);
           console.log(datesArray);
            checkAvailability(persons, datesArray);
       });
    } catch (error) {
        console.log('an error occured: ' + JSON.stringify(e, null, 2));
        throw error
    }
}

main()
