import React from 'react';
import Radium from 'radium';
var FontAwesome = require('react-fontawesome');

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.post.postId,
      postNum: this.props.post.postNum,
      projectId: this.props.post.project,
      article: this.props.post.article,
      date: this.props.post.date,
      title: this.props.post.title,
      summary: this.props.post.summary,
      likes: this.props.post.likes,
      comments: this.props.post.comments,
      images: this.props.post.images,
      hover: false,
      hoverHeart: false,
    };
    this.onHoverTipIn = this.onHoverTipIn.bind(this);
    this.onHoverTipOut = this.onHoverTipOut.bind(this);
    this.onHoverHeartIn = this.onHoverHeartIn.bind(this);
    this.onHoverHeartOut = this.onHoverHeartOut.bind(this);
    this.clickOnLike = this.clickOnLike.bind(this);
  }

  onHoverTipIn() {
    this.setState({
      hover: true
    })
  }

  onHoverTipOut() {
    this.setState({
      hover: false
    })
  }

  onHoverHeartIn() {
    this.setState({
      hoverHeart: true
    })
  }

  onHoverHeartOut() {
    this.setState({
      hoverHeart: false
    })
  }

  clickOnLike() {
    this.setState( {
        likes: this.state.likes + 1
    }, () => {
        try {
          fetch(`/api/likePUT/${this.state.postId}`, {
            body: JSON.stringify({likes: this.state.likes}),
            headers: {
              'content-type': 'application/json'
            },
            method: 'PUT'
          })
        }
        catch (err) {
          throw err;
        }
      }
    )
  }

  render() {
    return(
      <div className="blog-post" style={styles.blogPost}>
        <header className="blog-header" style={styles.blogHeader}>
          <div className="header-topbar" style={styles.headerTopbar}>
            <div key={this.state.postId} className="tooltip" style={this.state.hover ? styles.toolTip : {display: 'none'}}>
              Anyone can view this update.
              All backers will be notified
            </div>
            <div key={this.state.project} className="updateNum" style={styles.updateNum}>
              <h5 className="updateNumber">Update #{this.state.postNum}</h5>
              <FontAwesome onMouseEnter={this.onHoverTipIn} onMouseOut={this.onHoverTipOut} name='exclamation-circle' style={styles.exclamationSym}/>
            </div>

            <div className="header-date" style={styles.headerDate}>
              <h5>{this.state.date}</h5>
            </div>
          </div>
          <div className="header-title" style={styles.headerTitle}>
            <h1 style={{marginTop: '0'}}>{this.state.title}</h1>
          </div>
          <div className="comment-like-box" style={styles.commentLikeBox}>
            <div className="comments">
              <h5 style={styles.comments}>{this.state.comments.length} Comments</h5>
            </div>
            <div className="like-box"  style={styles.likeBox}>
              <div className="hover-div" onClick={this.clickOnLike} style={styles.hoverDiv} onMouseEnter={this.onHoverHeartIn} onMouseOut={this.onHoverHeartOut}></div>
                <FontAwesome name='heart' style={this.state.hoverHeart ? styles.heartHovered : styles.heartNotHovered}/>
                <h5 style={{zIndex: '1', position: 'relative'}}>Like</h5>
            </div>
            <div className="like-count">
              <h5>{this.state.likes} Likes</h5>
            </div>
          </div>
        </header>
        <section className="blog-content">
          <div className="blog-article">
            <div className="image-section">
              <div className="top-image">{<img src={this.state.images[0]}></img>}</div>
            </div>
            {this.state.article}
          </div>
        </section>
        <div className="nav-buttons">
          <div className="prev-button"></div>
          <div className="forward-button"></div>
        </div>
        <div className="like-section">
          <div className="like-button"></div>
          <div className="liked-by"></div>
        </div>
        <div className="comment-section">
          <div className="comments-title"></div>
          <div className="comments-section"></div>
        </div>
      </div>
    )
  }
}

let styles = {
  blogPost: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    maxWidth: '650px',
    margin: '0 auto',
  },
  blogHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    padding: '15px',
  },
    headerTopbar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
      updateNum: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        color: 'darkcyan',
        fontSize: '20px',
        cursor: 'pointer',
        ':hover': {
          color: '#282828'
        }
      },
      headerDate: {
        fontSize: '16px',
        color: '#282828'
      },
    headerTitle: {
      alignSelf: 'flex-start'
    },
    exclamationSym: {
      color: 'cyangreen',
      padding: '5px',
      cursor: 'pointer',
      ':hover': {
        color: '#282828'
      }
    },
    toolTip: {
      display: 'flex',
      position: 'absolute',
      backgroundColor: '#282828',
      color: 'white',
      top: 0,
      left: 0,
      ':hover': {

      }
    },
  commentLikeBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    maxWidth: '50%',
    alignSelf: 'flex-start',
    position: 'relative'
  },
    comments: {
      padding: '15px 15px 15px 0'
    },
    likeBox: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 15px 0 0'
    },
    hoverDiv: {
    display: 'flex',
    position: 'absolute',
    backgroundColor: '#ff000000',
    width: '100%',
    zIndex: 4,
    height: '1rem',
    cursor: 'pointer',
    },
      heartHovered: {
        fontSize: '20px',
        position: 'relative',
        color: 'red',
        padding: '5px',
        zIndex: 1,
      },
      heartNotHovered: {
        fontSize: '16px',
        position: 'relative',
        color: '#282828',
        padding: '5px',
        zIndex: 1,
      }





};

export default Radium(BlogPost);