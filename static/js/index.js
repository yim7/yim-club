
    var e = function (sel) {
        return document.querySelector(sel)
    }

    var es = function (sel) {
        return document.querySelectorAll(sel)
    }

    var markContents = function () {
        // markdown -> html 的处理放在高亮前面
        // 因为高亮是针对 html 格式的
        // lang -> language 不需要转 prism 自动转了
        var contentDivs = es('.markdown-text')
        for (var i = 0; i < contentDivs.length; i++) {
            var contentDiv = contentDivs[i]
            console.log('pre marked', contentDiv.textContent)
            var content = marked(contentDiv.textContent)
            console.log('after marked', content)
            contentDiv.innerHTML = content
        }
    }

    var highlight = function () {
        // 自动加载对应的语言 不然要手动加入各个语言的 js
        Prism.plugins.autoloader.languages_path = 'https://cdn.bootcss.com/prism/1.13.0/components/'
    }

    var registerTimer = function () {
        setInterval(function () {
            var times = es('.gua-time')
            for (var i = 0; i < times.length; i++) {
                var t = times[i]
                var time = Number(t.dataset.created_time)
                var now = Math.floor(new Date() / 1000)
                var delta = now - time
                var s = `${delta} 秒前`
                t.innerText = s
            }
        }, 1000)
    }

    function footer() {
        var o = $(window).height()
        $("#footer").addClass("fix-bottom")
        $(document.body).height() < o ? $("#footer").addClass("fix-bottom") : $("#footer").removeClass("fix-bottom")
    }

    $(document).ready(function () {
        footer()
    })

    var __main = function () {
        markContents()
        highlight()
        registerTimer()

    }

    __main()