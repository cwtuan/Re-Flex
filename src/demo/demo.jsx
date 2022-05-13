import ReactDOM from 'react-dom'
import p from 'es6-promise'
import React from 'react'
import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement,
  ReflexHandle
} from '../../src/lib'

import '../../src/lib/reflex-styles.scss'
import './demo.scss'

p.polyfill()

/////////////////////////////////////////////////////////
// Re-Flex Basic vertical layout non-resizable
//
/////////////////////////////////////////////////////////
class ReflexBasicDemo
  extends React.Component {

  render () {

    return (
      <ReflexContainer orientation="vertical">

        <ReflexElement className="left-pane">
          <div className="pane-content">
            <label>
              Left Pane (fixed)
            </label>
          </div>
        </ReflexElement>

        <ReflexElement className="right-pane">
          <div className="pane-content">
            <label>
              Right Pane (fixed)
            </label>
          </div>
        </ReflexElement>

      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-Flex basic vertical layout with resizable splitter
//
/////////////////////////////////////////////////////////
class ReflexBasicSplitterDemo
  extends React.Component {

  render () {

    return (
      <ReflexContainer orientation="vertical">

        <ReflexElement className="left-pane">
          <div className="pane-content">
            <label>
              Left Pane (resizable)
            </label>
          </div>
        </ReflexElement>

        <ReflexSplitter/>

        <ReflexElement className="right-pane"
          minSize={200}
          maxSize={800}>
          <div className="pane-content">
            <label>
              Right Pane (resizable)
              <br/>
              <br/>
              minSize = 200px
              <br/>
              maxSize = 800px
            </label>
          </div>
        </ReflexElement>

      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-Flex vertical layout with double
// resizable splitter propagation
//
/////////////////////////////////////////////////////////
class ReflexSplitterPropagationDemo2x
  extends React.Component {

  render () {

    return (
      <ReflexContainer orientation="vertical">

        <ReflexElement className="left-pane">
          <div className="pane-content">
            <label>
              Left Pane (resizable)
            </label>
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true}/>

        <ReflexElement className="middle-pane"
          minSize={200}
          maxSize={800}>
          <div className="pane-content">
            <label>
              Middle Pane (resizable)
              <br/>
              <br/>
              minSize = 200px
              <br/>
              maxSize = 800px
            </label>
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true}/>

        <ReflexElement className="right-pane">
          <div className="pane-content">
            <label>
              Right Pane (resizable)
            </label>
          </div>
        </ReflexElement>

      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-Flex vertical layout with triple
// resizable splitter propagation
//
/////////////////////////////////////////////////////////
class ReflexSplitterPropagationDemo3x
  extends React.Component {

  render () {

    return (
      <ReflexContainer orientation="vertical">

        <ReflexElement className="left-pane">
          <div className="pane-content">
            <label>
            Left Pane (resizable)
            </label>
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true}/>

        <ReflexElement className="middle-pane">
          <div className="pane-content">
            <label>
            Middle Pane 1 (resizable)
            </label>
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true}/>

        <ReflexElement className="middle-pane">
          <div className="pane-content">
            <label>
            Middle Pane 2 (resizable)
            </label>
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true}/>

        <ReflexElement className="right-pane">
          <div className="pane-content">
            <label>
            Right Pane (resizable)
            </label>
          </div>
        </ReflexElement>

      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-Flex advanced multi-nested resizable layout
// with event listeners
//
/////////////////////////////////////////////////////////
class ReflexAdvancedDemo
  extends React.Component {

  constructor () {

    super()

    this.resizeProps = {
      onStopResize: this.onStopResize.bind(this),
      onResize: this.onResize.bind(this)
    }

    this.resizedElements = []
  }

  onResize (e) {

    if (e.domElement) {

      e.domElement.classList.add('resizing')

      this.resizedElements.push(e.domElement)
    }
  }

  onStopResize (e) {

    this.resizedElements.forEach((element) => {

      element.classList.remove('resizing')
    })

    this.resizedElements = []
  }

  render () {

    return (
      <ReflexContainer orientation="horizontal">
        <ReflexElement className="header" flex={0.1}>
          <div className="pane-content">
            <label>
              Header (fixed)
            </label>
          </div>
        </ReflexElement>
        <ReflexElement>
          <ReflexContainer orientation="vertical">
            <ReflexElement {...this.resizeProps}>
              <ReflexContainer orientation="horizontal">
                <ReflexElement {...this.resizeProps}>
                  <div className="pane-content">
                    <div style={{height: '30%'}}/>
                    <label style={{height: '0%'}}>
                      Left Pane <br/> Top
                      <br/>
                      (splitter propagation)
                    </label>
                  </div>
                </ReflexElement>
                <ReflexSplitter propagate={true} {...this.resizeProps}/>
                <ReflexElement {...this.resizeProps}>
                  <div className="pane-content">
                    <div style={{height: '30%'}}/>
                    <label style={{height: '0%'}}>
                      Left Pane <br/> Middle
                      <br/>
                      (splitter propagation)
                    </label>
                  </div>
                </ReflexElement>
                <ReflexSplitter propagate={true} {...this.resizeProps}/>
                <ReflexElement {...this.resizeProps}>
                  <div className="pane-content">
                    <div style={{height: '30%'}}/>
                    <label style={{height: '0%'}}>
                      Left Pane <br/> Bottom
                      <br/>
                      (splitter propagation)
                    </label>
                  </div>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
            <ReflexSplitter {...this.resizeProps}/>
            <ReflexElement flex={0.5} {...this.resizeProps}>
              <div className="pane-content">
                <label>
                  Middle Pane
                </label>
              </div>
            </ReflexElement>
            <ReflexSplitter{...this.resizeProps}/>
            <ReflexElement {...this.resizeProps}>
              <ReflexContainer orientation="horizontal">
                <ReflexElement {...this.resizeProps}>
                  <div>
                    <ReflexContainer orientation="vertical">
                      <ReflexElement {...this.resizeProps}>
                        <div className="pane-content">
                          <label>
                            Right Pane <br/> Upper-Left
                          </label>
                        </div>
                      </ReflexElement>
                      <ReflexSplitter/>
                      <ReflexElement {...this.resizeProps}>
                        <div className="pane-content">
                          <label>
                            Right Pane <br/> Upper-Right
                          </label>
                        </div>
                      </ReflexElement>
                    </ReflexContainer>
                  </div>
                </ReflexElement>
                <ReflexSplitter {...this.resizeProps}/>
                <ReflexElement {...this.resizeProps}>
                  <div className="pane-content">
                    <label>
                      Right Pane <br/> Bottom
                    </label>
                  </div>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
        <ReflexElement className="footer" flex={0.1}>
          <div className="pane-content">
            <label>
              Footer (fixed)
            </label>
          </div>
        </ReflexElement>
      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-Flex Controlled element demo
//
/////////////////////////////////////////////////////////
class ControlledElementCls
  extends React.Component {

  constructor () {

    super()

    this.onLockSizeClicked =
      this.onLockSizeClicked.bind(this)

    this.onMinimizeClicked =
      this.onMinimizeClicked.bind(this)

    this.onMaximizeClicked =
      this.onMaximizeClicked.bind(this)

    this.state = {
      size: -1
    }
  }

  onLockSizeClicked () {

    this.props.onLockSize({
      locked: this.props.sizeLocked,
      paneId: this.props.id,
      size: this.getSize()
    })
  }

  onMinimizeClicked () {

    const currentSize = this.getSize()

    const update = (size) => {

      return new Promise((resolve) => {

        this.setState({
          size: size < 25 ? 25 : size
        }, () => resolve())
      })
    }

    const done = (from, to) => {

      return from < to
    }

    this.animate (
      currentSize, 25, -8,
      done, update)
  }

  onMaximizeClicked () {

    const currentSize = this.getSize()

    const update = (size) => {

      return new Promise((resolve) => {

        this.setState({
          size
        }, () => resolve())
      })
    }

    const done = (from, to) => {

      return from > to
    }

    this.animate (
      currentSize, 400, 8,
      done, update)
  }

  getSize () {

    const domElement = ReactDOM.findDOMNode(this)

    switch (this.props.orientation) {

      case 'horizontal':
        return domElement.offsetHeight

      case 'vertical':
        return domElement.offsetWidth

      default:
        return 0
    }
  }

  animate (start, end, step, done, fn) {

    const stepFn = () => {

      if (!done(start, end)) {

        fn(start += step).then(() => {

          window.requestAnimationFrame(stepFn)
        })
      }
    }

    stepFn ()
  }

  render () {

    const lockStyle = this.props.sizeLocked ?
      { color: '#FF0000' } : {}

    return (
      <ReflexElement size={this.state.size} {...this.props}>
        <div className="pane-content">
          <div className="pane-control">
            <label>
              {this.props.name}  Controls
            </label>
            <button onClick={this.onMaximizeClicked}>
              <label> + </label>
            </button>
            <button onClick={this.onMinimizeClicked}>
              <label> - </label>
            </button>
            <button onClick={this.onLockSizeClicked}>
              <label style={lockStyle} > = </label>
            </button>
          </div>
          <div className="ctrl-pane-content">
            <label>
              {this.props.name}
            </label>
          </div>
        </div>
      </ReflexElement>
    )
  }
}

const ControlledElement = React.forwardRef((props, ref) => {
  return (
    <ControlledElementCls innerRef={ref} {...props}/>
  )
})

class ReflexControlsDemo
  extends React.Component {

  constructor () {

    super()

    this.onLockSize =
      this.onLockSize.bind(this)

    this.state = {
      pane1: {
        onLockSize: this.onLockSize,
        sizeLocked: false,
        name: 'Pane 1',
        direction: 1,
        id: 'pane1',
        minSize: 25
      },
      pane2: {
        onLockSize: this.onLockSize,
        sizeLocked: false,
        name: 'Pane 2',
        direction: [1, -1],
        id: 'pane2',
        minSize: 25
      },
      pane3: {
        onLockSize: this.onLockSize,
        sizeLocked: false,
        name: 'Pane 3',
        direction:-1,
        id: 'pane3',
        minSize: 25
      }
    }
  }

  onLockSize (data) {

    const locked = !this.state[data.paneId].sizeLocked

    this.state[data.paneId].sizeLocked = locked

    if (locked) {

      this.state[data.paneId].minSize = data.size
      this.state[data.paneId].maxSize = data.size

    } else {

      this.state[data.paneId].minSize = 25
      this.state[data.paneId].maxSize = Number.MAX_VALUE
    }

    this.setState(this.state)
  }

  render () {

    return (
      <ReflexContainer orientation="vertical">

        <ReflexElement flex={0.4}>
          <div className="pane-content">
            <ReflexContainer orientation="horizontal">

              <ControlledElement {...this.state.pane1}/>

              <ReflexSplitter propagate={true}/>

              <ControlledElement {...this.state.pane2}/>

              <ReflexSplitter propagate={true}/>

              <ControlledElement {...this.state.pane3}/>

            </ReflexContainer>
          </div>
        </ReflexElement>

        <ReflexSplitter/>

        <ReflexElement>
          <div className="pane-content">
            <label>
            App Pane
            </label>
          </div>
        </ReflexElement>

      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-Flex Size Aware element demo
//
/////////////////////////////////////////////////////////
class SizeAwareElement extends React.Component {

  fitBounds (value, min, max) {

    return Math.max(Math.min(value, max), min)
  }

  rgbGradient (color1, color2, weight) {

    const w1 = weight

    const w2 = 1 - w1

    const rgb = [
      Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)
    ]

    return rgb.map((c) => this.fitBounds(c, 0, 255))
  }

  render() {

    const { width, height } = this.props.dimensions

    const maxWidth = window.innerWidth - 100

    const maxHeight = 280

    const weight =
      (width * height) /
      (maxWidth * maxHeight)

    const rgb = this.rgbGradient(
      [0, 255, 0],
      [255, 0, 0],
      weight)

    const style = {
      background: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
      color: 'whitesmoke'
    }

    return (
      <div className="pane-content" style={style}>
        <label>
          I am so Size-Aware!
          <br/>
          <br/>
          Width: {width} px
          <br/>
          x
          <br/>
          Height: {height} px
        </label>
      </div>
    )
  }
}

class ReflexSizeAwareDemo
  extends React.Component {

  render () {

    return (
      <ReflexContainer orientation="vertical">

        <ReflexElement>

        <ReflexContainer orientation="horizontal">

          <ReflexElement
            propagateDimensionsRate={200}
            propagateDimensions={true}
            flex={0.8}>

            <SizeAwareElement/>

          </ReflexElement>

          <ReflexSplitter/>

          <ReflexElement className="bottom-pane">
            <div className="pane-content">
              <label>
                Bottom Pane
              </label>
            </div>
          </ReflexElement>

        </ReflexContainer>

        </ReflexElement>

      <ReflexSplitter/>

        <ReflexElement className="right-pane" flex={0.2}>
          <div className="pane-content">
            <label>
              Right Pane
            </label>
          </div>
        </ReflexElement>

      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-Flex Storage demo
//
/////////////////////////////////////////////////////////
class ReflexStorageDemo
  extends React.Component {

  constructor (props) {

    super (props)

    this.onResizePane = this.onResizePane.bind(this)

    this.layoutState = this.getLayoutState()
  }

  getLayoutState () {

    const item = window.localStorage.getItem(
      "re-flex-storage-demo")

    if (item) {

      return JSON.parse(item)
    }

    return {
      appPane: {
        flex: 0.8
      },
      rightPane: {
        flex: 0.2
      }
    }
  }

  onResizePane (event) {

    const { name, flex } = event.component.props

    this.layoutState[name].flex = flex

    window.localStorage.setItem(
      "re-flex-storage-demo",
      JSON.stringify(this.layoutState))
  }

  render () {

    return (
      <ReflexContainer orientation="vertical">

        <ReflexElement>

          <ReflexContainer orientation="horizontal">

            <ReflexElement flex={this.layoutState.appPane.flex}
              onResize={this.onResizePane}
              name="appPane">

              <div className="pane-content">
                <label>
                  App Pane
                </label>
              </div>

            </ReflexElement>

            <ReflexSplitter/>

            <ReflexElement className="bottom-pane">
              <div className="pane-content">
                <label>
                  Bottom Pane
                </label>
              </div>
            </ReflexElement>

          </ReflexContainer>

        </ReflexElement>

        <ReflexSplitter/>

        <ReflexElement flex={this.layoutState.rightPane.flex}
          onResize={this.onResizePane}
          className="right-pane"
          name="rightPane">

          <div className="pane-content">
            <label>
              Right Pane
            </label>
          </div>
        </ReflexElement>

      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-Flex Size Collapsible element demo
//
/////////////////////////////////////////////////////////
class CollapsibleElementCls extends React.Component {

  componentWillReceiveProps (nextProps) {

    if (this.props.onCollapse && 
        this.getSize() < this.props.threshold) {

       this.props.onCollapse()
    }
  }

  getSize () {

    const domElement = ReactDOM.findDOMNode(this)

    switch (this.props.orientation) {

      case 'horizontal':
        return domElement.offsetHeight

      case 'vertical':
        return domElement.offsetWidth

      default:
        return 0
    }
  }

  render () {

    return (
      <ReflexElement {...this.props}>
        <div className="pane-content">
         <label>
            I will collapse when I get smaller than 
            &nbsp;{this.props.threshold}px
          </label>
        </div>
      </ReflexElement>
    )
  }
}

const CollapsibleElement = React.forwardRef((props, ref) => {
  return (
    <CollapsibleElementCls innerRef={ref} {...props}/>
  )
})

class ReflexCollapseDemo
  extends React.Component {

  constructor (props) {

    super (props)

    this.state = {
      collapseRight: false,
      collapseLeft: false
    }
  }

  collapseLeft (collapseLeft) {

    this.setState({
      ...this.state, 
      collapseLeft
    })
  }

  collapseRight (collapseRight) {

    this.setState({
      ...this.state, 
      collapseRight
    })
  }

  render () {

    return (
      <ReflexContainer orientation="horizontal">

        <ReflexElement className="header" minSize={30} maxSize={30}>    
          <div style={{margin: '6px'}}>  
            {
              this.state.collapseLeft &&
              <button onClick={() => this.collapseLeft(false)}>
                <label> Show Left Pane </label>
              </button>
            }
            {
              this.state.collapseRight &&
              <button onClick={() => this.collapseRight(false)}>
                <label> Show Right Pane </label>
              </button>
            }
          </div>  
        </ReflexElement>  

        <ReflexElement>

          <ReflexContainer orientation="vertical">

            {
              !this.state.collapseLeft &&
              <CollapsibleElement className="left-pane" 
                onCollapse={() => this.collapseLeft(true)}
                threshold={40}
              />
            }

            {
              !this.state.collapseLeft &&
              <ReflexSplitter propagate={true}/>
            }

            <ReflexElement minSize={100} className="middle-pane">
              <div className="pane-content">
                <label>
                  Minimum size: <br/> 100 px
                </label>
              </div>
            </ReflexElement>

            {
              !this.state.collapseRight &&
              <ReflexSplitter propagate={true}/>
            }

             {
              !this.state.collapseRight &&
              <CollapsibleElement className="right-pane" 
                onCollapse={() => this.collapseRight(true)}
                threshold={60}
              />
             }

          </ReflexContainer>

        </ReflexElement>

      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-Flex handle element demo
//
/////////////////////////////////////////////////////////
const HandleElement = (props) => {
 
  return (
    <div>
      <ReflexHandle className="handle" {...props}>
        Bottom Pane Header: I am a draggable handle! 
        Drag me to resize ...
      </ReflexHandle>
      <div className="pane-content">
        <label>
          Bottom Pane
        </label>  
      </div>
    </div>
  )
}

class ReflexHandleDemo
  extends React.Component {

  render () {

    return (
      <ReflexContainer orientation="horizontal">
        <ReflexElement minSize={36}>
          <div className="handle">
            Top Pane Header
          </div>
          <div className="pane-content">
            <label>
              Top Pane
            </label>  
          </div>
        </ReflexElement>

        <ReflexSplitter/>

        <ReflexElement minSize={36} withHandle={true}>
          <HandleElement/>
        </ReflexElement>  

      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Render all demos
//
/////////////////////////////////////////////////////////
ReactDOM.render(<ReflexBasicDemo/>,
  document.getElementById(
    'demo-basic'))

ReactDOM.render(<ReflexBasicSplitterDemo/>,
  document.getElementById(
    'demo-basic-splitter'))

ReactDOM.render(<ReflexSplitterPropagationDemo2x/>,
  document.getElementById(
    'demo-splitter-propagation-2x'))

ReactDOM.render(<ReflexSplitterPropagationDemo3x/>,
  document.getElementById(
    'demo-splitter-propagation-3x'))

ReactDOM.render(<ReflexAdvancedDemo/>,
  document.getElementById(
    'demo-advanced'))

ReactDOM.render(<ReflexControlsDemo/>,
  document.getElementById(
    'demo-controls'))

ReactDOM.render(<ReflexSizeAwareDemo/>,
  document.getElementById(
    'demo-size-aware'))

ReactDOM.render(<ReflexStorageDemo/>,
  document.getElementById(
    'demo-storage'))

ReactDOM.render(<ReflexCollapseDemo/>,
  document.getElementById(
    'demo-collapse'))

ReactDOM.render(<ReflexHandleDemo/>,
  document.getElementById(
    'demo-handle'))
