(function main() {
    function find_links() {
        return _.map($("img[src*='latest']").parent("a[href*='viewtopic']"), function (anchor) {
            return {url: anchor.href, active: false}
        })
    }
    
    function open_all_in_tabs(e) {
        var create_props = find_links()
        e.preventDefault()
        debugger
        chrome.extension.sendRequest(create_props)
    }

    $("a[href*='egosearch']").after('| <a id="open_all_in_tabs" href="#">Avaa kaikki välilehtiin</a>')
    $("#open_all_in_tabs").click(open_all_in_tabs)
})()

