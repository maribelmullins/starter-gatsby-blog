import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          {post.heroImage &&
           (
              <div className={heroStyles.hero}>
                <Img
                  className={heroStyles.heroImage}
                  alt={post.title}
                  fluid={post.heroImage.fluid}
                />
              </div>
            )}
          {post.cloudinaryimage && (post.cloudinaryimage[0].resource_type === "video"
            ? <video autoPlay controls loop src={post.cloudinaryimage[0].secure_url}/>
            : <img src={post.cloudinaryimage[0].secure_url} />)}
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              {post.publishDate}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      cloudinaryimage {
        secure_url
        resource_type
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
