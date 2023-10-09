function overlayWindow(){
    let OverlayWindow = new DesktopWindow("On Top", "500px", "500px", "10px", "40px", true, "active");
    OverlayWindow.pageBody.innerHTML = "<h1>Test Window</h1>"
    let closeButton = document.createElement('button')
    closeButton.onclick = () => {
      OverlayWindow.close()
    }
    OverlayWindow.pageBody.appendChild(closeButton)
  }
overlayWindow()
overlayWindow()