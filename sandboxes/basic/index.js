import { Canvg } from 'canvg'

async function start() {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  const v = await Canvg.from(ctx, './example.svg')

  // Start SVG rendering with animations and mouse handling.
  v.start()

  window.onbeforeunload = () => {
    v.stop()
  }
}

start()
