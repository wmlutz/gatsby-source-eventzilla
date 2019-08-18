const axios = require('axios');
const URL = 'https://publicapi.eventzilla.net/v2/api/events'

exports.sourceNodes = ( { actions, createNodeId, createContentDigest }, options, ) => {
  const { createNode } = actions
  delete options.plugins
  let offset = 0
  let limit = 20
  const { apiKey } = options

  const processData = item => {
    const nodeId = createNodeId(`eventzilla-${item.id}`)
    const nodeContentDigest = createContentDigest(item)
    
    const nodeData = Object.assign({}, item, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        mediaType: `text/html`,
        contentDigest: nodeContentDigest,
        type: options.typeName,
        content: JSON.stringify(item),
      },
    })
    return nodeData
  }

  const getData = (resolve, reject, events = []) => {
    axios.get(URL, { 
      headers: { 'x-api-key': apiKey },
      params: {
        offset: offset,
        limit: limit
      }
    })
    .then((response) => {
      if (!!response.data.events) {
        let retreivedEvents = events.concat(response.data.events)
        offset = offset+limit
        getData(resolve, reject, retreivedEvents)
      }
    })
    .catch((error) => {
      if (!!error.response.data.message && error.response.data.message === 'No events found') {
        resolve(events)        
      } else {
        console.log('err', error)
        reject(error) 
      }
    })
  }

  const getAxiosData = () => {
    return new Promise((resolve, reject) => {
      getData(resolve, reject)
    })
  }

  return(getAxiosData().then(res => {
    res.forEach(evt => {
      const nodeData = processData(evt)
      createNode(nodeData)
    })
  })
  .catch(err => console.log('err', err)))

}