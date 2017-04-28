import axios from 'axios'

const api = axios.create({timeout: 5000})
//
// export async function test2() {
//     return api.post('http://192.168.56.101:8080/mb/mqs',
//     querystring.stringify({
//
//     }), {
//         headers: {
//             'X-PortCDM-UserId': 'porter',
//             'X-PortCDM-Password': 'porter',
//             'X-PortCDM-APIKey': 'eeee',
//             'Content-Type': 'application/json'
//         }
//     }).then(function(response) {
//         console.log(response.data)
//     }).catch((error) => {
//       console.log(error)
//     })jk
// }

export async function test () {
    return api.get('http://192.168.56.101:8080/dmp/mss/state_update?count=30&api_key=mb%2Fmqs',
    {
        headers: {
            'X-PortCDM-UserId': 'porter',
            'X-PortCDM-Password': 'porter',
            'X-PortCDM-APIKey': 'eeee'
        }
    })
}
