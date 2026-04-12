import Cocoa

let pasteboard = NSPasteboard.general
let currentDir = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let targetUrl = currentDir.appendingPathComponent("public/logo.png")

if let data = pasteboard.data(forType: .png) {
    try? data.write(to: targetUrl)
    print("SUCCESS")
} else if let data = pasteboard.data(forType: .tiff) {
    if let rep = NSBitmapImageRep(data: data),
       let pngData = rep.representation(using: .png, properties: [:]) {
        try? pngData.write(to: targetUrl)
        print("SUCCESS")
    } else {
        print("FAILED_CONVERT")
    }
} else {
    print("NO_IMAGE")
}
