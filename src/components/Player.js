import React, { PureComponent } from 'react'
import Hls from 'hls.js'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Fab from '@material-ui/core/Fab'
import CloseIcon from '@material-ui/icons/Close'
import ReactGA from 'react-ga'

const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    font-size: 20px;
  }
`

export default class Player extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      hls: false,
      showError: false
    }
  }

  setupPlayer(url) {
    this.setState({ showError: false }, () => {
      if (this.state.hls) {
        this.state.hls.destroy()
        this.setState({ hls: false })
      }
      if (Hls.isSupported()) {
        let beachHls = new Hls()
        beachHls.loadSource(url)
        beachHls.attachMedia(this.refs.video)
        beachHls.on(
          Hls.Events.MANIFEST_PARSED,
          () => this.refs && this.refs.video && this.refs.video.play()
        )
        beachHls.on(Hls.Events.ERROR, (event, err) => {
          console.log(err)
          if (err.response && err.response.code === 404) {
            this.setState({ showError: true })
            beachHls.destroy()
          }
        })
        this.setState({ hls: beachHls })
      } else {
        this.refs.video.src = url
        this.refs.video.play()
      }
    })
  }

  delete() {
    this.state.hls && this.state.hls.destroy && this.state.hls.destroy()
    this.setState({ hls: false }, () =>
      this.props.deleteCamera({ index: this.props.index })
    )
  }

  componentDidMount() {
    console.log(this.props)
    this.setupPlayer(this.props.url)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.setupPlayer(nextProps.url)
    }
  }

  changeCamera = (index, camera) => {
    if (camera === 'suggest_new_camera') {
      const a = document.createElement('a')
      a.href = 'mailto:powdertothepeeps@gmail.com?subject=New Camera Suggestion'
      a.target = '_blank'
      a.click()
    } else {
      const { url, name } = JSON.parse(camera)
      this.props.updateCamera({ index, url, name })
      ReactGA.event({
        category: 'Camera Player',
        action: 'Change Camera',
        label: url
      })
    }
  }

  render() {
    const footer = (
      <div className="player__footer__uncollapsed">
        <Select
          value={JSON.stringify({ url: this.props.url, name: this.props.name })}
          onChange={event =>
            this.changeCamera(this.props.index, event.target.value)
          }>
          {this.props.beachNames.map((beach, key) => (
            <StyledMenuItem
              key={key}
              value={JSON.stringify({ url: beach.url, name: beach.name })}>
              {beach.name}
            </StyledMenuItem>
          ))}
          <StyledMenuItem key="suggest_new_camera" value="suggest_new_camera">
            * Suggest New Camera *
          </StyledMenuItem>
        </Select>
      </div>
    )

    const playerContent = this.state.showError ? (
      <main className="player__error">
        <div>Camera offline.</div>
      </main>
    ) : (
      <main className="player__content">
        <Fab
          className="player__delete"
          color="secondary"
          aria-label="remove"
          onClick={() => this.delete()}>
          <CloseIcon />
        </Fab>
        <video ref="video" autoPlay controls />
      </main>
    )

    return (
      <Card className="player">
        {playerContent}

        <CardActions className="player__footer">{footer}</CardActions>
        {/* <Button color="secondary" onClick={() => this.props.showFeedback(this.props.name)}>
                    How was it?
                </Button> */}
      </Card>
    )
  }
}

Player.propTypes = {
  url: PropTypes.string.isRequired,
  updateCamera: PropTypes.func.isRequired
}
