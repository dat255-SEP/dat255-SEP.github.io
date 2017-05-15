export async function convertLocationState (input) {
  console.log(input)
  var xmlData = '' +
      '<?xml version="1.0" encoding="UTF-8"?>' +
  '<ns2:portCallMessage xmlns:ns2="urn:x-mrn:stm:schema:port-call-message:0.0.16">' +
  '<ns2:vesselId>urn:mrn:stm:vessel:IMO:' + input[0] + '</ns2:vesselId>' + '<ns2:messageId>urn:mrn:stm:portcdm:message:' + input[1] + '</ns2:messageId>'
  '<ns2:reportedBy>' + input[2] + '</ns2:reportedBy>' + '<ns2:locationState>' + '<ns2:referenceObject>' + input[3] + '</ns2:referenceObject>' + '<ns2:time>' + input[4] + '</ns2:time>' + '<ns2:timeType>' + input[5] + '</ns2:timeType>' + '<ns2:arrivalLocation>' + '<ns2:to>' + '<ns2:position>' + '<ns2:latitude>0</ns2:latitude>' + '<ns2:longitude>0</ns2:longitude>' + '<ns2:name>' + input[6] + '</ns2:name>' + '</ns2:position>' + '<ns2:locationType>TRAFFIC_AREA</ns2:locationType>' + '</ns2:to>' + '</ns2:arrivalLocation>'
  '</ns2:locationState>'
  '</ns2:portCallMessage>'

  return xmlData
}

export async function convertServiceState (input) {
  var xmlData = '' +
      '<?xml version="1.0" encoding="UTF-8"?>' +
  '<ns2:portCallMessage xmlns:ns2="urn:x-mrn:stm:schema:port-call-message:0.0.16">' +
  '<ns2:serviceObject> ns2:' + input[0] + '</ns2:serviceObject>'
  '<ns2:performingActor> ns2:MRN ' + input[1] + '</ns2:performingActor>'
  '<ns2:timeSequence> ns2:ServiceTimeSequence ' + input[2] + ' </ns2:timeSequence>'
  '<ns2:time> xs:' + input[3] + ' </ns2:time>'
  '<ns2:timeType> ns2:' + input[4] + ' </ns2:timeType>'
  '<ns2:at> ns2:' + input[5] + ' </ns2:at>'
  '<ns2:between>'
  '<ns2:to> ns2:' + input[6] + ' </ns2:to>'
  '<ns2:from> ns2:' + input[7] + '</ns2:from>'
  '</ns2:between>'
  '</ns2:locationState>'
  '</ns2:portCallMessage>'

  return xmlData
}
