const request=require('request')
const url='http://api.weatherapi.com/v1/current.json?key=d6d2aa0446e44f3e8ec164152202711&q=Nagda'
request({url:url},(error,response)=>
{
    const data=JSON.parse(response.body)
   console.log(data.current)
})