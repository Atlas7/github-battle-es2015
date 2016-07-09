import React, { Component } from 'react'
import Prompt from '../components/Prompt'

class PromptContainer extends Component {
  constructor () {
    super()
    this.state = {
      username: ''
    }
  }
  handleSubmitUser (event) {
    event.preventDefault();
    const { username } = this.state
    this.setState({
      username: ''
    })
    const { playerOne } = this.props.routeParams
    if (playerOne) {
      this.context.router.push({
        pathname: '/battle',
        query: {
          playerOne,
          playerTwo: username
        }
      })
    } else {
      this.context.router.push(`/playerTwo/${username}`)
    }
  }
  handleUpdateUser (event) {
    this.setState({
      username: event.target.value
    });
  }
  render () {
    console.log(this.state.username)
    return (
      <Prompt
        onSubmitUser={(event) => this.handleSubmitUser(event)}
        onUpdateUser={(event) => this.handleUpdateUser(event)}
        header={this.props.route.header}
        username={this.state.username} />
    )
  }
}

PromptContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default PromptContainer