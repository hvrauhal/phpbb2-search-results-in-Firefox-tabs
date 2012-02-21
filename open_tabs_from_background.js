chrome.extension.onRequest.addListener(function(create_properties) {
    alert("received props")
    _.forEach(create_properties, function(properties) {
        chrome.tabs.create(properties)
    })
})
