const worker = new Worker('./worker.js', {
  type: 'module'
})
const img = document.querySelector('img')

worker.postMessage({
  width: 600,
  height: 600,
  svg: './example.svg'
})

worker.onmessage = (event) => {
  img.src = event.data.pngUrl
}
