# Filestore

The HTML textarea is somewhat limited, e.g. does not allow multiple color highlights.

The contenteditable div would allow that, but may miss other things, IDK.

> https://stackoverflow.com/questions/5284193/what-are-the-cons-of-using-a-contenteditable-div-rather-than-a-textarea

The textarea would be minimalistic and would emphasize focus on text.

Also, how to get the cwd displayed?

* https://www.electronjs.org/docs/latest/tutorial/tutorial-preload

Comms between main and rendered through IPC:

> main and renderer processes with Electron's inter-process communication (IPC) modules.

> On the other hand, renderer processes run web pages and do not run Node.js by default for security reasons.

Limited subset only:

> A BrowserWindow's preload script runs in a context that has access to both the HTML DOM and a limited subset of Node.js and Electron APIs.

What is a polyfill anyway?

> https://en.wikipedia.org/wiki/Polyfill_(programming)

Ah, ok, electron provides implementation of some node apis, and pass through others?
