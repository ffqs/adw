// Client script
var config = {
  id: 'id-1',
  type: 'inread', // inboard, inread
  trigger: 'trigger-1',
  videoUrl: 'https://mkcf.dxmcdn.com/be985a30-b715-4a32-ac32-8bb9ab874462blob.mp4',
  clickUrl: 'https://google.com',
  imageUrl: 'https://www.catsbest.eu/wp-content/uploads/langhaarkatze_pflege-e1607348419659.jpg',
  actionText: 'Action text',
  textUrl: 'https://google.com/text',
}

// Script from server
document.body.onload = function () {
  let triggered = false;
  var triggerElement = document.querySelector(`#${config.trigger}`)

  document.addEventListener('scroll', () => {
    if (!triggered && elementInViewport(triggerElement)) {
      triggered = true;
      showIFrame(config)
    }
  })

  function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
  
    while(el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }
  
    return (
      top >= window.pageYOffset &&
      left >= window.pageXOffset &&
      (top + height + 250) <= (window.pageYOffset + window.innerHeight) &&
      (left + width) <= (window.pageXOffset + window.innerWidth)
    );
  }

  function showIFrame (cfg) {
    const muteSvg = `<?xml version="1.0" encoding="iso-8859-1"?> <svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve"> <g> <g> <g> <path d="M288,192c0-37.653-21.76-70.187-53.333-85.867v47.147l52.373,52.373C287.68,201.173,288,196.587,288,192z"/> <path d="M341.333,192c0,20.053-4.373,38.933-11.52,56.32l32.32,32.32C376,254.08,384,224,384,192 c0-91.307-63.893-167.68-149.333-187.093V48.96C296.32,67.307,341.333,124.373,341.333,192z"/> <polygon points="192,21.333 147.413,65.92 192,110.507 			"/> <path d="M27.2,0L0,27.2L100.8,128H0v128h85.333L192,362.667V219.2l90.773,90.773c-14.293,10.987-30.4,19.84-48.107,25.173V379.2 c29.333-6.72,56.107-20.16,78.613-38.613L356.8,384l27.2-27.2l-192-192L27.2,0z"/> </g> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>`
    const unmuteSvg = `<?xml version="1.0" encoding="iso-8859-1"?> <svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve"> <g> <g> <g> <path d="M288,192c0-37.653-21.76-70.187-53.333-85.867v171.84C266.24,262.187,288,229.653,288,192z"/> <polygon points="0,128 0,256 85.333,256 192,362.667 192,21.333 85.333,128 			"/> <path d="M234.667,4.907V48.96C296.32,67.307,341.333,124.373,341.333,192S296.32,316.693,234.667,335.04v44.053 C320.107,359.68,384,283.413,384,192S320.107,24.32,234.667,4.907z"/> </g> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>`
    const replaySvg = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="m437.089844 74.980469c-48.308594-48.351563-112.539063-74.980469-180.855469-74.980469-61.578125 0-120.164063 21.808594-166.527344 61.699219l-49.601562-48.738281-9.9375 168.507812 171.300781-12.667969-48.609375-45.027343c29.421875-23.101563 65.570313-35.667969 103.375-35.667969 92.492187 0 167.742187 75.316406 167.742187 167.894531s-75.25 167.898438-167.742187 167.898438c-42.464844 0-82.976563-15.917969-114.078125-44.816407-30.933594-28.75-49.796875-67.6875-53.109375-109.644531l-1.09375-13.816406h-87.953125l.949219 15.894531c8.066406 134.851563 120.199219 240.484375 255.285156 240.484375 68.316406 0 132.546875-26.628906 180.855469-74.980469 48.304687-48.351562 74.910156-112.640625 74.910156-181.019531s-26.605469-132.667969-74.910156-181.019531zm0 0"/></svg>`

    const { id, type, trigger, videoUrl, clickUrl, imageUrl, actionText, textUrl } = cfg
    const body = document.querySelector('body')
    if (body) {
      const isInread = type === 'inread'

      const iframe = document.createElement('iframe')
      const iframeBody = document.createElement('a')
      const muteButton = document.createElement('div')
      const unmuteButton = document.createElement('div')
      const replayButton = document.createElement('div')
      const video = document.createElement('video')
      const clickTextBlock = document.createElement('a')
      const image = document.createElement('img')
      const text = document.createElement('span')

      iframe.style = isInread
        ? 'border: none; width: 320px; height: 180px; background-color: #c2c2c2;'
        : 'border: none; width: 320px; height: 180px; position: fixed; left: 4px; bottom: 4px; background-color: #c2c2c2;'
      iframeBody.style = "position: relative; display: block; margin: 0; font-family: sans-serif"
      muteButton.style="position: absolute; top: 4px; right: 4px; width: 24px; height: 24px; z-index: 1; cursor: pointer; display: none;"
      unmuteButton.style="position: absolute; top: 4px; right: 4px; width: 24px; height: 24px; z-index: 1; cursor: pointer;"
      replayButton.style="position: absolute; top: 4px; left: 4px; width: 24px; height: 24px; z-index: 1; cursor: pointer;"
      video.style = "width: 100%; height: 100%;"
      clickTextBlock.style = "position: absolute; right: 4px; bottom: 20%; max-width: 64px; max-height: 64px; display: flex; align-items: center; text-decoration: none; background: #c8c8c8; padding: 2px; overflow: hidden; transition: .5s linear;"
      image.style = "max-width: 64px; max-height: 64px;"
      text.style = "color: #ffffff; font-size: 12px; margin-left: 4px; white-space: nowrap;"

      if (imageUrl) {
        clickTextBlock.appendChild(image)
      }

      if (textUrl) {
        clickTextBlock.target = '_blank'
        clickTextBlock.href = textUrl
        text.innerHTML = actionText
        clickTextBlock.appendChild(text)
      }

      iframeBody.target = '_blank'
      iframeBody.href = clickUrl

      image.src = imageUrl

      video.src = videoUrl
      video.autoplay = true
      video.muted = true

      if (isInread) {
        const triggerElement = document.querySelector(`#${trigger}`)
        triggerElement.appendChild(iframe)
      } else {
        document.body.appendChild(iframe)
      }

      let watched25 = false
      let watched50 = false
      let watched75 = false
      let watched100 = false

      video.onplay = function () {
        console.log(`${id}: video is play`)
      }

      video.ontimeupdate = function () {
        const watched = this.currentTime / video.duration
        if (!watched25 && watched > 0.25) {
          watched25 = true
          console.log(`${id}: watched 25%`)
        }
        if (!watched50 && watched > 0.5) {
          watched50 = true
          console.log(`${id}: watched 50%`)
        }
        if (!watched75 && watched > 0.75) {
          watched75 = true
          console.log(`${id}: watched 75%`)
        }
      }

      video.onended = function () {
        if (!watched100) {
          watched100 = true
          console.log(`${id}: watched 100%`)
        }
        console.log(`${id}: finished`)
      }

      muteButton.insertAdjacentHTML('beforeend', muteSvg)
      muteButton.onclick = function (e) {
        e.preventDefault()
        video.muted = true
        muteButton.style.display = 'none'
        unmuteButton.style.display = 'block'
      }

      unmuteButton.insertAdjacentHTML('beforeend', unmuteSvg)
      unmuteButton.onclick = function (e) {
        e.preventDefault()
        video.muted = false
        muteButton.style.display = 'block'
        unmuteButton.style.display = 'none'
      }

      replayButton.insertAdjacentHTML('beforeend', replaySvg)
      replayButton.onclick = function (e) {
        e.preventDefault()
        video.play()
      }

      iframeBody.appendChild(video)
      iframeBody.appendChild(muteButton)
      iframeBody.appendChild(unmuteButton)
      iframeBody.appendChild(replayButton)
      if (imageUrl || textUrl) {
        clickTextBlock.onmouseenter = () => {
          clickTextBlock.style.maxWidth = '100%'
        }
        clickTextBlock.onmouseleave = () => {
          clickTextBlock.style.maxWidth = '64px'
        }
        iframeBody.appendChild(clickTextBlock)
      }

      iframe.contentWindow.document.open('text/html', 'body')
      iframe.contentWindow.document.appendChild(iframeBody)
      iframe.contentWindow.document.close()
    }
  }
}
