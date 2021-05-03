# How to use

- install nodejs 
- npm install
- create .env file and add required details
- Add values for EMAIL , PASS env variables these are the credentials of the gmail account you want to use to send email
- If using gmail , create a password for your gmail account using this:-  https://support.google.com/accounts/answer/185833?hl=en&authuser=1
- node app.js & (To run this as a background process)

# Create your custom  obj that can track a list of districts using district_id
```
let person = {
          districts : [314], // district_id (How to fetch ? mentioned in the code)
          email : process.env.PERSON, //create a entry by name PERSON="<person-email>" this is the email-id where you want to recieve notification
          age : 18 //min age
        }
```

![alt text](https://github.com/Nit-1997/cowin-slot-notifier/blob/main/screen.png?raw=true)

# Tables 

- States

| state_id | state name                  |
|----------|-----------------------------|
| 1        | Andaman and Nicobar Islands |
| 2        | Andhra Pradesh              |
| 3        | Arunachal Pradesh           |
| 4        | Assam                       |
| 5        | Bihar                       |
| 6        | Chandigarh                  |
| 7        | Chhattisgarh                |
| 8        | Dadra and Nagar Haveli      |
| 37       | Daman and Diu               |
| 9        | Delhi                       |
| 10       | Goa                         |
| 11       | Gujarat                     |
| 12       | Haryana                     |
| 13       | Himachal Pradesh            |
| 14       | Jammu and Kashmir           |
| 15       | Jharkhand                   |
| 16       | Karnataka                   |
| 17       | Kerala                      |
| 18       | Ladakh                      |
| 19       | Lakshadweep                 |
| 20       | Madhya Pradesh              |
| 21       | Maharashtra                 |
| 22       | Manipur                     |
| 23       | Meghalaya                   |
| 24       | Mizoram                     |
| 25       | Nagaland                    |
| 26       | Odisha                      |
| 27       | Puducherry                  |
| 28       | Punjab                      |
| 29       | Rajasthan                   |
| 30       | Sikkim                      |
| 31       | Tamil Nadu                  |
| 32       | Telangana                   |
| 33       | Tripura                     |
| 34       | Uttar Pradesh               |
| 35       | Uttarakhand                 |
| 36       | West Bengal                 |

