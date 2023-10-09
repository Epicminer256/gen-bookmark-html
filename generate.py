import json
import urllib.parse
import datetime
import base64

CompileOutput = "compiled.html"
ConfigFile = "options.json"

class BookmarkCompiler:
    def headerWrite(data):
        open(CompileOutput,"w").write(str(data))

    def folderWrite(name, depth):
        indent=""
        for i in range(depth):
            if i == 0:
                indent="    "
            else:
                indent=indent+"    "
        data=indent+"<DT><H3>"+name+"</H3>\n"
        open(CompileOutput,"a").write(str(data))

    def fileWrite(name, filein, depth):
        indent=""
        filedataencoded=""
        for i in range(depth):
            if i == 0:
                indent="    "
            else:
                indent=indent+"    "
        files = filein.split(",")
        for file in files:
            while file[0] == " ":
                file=file[1:]
            filedataencoded = filedataencoded + urllib.parse.quote(open(file, "r").read())
        
        link = indent+'<DT><A HREF="javascript:'+filedataencoded+'">'+name+'</A>\n'
        open(CompileOutput,"a").write(str(link))

    def folderEndWrite(depth):
        indent=""
        for i in range(depth):
            if i == 0:
                indent="    "
            else:
                indent=indent+"    "
        open(CompileOutput,"a").write(str(indent+"</DL><p>\n"))

    def folderStartWrite(depth):
        indent=""
        for i in range(depth):
            if i == 0:
                indent="    "
            else:
                indent=indent+"    "
        open(CompileOutput,"a").write(str(indent+"<DL><p>\n"))
    
    def linkWrite(name, link, depth):
        indent=""
        for i in range(depth):
            if i == 0:
                indent="    "
            else:
                indent=indent+"    "
        linkOut = indent+'<DT><A HREF="'+link+'">'+name+'</A>\n'
        open(CompileOutput,"a").write(str(linkOut))
    def insertDepth(depth):
        indent=""
        for i in range(depth):
            if i == 0:
                indent="    "
            else:
                indent=indent+"    "
        return indent


header='''<!DOCTYPLE NETSCAPE-Bookmark-file-1>
<!-- 
    Compiled at '''+str(datetime.date.today())+'''
    "This is a whole lotta hoopla"
    -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
'''

BookmarkCompiler.headerWrite(header)


with open(ConfigFile, "r") as f:
    
    def traverse(JSONIMPORT, depth):
        BookmarkCompiler.folderStartWrite(depth)
        rootFolder=JSONIMPORT
        for ProgramName in rootFolder:
            if 'folder' in JSONIMPORT[ProgramName]:
                print(BookmarkCompiler.insertDepth(depth), ProgramName, ":")
                name=ProgramName
                BookmarkCompiler.folderWrite(name, depth+1)
                traverse(JSONIMPORT[ProgramName]["folder"], depth+1)
            
            if 'jsfile' in JSONIMPORT[ProgramName]:
                name = ProgramName
                file = JSONIMPORT[ProgramName]["jsfile"]
                BookmarkCompiler.fileWrite(name, file, depth+1)
                print(BookmarkCompiler.insertDepth(depth), ProgramName, " <- ", JSONIMPORT[ProgramName]["jsfile"])
            
            if 'link' in JSONIMPORT[ProgramName]:
                print(BookmarkCompiler.insertDepth(depth), ProgramName, " <- ", JSONIMPORT[ProgramName]["link"])
                name = ProgramName
                link=JSONIMPORT[ProgramName]["link"]
                BookmarkCompiler.linkWrite(name, link, depth+1)
            
        print("")
        BookmarkCompiler.folderEndWrite(depth)
    
    traverse(json.loads(f.read()), 0)

