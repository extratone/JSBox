//$ui.alert("Hello, World!")

//$ui.render({
//  views: [
//    {
//      type: "button",
//      props: {
//        title: "Button"
//      },
//      layout: function(make, view) {
//        make.center.equalTo(view.super)
//        make.width.equalTo(64)
//      },
//      events: {
//        tapped: function(sender) {
//          $ui.toast("Tapped")
//        }
//      }
//    }
//  ]
//})

$ui.render({
  views: [
    {
      type: "markdown",
      props: {
        content: "# Hello, *World!*",
        style: // optional, custom style sheet
        `
        body {
          background: #f0f0f0;
        }
        `
      },
      layout: $layout.fill
    }
  ]
})
