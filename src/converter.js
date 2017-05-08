export async function convertServiceState (input) {
  console.log(input)
  var xmlData =
    '' +
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<ns2:portCallMessage xmlns:ns2="urn:x-mrn:stm:schema:port-call-message:0.0.16">' +
      '<ns2:vesselId>urn:mrn:stm:vessel:IMO:' + input[0] + '</ns2:vesselId>' +
      '<ns2:messageId>urn:mrn:stm:portcdm:message:' + input[1] + '</ns2:messageId>'
  '<ns2:reportedBy>' + input[2] + '</ns2:reportedBy>' +
      '<ns2:locationState>' +
          '<ns2:referenceObject>' + input[3] + '</ns2:referenceObject>' +
          '<ns2:time>' + input[4] + '</ns2:time>' +
          '<ns2:timeType>' + input[5] + '</ns2:timeType>' +
          '<ns2:arrivalLocation>' +
              '<ns2:to>' +
                  '<ns2:position>' +
                      '<ns2:latitude>0</ns2:latitude>' +
                      '<ns2:longitude>0</ns2:longitude>' +
                      '<ns2:name>' + input[6] + '</ns2:name>' +
                  '</ns2:position>' +
                  '<ns2:locationType>TRAFFIC_AREA</ns2:locationType>' +
              '</ns2:to>' +
          '</ns2:arrivalLocation>'
  '</ns2:locationState>'
  '</ns2:portCallMessage>'

  console.log(xmlData)
  return xmlData
}
