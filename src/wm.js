let TotalWindows = []

let overlayElement = document.createElement('div');
overlayElement.style.position = "fixed";
overlayElement.style.width = "100%";
overlayElement.style.height = "100%";
overlayElement.style.top = "0";
overlayElement.style.left = "0";
overlayElement.style.zIndex = "99999";
document.body.appendChild(overlayElement)

class DesktopWindow {
  constructor(name, width, height, posX, posY, isDecorated, mode) {
    this.windowNum = TotalWindows.length
    TotalWindows[this.windowNum] = this
    this.name = name;
    this.height = height;
    this.width = width;
    this.posX = posX;
    this.posY = posY;
    this.isDecorated = isDecorated;
    
    
    this.windowElement = document.createElement('div');
    overlayElement.appendChild(this.windowElement)
    this.windowElement.style.position = "absolute";
    this.windowElement.style.display = "flex";
    this.windowElement.style.flexDirection = "column";
    this.windowElement.style.height = this.height;
    this.windowElement.style.width = this.width;
    this.windowElement.style.top = this.posY;
    this.windowElement.style.left = this.posX;

    if(isDecorated == true){
      this.windowElement.style.backgroundColor = "white";
      this.windowElement.style.resize = "both";
      this.windowElement.style.overflow = "hidden";

      this.windowElement.style.borderStyle = "groove";
      this.windowElement.style.borderColor = "rgb(0, 66, 0)";
      this.windowElement.style.borderWidth = "2px";
      
      this.windowButtonBar = document.createElement('div');
      this.windowButtonBar.style.background = "linear-gradient(90deg, #2d9900, #014200)";
      this.windowButtonBar.style.color = "white";
      this.windowButtonBar.style.width = "initial";
      this.windowButtonBar.style.height = "20px";
      this.windowElement.appendChild(this.windowButtonBar);
      this.titleWindowButtonBar = document.createElement('div');
      this.titleWindowButtonBar.style.fontFamily = "monospace";
      this.titleWindowButtonBar.style.fontSize = "15px";
      this.titleWindowButtonBar.style.float = "left";
      this.titleWindowButtonBar.style.overflow = "hidden";
      this.titleWindowButtonBar.style.textOverflow = "ellipsis";
      this.titleWindowButtonBar.style.whiteSpace = "nowrap";
      this.titleWindowButtonBar.textContent = this.name;
      this.titleWindowButtonBar.style.overflow = "hidden";
      this.windowButtonBar.appendChild(this.titleWindowButtonBar);
      this.closeWindowButton = document.createElement('button');
      this.closeWindowButton.style.position = "absolute";
      this.closeWindowButton.style.right = "0";
      this.closeWindowButton.style.top = "0";
      this.closeWindowButton.textContent = "X";
      this.closeWindowButton.style.zIndex = 4;
      this.closeWindowButton.onclick = () => {this.close()};
      this.windowButtonBar.appendChild(this.closeWindowButton)

      window.addEventListener('resize', () => {
        if(window.innerWidth < parseInt(this.windowElement.style.left.replace('px', '').replace('%', ''))+5){
          this.windowElement.style.left = 20+'px';
        }
        if(window.innerHeight < parseInt(this.windowElement.style.top.replace('px', '').replace('%', ''))+5){
          this.windowElement.style.top = 20+'px';
        }
      })
      this.windowButtonBar.onmousedown = (e) => {
        this.FrameProtect = document.createElement('div');
        this.FrameProtect.style.zIndex = 3;
        this.FrameProtect.style.position = "absolute";
        this.FrameProtect.style.top = "0";
        this.FrameProtect.style.left = "0";
        this.FrameProtect.style.width="100%";
        this.FrameProtect.style.height="100%";
        this.pageBody.appendChild(this.FrameProtect)
        e.preventDefault();
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        document.onmouseup = (f) => {
          document.onmousemove = null;
          if(window.innerWidth < parseInt(this.windowElement.style.left.replace('px', '').replace('%', ''))+5){
            this.windowElement.style.left = 20+'px';
          }
          if(window.innerHeight < parseInt(this.windowElement.style.top.replace('px', '').replace('%', ''))+5){
            this.windowElement.style.top = 20+'px';
          }
          this.FrameProtect.remove()
          document.onmouseup = null;
        };
        document.onmousemove = (f) => {
          f = f || window.event;
          e.preventDefault();
          this.pos1 = this.pos3 - f.clientX;
          this.pos2 = this.pos4 - f.clientY;
          this.pos3 = f.clientX;
          this.pos4 = f.clientY;
          this.windowElement.style.top = (this.windowElement.offsetTop - this.pos2) + "px";
          this.posX = (this.windowElement.offsetTop - this.pos2) + "px";
          this.windowElement.style.left = (this.windowElement.offsetLeft - this.pos1) + "px";
          this.posY = (this.windowElement.offsetLeft - this.pos1) + "px";
        };
      }
    }
    
    this.pageBody = document.createElement('div');
    this.pageBody.style.height = "-webkit-fill-available";
    this.windowElement.appendChild(this.pageBody)
    
    
    this.focusMode(mode)
    if(mode == "active" || mode == "inactive"){
      this.windowElement.onmousedown = () => {this.focusMode('active')}
    }
  }
  close(){
    this.windowElement.remove();
    TotalWindows.splice(TotalWindows.indexOf(this), 1);
  }
  focusMode(mode){
    if(mode === 'background'){
      this.windowElement.style.filter = "";
      this.windowElement.style.zIndex = 1;
    }
    if(mode === 'inactive'){
      this.windowElement.style.zIndex = 3;
      this.windowElement.style.filter = "brightness(0.5)";
    }
    if(mode === 'active'){
      for(let i in TotalWindows){
        if(TotalWindows[i].windowElement.style.zIndex == 5){
          TotalWindows[i].focusMode("inactive");
        }
      }
      this.windowElement.style.filter = "";
      this.windowElement.style.zIndex = 5;
    }
    if(mode === 'ontop'){
      this.windowElement.style.filter = "";
      this.windowElement.style.zIndex = 7;
    }
  }
  name(namein){
    this.name = namein;
    this.titleWindowButtonBar = this.name;
  }
}