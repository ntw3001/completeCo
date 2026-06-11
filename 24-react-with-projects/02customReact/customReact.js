function mainContainer(reactElement, container) {
  const domElement = document.createElement(reactElement.type)
  domElement.innerHTML = reactElement.children
  domElement.setAttribute("href", reactElement.props.href)
  domElement.setAttribute("target", reactElement.props.target)
  container.appendChild(domElement)
}

const reactElement = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_blank",
  },
  children: "Click-a me to see-a the Google"
}

const mainContainer = document.getElemenbtById(root)


customRender(reactElement, mainContainer)
